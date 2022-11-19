import { ListResponse } from '@/types/API';
import { CarParkCategories, CarParkSortParameters, CarParkStatuses } from '@/types/CarParks';
import { rest } from 'msw'
import { defaultCarParks, defaultCategories } from './fixtures';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const handlers = [

    // /api/v1/car-parks/{location}
    rest.get(`${BASE_URL}/car-parks/:location`, (_req, res, ctx) => {
        return res(
            ctx.json<ListResponse>({
                categories: defaultCategories,
                category: _req.url.searchParams.get('category') as CarParkCategories ?? CarParkCategories.ALL,
                sort: CarParkSortParameters.SPACES_DESC,
                carParks: defaultCarParks.filter(carPark => {
                    if (_req.url.searchParams.get('category') === CarParkCategories.ALL) {
                        return true;
                    }
                    
                    return carPark.category === _req.url.searchParams.get('category');
                }),
            })
        )
    }),

]