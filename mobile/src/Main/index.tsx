import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button } from "../components/Button";
import { Cart } from "../components/Cart";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { TableModal } from "../components/TableModal";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

import {
  CategoriesContainer,
  CenteredContainer,
  Container,
  Footer,
  FooterConatiner,
  MenuContainer,
} from "./styles";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";
import { Category } from "../types/Category";
import { api } from "../services/api";

export const Main = () => {
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setcartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    // o .then será executado somente quando as duas requests forem finalizadas
    Promise.all([api.get("/categories"), api.get("/products")]).then(
      ([categoriesResponse, ProductsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(ProductsResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const routes = !categoryId
      ? "/products"
      : `/categories/${categoryId}/products`;
    setIsLoadingProducts(true);
    const response = await api.get(routes);

    if (response.status === 200) {
      setProducts(response.data);
      setIsLoadingProducts(false);
    }
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable("");
    setcartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setcartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];
      const itemUpdat = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...itemUpdat,
        quantity: itemUpdat.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setcartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {!isLoading ? (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator size={"large"} color="#D73035" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddToCart={handleAddToCart} products={products} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <>
                      <Empty />
                      <Text color="#666" style={{ marginTop: 24 }}>
                        Nenhum produto foi encontrado!
                      </Text>
                    </>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        ) : (
          <CenteredContainer>
            <ActivityIndicator size={"large"} color="#D73035" />
          </CenteredContainer>
        )}
      </Container>
      <Footer>
        <FooterConatiner>
          {!selectedTable && (
            <Button
              label="Novo Pedido"
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading || products.length === 0}
            />
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterConatiner>
      </Footer>

      {/* MODAL */}
      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
};
