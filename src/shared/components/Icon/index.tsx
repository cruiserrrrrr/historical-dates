import React, { ComponentProps } from 'react';

interface LazySvgProps extends ComponentProps<'svg'> {
	name: string;
}

const Icon = ({ name, ...props }: LazySvgProps) => {
	const IconComponent = require(`@/public/assets/icons/${name}.svg`).default;
	if (!IconComponent) {
		return null;
	}
	
	return <IconComponent {...props} />;
};

export default Icon;

