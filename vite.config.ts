import { UserConfig } from 'vite';

const config: UserConfig = {
  build: {
    rollupOptions: {
      input: {
        // general: 'src/general.ts',
        mainHome: 'src/mainHome.ts',
        home: 'src/home.ts',
        bePartner: 'src/bePartner.ts',
        findAPartner: 'src/findAPartner.ts',
        partnerPage: 'src/partnerPage.ts',
        solution: 'src/solution.ts',
        contactUs: 'src/contactUs.ts',
        panoramicStyle: 'src/panoramicStyle.css',
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
