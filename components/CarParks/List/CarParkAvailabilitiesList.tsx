import { CarParkCategories, CarParkSortParameters } from "@/types/CarParks";
import styled from "styled-components";
import CarParkCategoriesSelector from "./CarParkCategoriesSelector";
import CarParkAvailability from '../CarParkAvailability';
import { AvailabilitiesListResponse } from "@/types/API";
import CarParkSortSelector from "./CarParkSortSelector";
import BreakpointValues from "@/styles/breakpoints";
import AdUnit from "@/components/Adsense/AdUnit";

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-bottom: 1px solid var(--colour-grey--lighter);

    @media (min-width: ${BreakpointValues.ts}) {
        flex-direction: row;
        align-items: baseline;
    }
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 0 0;
`

type CarParkAvailabilitiesListProps = {
    data: AvailabilitiesListResponse,
    onCategoryChange: Function,
    onSortChange: Function,
}

export default function CarParkAvailabilitiesList(props: CarParkAvailabilitiesListProps) {
    const {
        data,
        onCategoryChange,
        onSortChange,
    } = props;

    return (
        <>
            <Top>
                <CarParkCategoriesSelector
                    category={data.category}
                    categories={data.categories}
                    visibleCategories={[CarParkCategories.CAR_PARK, CarParkCategories.PARK_AND_RIDE, CarParkCategories.ALL]}
                    onSelect={onCategoryChange}
                />
                <CarParkSortSelector
                    sort={data.sort}
                    options={Object.values(CarParkSortParameters)}
                    onSelect={onSortChange}
                />
            </Top>
            <List>
                {
                    data.data.map((carPark, i) => (
                        (i > 0 && i < 8 && i % 3 === 0) ? (
                            <div key={carPark.id}>
                                <CarParkAvailability carPark={carPark} />
                                <AdUnit
                                    format="fluid"
                                    layoutKey="-fb+5w+4e-db+86"
                                    slot="3623797076"
                                />
                            </div>
                        ) : <CarParkAvailability key={carPark.id} carPark={carPark} />
                    ))
                }
            </List>
        </>
    )
}