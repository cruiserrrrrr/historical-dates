// @ts-check
/** @type {import('next').NextConfig} */

const nextConfig = {
	trailingSlash: true,
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ["*"],
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.(".svg"),
		);
		
		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: [
					{
						loader: "@svgr/webpack",
						options: {
							svgo: false,
							typescript: true,
							prettier: false,
						},
					},
				],
			},
		);
		
		fileLoaderRule.exclude = /\.svg$/i;
		
		return config;
	},
	
};

module.exports = nextConfig;
