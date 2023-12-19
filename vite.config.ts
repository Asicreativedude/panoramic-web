import { UserConfig } from 'vite';

const config: UserConfig = {
	build: {
		rollupOptions: {
			input: {
				main: 'src/home.ts',
				// Add more entry points as needed
			},
			output: {
				entryFileNames: '[name].js', // Use [name] placeholder for the same name as input
			},
		},
	},
};
export default config;
