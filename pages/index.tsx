import { getCarParkList } from '@/actions/car-parks';
import CarParkList from '@/components/CarParks/List/CarParkList';
import Header from '@/components/Core/Header/Header'
import BreakpointValues from '@/styles/breakpoints';
import { Columns, SiteWidth } from '@/styles/layout';
import { ListResponse } from '@/types/API';
import { CarParkCategories, CarParkLocations, CarParkSortParameters } from '@/types/CarParks';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Head from 'next/head'
import { useState } from 'react';
import styled from 'styled-components';

const LOCATION = CarParkLocations.NORWICH;

const PageBody = styled.div`
  position: relative;
  z-index: 1;
  flex-grow: 1;
`;

const HomepageBody = styled.div`
  display: block;
  padding: 0 20px;
  margin-top: 20px;

  @media (min-width: ${BreakpointValues.tl}) {
    margin-top: -70px;
  }
`

const CarParkListOuter = styled.div`
    background-color: white;
    grid-column: 1 / 13;
    padding: 20px;
    border-radius: 15px;

    @media (min-width: ${BreakpointValues.tl}) {
        padding: 24px 20px;
        grid-column: 1 / 9;
    }
`

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CarParkCategories>(CarParkCategories.ALL);
  const [selectedSort, setSelectedSort] = useState<CarParkSortParameters>(CarParkSortParameters.SPACES_DESC);

  const listQuery = useQuery({
    queryKey: ['car-park-list', LOCATION, selectedCategory],
    refetchInterval: 60000,
    queryFn: () => getCarParkList(LOCATION, selectedCategory, selectedSort),
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
                  {
                    listQuery.isSuccess ? (
                      <CarParkList data={listQuery.data} onCategoryChange={setSelectedCategory} />
                    ) : null
                  }
                </CarParkListOuter>
              </Columns>
            </SiteWidth>
          </HomepageBody>
      </PageBody>
    </>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['car-park-list', LOCATION, CarParkCategories.ALL, CarParkSortParameters.SPACES_DESC],
    () => getCarParkList(LOCATION, CarParkCategories.ALL, CarParkSortParameters.SPACES_DESC)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}