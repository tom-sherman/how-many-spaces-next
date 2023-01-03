import * as Styles from "@/styles/components/CarParks/CarPark";
import { CarParkAvailability as CarParkAvailabilityContract, CarParkCategories } from "@/types/CarParks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus, faClock, faLocationDot, faParking } from "@fortawesome/free-solid-svg-icons";
import SpacesIndicator from "./Elements/SpacesIndicator";
import Tag from "../Core/Utilities/Tag";
import MetaItem from "./Elements/MetaItem";
import ButtonStyles from "@/styles/components/Utilities/Button";
import styled from "styled-components";
import { formatDistance } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import BreakpointValues from "@/styles/breakpoints";

const DetailsButton = styled.span`
    ${ButtonStyles};
    display: none;
    white-space: nowrap;

    @media (min-width: ${BreakpointValues.ts}) {
        display: block;
    }
`

type CarParkAvailabilityProps = {
    carPark: CarParkAvailabilityContract
}

export default function CarPark(props: CarParkAvailabilityProps) {
    const {
        carPark
    } = props;

    const timeAgo = useMemo(() => {
        return formatDistance(
            new Date(carPark.lastUpdated * 1000),
            new Date(),
            {
                includeSeconds: true,
                addSuffix: true
            }
        );
    }, [carPark.lastUpdated]);

    const [updatedAtDistance, setUpdatedAtDistance] = useState<string>(timeAgo);

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdatedAtDistance(timeAgo);
        }, 1000)

        return () => clearInterval(interval);
    }, [carPark.lastUpdated])

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
                    <Styles.TitleMain>
                        <h2>{ carPark.name }{ carPark.category === CarParkCategories.PARK_AND_RIDE ? <FontAwesomeIcon icon={faBus} style={{ marginLeft: '10px' }} title="Park & ride car park" /> : null }</h2>
                        <Styles.Tags>
                            { carPark.isFull ? <Tag label="Full" isError /> : null }
                            { carPark.isBusy ? <Tag label="Busy" isWarning /> : null }
                            { carPark.isClosingSoon ? <Tag label="Closing soon" isWarning icon={faClock} /> : null }
                            { carPark.isClosed ? <Tag label={`Closed`} isNeutral /> : null }
                        </Styles.Tags>
                    </Styles.TitleMain>
                    <DetailsButton>More details</DetailsButton>
                </Styles.Title>
                <Styles.Bottom>
                    <Styles.MetaItems>
                        <MetaItem icon={faLocationDot} label={carPark.shortAddress} />
                        <MetaItem icon={faParking} label={`${carPark.totalSpaces.toString()} total spaces`} />
                        <MetaItem icon={faClock} label={updatedAtDistance} />
                    </Styles.MetaItems>
                </Styles.Bottom>
            </Styles.CarParkPreviewContent>
        </Styles.CarParkPreview>
    )
}