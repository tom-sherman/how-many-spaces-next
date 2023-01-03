import styled from 'styled-components'
import Indicator from "@/styles/components/Utilities/Indicator"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import BreakpointValues from '@/styles/breakpoints'

type TagProps = {
    isSuccess?: boolean,
    isWarning?: boolean,
    isError?: boolean,
    isNeutral?: boolean,
    icon?: IconProp,
    wide?: boolean,
    label: string,
}

const TagOuter = styled(Indicator)`
    font-weight: bold;
    border-radius: 10px;
    border-width: 2px;
    font-size: 0.9rem;
    padding: 4px 8px 2px;
    line-height: 1.25;

    &:not(:last-child) {
        margin-right: 10px;
    }

    span {
        &:not(:first-child) {
            margin-left: 4px;
        }
    }
`

TagOuter.defaultProps = {
    lightColours: true
}

export default function Tag(props: TagProps) {
    
    return (
        <TagOuter
            isSuccess={props.isSuccess}
            isWarning={props.isWarning}
            isError={props.isError}
            isNeutral={props.isNeutral}
        >
            { props.icon ? <FontAwesomeIcon icon={props.icon} /> : null }
            <span>{ props.label }</span>
        </TagOuter>
    )
}