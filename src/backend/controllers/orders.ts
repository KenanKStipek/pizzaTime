import "dotenv/config";

import express from "express";
import { expressjwt } from "express-jwt";
import { 
  createOrder, 
  getOrders, 
  updateOrder, 
  deleteOrder 
} from '../models/orders.ts'

export const app = express();

const tokenConfig = { 
  secret: process.env.SHARED_SECRET || 'shared',
  algorithms: [] 
}

app.get(
  "/protected",
  expressjwt(tokenConfig),
  function (req, res) {
    if (!req.auth.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);

app.get("/", 
  (req, res) => {
  res.send("Welcome to the Pizza Time API!");
});

app.get("/pizza/", async (req, res) => {
  const orders = await getOrders();
  res.send(orders);
});

app.get("/pizza/:id", async (req, res) => {
  const { id } = req.params;
  const order = await getOrders({ id });
  res.send(order);
});

app.post("/pizza", async (req, res) => {
  const { body } = req.params;
  const order = await createOrder(body);
  res.send(order);
});
