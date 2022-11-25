import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const Item = styled.div`
    display: flex;
    color: var(--colour-grey);
    margin-right: 20px;
    font-weight: 500;
`

const Icon = styled.div`
    margin-right: 8px;
`

type MetaItemProps = {
    label: string,
    icon: IconProp
}

export default function MetaItem(props: MetaItemProps) {
    return (
        <Item>
            <Icon>
                <FontAwesomeIcon icon={props.icon} />
            </Icon>
            <span>{ props.label }</span>
        </Item>
    )
}