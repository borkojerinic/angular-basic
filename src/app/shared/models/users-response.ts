
import { Links } from "./links";
import { Meta } from "./meta";
import { IUser } from "./user";

export interface UsersResponse {
    data: IUser[];
    links: Links;
    meta: Meta;
}