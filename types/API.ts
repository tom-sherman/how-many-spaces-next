import { CarParkCategories, CarParkAvailability, CarParkSortParameters, CarParkDetail, CarParkLocation } from "./CarParks"

export enum ErrorTypes {
    SERVER_ERROR = 'server_error'
}

export interface ErrorResponse {
    error: boolean,
    error_code: ErrorTypes,
}

export type CategoryResponse = {
    category: CarParkCategories,
    name: string,
}

export interface AvailabilitiesListResponse {
    categories: CategoryResponse[],
    category: CarParkCategories,
    sort: CarParkSortParameters,
    data: CarParkAvailability[],
}

export interface AvailabilityResponse {
    data: CarParkAvailability
}

export interface DetailResponse {
    data: CarParkDetail
}

export interface LocationResponse {
    data: CarParkLocation,
}

export interface LocationsListResponse {
    data: CarParkLocation[],
}