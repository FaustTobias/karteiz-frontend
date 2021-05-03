import { derived, get } from "svelte/store";
import { Readable, writable } from "svelte/store";
import { getStore } from "svex";

const endpoint = "http://wildfly.shanix.xyz/Karteiz";

export async function call(method: string, args: any): Promise<any> {
    try {
        getStore("client.workCount").update((value) => value + 1);

        return await fetch(`${endpoint}/api/${method}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(args),
        }).then((res) => res.json());
    } catch {
        throw new Error("Could not reach server!");
    } finally {
        getStore("client.workCount").update((value) => value - 1);
    }
}

export interface Category {
    id: string;
    name: string;
    color: string;
}

export interface GetCategoriesResult {
    isLoading: boolean;
    error: string | null;
    items: Category[];
    refresh: () => Promise<void>;
}

export interface Card {
    id: string;
    question: string;
    answer: string;
}

export interface GetCardsResult {
    isLoading: boolean;
    error: string | null;
    items: Card[];
    refresh: () => Promise<void>;
}

export function getCategories(): Readable<GetCategoriesResult> {
    return getCollection("card/getCategories") as any;
}

export function getCards(categoryId: string): Readable<GetCardsResult> {
    return getCollection("card/getCards", { categoryId }) as any;
}

const collectionTransformer = {
    "card/getCategories": (result: any) =>
        result.categories.map((cat) => ({ id: cat.catId, name: cat.catName, color: cat.color })),
    "card/getCards": (result: any) => {
        return result.cardList.map((card) => ({ id: card.cardId, question: card.cardFront, answer: card.cardBack }));
    },
} as const;

function getCollection(collection: keyof typeof collectionTransformer, args: any = {}) {
    const store = writable<any>({
        isLoading: true,
        error: null,
        items: [],
        refresh,
    });

    async function refresh() {
        try {
            const $userName = get(getStore("user.name"));

            if (!$userName) {
                store.update((s) => ({
                    ...s,
                    items: [],
                }));
            }

            store.update((s) => ({
                ...s,
                isLoading: true,
            }));

            const result = await call(collection, {
                userName: $userName,
                ...args,
            });

            store.update((s) => ({
                ...s,
                items: collectionTransformer[collection](result),
            }));
        } catch (e) {
            console.log(e);
            store.update((s) => ({
                ...s,
                error: e.message,
            }));
        } finally {
            store.update((s) => ({
                ...s,
                isLoading: false,
            }));
        }
    }

    let lastUserName = null;

    const resultStore = derived<any, any>([store, getStore("user.name")], ([$store, $userName]) => {
        if ($userName !== lastUserName) {
            lastUserName = $userName;
            refresh();
        }

        return $store;
    });

    return resultStore;
}
