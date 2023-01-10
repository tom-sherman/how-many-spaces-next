import { Columns, SiteWidth, PageBody } from '@/styles/layout';
import Header from '@/components/Core/Header/Header'
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getCarParkAvailabilitiesList, getCarParkAvailability, getCarParkDetail } from '@/actions/car-parks';
import styled from 'styled-components';
import BreakpointValues from '@/styles/breakpoints';
import AvailabilityBar from '@/components/CarParks/Elements/AvailabilityBar';
import { Content, ContentBlock } from '@/styles/components/Content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGlobe, faLocationDot, faParking, faTicket, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CarParkAvailability, CarParkCategories, CarParkLocations, CarParkSortParameters } from '@/types/CarParks';
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
  slug: string
}

export default function CarParkPage(props: CarParkPageProps) {

  useResetGlobalElements();
  const canonicalUrl = useCanonicalUrl();

  const detailQuery = useQuery({
    queryKey: ['car-park-detail', props.slug],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: () => getCarParkDetail(props.slug),
  });

  const availabilityQuery = useQuery({
    queryKey: ['car-park-availability', props.slug],
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
    queryFn: () => getCarParkAvailability(props.slug),
  })

  return (
    <>
      <NextSeo
        canonical={canonicalUrl}
        title={`${ detailQuery.data?.data.name } car park`}
        description={`See in real time how many parking spaces are available in ${ detailQuery.data?.data.name } car park in Norwich`}
      />
      <Header
        h1={detailQuery.data?.data.name}
        leftContent={<p>{ detailQuery.data?.data.introduction }</p>}
        breadcrumb={<Link href="/"><FontAwesomeIcon icon={faArrowLeft} /> Back to all car parks</Link>}
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
                  <h2><FontAwesomeIcon icon={faParking} /> How many spaces are there in {detailQuery.data?.data.name} car park?</h2>
                  <p>There are { availabilityQuery.data?.data.totalSpaces } spaces, currently, <strong>{ availabilityQuery.data?.data.availableSpaces }</strong> are available.</p>
                </ContentBlock>
                {
                    detailQuery.data?.data.openingHours?.table?.length ? (
                      <ContentBlock>
                        <h2><FontAwesomeIcon icon={faClock} /> When is {detailQuery.data?.data.name} car park open?</h2>
                        {
                          detailQuery.data?.data.openingHours?.table?.length ? (
                            <Table
                              data={detailQuery.data.data.openingHours.table}
                              leftNote={detailQuery.data.data.openingHours.note}
                              rightNote={detailQuery.data.data.openingHours.lastUpdated ? `Updated ${format(new Date(detailQuery.data.data.openingHours.lastUpdated), 'dd/MM/yy')}` : null}
                            />
                          ) : null
                        }
                      </ContentBlock>
                    ) : null
                }
                <ContentBlock>
                  {
                    detailQuery.data?.data.category && detailQuery.data?.data.category !== CarParkCategories.PARK_AND_RIDE ? (
                      <>
                        <h2><FontAwesomeIcon icon={faTicket} /> How much does it cost to park at {detailQuery.data?.data.name}?</h2>
                        <Table
                          data={detailQuery.data.data.prices.table}
                          leftNote={detailQuery.data.data.prices.note}
                          rightNote={detailQuery.data.data.prices.lastUpdated ? `Updated ${format(new Date(detailQuery.data.data.prices.lastUpdated), 'dd/MM/yy')}` : null}
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
                  detailQuery.data?.data.shortAddress ? (
                    <p>
                      <FontAwesomeIcon icon={faLocationDot} /> { detailQuery.data?.data.shortAddress }
                    </p>
                  ) : null
                }
                {
                  detailQuery.data?.data.websiteUrl ? (
                    <p>
                      <FontAwesomeIcon icon={faGlobe} /> <a href={detailQuery.data?.data.websiteUrl} target="_blank" rel="noreferrer">Website</a>
                    </p>
                  ) : null
                }
                {
                  detailQuery.data?.data.directionsUrl ? (
                    <p>
                      <DirectionsButton href={detailQuery.data?.data.directionsUrl} target="_blank" rel="noreferrer">
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

  try {
    const [detailResponse, availabilityResponse] = await Promise.all([
      getCarParkDetail(String(params?.slug)),
      getCarParkAvailability(String(params?.slug)),
    ]);

    queryClient.setQueryData(['car-park-detail', params?.slug], detailResponse);
    queryClient.setQueryData(['car-park-availability', params?.slug], availabilityResponse);
  
    return {
      props: {
        slug: String(params?.slug),
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
  const carParks = await getCarParkAvailabilitiesList(LOCATION, CarParkCategories.CAR_PARK, CarParkSortParameters.SPACES_DESC);

  const paths = carParks.data.map((carPark: CarParkAvailability) => {
    return { params: { slug: carPark.slug } }
  });

  return {
    paths,
    fallback: false,
  }
}