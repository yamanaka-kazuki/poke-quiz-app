import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  Text,
  Heading,
  ModalFooter,
} from '@chakra-ui/react';

export const DescriptionModal = (props) => {
  const { isOpen, onOpen, onClose } = props;

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
            ポケモン何匹言えるかな？の遊び方
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} fontSize={{ base: '10px', md: '15px', lg: '15px' }}>
            <Text>画面に表示されるポケモンはシルエットになっています。</Text>
            <br />
            <Heading size={{ base: 'sm', md: 'md', lg: 'md' }}>
              回答の入力
            </Heading>
            <Text>
              そのポケモンの名前を当ててください。
              <br />
              画面下部にある「名前を入力」欄に、
              <br />
              ポケモンの名前を入力してください。
            </Text>
            <br />
            <Heading size={{ base: 'sm', md: 'md', lg: 'md' }}>
              回答の送信
            </Heading>
            <Text>
              正解だと思ったら、「わかった！」ボタンをクリック
              <br />
              して回答を送信してください。
            </Text>
            <br />
            <Heading size={{ base: 'sm', md: 'md', lg: 'md' }}>
              ゲームオーバー
            </Heading>
            <Text>
              もしわからない場合は「わからない…」ボタンを押すとスコアが表示され、ゲームオーバーです。
            </Text>
            <br />
            <br />
            <Text fontSize={{ base: '12px', md: '14px', lg: '16px' }}>
              全問正解をめざして自分のポケモン知識を試してみよう！
              <br />
              めざせ！シルエットマスター！
            </Text>
          </ModalBody>

          <ModalFooter
            fontSize={{ base: '10px', md: '15px', lg: '15px' }}
          ></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
