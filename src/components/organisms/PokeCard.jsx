import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Image,
  Input,
  Button,
  useToast,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Link,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';

export const PokeCard = () => {
  const [data, setData] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [jaName, setJaName] = useState('');
  const [message, setMessage] = useState('このポケモンは？');
  const [correctCount, setCorrectCount] = useState(0);
  const [bookNumbers] = useState([...Array(1010)].map((_, i) => i + 1));

  const inputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // inputにレンダリング時フォーカス
    inputRef.current.value = '';
    inputRef.current.focus();
    setIsCorrect(false);

    // ランダムに選択された数値を取得
    const randomIndex = Math.floor(Math.random() * bookNumbers.length);
    const selectedNumber = bookNumbers[randomIndex];

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${selectedNumber}`
        );
        // ポケモンの日本語名を取得
        const pokemonNameDetail = response.data.species.url;
        let res = await fetch(pokemonNameDetail);
        let result = await res.json();
        let jaName = result.names.find(
          (name) => name.language.name === 'ja'
        ).name;
        setJaName(jaName);

        // ポケモンの画像を取得
        setImgUrl(
          response.data.sprites.other['official-artwork'].front_default
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching Data', error);
      }
    };

    // ランダムに選択された数値を配列から除去
    bookNumbers.splice(bookNumbers.indexOf(selectedNumber), 1);
    console.log(bookNumbers.length);
    console.log(bookNumbers.indexOf(selectedNumber));

    fetchData();
  }, [correctCount]);

  const [value, setValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const judgeAnswer = () => {
    const isCorrect = value === jaName;
    setIsCorrect(isCorrect);
    trueFalseToast(isCorrect);
  };

  const displayAnswer = () => {
    document.querySelector('.chakra-image').style.filter = 'brightness(100%)';
    setMessage(jaName);
    setTimeout(() => {
      onOpen();
    }, 3000);
  };

  const trueFalseToast = (isCorrect) => {
    toast({
      title: isCorrect ? '正解！！' : '不正解。。。',
      status: isCorrect ? 'success' : 'error',
      duration: 1000,
      position: 'top',
    });

    if (isCorrect) {
      setIsCorrect(true);
      setTimeout(() => {
        setCorrectCount(correctCount + 1);
      }, 2000);
      console.log(correctCount);
    }
  };

  return (
    <>
      <Center>
        <Card
          w={{ base: '300px', md: '480px', lg: '600px' }}
          boxShadow="2xl"
          mt={{ base: '4', md: '6', lg: '8' }}
        >
          <CardBody>
            <Stack align="center">
              <Image
                src={imgUrl}
                borderRadius="lg"
                w={{ base: '150px', md: '180px', lg: '240px' }}
                h={{ base: '150px', md: '180px', lg: '240px' }}
                style={
                  isCorrect
                    ? { filter: 'brightness(100%)' }
                    : { filter: 'brightness(0%)' }
                }
              ></Image>
              <Heading size="md" mt="4">
                {message}
              </Heading>
              <Input
                placeholder="名前を入力"
                borderRadius="lg"
                mt="8"
                onChange={handleInputChange}
                ref={inputRef}
              />
              <Flex
                justifyContent="center"
                gap={{ base: '2', md: '4', lg: '8' }}
                flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
              >
                <Button
                  colorScheme="teal"
                  size={{ base: 'lg', md: 'md', lg: 'md' }}
                  onClick={judgeAnswer}
                  mt={{ base: '2', md: '2', lg: '4' }}
                >
                  わかった！
                </Button>
                <Button
                  colorScheme="red"
                  size={{ base: 'lg', md: 'md', lg: 'md' }}
                  mt={{ base: '2', md: '2', lg: '4' }}
                  onClick={displayAnswer}
                >
                  わからない…
                </Button>
              </Flex>
              <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>さんのスコアは・・・</ModalHeader>
                  <ModalBody pb={6} fontSize="36" textAlign="center">
                    {correctCount} 問でした！
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                      再挑戦する！
                    </Button>
                    <Button>
                      <Link href="/">TOPに戻る</Link>
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </>
  );
};
