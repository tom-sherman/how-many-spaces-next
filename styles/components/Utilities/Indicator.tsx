import styled from 'styled-components'

type IndicatorProps = {
    isClosed?: boolean,
    isBusy?: boolean,
    isFull?: boolean,
    isWarning?: boolean,
    isSuccess?: boolean,
    isError?: boolean,
    isNeutral?: boolean,
    lightColours?: boolean,
}

const getBorderColourFromProps = (props: IndicatorProps): string => {
    let colour = 'var(--colour-green)';

    switch(true) {
        case (props.isFull || props.isError):
            colour = 'var(--colour-red)'
            break;
        case (props.isBusy || props.isWarning):
            colour = 'var(--colour-orange)'
            break;
        case (props.isClosed || props.isNeutral):
            colour = 'var(--colour-grey)'
            break;
        default:
            colour = 'var(--colour-green)'
    }

    return colour;
}

const getBackgroundColourFromProps = (props: IndicatorProps): string => {
    let colour = 'var(--colour-green--light)';

    switch(true) {
        case (props.isFull || props.isError):
            colour = props.lightColours ? 'var(--colour-red--lightest)' : 'var(--colour-red--light)'
            break;
        case (props.isBusy || props.isWarning):
            colour = props.lightColours ? 'var(--colour-orange--lightest)' : 'var(--colour-orange--light)'
            break;
        case (props.isClosed || props.isNeutral):
            colour = props.lightColours ? 'var(--colour-grey--lightest)' : 'var(--colour-grey--light)'
            break;
        default:
            colour = props.lightColours ? 'var(--colour-green--lightest)' : 'var(--colour-green--light)'
    }

    return colour;
}

const Indicator = styled.div<IndicatorProps>`
    border-style: solid;
    color: var(--colour-black);
    border-color: ${props => getBorderColourFromProps(props)};
    background-color: ${props => getBackgroundColourFromProps(props)};
`

export default Indicator;