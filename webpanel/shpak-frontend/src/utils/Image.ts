import { Nullable } from "../config";
import { SyntheticEvent } from "react";

export function onImageLoadErrorFun(placeholder: string): (event: SyntheticEvent<HTMLImageElement>) => void {
    return (event: SyntheticEvent<HTMLImageElement>) => {
        const target = event.target as Nullable<HTMLImageElement>;
        if (!target) {
            return;
        }
        target.setAttribute("src", placeholder);
    };
}
