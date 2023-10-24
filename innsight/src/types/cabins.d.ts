export type Cabin = {
    "id"?: number
    "created_at"?: string
    "name": string
    "maxCapacity": number
    "regularPrice": number,
    "discount": number,
    "description": string
    "image": string | null,
    'isFull':boolean
}

export type CabinFormInitial = {
    cabinName: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: '',
    image: ''
}