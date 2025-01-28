import styles from './index.module.scss';
import { useEffect, useState } from 'react';

interface ILoader {
	load: boolean;
}

const Loader = (props: ILoader) => {
	
	const { load = false } = props;
	
	const [isReady, setIsReady] = useState<boolean>(false);
	
	useEffect(() => {
		if(!load) return;
		if (load) {
			setTimeout(() => {
				setIsReady(true);
			}, 500);
		}
	}, [load]);
	
	return (
		<div
			className={`${styles.loader} ${isReady ? styles.ready : ''}`}
			style={{
				opacity: load ? 0 : 1,
			}}
		/>
	);
};

export default Loader;