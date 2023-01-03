import { CarParkCategories, CarParkAvailability, CarParkSortParameters, CarParkDetail } from "./CarParks"

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