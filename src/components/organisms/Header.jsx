import {
  Text,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Spacer,
  Hide,
  Show,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  MenuGroup,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { DescriptionModal } from './DescriptionModal';
import { RetireGameModal } from './RetireGameModal';

export const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 説明モーダルのstate
  const [isOpenDesModal, setIsOpenDesModal] = useState(false);
  const onOpenDesModal = () => {
    setIsOpenDesModal(true);
  };
  const onCloseDesModal = () => {
    setIsOpenDesModal(false);
  };

  // ゲーム終了モーダルのstate
  const [isOpenRetireModal, setIsOpenRetireModal] = useState(false);
  const onOpenRetireModal = () => {
    setIsOpenRetireModal(true);
  };
  const onCloseRetireModal = () => {
    setIsOpenRetireModal(false);
  };

  const dotGothicStyle = {
    'font-family': 'DotGothic16',
  };

  return (
    <>
      <Flex
        as="header"
        minWidth="max-content"
        align="center"
        gap="2"
        pt="2"
        bg="white"
        pb="2"
      >
        <Box p="2">
          <Heading size="md" ml={{ base: '2', md: '4', lg: '6' }}>
            <Link
              href="/"
              _hover={{ textDecoration: 'none' }}
              style={dotGothicStyle}
            >
              <Text
                textAlign="left"
                fontSize={{ base: '10', md: '12', lg: '14' }}
              >
                ポケモンシルエットクイズ
              </Text>
              <Text
                fontSize={{ base: '14', md: '18', lg: '20' }}
                textAlign="left"
              >
                ポケモン何匹言えるかな？
              </Text>
            </Link>
          </Heading>
        </Box>
        <Spacer />
        <Hide above="lg">
          <Menu>
            <MenuButton as={Button} mr={{ base: '2', md: '4' }}>
              <HamburgerIcon />
            </MenuButton>
            <MenuList>
              <MenuGroup title="XXX さん">
                <MenuItem onClick={onOpenDesModal}>ゲームの説明</MenuItem>
                <DescriptionModal
                  isOpen={isOpenDesModal}
                  onOpen={onOpenDesModal}
                  onClose={onCloseDesModal}
                />
                <MenuItem onClick={onOpenRetireModal}>
                  ゲームを終了する
                </MenuItem>
                <RetireGameModal
                  isOpen={isOpenRetireModal}
                  onOpen={onOpenRetireModal}
                  onClose={onCloseRetireModal}
                />
              </MenuGroup>
            </MenuList>
          </Menu>
        </Hide>
        <Show above="lg">
          <ButtonGroup gap="2" mr="8" style={dotGothicStyle}>
            <Button colorScheme="teal" onClick={onOpenDesModal}>
              ゲームの説明
            </Button>
            <DescriptionModal
              isOpen={isOpenDesModal}
              onOpen={onOpenDesModal}
              onClose={onCloseDesModal}
            />
            <Button colorScheme="red" onClick={onOpenRetireModal}>
              ゲームを終了する
            </Button>
            <RetireGameModal
              isOpen={isOpenRetireModal}
              onOpen={onOpenRetireModal}
              onClose={onCloseRetireModal}
            />
          </ButtonGroup>
        </Show>
      </Flex>
    </>
  );
};
