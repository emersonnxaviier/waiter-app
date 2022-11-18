import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 }) // no sort 1 íra retornar ordem crescente | -1 ordem decrescente
      .populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
