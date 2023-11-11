import './App.css';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import { PokeCard } from './components/organisms/PokeCard';

import { theme } from './Theme';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Heading mt="24">ポケモンシルエットクイズ</Heading>
        <PokeCard />
      </div>
    </ChakraProvider>
  );
}
