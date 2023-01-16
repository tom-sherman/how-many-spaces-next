import styled from "styled-components"
import { SiteWidth } from "@/styles/layout";
import breakpoints from "@/styles/breakpoints";
import Link from "next/link";
import OffCanvas from "../Navigation/OffCanvas";
import { useAppContext } from "@/context/app";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonNavItem, Nav, NavItem } from "@/styles/components/Navigation";
import Image from "next/image";

const Outer = styled.div`
    position: relative;
    padding: 25px 20px;
    width: 100%;
    border-top: 3px solid var(--colour-blue);
    background: linear-gradient(45deg, var(--colour-blue), var(--colour-blue--dark));
    overflow: hidden;

    @media (min-width: ${breakpoints.tl}) {
        padding: 36px 20px 80px;
        min-height: 300px;
    }

    &::before {
        position: absolute;
        bottom: 100%;
        right: 20%;
        width: 10000px;
        height: 10000px;
        transform: rotate(-20deg);
        transform-origin: 100% 100%;
        background-color: rgba(255, 255, 255, .03);
        content: "";
        z-index: 0;
    }
    
    &::after {
        position: absolute;
        top: 100%;
        right: 40%;
        width: 10000px;
        height: 10000px;
        transform: rotate(60deg);
        transform-origin: 100% 0;
        background-color: rgba(255, 255, 255, .03);
        content: "";
        z-index: 0;
    }
`;

const Inner = styled.div`
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 20px;
    
`

const Top = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column: 1 / 13;
    margin: 0 0 20px;

    @media (min-width: ${breakpoints.tl}) {
        margin: 0 0 36px;
    }
`

const TopLeft = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 1 / 10;

    @media (min-width: ${breakpoints.ts}) {
        grid-column: 1 / 6;
    }

    @media (min-width: ${breakpoints.ds}) {
        flex-direction: row;
        align-items: flex-end;
    }
`

const TopRight = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    grid-column: 10 / 13;

    @media (min-width: ${breakpoints.ts}) {
        grid-column: 6 / 13;
    }
`

const Left = styled.div`
    display: block;
    grid-column: 1 / 13;

    * {
        color: white;
    }

    p {
        font-size: 16px;
    }

    @media (min-width: ${breakpoints.tl}) {
        margin-bottom: 16px;
        grid-column: 1 / 9;

        p {
            font-size: 20px;
        }
    }

    @media (min-width: ${breakpoints.ds}) {
        grid-column: 1 / 7;
    }
`

const Logo = styled.figure`
    position: relative;
    width: 240px;

    @media (min-width: ${breakpoints.ts}) {
        width: 320px;
    }
    
    @media (min-width: ${breakpoints.ds}) {
        width: 350px;
    }
    
    @media (min-width: ${breakpoints.dl}) {
        width: 380px;
    }

    img {
        max-width: 100%;
        height: auto;
    }
`

const LogoLocation = styled.span`
    display: block;
    color: white;
    margin-top: -8px;
    font-size: 14px;
    font-weight: 200;

    @media (min-width: ${breakpoints.ts}) {
        font-size: 22px;
    }
    
    @media (min-width: ${breakpoints.tl}) {
        font-size: 22px;
    }

    @media (min-width: ${breakpoints.ds}) {
        margin: 0 16px 8px;
    }
`

const OffCanvasTrigger = styled.button`
    color: white;
    font-size: 25px;
    margin-right: 10px;
    cursor: pointer;

    @media (min-width: ${breakpoints.tl}) {
        display: none;
    }
`

const DesktopNav = styled(Nav)`
    display: none;
    font-size: 16px;

    @media (min-width: ${breakpoints.tl}) {
        display: flex;
    }

    @media (min-width: ${breakpoints.ds}) {
        padding-top: 8px;
        font-size: 20px;
    }
`

const Breadcrumb = styled.div`
    margin: 0 0 16px;

    a {
        &:hover {
            text-decoration: underline;
        }
    }
`

type HeaderProps = {
    h1?: string,
    leftContent: React.ReactNode,
    breadcrumb?: React.ReactNode,
}

export default function Header(props: HeaderProps) {
    const {
        h1,
        leftContent,
        breadcrumb,
    } = props;

    const context = useAppContext();

    return (
        <Outer>
            <SiteWidth>
                <Inner>
                    <Top>
                        <TopLeft>
                            <Logo>
                                <Link href="/">
                                    <Image
                                        src='/branding/logo.svg'
                                        alt="How Many Spaces? logo"
                                        width={380}
                                        height={44}
                                    />
                                </Link>
                            </Logo>
                            <LogoLocation>Norwich</LogoLocation>
                        </TopLeft>
                        <TopRight>
                            <OffCanvasTrigger onClick={() => context.setOffCanvasOpen(true)} aria-label="Open off-canvas menu">
                                <FontAwesomeIcon icon={faBars} />
                            </OffCanvasTrigger>
                            <OffCanvas />
                            <nav>
                                <DesktopNav>
                                    <NavItem>
                                        <Link href="/">Home</Link>
                                    </NavItem>
                                    <ButtonNavItem largeGap>
                                        <a href="mailto:howmanyspaces@andrewhaine.co.uk">Report an issue</a>
                                    </ButtonNavItem>
                                </DesktopNav>
                            </nav>
                        </TopRight>
                    </Top>
                    <Left>
                        {
                            breadcrumb ? <Breadcrumb>{ breadcrumb }</Breadcrumb> : null
                        }
                        {
                            h1 ? <h1>{h1}</h1> : null
                        }
                        { leftContent }
                    </Left>
                </Inner>
            </SiteWidth>
        </Outer>
    )
}