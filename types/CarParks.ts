export enum CarParkLocations {
    NORWICH = 'Norwich'
}

export enum CarParkCategories {
    ALL = "ALL",
    CAR_PARKS = "CAR_PARKS",
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
    CITY_CENTRE_DISTANCE_DESC = "CITY_CENTRE_DISTANCE_DESC",
    TRAIN_STATION_DISTANCE_DESC = "TRAIN_STATION_DISTANCE_DESC",
}

export type CarPark = {
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
    lastUpdated: number,
}