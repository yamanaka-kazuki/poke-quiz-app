import { extendTheme } from '@chakra-ui/react';
import backgroundImg from '../src/background.png';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'gray.800',
        backgroundImage: `url(${backgroundImg})`,
      },
    },
  },
});
