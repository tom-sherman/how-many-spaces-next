import { Coordinates, KeyValue } from "./Utility"

export enum CarParkLocations {
    NORWICH = 'norwich'
}

export enum CarParkCategories {
    ALL = "ALL",
    CAR_PARK = "CAR_PARK",
    PARK_AND_RIDE = "PARK_AND_RIDE"
};

export enum CarParkStatuses {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    RESTRICTIONS = 'RESTRICTIONS',
    UNKNOWN = 'UNKNOWN',
}

export enum CarParkSortParameters {
    SPACES_DESC = "SPACES_DESC",
    CITY_CENTRE_DISTANCE_ASC = "CITY_CENTRE_DISTANCE_ASC",
    TRAIN_STATION_DISTANCE_ASC = "TRAIN_STATION_DISTANCE_ASC",
}

export type CarParkAvailability = {
    id: string,
    name: string,
    url: string,
    status: CarParkStatuses,
    category: CarParkCategories,
    distanceFromCityCentre: number,
    distanceFromTrainStation: number,
    shortAddress: string,
    totalSpaces: number,
    availableSpaces: number,
    availability: number,
    isBusy: boolean,
    isFull: boolean,
    isClosed: boolean,
    isClosingSoon: boolean,
    currentOpeningHours: string,
    lastUpdated: string,
}

export type CarParkPrices = {
    table: KeyValue[],
    note?: string,
    lastUpdated: string,
}

export type CarParkOpeningHours = {
    table: KeyValue[],
    lastUpdated: string
}

export type CarParkDetail = {
    id: string,
    name: string,
    url: string,
    status: CarParkStatuses,
    introduction: string,
    coordinates?: Coordinates,
    directionsUrl?:string,
    websiteUrl?: string,
    openingHours: CarParkOpeningHours,
    prices: CarParkPrices,
    category: CarParkCategories,
    distanceFromCityCentre: number,
    distanceFromTrainStation: number,
    shortAddress: string,
    totalSpaces: number,
    availableSpaces: number,
    availability: number,
    isBusy: boolean,
    isFull: boolean,
    isClosed: boolean,
    isClosingSoon: boolean,
    currentOpeningHours: string,
    lastUpdated: string,
}