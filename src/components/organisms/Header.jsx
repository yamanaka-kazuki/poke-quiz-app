import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';

export const Header = () => {
  const dotGothicStyle = {
    'font-family': 'DotGothic16',
  };

  return (
    <>
      <Box w="100%" h="80px" bg="white" shadow="lg">
        <Flex minWidth="max-content" alignItems="center" gap="2" pt="4">
          <Box p="2">
            <Heading size="md" ml="8">
              <Link
                href="/"
                _hover={{ textDecoration: 'none' }}
                style={dotGothicStyle}
              >
                ポケモンシルエットクイズ
              </Link>
            </Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap="2" mr="8" style={dotGothicStyle}>
            <Button colorScheme="teal">マイページ</Button>
            <Button colorScheme="teal">ログアウト</Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </>
  );
};
