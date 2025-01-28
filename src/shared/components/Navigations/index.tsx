import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getCurrentEvent, setCurrentEvent } from '@/services/redux/slices/eventsSlice';
import events from '@/shared/data/historical_events.json';
import Button from '@/shared/components/Button';

interface INavigations {
	type: 'desktop' | 'mobile';
}

const Navigations = (props: INavigations) => {
	
	const { type = 'desktop' } = props;
	
	const currenEvent = useAppSelector(getCurrentEvent);
	const dispatch = useAppDispatch();
	
	const handlePrevClick = () => {
		if (currenEvent === 0) return;
		dispatch(setCurrentEvent(currenEvent - 1));
	};
	
	const handleNextClick = () => {
		if (currenEvent + 1 > events.length - 1) return;
		dispatch(setCurrentEvent(currenEvent + 1));
	};
	
	return (
		<div className={`${styles.navigations} ${styles[type]}`}>
			<p className={styles.pages}>{`${currenEvent + 1}/${events.length}`}</p>
			<div className={styles.actions}>
				<Button
					iconName={type === 'mobile' ?'chevron-s' : 'chevron'}
					onClick={handlePrevClick}
					size={type === 'mobile' ? 'small' : 'normal'}
					className={styles.prev}
					iconClassName={styles.icon}
					disabled={currenEvent === 0}
				/>
				<Button
					iconName={type === 'mobile' ?'chevron-s' : 'chevron'}
					onClick={handleNextClick}
					size={type === 'mobile' ? 'small' : 'normal'}
					className={styles.next}
					iconClassName={styles.icon}
					disabled={currenEvent + 1 > events.length - 1}
				/>
			</div>
		</div>
	);
};

export default Navigations;