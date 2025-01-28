import styles from './index.module.scss';

interface ISlide {
	slide: {
		date: string;
		event: string;
	};
	isActive: boolean;
}

const Slide = (props: ISlide) => {
	const { slide, isActive = false } = props;
	return (
		<div className={`${styles.slide} ${isActive ? styles.active : ''}`}>
			<p className={styles.slide_date}>{slide.date}</p>
			<p className={styles.slide_event}>{slide.event}</p>
		</div>
	);
};

export default Slide;