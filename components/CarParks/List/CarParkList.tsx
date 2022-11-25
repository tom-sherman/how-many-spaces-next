import { CarParkSortParameters } from "@/types/CarParks";
import styled from "styled-components";
import CarParkCategoriesSelector from "./CarParkCategoriesSelector";
import CarPark from '../CarPark';
import { ListResponse } from "@/types/API";
import CarParkSortSelector from "./CarParkSortSelector";

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid var(--colour-grey--lighter);
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 0 0;
`

type CarParkListProps = {
    data: ListResponse,
    onCategoryChange: Function,
    onSortChange: Function,
}

export default function CarParkList(props: CarParkListProps) {
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
                    data.carParks.map(carPark => <CarPark key={carPark.url} carPark={carPark} />)
                }
            </List>
        </>
    )
}