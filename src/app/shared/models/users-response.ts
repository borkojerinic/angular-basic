
import { Links } from "./links";
import { Meta } from "./meta";
import { User } from "./user";

export interface UsersResponse {
    data: User[];
    links: Links;
    meta: Meta;
}