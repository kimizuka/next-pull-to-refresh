import 'reset-css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { StyledComponentsRegistry } from '@/app/styling/StyledComponentsRegistry';

const noto = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Pull to Refresh',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={ noto.className }>
        <StyledComponentsRegistry>{ children }</StyledComponentsRegistry>
      </body>
    </html>
  )
}
