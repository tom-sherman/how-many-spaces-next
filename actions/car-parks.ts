import { CarParkCategories, CarParkSortParameters } from "@/types/CarParks";
import { ErrorResponse, AvailabilityResponse, AvailabilitiesListResponse, DetailResponse, LocationsListResponse, LocationResponse } from "@/types/API";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const AVAILABILITIES_ENDPOINT = 'car-parks/availabilities';
const DETAIL_ENDPOINT = 'car-parks/detail';
const LOCATIONS_ENDPOINT = 'car-parks/locations';


// /api/v1/car-parks/availabilities/{location}
export async function getCarParkAvailabilitiesList(
    location: string,
    category: CarParkCategories,
    sort: CarParkSortParameters
): Promise<AvailabilitiesListResponse> {
    return axios.get(`${BASE_URL}/${AVAILABILITIES_ENDPOINT}/location/${location}`, {
        params: {
            category,
            sort
        }
    })
    .then(response => response.data);
}

// /api/v1/car-parks/availabilities/{slug}
export async function getCarParkAvailability(
    slug: string
): Promise<AvailabilityResponse> {
    return axios.get(`${BASE_URL}/${AVAILABILITIES_ENDPOINT}/${slug}`)
        .then(response => response.data);
}

// /api/v1/car-parks/detail/{slug}
export async function getCarParkDetail(
    slug: string
): Promise<DetailResponse> {
    return axios.get(`${BASE_URL}/${DETAIL_ENDPOINT}/${slug}`)
        .then(response => response.data)
}

// /api/v1/car-parks/locations
export async function getCarParkLocations(): Promise<LocationsListResponse> {
    return axios.get(`${BASE_URL}/${LOCATIONS_ENDPOINT}`)
        .then(response => response.data);
}

// /api/v1/car-parks/locations/{slug}
export async function getCarParkLocation(slug: string): Promise<LocationResponse> {
    return axios.get(`${BASE_URL}/${LOCATIONS_ENDPOINT}/${slug}`)
        .then(response => response.data);
}