import express from "express";
import { Order } from '../models/orders.ts'

export const app = express();

app.get("/", (req, res) => {
  console.log({ Order })
  res.send("Welcome to the Pizza Time API!");
});

app.get("/pizza/", (req, res) => {
  const orders = Order.findAll()
  res.send(orders);
});

app.get("/pizza/:id", (req, res) => {
  const order = Order.findOne({ })

  res.send("Welcome to the Pizza Time API!");
});

app.post("/pizza", (req, res) => {
  res.send("Welcome to the Pizza Time API!");
});
