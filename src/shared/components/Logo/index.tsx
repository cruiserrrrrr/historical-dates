import styles from './index.module.scss';

const Logo = () => {
	return (
		<div className={styles.logo}>
			<div className={styles.wrapper}>
				<p className={styles.text}>Исторические даты</p>
			</div>
		</div>
	);
};

export default Logo;