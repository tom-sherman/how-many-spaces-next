import { CarPark, CarParkCategories, CarParkSortParameters } from "./CarParks"

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

export interface ListResponse {
    categories: CategoryResponse[],
    category: CarParkCategories,
    sort: CarParkSortParameters,
    carParks: CarPark[],
}