import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import styled from 'styled-components'

const Container = styled.div`
    display: block;
    background-color: var(--colour-red--light);
    border-left: 5px solid var(--colour-red);
    padding: 20px;
`

const Title = styled.h2`
    font-size: 1.125rem;
    margin: 0 0 3px;
    font-weight: bold;
`

type ErrorBannerProps = {
    title: string,
    message: string,
}

export default function ErrorBanner(props: ErrorBannerProps) {
    return (
        <Container>
            <Title><FontAwesomeIcon icon={ faWarning } /> { props.title }</Title>
            <ReactMarkdown>{ props.message }</ReactMarkdown>
        </Container>
    )
}