'use client';

import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ITimeEvent } from '@/types/types';
import AnimatedDate from '@/shared/components/AnimatedDate';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getCurrentEvent, setCurrentEvent } from '@/services/redux/slices/eventsSlice';

interface ICircleTimeline {
	points: ITimeEvent[];
}

const CircleTimeline = (props: ICircleTimeline) => {
	
	const { points } = props;
	const currentIndex = useAppSelector(getCurrentEvent);
	const dispatch = useAppDispatch();
	const [disabled, setDisabled] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	
	const handleClick = (index: number) => {
		setDisabled(true);
		const anglePerPoint = 360 / points.length;
		const targetRotation = -anglePerPoint * index;
		const targetPointRotation = 360 - targetRotation;
		
		gsap.to(`.${styles.circle}`, {
			rotation: targetRotation,
			duration: 2,
			ease: 'power3.out',
		});
		
		gsap.to(`.${styles.point}`, {
			rotation: targetPointRotation,
			duration: 0,
			ease: 'power3.out',
		});
		
		dispatch(setCurrentEvent(index));
		setTimeout(() => {
			console.log('false');
			setDisabled(false);
			setLoading(true);
		}, 2000);
	};
	
	useEffect(() => {
		if (!loading) {
			setLoading(true);
			return;
		}
		handleClick(currentIndex);
	}, [currentIndex]);
	
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.dates}>
					<AnimatedDate
						value={Number((points[currentIndex].time[0]))}
						duration={2000}
						color={'blue'}
					/>
					<AnimatedDate
						value={Number((points[currentIndex].time[1]))}
						duration={2000}
						color={'pink'}
					/>
				</div>
				<div className={styles.circle}>
					{points.map((e, i) => {
						const totalPoints = points.length;
						const angleOffset = -70;
						const angle = ((360 / totalPoints) * i + angleOffset) % 360;
						const radius = 265;
						const x = radius * Math.cos((angle * Math.PI) / 180);
						const y = radius * Math.sin((angle * Math.PI) / 180);
						const isActive = i === currentIndex;
						
						return (
							<button
								key={i}
								className={`${styles.point} ${isActive ? styles.active : ''}`}
								style={{
									position: 'absolute',
									left: `calc(50% + ${x}px)`,
									top: `calc(50% + ${y}px)`,
									transform: `translate(-50%, -50%)`,
									// 	rotate(${Math.abs(activeRotation)}deg)
								}}
								onClick={() => handleClick(i)}
								disabled={disabled}
							>
								<div className={styles.point_container}>
									<span>{i + 1}</span>
									<p className={`${styles.name} ${isActive ? styles.active : ''}`}>{points[currentIndex].name}</p>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CircleTimeline;