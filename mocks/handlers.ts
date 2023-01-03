import { AvailabilitiesListResponse, AvailabilityResponse, DetailResponse } from '@/types/API';
import { CarParkCategories, CarParkSortParameters } from '@/types/CarParks';
import { rest } from 'msw'
import { carParkDetail, defaultCarParks, defaultCategories } from './fixtures';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const handlers = [

    rest.get(`${BASE_URL}/car-parks/availabilities/location/:location`, (_req, res, ctx) => {
        const params = <URLSearchParams> _req.url.searchParams;
        return res(
            ctx.delay(2000),
            ctx.json<AvailabilitiesListResponse>({
                categories: defaultCategories,
                category: <CarParkCategories>params.get('category') ?? CarParkCategories.ALL,
                sort: <CarParkSortParameters>params.get('sort') ?? CarParkSortParameters.SPACES_DESC,
                data: defaultCarParks
                    .filter(carPark => {
                        if (params.get('category') === CarParkCategories.ALL) {
                            return true;
                        }
                        return carPark.category === params.get('category');
                    })
                    .sort((a, b) => {
                        if (params.get('sort') === CarParkSortParameters.CITY_CENTRE_DISTANCE_DESC) {
                            return a.distanceFromCityCentre - b.distanceFromCityCentre;
                        }

                        if (params.get('sort') === CarParkSortParameters.TRAIN_STATION_DISTANCE_DESC) {
                            return a.distanceFromTrainStation - b.distanceFromTrainStation;
                        }

                        return b.availableSpaces - a.availableSpaces;
                    }),
            })
        )
    }),

    rest.get(`${BASE_URL}/car-parks/availabilities/:slug`, (_req, res, ctx) => {
        return res(
            ctx.delay(2000),
            ctx.json<AvailabilityResponse>({
                data: defaultCarParks[0]
            })
        );
    }),

    rest.get(`${BASE_URL}/car-parks/detail/:slug`, (_req, res, ctx) => {
        return res(
            ctx.json<DetailResponse>({
                data: carParkDetail
            })
        )
    })
]