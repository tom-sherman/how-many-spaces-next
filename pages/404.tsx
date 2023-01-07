import Header from '@/components/Core/Header/Header'
import { Columns, PageBody, SiteWidth } from '@/styles/layout';
import useResetGlobalElements from 'hooks/useResetGlobalElements';
import Link from 'next/link';

export default function NotFound() {
  useResetGlobalElements();

  return (
    <>
      <Header
        h1='404 - Page not found'
        leftContent={<p>Sorry! This page does not exist (or has moved), please return to the <Link href="/">car park list</Link>.</p>}
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