import { getStore } from "svex";

const endpoint = "http://wildfly.shanix.xyz/Karteiz";

export async function call(method: string, args: any): Promise<any> {
    try {
        getStore("client.workCount").update((value) => value + 1);

        return fetch(`${endpoint}/api/${method}`, {
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
