export type Address = {
    country: string,
    locality: string,
    region: string,
    postcode: string,
}

export type Coordinates = {
    latitude: number,
    longitude: number,
}

export type GeoLocation = {
    coordinates: Coordinates,
    shortAddress: string,
    address: Address
}

export type KeyValue = {
    key: string,
    value: string
}