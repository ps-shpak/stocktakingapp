import { Component } from "react";

export type TNullableTypes<T> = Component | HTMLElement | T;
export type Nullable<T> = T extends (null | TNullableTypes<T>) ? (T | null | undefined) : (T | undefined);
