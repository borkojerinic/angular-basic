import { Meta } from "./meta";

export interface IUser {
    id: number,
    name: string,
    email: string,
    created: string,
    checked: boolean
}

export interface SingleUser {
    data: IUser;
}

export interface SingleMeta {
    data: Meta;
}