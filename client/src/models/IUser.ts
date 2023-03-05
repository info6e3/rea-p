export interface IUser {
    id: number,
    email: string,
    password: string,
    role: string,
    name: string,
    surname: string,
    description: string | null,
    registration_date: string | null,
    birth_date: string | null,
    flats: number[] | null,
    active: boolean
}