import { Meta } from "./meta";

export interface User {
    id: number,
    name: string,
    email: string,
    created: string,
    checked: boolean
}

export interface SingleUser {
    data: User;
}

export interface SingleMeta {
    data: Meta;
}