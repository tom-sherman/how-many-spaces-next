import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import GlobalStyle from '@/styles/global';
import Footer from '@/components/Core/Footer/Footer';
import { AppWrapper } from '@/context/app';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

if (process.env.NEXT_PUBLIC_API_MOCKING_ENABLED === 'true') {
  require('../mocks');
}

config.autoAddCss = false;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppWrapper>
          <GlobalStyle />
          <PageContainer>
              <Component {...pageProps} />
            <Footer />
          </PageContainer>
        </AppWrapper>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
