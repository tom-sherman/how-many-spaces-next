import { getCarParkAvailabilitiesList } from '@/actions/car-parks';
import CarParkAvailabilitiesList from '@/components/CarParks/List/CarParkAvailabilitiesList';
import ErrorBanner from '@/components/Core/Errors/ErrorBanner';
import Header from '@/components/Core/Header/Header'
import LoadingOverlay from '@/components/Core/Utilities/LoadingOverlay';
import BreakpointValues from '@/styles/breakpoints';
import { Columns, PageBody, SiteWidth } from '@/styles/layout';
import { CarParkCategories, CarParkLocations, CarParkSortParameters } from '@/types/CarParks';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const LOCATION = CarParkLocations.NORWICH;

const HomepageBody = styled.div`
  display: block;
  padding: 0 20px;
  margin-top: 20px;

  @media (min-width: ${BreakpointValues.tl}) {
    margin-top: -70px;
  }
`

const CarParkListOuter = styled.div`
  position: relative;
  background-color: white;
  grid-column: 1 / 13;
  padding: 20px;
  border-radius: 15px;
  min-height: 500px;
  margin-bottom: 20px;
  overflow: hidden;

  @media (min-width: ${BreakpointValues.ds}) {
      grid-column: 1 / 9;
  }
`

const SidebarOuter = styled.div`
  position: relative;
  background-color: white;
  grid-column: 1 / 13;
  padding: 20px;
  border-radius: 15px;
  min-height: 500px;
  margin-bottom: 20px;
  overflow: hidden;

  @media (min-width: ${BreakpointValues.ds}) {
      grid-column: 9 / 13;
  }
`

const Sponsor = styled.div`
  background-color: var(--colour-blue--lightest);
  padding: 16px 20px;
  border-radius: 12px;
  margin-top: 2px;
`

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CarParkCategories>(CarParkCategories.CAR_PARK);
  const [selectedSort, setSelectedSort] = useState<CarParkSortParameters>(CarParkSortParameters.SPACES_DESC);

  const listQuery = useQuery({
    queryKey: ['car-park-list', LOCATION, selectedCategory, selectedSort],
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: () => getCarParkAvailabilitiesList(LOCATION, selectedCategory, selectedSort),
  });

  return (
    <>
      <Head>
        <title>Live car parking information for Norwich | How Many Spaces?</title>
        <meta name="description" content="See in real time how many parking spaces are available in the car parks and park and ride sites around Norwich, Norfolk." />
      </Head>
      <Header
        leftContent={<p>See the number of available car park spaces in a number of car parks around Norwich. Spaces are refreshed every 5 minutes to show you the most up to date parking information.</p>}
      />
      <PageBody>
          <HomepageBody>
            <SiteWidth>
              <Columns>
                <CarParkListOuter>
                  { listQuery.isLoading ? <LoadingOverlay message='Refreshing car park data' /> : null }
                  {
                    listQuery.isError ? (
                      <ErrorBanner title='Unable to fetch car parks' message='Unfortunately we encountered an issue fetching the car parks in this city, please check back shortly. If the problem persists please use the **Report an issue** link to get in touch with us.' />
                    ) : (
                      listQuery.data ? <CarParkAvailabilitiesList data={listQuery.data} onCategoryChange={setSelectedCategory} onSortChange={setSelectedSort} /> : null
                    )
                  }
                </CarParkListOuter>
                <SidebarOuter>
                  <Sponsor>
                    <h2>Sponsor this page</h2>
                    <p>Are you interested in placing an ad or logo on this page? <a href="mailto:howmanyspaces@andrewhaine.co.uk">Email us</a> to find out more.</p>
                  </Sponsor>
                </SidebarOuter>
              </Columns>
            </SiteWidth>
          </HomepageBody>
      </PageBody>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['car-park-list', LOCATION, CarParkCategories.CAR_PARK, CarParkSortParameters.SPACES_DESC],
    () => getCarParkAvailabilitiesList(LOCATION, CarParkCategories.CAR_PARK, CarParkSortParameters.SPACES_DESC)
  );

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, state-while-revalidate=60'
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}