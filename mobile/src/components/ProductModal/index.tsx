import { FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { urlImages } from "../../utils/urlImages";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import {
  CloseButton,
  Footer,
  FooterConatiner,
  Header,
  Image,
  Ingredient,
  IngredientsContainer,
  ModalBody,
  PriceContainer,
} from "./styles";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

export const ProductModal = ({
  visible,
  onClose,
  product,
  onAddToCart,
}: ProductModalProps) => {
  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image source={{ uri: urlImages(product.imagePath) }}>
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={(product) => product._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <FooterConatiner>
          <PriceContainer>
            <Text color="#666">Pre??o</Text>
            <Text weight="600" size={20}>
              {formatCurrency(product.price)}
            </Text>
          </PriceContainer>

          <Button
            label="Adicionar ao pedido"
            onPress={() => {
              onAddToCart(product);
              onClose();
            }}
          />
        </FooterConatiner>
      </Footer>
    </Modal>
  );
};
