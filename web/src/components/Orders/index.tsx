import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

const orders: Order[] = [
  {
    _id: "6372e48cbcd195b0d3d0f7f3",
    table: "01",
    status: "WAITING",
    products: [
      {
        _id: "6372e48cbcd195b0d3d0f7f4",
        quantity: 3,
        product: {
          name: "Pizza quatro queijos",
          imagePath: "1668735846977-quatro-queijos.png",
          price: 40,
        },
      },
      {
        _id: "6372e48cbcd195b0d3d0f7f5",
        quantity: 2,
        product: {
          name: "Coca cola",
          imagePath: "1668738024768-coca-cola.png",
          price: 7,
        },
      },
    ],
  },
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="👨‍🍳" title="Em produção" orders={[]} />
      <OrdersBoard icon="✅" title="Pronto" orders={[]} />
    </Container>
  );
}
