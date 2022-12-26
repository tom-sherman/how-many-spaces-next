import { useAppContext } from "@/context/app"
import BreakpointValues from "@/styles/breakpoints"
import { ButtonNavItem, Nav, NavItem } from "@/styles/components/Navigation"
import { SiteWidth } from "@/styles/layout"
import Link from "next/link"
import styled from "styled-components"

const Outer = styled.footer`
    padding: 46px 20px;
    background-color: var(--colour-blue--dark);
    color: white;
`

const Inner = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: ${BreakpointValues.tl}) {
        flex-direction: row;
        justify-content: space-between;
    }
`

const Copyright = styled.p`
    margin-top: 20px;
    font-size: 13px;

    span:not(:last-child) {
        &::after {
            margin: 0 10px;
            font-size: 10px;
            content: "|";
        }
    }

    a {
        text-decoration: underline;

        &:hover {
            text-decoration: none;
        }
    }
`

const Left = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: ${BreakpointValues.tl}) {
        width: 50%;
    }
`

const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 14px;
    font-size: 13px;
    
    @media (min-width: ${BreakpointValues.tl}) {
        width: 40%;
        margin-top: 0;
        padding-left: 10px;
        text-align: right;
    }

    a {
        text-decoration: underline;

        &:hover {
            text-decoration: none;
        }
    }
`

const FooterNav = styled(Nav)`
    margin: 0 0 30px;
    flex-wrap: wrap;
    font-size: 20px;
`

export default function Footer() {
    const time = new Date();

    const context = useAppContext();

    return (
        <Outer>
            <SiteWidth>
                <Inner>
                    <Left>
                        <FooterNav>
                            <NavItem>
                                <Link href="/about">About</Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/sponsor">Sponsor</Link>
                            </NavItem>
                            <ButtonNavItem>
                                <a href="#report-an-issue" onClick={() => context.setIssueModalOpen(true)}>Report an issue</a>
                            </ButtonNavItem>
                        </FooterNav>
                        <p>Although we endeavour to keep the car park information on this website as up to date as possible, much of the data is supplied by an external source which we are not responsible for. If you see something that doesn't look right, please use the “Report an issue” form linked above.</p>
                        <Copyright>
                            <>
                                <span>&copy; {time.getFullYear()} How Many Spaces?</span>
                                <span><Link href='/privacy'>Privacy</Link></span>
                                <span><Link href='#cookies'>Manage cookies</Link></span>
                            </>
                        </Copyright>
                    </Left>
                    <Right>
                        <p>Our website uses <a href="https://usefathom.com/ref/KMHXMF" rel="noopener noreferrer" target="_blank">Fathom</a> for privacy-focused analytics.</p>
                    </Right>
                </Inner>
            </SiteWidth>
        </Outer>
    )
}