import { Columns, SiteWidth, PageBody } from '@/styles/layout';
import Header from '@/components/Core/Header/Header'
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getCarParkAvailabilitiesList, getCarParkAvailability, getCarParkDetail, getCarParkLocations } from '@/actions/car-parks';
import styled from 'styled-components';
import BreakpointValues from '@/styles/breakpoints';
import AvailabilityBar from '@/components/CarParks/Elements/AvailabilityBar';
import { Content, ContentBlock } from '@/styles/components/Content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGlobe, faLocationDot, faParking, faTicket, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CarParkAvailability, CarParkCategories, CarParkDetail, CarParkLocations, CarParkSortParameters } from '@/types/CarParks';
import Table from '@/components/Content/Table';
import ButtonStyles from "@/styles/components/Utilities/Button";
import { format } from 'date-fns';
import useCanonicalUrl from 'hooks/useCanonicalUrl';
import { NextSeo } from 'next-seo';
import useResetGlobalElements from 'hooks/useResetGlobalElements';
import Link from 'next/link';

const LOCATION = CarParkLocations.NORWICH;

const Article = styled.div`
  grid-column: 1 / 13;

  @media (min-width: ${BreakpointValues.ds}) {
    grid-column: 1 / 9;
  }
`

const Sidebar = styled.aside`
  padding: 0 20px;
  grid-column: 1 / 13;
  margin-bottom: 24px;
  
  @media (min-width: ${BreakpointValues.ds}) {
    grid-column: 9 / 13;
    margin-top: -50px;
  }
`

const SidebarInner = styled.div`
  background-color: white;
  padding: 20px;
  min-height: 100px;
  border-radius: 20px;

  p {
    margin: 0 0 10px;
  }  
`

const DirectionsButton = styled.a`
  ${ButtonStyles};
  display: block;
  margin-top: 20px;
  padding: 10px 10px 8px;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

type CarParkPageProps = {
  slug: string,
  locationSlug: string,
  details: CarParkDetail,
}

export default function CarParkPage(props: CarParkPageProps) {
  const {
    slug,
    locationSlug,
    details,
  } = props;

  useResetGlobalElements();
  const canonicalUrl = useCanonicalUrl();

  const availabilityQuery = useQuery({
    queryKey: ['car-park-availability', locationSlug, slug],
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    queryFn: () => getCarParkAvailability(slug),
  })

  return (
    <>
      <NextSeo
        canonical={canonicalUrl}
        title={`${ details.name } car park`}
        description={`See in real time how many parking spaces are available in ${ details.name } car park in Norwich`}
      />
      <Header
        h1={details.name}
        leftContent={<p>{ details.introduction }</p>}
        breadcrumb={<Link href={details.location.url || '/'}><FontAwesomeIcon icon={faArrowLeft} /> Back to all car parks</Link>}
        location={details.location}
      />
      <PageBody>
        <SiteWidth>
          <Columns>
            <Article>
              <AvailabilityBar
                data={availabilityQuery.data?.data}
              />
              <Content>
                <ContentBlock>
                  <h2><FontAwesomeIcon icon={faParking} /> How many spaces are there in {details.name} car park?</h2>
                  <p>There are { availabilityQuery.data?.data.totalSpaces } spaces, currently, <strong>{ availabilityQuery.data?.data.availableSpaces }</strong> are available.</p>
                </ContentBlock>
                {
                    details.openingHours?.table?.length ? (
                      <ContentBlock>
                        <h2><FontAwesomeIcon icon={faClock} /> When is {details.name} car park open?</h2>
                        {
                          details.openingHours?.table?.length ? (
                            <Table
                              data={details.openingHours.table}
                              leftNote={details.openingHours.note}
                              rightNote={details.openingHours.lastUpdated ? `Updated ${format(new Date(details.openingHours.lastUpdated), 'dd/MM/yy')}` : null}
                            />
                          ) : null
                        }
                      </ContentBlock>
                    ) : null
                }
                <ContentBlock>
                  {
                    details.category && details.category !== CarParkCategories.PARK_AND_RIDE ? (
                      <>
                        <h2><FontAwesomeIcon icon={faTicket} /> How much does it cost to park at {details.name}?</h2>
                        <Table
                          data={details.prices.table}
                          leftNote={details.prices.note}
                          rightNote={details.prices.lastUpdated ? `Updated ${format(new Date(details.prices.lastUpdated), 'dd/MM/yy')}` : null}
                        />
                      </>
                      ) : null
                  }
                  </ContentBlock>
              </Content>
            </Article>
            <Sidebar>
              <SidebarInner>
                {
                  details.shortAddress ? (
                    <p>
                      <FontAwesomeIcon icon={faLocationDot} /> { details.shortAddress }
                    </p>
                  ) : null
                }
                {
                  details.websiteUrl ? (
                    <p>
                      <FontAwesomeIcon icon={faGlobe} /> <a href={details.websiteUrl} target="_blank" rel="noreferrer">Website</a>
                    </p>
                  ) : null
                }
                {
                  details.directionsUrl ? (
                    <p>
                      <DirectionsButton href={details.directionsUrl} target="_blank" rel="noreferrer">
                        Get directions
                      </DirectionsButton>
                    </p>
                  ) : null
                }
              </SidebarInner>
            </Sidebar>
          </Columns>
        </SiteWidth>
      </PageBody>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const locationSlug = params?.location;
  const slug = params?.slug;

  const notFound = [locationSlug, slug].some((item: any) => {
    return !item || Array.isArray(item);
  });

  if (notFound) {
    return {
      notFound: true
    }
  }

  try {
    const [detailResponse, availabilityResponse] = await Promise.all([
      getCarParkDetail(String(slug)),
      getCarParkAvailability(String(slug)),
    ]);

    queryClient.setQueryData(['car-park-availability', locationSlug, slug], availabilityResponse);

    const details = detailResponse.data;
  
    return {
      props: {
        details,
        locationSlug,
        slug,
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 60,
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

  const locations = await getCarParkLocations();
  const carParkRequests = locations
    .data
    .map(locationResponse => getCarParkAvailabilitiesList(locationResponse.slug, CarParkCategories.ALL, CarParkSortParameters.SPACES_DESC));

  const allCarParks = await Promise.all(carParkRequests);

  const paths = allCarParks.reduce((allCarParkPaths: any, response) => {
    const carParkPaths = response.data.map(carPark => ({ params: { location: carPark.location.slug, slug: carPark.slug } }));
    return [...allCarParkPaths, ...carParkPaths];
  }, []); 

  return {
    paths,
    fallback: false,
  }
}