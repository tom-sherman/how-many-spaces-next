import { createGlobalStyle } from "styled-components";
import BreakpointValues from "./breakpoints";

const GlobalStyle = createGlobalStyle`
    :root {
        --colour-black: #1B1A1A;
        --colour-blue: #383DFA;
        --colour-blue--dark: #0A0450;
        --colour-blue--lightest: #F5F4FE;
        --colour-green: #3B8433;
        --colour-green--light: #8fec7a;
        --colour-green--lightest: #cef7c5;
        --colour-orange: #A36629;
        --colour-orange--light: #f3bd84;
        --colour-orange--lightest: #F4E6D6;
        --colour-red: #a42b2b;
        --colour-red--light: #f7b4b4;
        --colour-red--lightest: #FFD1D1;
        --colour-grey: #686868;
        --colour-grey--light: #E5E2E2;
        --colour-grey--lighter: #DBDBDB;
        --colour-grey--lightest: #FAFAFA;

    }

    /*
        Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
        - The "symbol *" part is to solve Firefox SVG sprite bug
    */
    *:where(:not(html, iframe, canvas, img, svg, video):not(svg *, symbol *)) {
        all: unset;
        display: revert;
    }

    /* Preferred box-sizing value */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* Reapply the pointer cursor for anchor tags */
    a, button {
        cursor: revert;
    }

    /* Remove list styles (bullets/numbers) */
    ol, ul, menu {
        list-style: none;
    }

    h1 {
        font-size: 2rem;
        font-family: 'Secular One', sans-serif;

        @media (min-width: ${BreakpointValues.tl}) {
            font-size: 3rem;
        }

        @media (min-width: ${BreakpointValues.ds}) {
            font-size: 3.5rem;
        }
    }

    h2 {
        font-weight: 600;
        font-size: 1.3rem;
        color: var(--colour-black);
        line-height: 1.1;
        margin: 0 0 6px;

        @media (min-width: ${BreakpointValues.tl}) {
            font-size: 1.6rem;
        }
    }

    /* For images to not be able to exceed their container */
    img {
        max-width: 100%;
    }

    /* removes spacing between cells in tables */
    table {
        border-collapse: collapse;
    }

    /* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
    input, textarea {
        -webkit-user-select: auto;
    }

    /* revert the 'white-space' property for textarea elements on Safari */
    textarea {
        white-space: revert;
    }

    /* minimum style to allow to style meter element */
    meter {
        -webkit-appearance: revert;
        appearance: revert;
    }

    strong {
        font-weight: bold;
    }

    p {
        a {
            text-decoration: underline;

            &:hover {
                text-decoration: none;
            }
        }
    }

    /* reset default text opacity of input placeholder */
    ::placeholder {
        color: unset;
    }

    /* fix the feature of 'hidden' attribute.
    display:revert; revert to element instead of attribute */
    :where([hidden]) {
        display: none;
    }

    /* revert for bug in Chromium browsers
    - fix for the content editable attribute will work properly.
    - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element*/
    :where([contenteditable]:not([contenteditable="false"])) {
        -moz-user-modify: read-write;
        -webkit-user-modify: read-write;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;
        -webkit-user-select: auto;
    }

    /* apply back the draggable feature - exist only in Chromium and Safari */
    :where([draggable="true"]) {
        -webkit-user-drag: element;
    }

    body {
        font-family: "Overpass", sans-serif;
        font-size: 16px;
        color: var(--colour-black);
        background-color: var(--colour-blue--lightest);
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }
`;

export default GlobalStyle;