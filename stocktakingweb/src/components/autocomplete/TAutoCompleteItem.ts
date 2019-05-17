import { IBasicUser } from "./IBasicUser";

export type TAutoCompleteItem<T> = T extends IBasicUser ? T : IBasicUser;
