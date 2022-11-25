import { useState } from "react";
import { Modal, Platform, TouchableOpacity } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { Form, Header, Input, ModalBody, Overlay } from "./styles";

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export const TableModal = ({ visible, onClose, onSave }: TableModalProps) => {
  const [table, setTable] = useState("");

  function handleSave() {
    onSave(table);
    onClose();
    setTable("");
  }
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <Header>
            <Text weight="600">Informa a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={(text) => setTable(text)}
            />
            <Button
              label="Salvar"
              onPress={handleSave}
              disabled={table.length === 0}
            />
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
};
