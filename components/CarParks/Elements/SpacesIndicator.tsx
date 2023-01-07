import BreakpointValues from '@/styles/breakpoints'
import Indicator from '@/styles/components/Utilities/Indicator'
import styled from 'styled-components'

const Container = styled(Indicator)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    border-width: 3px;
    border-radius: 50%;

    figcaption {
        font-weight: bold;
        font-size: 14px;
    }

    @media (min-width: ${BreakpointValues.ts}) {
        width: 75px;
        height: 75px;
    }
`

const Display = styled.figure`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    line-height: 1;
`

const Spaces = styled.span`
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -1.6px;

    @media (min-width: ${BreakpointValues.ts}) {
        font-size: 24px;
    }
`

type SpacesIndicatorProps = {
    isClosed: boolean,
    isBusy: boolean,
    isFull: boolean,
    availableSpaces?: number
}

export default function SpacesIndicator(props: SpacesIndicatorProps) {
    const {
        isClosed,
        isBusy,
        isFull,
        availableSpaces,
    } = props;

    return (
        <Container
            isBusy={isBusy}
            isFull={isFull}
            isClosed={isClosed}
        >
            {
                !isClosed ? (
                    <Display>
                        <Spaces>{ availableSpaces }</Spaces>
                        <figcaption>{ availableSpaces !== 1 ? 'spaces' : 'space' }</figcaption>
                    </Display>
                ) : (
                    <figcaption>Closed</figcaption>
                )
            }
        </Container>
    )
}