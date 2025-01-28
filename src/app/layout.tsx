import { ReactNode, Suspense } from 'react';
import type { Metadata } from 'next';
import { PT_Sans, Bebas_Neue } from 'next/font/google';
import '@/styles/global.scss';

const ptSans = PT_Sans({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-pt-sans',
});

const bebasNeue = Bebas_Neue({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-pt-sans',
});

export const metadata: Metadata = {
	title: 'Only',
	description: 'Historical event',
};

interface IRootLayout {
	children: ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayout>) {
	return (
		<html lang="en">
		<body className={`${bebasNeue.className} ${ptSans.className}`}>
		<Suspense>
			{children}
		</Suspense>
		</body>
		</html>
	);
}