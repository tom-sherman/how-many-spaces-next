import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --colour-black: #1B1A1A;
        --colour-blue: #383DFA;
        --colour-blue--dark: #0A0450;
        --colour-blue--lightest: #F5F4FE;
        --colour-green: #58AE44;
        --colour-green--light: #7DCE6A;
        --colour-orange: #CD8338;
        --colour-orange--light: #E3AB6E;
        --colour-red: #CD3838;
        --colour-red--light: #E57979;
        --colour-grey: #686868;
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
        font-family: 'Secular One', sans-serif;
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