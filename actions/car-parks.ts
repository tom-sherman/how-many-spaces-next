import { CarParkCategories, CarParkSortParameters } from "@/types/CarParks";
import { ListResponse, ErrorResponse, CarParkMetaResponse } from "@/types/API";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const CAR_PARKS_ENDPOINT = 'car-parks';


// /api/v1/car-parks/{location}
export async function getCarParkList(
    location: string,
    category: CarParkCategories,
    sort: CarParkSortParameters
): Promise<ListResponse> {
    return axios.get(`${BASE_URL}/${CAR_PARKS_ENDPOINT}/location/${location}`, {
        params: {
            category,
            sort
        }
    })
    .then(response => response.data);
}

// /api/car-parks/{slug}
export async function getCarParkMeta(
    slug?: string
): Promise<CarParkMetaResponse> {
    return axios.get(`${BASE_URL}/${CAR_PARKS_ENDPOINT}/${slug}`);
}