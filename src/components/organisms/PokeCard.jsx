import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Image,
  Box,
  AbsoluteCenter,
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
} from '@chakra-ui/react';
import axios from 'axios';

export const PokeCard = () => {
  const [data, setData] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [jaName, setJaName] = useState('');
  const [message, setMessage] = useState('このポケモンは？');
  const [correctCount, setCorrectCount] = useState(0);

  const inputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // inputにレンダリング時フォーカス
    inputRef.current.value = '';
    inputRef.current.focus();
    setIsCorrect(false);

    const randomNum = Math.floor(Math.random() * 150 + 1);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomNum}`
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
      <Box position="relative" h="600px">
        <AbsoluteCenter>
          <Card w="600px" boxShadow="2xl">
            <CardBody>
              <Stack align="center">
                <Image
                  src={imgUrl}
                  borderRadius="lg"
                  w="240"
                  h="240"
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
                <Flex justifyContent="center" gap="8">
                  <Button
                    colorScheme="teal"
                    size="md"
                    onClick={judgeAnswer}
                    mt="4"
                  >
                    わかった！
                  </Button>
                  <Button
                    colorScheme="red"
                    size="md"
                    mt="4"
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
        </AbsoluteCenter>
      </Box>
    </>
  );
};
