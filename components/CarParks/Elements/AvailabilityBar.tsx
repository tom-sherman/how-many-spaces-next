import { CarParkAvailability, CarParkStatuses } from "@/types/CarParks"
import styled from "styled-components"
import SpacesIndicator from "./SpacesIndicator"
import Tag from "@/components/Core/Utilities/Tag"
import { useMemo } from "react"
import AvailabilityIndicator from "./AvailabilityIndicator"
import BreakpointValues from "@/styles/breakpoints"
import { formatDistance } from "date-fns"

const Container = styled.div`
    margin: 0 0 20px;

    @media(min-width: ${BreakpointValues.ds}) {
        padding: 0 20px;
    }
    
    @media(min-width: ${BreakpointValues.dl}) {
        padding: 0;
    }
`

const Outer = styled.div`
    background-color: white;
    padding: 10px 10px 10px 20px;
    display: flex;
    align-items: center;
    width: 100%;

    @media (min-width: ${BreakpointValues.ds}) {
        border-radius: 20px;
        margin-top: -50px;
        padding: 10px 14px;
    }
`

const Items = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Item = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    margin-right: 15px;

    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        min-height: 28px;
        text-align: center;
    }

    @media (min-width: ${BreakpointValues.ts}) {
        margin-right: 25px;

        &:first-child {
            margin-left: 10px;
        }

        & > div {
            min-width: 120px;
        }
    }
`

const ItemHeading = styled.span`
    display: block;
    margin: 0 0 3px;
    font-weight: bold;

    @media (min-width: ${BreakpointValues.ts}) {
        font-size: 18px;
    }
`

const ItemText = styled.div`
    font-size: .9rem;
    line-height: 1.1;
    justify-content: flex-start !important;
    text-align: left !important;

    @media (min-width: ${BreakpointValues.ts}) {
        font-size: 1rem;
    }
`

type AvailabilityBarProps = {
    data?: CarParkAvailability
}

export default function AvailabilityBar(props: AvailabilityBarProps) {
    const {
        data
    } = props;

    const statusLabel = useMemo(() => {
        if (data?.isBusy) {
            return 'Busy'
        }

        if (data?.isFull) {
            return 'Full'
        }

        switch(data?.status) {
            case CarParkStatuses.CLOSED:
                return 'Closed'
            case CarParkStatuses.RESTRICTIONS:
                return "Restrictions in place"
            case CarParkStatuses.OPEN:
                return 'Open'
            case CarParkStatuses.UNKNOWN:
            default:
                return 'Unknown'
        }
    }, [data?.status, data?.isBusy, data?.isFull]);

    const timeAgo = useMemo(() => {
        return formatDistance(
            new Date(data?.lastUpdated ?? new Date()),
            new Date(),
            {
                includeSeconds: true,
                addSuffix: true
            }
        );
    }, [data?.lastUpdated]);

    return (
        <Container>
            <Outer>
                <SpacesIndicator
                    isBusy={data?.isBusy ?? false}
                    isClosed={data?.isClosed ?? false}
                    isFull={data?.isFull ?? false}
                    availableSpaces={data?.availableSpaces}
                />
                <Items>
                    <Item>
                        <ItemHeading>Status</ItemHeading>
                        <Tag
                            isWarning={data?.isBusy ?? data?.status === CarParkStatuses.RESTRICTIONS ?? false}
                            isError={data?.isFull ?? false}
                            isNeutral={data?.isClosed ?? data?.status === CarParkStatuses.UNKNOWN}
                            label={statusLabel}
                        />
                    </Item>
                    {
                        data?.status !== CarParkStatuses.CLOSED ? (
                            <Item>
                                <ItemHeading>Availability</ItemHeading>
                                <AvailabilityIndicator availability={data?.availability ?? 100} />
                            </Item>
                        ) : null
                    }
                    <Item>
                        <ItemHeading>Last updated</ItemHeading>
                        <ItemText>{ timeAgo }</ItemText>
                    </Item>
                </Items>
            </Outer>
        </Container>
    )
}