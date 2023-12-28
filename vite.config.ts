import { UserConfig } from 'vite';

const config: UserConfig = {
	build: {
		rollupOptions: {
			input: {
				home: 'src/home.ts',
				general: 'src/general.ts',
				bePartner: 'src/bePartner.ts',
				findAPartner: 'src/findAPartner.ts',
				// Add more entry points as needed
			},
			output: {
				entryFileNames: '[name].js', // Use [name] placeholder for the same name as input
				assetFileNames: '[name].[ext]', // Use [name] placeholder for the same name as input
				chunkFileNames: '[name].js', // Use [name] placeholder for the same name as input
			},
		},
	},
};
export default config;
