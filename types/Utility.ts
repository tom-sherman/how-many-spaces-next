export type Address = {
    country: string,
    locality: string,
    region: string,
    postcode: string,
}

export type Coordinates = {
    lat: number,
    lng: number,
}

export type GeoLocation = {
    coordinates: Coordinates,
    shortAddress: string,
    address: Address
}