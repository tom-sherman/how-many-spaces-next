import { GetServerSideProps } from "next";
import { getServerSideSitemapIndex } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return getServerSideSitemapIndex(ctx, [
        `${process.env.NEXT_PUBLIC_URL}/sitemaps/car-parks.xml`,
        `${process.env.NEXT_PUBLIC_URL}/sitemaps/locations.xml`,
    ])
}

export default function SitemapIndex() {};