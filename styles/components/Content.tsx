import styled from "styled-components";
import BreakpointValues from "../breakpoints";

const Content = styled.article`
    padding: 20px;
`

const ContentBlock = styled.div`
    margin: 0 0 30px;
`

const ContentTable = styled.table`
    width: 100%;
    margin: 10px 0;
    border-collapse: collapse;

    tr {
        &:hover {
            background-color: var(--colour-grey--light);
        }

        td {
            border: solid var(--colour-grey--light);
            border-width: 2px 0;
            padding: 10px;

            &:first-child {
                font-weight: bold;
            }

            &:last-child {
                text-align: right;
            }
        }
    }
`

const ContentTableFooter = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.9rem;
    font-style: italic;
    padding: 0 10px;
    color: var(--colour-grey);
    font-weight: bold;

    span {
        width: 100%;
        margin: 2px 0;

        @media (min-width: ${BreakpointValues.ds}) {
            width: 50%;

            &:last-child {
                text-align: right;
            }
        }
    }
`

export {
    Content,
    ContentBlock,
    ContentTable,
    ContentTableFooter,
}