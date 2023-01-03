import { CarParkCategories, CarParkSortParameters } from "@/types/CarParks";
import { ErrorResponse, AvailabilityResponse, AvailabilitiesListResponse } from "@/types/API";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const AVAILABILITIES_ENDPOINT = 'car-parks/availabilities';


// /api/v1/availabilities/{location}
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

// /api/availabilities/{slug}
export async function getCarParkAvailability(
    slug?: string
): Promise<AvailabilityResponse> {
    return axios.get(`${BASE_URL}/${AVAILABILITIES_ENDPOINT}/${slug}`);
}