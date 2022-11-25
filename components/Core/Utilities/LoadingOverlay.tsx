import styled from 'styled-components'
import Loader from './Loader'

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,.5);
    z-index: 10;
    backdrop-filter: blur(5px);
`

const Inner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transform: translate(-50%, -50%);
`

const LoaderContainer = styled.div`
    width: 40px;
    height: 40px;
`

const Message = styled.span`
    display: block;
    margin: 10px 0 0;
`

type LoadingOverlayProps = {
    message?: string
}

export default function LoadingOverlay(props: LoadingOverlayProps) {
    return (
        <Container>
            <Inner>
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
                {
                    props.message ? <Message>{ props.message }</Message> : null
                }
            </Inner>
        </Container>
    )
}