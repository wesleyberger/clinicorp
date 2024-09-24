/** @type { import('@storybook/react').Preview } */
import '../src/styles/main.scss';
import 'react-md/dist/react-md.indigo-pink.min.css'; 

const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
document.head.appendChild(fontLink);

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
