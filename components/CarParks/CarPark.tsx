import { CarPark as CarParkContract } from "@/types/CarParks"

type CarParkProps = {
    carPark: CarParkContract
}

export default function CarPark(props: CarParkProps) {
    const {
        carPark
    } = props;

    return (
        <div>
            <h2>{ carPark.name }</h2>
        </div>
    )
}