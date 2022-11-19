import styled from 'styled-components';

const Nav = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
    list-style-type: none;
`

type NavItemProps = {
    largeGap?: boolean,
}

const NavItem = styled.li<NavItemProps>`
    &:not(:last-child) {
        margin-right: ${ props => props.largeGap ? '32px' : '20px' }
    }

    a {
        color: white;
        font-weight: 600;
        white-space: nowrap;

        &:hover {
            text-decoration: underline;
        }
    }
`

const ButtonNavItem = styled(NavItem)`
    a {
        background-color: var(--colour-blue);
        padding: 5px 15px 3px;
        border-radius: 200px;
    }
`

export {
    Nav,
    NavItem,
    ButtonNavItem,
}