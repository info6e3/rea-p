export interface IFlat {
    id: number,
    title: string,
    type: string,
    address: string,
    price: number,
    photos: string[],
    description: string,
    coordinates: [number, number],
    owner: number,
    active: true
}