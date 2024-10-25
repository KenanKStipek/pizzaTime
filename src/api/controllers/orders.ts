import "dotenv/config";

import express from "express";
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { expressjwt } from "express-jwt";
import { 
  createOrder, 
  getOrders, 
  updateOrder, 
  deleteOrder 
} from '../models/orders'

// Simple API boilerplate
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'))
type Algorithm = ["HS256"]
const tokenConfig = {
  secret: process.env.SHARED_SECRET,
  algorithms: ["HS256"] as Algorithm
}

app.get("/api/", 
  (_, res) => {
  res.send("Welcome to the Pizza Time API!");
});

app.get(
  "/api/pizza/", 
  expressjwt(tokenConfig),
  async (_, res) => {
    try {
      const orders = await getOrders();
      res.send(orders);
    } catch {
      res.sendStatus(500)
    }
  }
);

app.get(
  "/api/pizza/:id", 
  expressjwt(tokenConfig),
  async (req, res) => {
    try {
      const { id } = req.params;
      const order = await getOrders({ id });
      if(!order) res.send(404);
      res.send(order);
    } catch {
      res.sendStatus(500)
    }
  }
);

app.post(
  "/api/pizza", 
  expressjwt(tokenConfig),
  async (req, res) => {
    try {
      const { body } = req
      const order = await createOrder(body);
      res.send(order);
    } catch {
      res.sendStatus(500)
    }
  }
);

app.put(
  "/api/pizza/:id", 
  expressjwt(tokenConfig),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const originalOrder = await getOrders({ id });
      if(!originalOrder) res.send(404);

      const order = await updateOrder(id, body);
      res.send(order);
    } catch {
      res.sendStatus(500)
    }
  }
);

app.delete(
  "/api/pizza/:id", 
  expressjwt(tokenConfig),
  async (req, res) => {
    try {
      const { id } = req.params;
      await deleteOrder(id);
      res.sendStatus(200);
    } catch {
      res.sendStatus(500)
    }
  }
);

export default app;