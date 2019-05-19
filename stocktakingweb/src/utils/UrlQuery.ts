export interface IUrlQuery {
    [name: string]: string[];
}

export function encodeUrlWithQuery(endpoint: string, query: IUrlQuery) {
    const params = [];
    for (const name of Object.keys(query)) {
        for (const value of query[name]) {
            params.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
        }
    }
    const paramsStr = params.join("&");
    if (paramsStr.length > 0) {
        return `${endpoint}?${paramsStr}`;
    }
    return endpoint;
}
