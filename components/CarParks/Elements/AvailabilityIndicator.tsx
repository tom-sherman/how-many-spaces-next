import BreakpointValues from "@/styles/breakpoints"
import styled from "styled-components"

type AvailabilityIndicatorProps = {
    availability: number
}


const Outer = styled.div`
    border: 2px solid var(--colour-blue);
    background-color: var(--colour-grey--lighter);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    width: 100px;
    height: 28px;

    @media (min-width: ${BreakpointValues.tl}) {
        width: 150px;
    }
`

const Inner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 100%;
    background-color: var(--colour-blue);
`

const Label = styled.span<AvailabilityIndicatorProps>`
    position: absolute;
    left: ${props => props.availability > 40 ? 'unset' : 'calc(100% + 10px)'};
    right: ${props => props.availability > 40 ? '10px' : 'unset'};
    color: ${props => props.availability > 40 ? 'white' : 'var(--colour-black)'};
    padding-top: 2px;
    font-size: 0.9rem;
    font-weight: bold;
`
export default function AvailabilityIndicator(props: AvailabilityIndicatorProps) {
    const {
        availability
    } = props;

    return (
        <Outer>
            <Inner style={{ width: `${availability}%` }}>
                <Label availability={availability}>{Math.round(availability)}%</Label>
            </Inner>
        </Outer>
    )
}