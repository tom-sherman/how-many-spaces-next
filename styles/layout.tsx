import styled from 'styled-components';

export const SiteWidth = styled.div`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
`

export const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 20px;
    width: 100%;
`

export const PageBody = styled.div`
  position: relative;
  flex-grow: 1;
`;