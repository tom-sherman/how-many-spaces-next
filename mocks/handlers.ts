import { ListResponse } from '@/types/API';
import { CarParkCategories, CarParkSortParameters, CarParkStatuses } from '@/types/CarParks';
import { rest } from 'msw'
import { defaultCarParks, defaultCategories } from './fixtures';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const handlers = [

    // /api/v1/car-parks/{location}
    rest.get(`${BASE_URL}/car-parks/:location`, (_req, res, ctx) => {
        const params = <URLSearchParams> _req.url.searchParams;
        return res(
            ctx.json<ListResponse>({
                categories: defaultCategories,
                category: <CarParkCategories>params.get('category') ?? CarParkCategories.ALL,
                sort: CarParkSortParameters.SPACES_DESC,
                carParks: defaultCarParks
                    .filter(carPark => {
                        if (params.get('category') === CarParkCategories.ALL) {
                            return true;
                        }
                        return carPark.category === params.get('category');
                    }),
            })
        )
    }),

]