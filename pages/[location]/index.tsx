import { getCarParkAvailabilitiesList, getCarParkLocations } from '@/actions/car-parks';
import AdUnit from '@/components/Adsense/AdUnit';
import CarParkAvailabilitiesList from '@/components/CarParks/List/CarParkAvailabilitiesList';
import ErrorBanner from '@/components/Core/Errors/ErrorBanner';
import Header from '@/components/Core/Header/Header'
import LoadingOverlay from '@/components/Core/Utilities/LoadingOverlay';
import BreakpointValues from '@/styles/breakpoints';
import { Columns, PageBody, SiteWidth } from '@/styles/layout';
import { CarParkCategories, CarParkLocation, CarParkLocations, CarParkSortParameters } from '@/types/CarParks';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import useCanonicalUrl from 'hooks/useCanonicalUrl';
import useResetGlobalElements from 'hooks/useResetGlobalElements';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import styled from 'styled-components';

const HomepageBody = styled.div`
  display: block;
  
  @media (min-width: ${BreakpointValues.ts}) {
    margin-top: 20px;
  }

  @media (min-width: ${BreakpointValues.tl}) {
    margin-top: -70px;
  }
`

const CarParkListOuter = styled.div`
  position: relative;
  background-color: white;
  grid-column: 1 / 13;
  padding: 20px;
  min-height: 500px;
  margin-left: -20px;
  width: calc(100% + 40px);
  margin-bottom: 20px;
  overflow: hidden;

  @media (min-width: ${BreakpointValues.ts}) {
    border-radius: 15px;
    width: unset;
    margin-left: 0;
  }

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

type LocationPageProps = {
    slug: string,
}

export default function Location(props: LocationPageProps) {
    const {
        slug
    } = props;

    const [selectedCategory, setSelectedCategory] = useState<CarParkCategories>(CarParkCategories.CAR_PARK);
    const [selectedSort, setSelectedSort] = useState<CarParkSortParameters>(CarParkSortParameters.SPACES_DESC);

    const canonicalUrl = useCanonicalUrl();

    useResetGlobalElements();

    const listQuery = useQuery({
        queryKey: ['car-park-list', slug, selectedCategory, selectedSort],
        refetchInterval: 60000,
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        queryFn: () => getCarParkAvailabilitiesList(slug, selectedCategory, selectedSort),
    });

    return (
    <>
        <NextSeo canonical={canonicalUrl} />
        <Header
            h1={`Live car parking spaces in Norwich`}
            leftContent={<p>See how many spaces are available in a number of car parks and park & ride sites around Norwich. Spaces are refreshed every 5 minutes to show you the most up to date parking information.</p>}
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
                    <AdUnit
                        format='fluid'
                        layoutKey=''
                        slot="7610642530"
                    />
                </SidebarOuter>
                </Columns>
            </SiteWidth>
            </HomepageBody>
        </PageBody>
    </>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.location;
    const queryClient = new QueryClient();

    if (!slug || Array.isArray(slug)) {
        return {
            notFound: true,
        }
    }

    await queryClient.prefetchQuery(
        ['car-park-list', slug, CarParkCategories.CAR_PARK, CarParkSortParameters.SPACES_DESC],
        () => getCarParkAvailabilitiesList(slug, CarParkCategories.CAR_PARK, CarParkSortParameters.SPACES_DESC)
    );

    return {
        props: {
            slug: slug,
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const locations = await getCarParkLocations();

    const paths = locations.data.map((location: CarParkLocation) => {
        return { params: { location: location.slug } }
    });

    return {
        paths,
        fallback: false,
    }
}