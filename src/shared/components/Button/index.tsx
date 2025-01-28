import styles from './index.module.scss';
import Icon from '@/shared/components/Icon';
import { ComponentProps } from 'react';

interface IButton extends ComponentProps<'button'> {
	iconName: string;
	size: 'normal' | 'small' | 'medium';
	className?: string;
	iconClassName?: string;
	onClick: () => void;
	disabled?: boolean;
}

const Button = (props: IButton) => {
	
	const {
		iconName,
		size = 'normal',
		className = '',
		iconClassName = '',
		onClick,
		disabled = false
	} = props;
	
	return (
		<button
			onClick={onClick}
			className={`${styles.button} ${styles[size]} ${className}`}
			disabled={disabled}
		>
			<Icon name={iconName} className={`${styles.icon} ${iconClassName}`} />
		</button>
	);
};

export default Button;