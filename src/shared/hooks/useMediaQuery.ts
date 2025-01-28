import { useState, useEffect } from 'react';
import useEventListener from './useEventListiner';

export default function useMediaQuery(mediaQuery: number, type: 'min' | 'max') {
	const [isMatch, setIsMatch] = useState<boolean | null>(null);
	const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(null);
	useEffect(() => {
		const list = window.matchMedia(`(${type}-width: ${mediaQuery}px)`);
		setMediaQueryList(list);
		setIsMatch(list.matches);
	}, [mediaQuery]);
	
	useEventListener('change', (e: any) => setIsMatch(e.matches), mediaQueryList);
	return isMatch;
}
