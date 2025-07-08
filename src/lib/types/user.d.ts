import { Role } from "./rol";


interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    password: string;
}