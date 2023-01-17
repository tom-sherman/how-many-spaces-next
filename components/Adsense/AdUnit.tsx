import { useEffect } from "react"
import styled from "styled-components";

type AdUnitProps = {
    format: 'fluid',
    layoutKey: string,
    slot: string,
}

const AdUnitContainer = styled.div`
    min-height: 150px;
    min-width: 300px;
    background-color: var(--colour-grey--lightest);
    border: 1px solid var(--colour-grey--light);
    margin: 20px auto;
`

export default function AdUnit(props: AdUnitProps) {
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <AdUnitContainer aria-hidden={true}>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-format={props.format}
                data-ad-layout-key={props.layoutKey}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
                data-ad-slot={props.slot}
            />
        </AdUnitContainer>
    )
}