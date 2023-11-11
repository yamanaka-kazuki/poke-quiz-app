import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import axios from 'axios';

export const PokeCard = () => {
  const [data, setData] = useState([]);
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 150 + 1);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomNum}`
        );
        setImgUrl(
          response.data.sprites.other['official-artwork'].front_default
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching Data', error);
      }
    };

    fetchData();
  }, []);

  const [value, setValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const judgeAnswer = () => {
    const isCorrect = value === data.name;
    setIsCorrect(isCorrect);
    trueFalseToast(isCorrect);
  };

  const trueFalseToast = (isCorrect) => {
    toast({
      title: isCorrect ? '正解！！' : '不正解。。。',
      status: isCorrect ? 'success' : 'error',
      duration: 1000,
      position: 'top',
    });

    if (isCorrect) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <Box position="relative" h="600px">
        <AbsoluteCenter>
          <Card w="480px" maxW="lg" boxShadow="lg">
            <CardBody>
              <Stack align="center">
                <Image
                  src={imgUrl}
                  borderRadius="lg"
                  w="200"
                  h="200"
                  style={
                    isCorrect
                      ? { filter: 'brightness(100%)' }
                      : { filter: 'brightness(0%)' }
                  }
                ></Image>
                <Heading size="md">このポケモンは？</Heading>
                <Input
                  placeholder="名前を入力"
                  borderRadius="lg"
                  mt="2"
                  onChange={handleInputChange}
                />
                <Button colorScheme="teal" size="md" onClick={judgeAnswer}>
                  正解を表示
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </AbsoluteCenter>
      </Box>
    </>
  );
};
