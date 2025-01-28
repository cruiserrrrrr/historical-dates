'use client';

import styles from './index.module.scss';
import Logo from '@/shared/components/Logo';
import CircleTimeline from '@/shared/components/CircleTimeline';
import points from '@/shared/data/historical_events.json';
import SwiperEvents from '@/shared/components/SwiperEvents';
import { Provider } from 'react-redux';
import { store } from '@/services/redux/store';
import Navigations from '@/shared/components/Navigations';

const HomePage = () => {
	return (
		<Provider store={store}>
			<div className={styles.page}>
				<div className={styles.container}>
					<Logo />
					<CircleTimeline points={points} />
					<SwiperEvents />
					<Navigations type={'mobile'} />
				</div>
			</div>
		</Provider>
	);
};

export default HomePage;