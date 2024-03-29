import BreakpointValues from '@/styles/breakpoints'
import Link from 'next/link'
import styled from 'styled-components'

export const CarParkPreview = styled(Link)`
    display: flex;
    padding: 14px 12px;
    border: 1px solid var(--colour-grey--lighter);
    border-radius: 16px;
    background-color: var(--colour-grey--lightest);
    min-height: 50px;

    &:not(:last-child) {
        margin: 0 0 20px;
    }

    &:hover,
    &:focus {
        background-color: var(--colour-grey--lighter);
    }

    @media (min-width: ${BreakpointValues.tl}) {
        padding: 12px;
        align-items: center;
    }
`

export const CarParkPreviewContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

type TitleProps = {
    isClosed: boolean
}

export const Title = styled.div<TitleProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;

    h2 {
        margin-right: 10px;
        font-size: 1.5rem;
        margin-bottom: 0;
        color: ${props => props.isClosed ? 'var(--colour-grey)' : 'var(--colour-black)'}
    }

    @media (min-width: ${BreakpointValues.ds}) {
        h2 {
            margin-right: 16px;
            font-size: 1.75rem;
        }
    }
`

export const TitleMain = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-grow: 1;
`

export const Tags = styled.div`
    display: none;

    @media (min-width: ${BreakpointValues.tl}) {
        display: flex;
    }
`

export const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    @media (min-width: ${BreakpointValues.dl}) {
        flex-direction: row;
        align-items: baseline;
    }
`

export const MetaItems = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const Actions = styled.div`
    display: block;
    margin-top: 12px;

    @media (min-width: ${BreakpointValues.dl}) {
        margin-top: 0;
    }
`

export const CarParkPreviewLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 20px;
`

export const LeftTags = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 14px 0 0;
    text-align: center;

    @media (min-width: ${BreakpointValues.tl}) {
        display: none;
    }
`