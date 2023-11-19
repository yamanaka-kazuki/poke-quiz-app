import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Link,
} from '@chakra-ui/react';

export const RetireGameModal = (props) => {
  const { isOpen, onOpen, onClose } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ゲームを終了しますか？</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button colorScheme="red" mr={3}>
              <Link href="/">終了する</Link>
            </Button>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
