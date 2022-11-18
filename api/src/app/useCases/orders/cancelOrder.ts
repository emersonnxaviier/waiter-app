import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function cancelOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.params;

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Pedido cancelado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
