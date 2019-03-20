import { createBrowserHistory, History } from "history";

const history = createBrowserHistory();

export namespace AppContext {
    export function getHistory(): History {
        return history;
    }
}
