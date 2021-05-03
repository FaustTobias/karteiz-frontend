import { getStore, registerStore } from "svex";
import type { Readable, Writable } from "svelte/store";
import { derived, writable } from "svelte/store";

declare global {
    export namespace Svelte {
        export interface Stores {
            "client.workCount": Writable<number>;
            "client.isWorking": Readable<boolean>;
            "user.name": Writable<string>;
            "user.isLoggedIn": Readable<boolean>;
            "ui.bottomNavigationCount": Writable<number>;
            "ui.isBottomNavigationVisible": Readable<boolean>;
        }
    }
}

registerStore("client.workCount", writable(0));
registerStore(
    "client.isWorking",
    derived([getStore("client.workCount")], ([$workCount]) => $workCount > 0),
);
registerStore("user.name", writable(localStorage.getItem("karteiz-userName")));
registerStore(
    "user.isLoggedIn",
    derived([getStore("user.name")], ([$name]) => !!$name),
);
registerStore("ui.bottomNavigationCount", writable(0));
registerStore(
    "ui.isBottomNavigationVisible",
    derived([getStore("ui.bottomNavigationCount")], ([$bottomNavigationCount]) => $bottomNavigationCount > 0),
);

getStore("user.name").subscribe(($userName) => {
    localStorage.setItem("karteiz-userName", $userName);
});

getStore("ui.bottomNavigationCount").subscribe((count) => console.log(count));
