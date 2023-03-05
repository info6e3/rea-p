export interface IUserOrder {
    email: string,
    password: string,
    role: string,
    name: string,
    surname: string,
    description: string | null,
    birth_date: string | null,
}