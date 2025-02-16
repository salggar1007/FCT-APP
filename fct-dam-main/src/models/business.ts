import { Distance } from "./distance"
import { Location } from "./location"

export interface Business {
    id?: string,
    name: string,
    address: string,
    postal_code: string,
    city: string,
    province: string,
    phone: string,
    photoUrl: string,
    placeId: string
    location?: Location,
    distance?: Distance
}