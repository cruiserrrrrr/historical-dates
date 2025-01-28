import styles from './index.module.scss';
import events from '@/shared/data/historical_events.json';

interface IPagination {
	activeIndex: number;
	handler: (i: number) => void;
}

const Pagination = (props:IPagination) => {
	
	const {activeIndex = 0, handler} = props;
	
	const handleClick = (i: number) => {
		// dispatch(setCurrentEvent(i))
		handler(i)
	}
	
	return (
		<div className={styles.pagination}>
			{events.map(((_, i: number) => (
				<button
					className={`${styles.dot} ${activeIndex === i ? styles.active : ''}`}
					key={i}
					onClick={() => handleClick(i)}
				/>
			)))}
		</div>
	);
};

export default Pagination;