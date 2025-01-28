'use client';
import styles from './index.module.scss';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import data from '../../data/historical_events.json';
import Slide from '../Slide';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { getCurrentEvent } from '@/services/redux/slices/eventsSlice';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import './swiper.scss';
import Button from '@/shared/components/Button';
import Navigations from '@/shared/components/Navigations';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import Loader from '@/shared/components/Loader';
// import Pagination from '@/shared/components/Pagination';

const SwiperEvents = () => {
	
	const currentIndex = useAppSelector(getCurrentEvent);
	
	const [isFading, setIsFading] = useState<boolean>(false);
	const [displayIndex, setDisplayIndex] = useState<number>(currentIndex);
	const [activeSlide, setActiveSlide] = useState<number>(0);
	const [events, setEvents] = useState(data[0].events);
	const [isStart, setIsStart] = useState<boolean>(false);
	const [isEnd, setIsEnd] = useState<boolean>(true);
	const swiperRef = useRef<SwiperRef>(null);
	const [isLoad, setIsLoad] = useState<boolean>(false);
	const isMobile = useMediaQuery(768, 'max');
	const [eventName, setEventName] = useState<string>(data[0].name);
	
	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slideTo(0);
		}
		if (currentIndex !== displayIndex) {
			setIsFading(true);
			
			const fadeOutTimeout = setTimeout(() => {
				setDisplayIndex(currentIndex);
				setTimeout(() => {
					setIsFading(false);
					setEvents(data[currentIndex].events);
					setEventName(data[currentIndex].name);
				}, 1600);
			}, 300);
			
			return () => clearTimeout(fadeOutTimeout);
		}
	}, [currentIndex, displayIndex]);
	
	const slideChange = (i: number) => {
		setActiveSlide(i);
	};
	
	const handlePrev = () => {
		console.log('prev', swiperRef);
		if (swiperRef.current) {
			swiperRef.current.swiper.slidePrev();
		}
	};
	
	const handleNext = () => {
		if (swiperRef.current) {
			console.log('next');
			swiperRef.current.swiper.slideNext();
		}
	};
	
	const updateNavigationState = (swiper: SwiperType) => {
		console.log(swiper, 'swiper');
		setIsEnd(swiper.isEnd);
		setIsStart(swiper.activeIndex === 0);
	};
	
	return (
		<div
			className={`${styles.swiper_events}`}
		>
			<Loader load={isLoad} />
			<Navigations type={'desktop'} />
			{isMobile ? (
				<p className={`${styles.mobile_name} ${isFading ? styles.fade_out : styles.fade_in}`}>
					{eventName}
				</p>
			) : null}
			<div className={`${styles.container} ${isFading ? styles.fade_out : styles.fade_in}`}>
				<Swiper
					direction={'horizontal'}
					navigation
					pagination={{ type: 'bullets', clickable: true }}
					slidesPerView={'auto'}
					spaceBetween={80}
					modules={[Pagination]}
					className={styles.swiper}
					// style={{ overflow: 'hidden' }}
					onSlideChange={(swiper) => {
						console.log(swiper.activeIndex, 'swiper.activeIndex');
						slideChange(swiper.activeIndex);
						updateNavigationState(swiper);
					}}
					onSwiper={(swiper) => {
						console.log('change');
						setIsLoad(true);
						updateNavigationState(swiper);
					}}
					// slidesOffsetAfter={isMobile ? 0 : 300}
					ref={swiperRef}
				>
					{events.map((event, i) => (
						<SwiperSlide
							key={i}
							style={{
								maxWidth: i === events.length - 1 ? '100%' : isMobile ? '166px' : '320px',
							}}
						>
							<Slide slide={event} key={i} isActive={i === activeSlide} />
						</SwiperSlide>
					))}
				</Swiper>
				{!isStart ? (
					<Button
						iconName={'chevron'}
						size={'medium'}
						onClick={handlePrev}
						key={'prev_slide_button'}
						className={styles.prev}
						iconClassName={styles.action_icon}
					/>
				) : null}
				{!isEnd ? (
					<Button
						iconName={'chevron'}
						size={'medium'}
						onClick={handleNext}
						key={'next_slide_button'}
						className={styles.next}
						iconClassName={styles.action_icon}
					/>
				) : null}
			</div>
		</div>
	);
};

export default SwiperEvents;