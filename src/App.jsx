import './App.css';
import { Center, ChakraProvider } from '@chakra-ui/react';
import { PokeCard } from './components/organisms/PokeCard';

import { theme } from './Theme';
import { Header } from './components/organisms/Header';
import './style.css';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Header />
        <PokeCard />
      </div>
    </ChakraProvider>
  );
}
