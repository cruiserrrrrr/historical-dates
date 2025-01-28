import styles from './index.module.scss';
import { useEffect, useRef, useState } from 'react';

interface IAnimatedDate {
	value: number;
	duration: number;
	color: 'blue' | 'pink';
}

const AnimatedDate = (props: IAnimatedDate) => {
	const { value, duration, color } = props;
	const [displayValue, setDisplayValue] = useState(value);
	const startValueRef = useRef(value);
	
	useEffect(() => {
		const startValue = startValueRef.current;
		const diff = value - startValue;
		const startTime = performance.now();
		
		const animate = (currentTime: number) => {
			const elapsedTime = currentTime - startTime;
			const progress = Math.min(elapsedTime / duration, 1);
			const currentValue = Math.round(startValue + diff * progress);
			setDisplayValue(currentValue);
			
			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				startValueRef.current = value;
			}
		};
		
		requestAnimationFrame(animate);
	}, [value, duration]);
	
	return <span className={`${styles.date} ${styles[color]}`}>{displayValue}</span>;
};

export default AnimatedDate;