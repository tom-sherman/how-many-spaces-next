import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import GlobalStyle from '@/styles/global';
import Footer from '@/components/Core/Footer/Footer';
import { AppWrapper } from '@/context/app';
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import { NEXT_SEO_DEFAULT } from 'next-seo.config';
import * as Fathom from 'fathom-client';
import { useRouter } from 'next/router';
import Script from 'next/script';

if (process.env.NEXT_PUBLIC_API_MOCKING_ENABLED === 'true') {
  require('../mocks');
}

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

config.autoAddCss = false;


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();

  // Track pageviews with Fathom analytics
  useEffect(() => {
    Fathom.load('WEVZQKWO', {
      includedDomains: ['howmanyspaces.com'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppWrapper>
          <GlobalStyle />
          <PageContainer>
              <DefaultSeo {...NEXT_SEO_DEFAULT} />
              {
                ADSENSE_CLIENT_ID ? (
                  <Script
                    id="Adsense-id"
                    crossOrigin='anonymous'
                    strategy='afterInteractive'
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
                  />
                ) : null
              }
              <Component {...pageProps} />
            <Footer />
          </PageContainer>
        </AppWrapper>
      </Hydrate>
    </QueryClientProvider>
    </>
  )
}

export default MyApp
