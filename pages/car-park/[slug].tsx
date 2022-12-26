import { Columns, SiteWidth, PageBody } from '@/styles/layout';
import Header from '@/components/Core/Header/Header'
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getCarParkMeta } from '@/actions/car-parks';

type CarParkPageProps = {
  slug: string
}

export default function CarParkPage(props: CarParkPageProps) {

  const metaQuery = useQuery({
    queryKey: ['car-park', props.slug],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: () => getCarParkMeta(props.slug),
  });

  return (
    <>
      <Head>
        <title>Live car parking information for Norwich | How Many Spaces?</title>
        <meta name="description" content="See in real time how many parking spaces are available in the car parks and park and ride sites around Norwich, Norfolk." />
      </Head>
      <Header
        h1={metaQuery.data?.data.name}
        leftContent={<p>See the number of available car park spaces in a number of car parks around Norwich. Spaces are refreshed every 5 minutes to show you the most up to date parking information.</p>}
      />
      <PageBody>
        <SiteWidth>
            <Columns>
            
            </Columns>
        </SiteWidth>
      </PageBody>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['car-park', params?.slug],
    () => getCarParkMeta(String(params?.slug)),
  );

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, state-while-revalidate=60'
  );

  return {
    props: {
      slug: String(params?.slug),
      dehydratedState: dehydrate(queryClient),
    },
  }
}