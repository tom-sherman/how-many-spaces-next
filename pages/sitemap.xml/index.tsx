import { GetServerSideProps } from "next";
import { getCarParkAvailabilitiesList } from "@/actions/car-parks";
import { CarParkCategories, CarParkSortParameters } from "@/types/CarParks";
import { ISitemapField, getServerSideSitemap } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async ctx => {
    try {
        const { data } = await getCarParkAvailabilitiesList('norwich', CarParkCategories.ALL, CarParkSortParameters.SPACES_DESC);

        const carParkUrls: ISitemapField[] = data.map(value => {
            return {
                loc: `${process.env.NEXT_PUBLIC_URL}${value.url}`,
                lastmod: new Date().toISOString(),
                changefreq: 'always',
                priority: 0.9
            }
        });

        const homepageUrl: ISitemapField = {
            loc: `${process.env.NEXT_PUBLIC_URL}`,
            lastmod: new Date().toISOString(),
            changefreq: 'always',
            priority: 1.0
        };

        const fields: ISitemapField[] = [
            homepageUrl,
            ...carParkUrls,
        ];

        return getServerSideSitemap(ctx, fields);

    } catch (e) {
        return {
            notFound: true,
        }
    }
}

export default function Sitemap() {};