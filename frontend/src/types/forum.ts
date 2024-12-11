import {User} from "./user.ts";

export interface ForumCard {
    id: string;
    title: string;
    description: string;
    created_by: User;
}