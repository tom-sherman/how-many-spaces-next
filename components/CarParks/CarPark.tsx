import * as Styles from "@/styles/components/CarParks/CarPark";
import { CarPark as CarParkContract, CarParkCategories } from "@/types/CarParks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus, faClock, faLocationDot, faParking } from "@fortawesome/free-solid-svg-icons";
import SpacesIndicator from "./Elements/SpacesIndicator";
import Tag from "../Core/Utilities/Tag";
import MetaItem from "./Elements/MetaItem";
import ButtonStyles from "@/styles/components/Utilities/Button";
import styled from "styled-components";

const DetailsButton = styled.span`
    ${ButtonStyles}
`

type CarParkProps = {
    carPark: CarParkContract
}

export default function CarPark(props: CarParkProps) {
    const {
        carPark
    } = props;

    return (
        <Styles.CarParkPreview href={carPark.url} title={carPark.name}>
            <SpacesIndicator
                isFull={carPark.isFull}
                isClosed={carPark.isClosed}
                isBusy={carPark.isBusy}
                availableSpaces={carPark.availableSpaces}
            />
            <Styles.CarParkPreviewContent>
                <Styles.Title isClosed={carPark.isClosed}>
                    <h2>{ carPark.name }{ carPark.category === CarParkCategories.PARK_AND_RIDE ? <FontAwesomeIcon icon={faBus} style={{ marginLeft: '10px' }} title="Park & ride car park" /> : null }</h2>
                    <Styles.Tags>
                        { carPark.isFull ? <Tag label="Full" isError /> : null }
                        { carPark.isBusy ? <Tag label="Busy" isWarning /> : null }
                        { carPark.isClosingSoon ? <Tag label="Closing soon" isWarning icon={faClock} /> : null }
                        { carPark.isClosed ? <Tag label={`Closed`} isNeutral /> : null }
                    </Styles.Tags>
                </Styles.Title>
                <Styles.Bottom>
                    <Styles.MetaItems>
                        <MetaItem icon={faLocationDot} label={carPark.shortAddress} />
                        <MetaItem icon={faParking} label={`${carPark.totalSpaces.toString()} spaces`} />
                        <MetaItem icon={faClock} label={carPark.currentOpeningHours} />
                    </Styles.MetaItems>
                    <Styles.Actions>
                        <DetailsButton>More details</DetailsButton>
                    </Styles.Actions>
                </Styles.Bottom>
            </Styles.CarParkPreviewContent>
        </Styles.CarParkPreview>
    )
}