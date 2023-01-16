import { useAppContext } from '@/context/app';
import { ButtonNavItem, Nav, NavItem } from '@/styles/components/Navigation';
import { faClose, faCross } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styled from 'styled-components';

type OffCanvasContainerProps = {
    isOpen: boolean,
}

const OffCanvasContainer = styled.nav<OffCanvasContainerProps>`
    position: fixed;
    top: 0;
    left: ${props => props.isOpen ? '0' : '100%'};
    width: 100vw;
    height: 100vh;
    padding: 40px;
    background-color: var(--colour-blue--dark);
`;

const OffCanvasNav = styled(Nav)`
    flex-direction: column !important;
    font-size: 24px;
`

const OffCanvasNavItem = styled(NavItem)`
    margin: 0 0 20px;
`

const OffCanvasClose = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .4);
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 25px;
    cursor: pointer;
`

export default function OffCanvas() {
    const context = useAppContext();

    const handleReportButtonClick = () => {
        context.setOffCanvasOpen(false);
        context.setIssueModalOpen(true);
    }

    return (
        <OffCanvasContainer isOpen={context.offCanvasOpen}>
            <OffCanvasClose onClick={() => { context.setOffCanvasOpen(false) }} aria-label="Close off-canvas menu">
                <FontAwesomeIcon icon={faClose} />
            </OffCanvasClose>
            <OffCanvasNav>
                <OffCanvasNavItem>
                    <Link href="/">Home</Link>
                </OffCanvasNavItem>
                <ButtonNavItem>
                    <a href="#report-an-issue" onClick={handleReportButtonClick}>Report an issue</a>
                </ButtonNavItem>
            </OffCanvasNav>
        </OffCanvasContainer>
    )
}