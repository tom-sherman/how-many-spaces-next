import { useRouter } from "next/router";

export default function useCanonicalUrl(): string {
    const router = useRouter();
    const canonicalUrl = (process.env.NEXT_PUBLIC_URL + (router.asPath === "/" ? "": router.asPath)).split("?")[0];
    return canonicalUrl;
}