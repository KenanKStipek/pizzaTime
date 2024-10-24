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

// API Routes
app.get(
  "/protected",
  expressjwt(tokenConfig),
  function (req, res) {
    req.auth
      ? res.sendStatus('You are authorized')
      : res.sendStatus(401)
  }
);

app.get("/", 
  (_, res) => {
  res.sendStatus("Welcome to the Pizza Time API!");
});

app.get(
  "/pizza/", 
  expressjwt(tokenConfig),
  async (_, res) => {
    const orders = await getOrders();
    res.send(orders);
  }
);

app.get(
  "/pizza/:id", 
  expressjwt(tokenConfig),
  async (req, res) => {
    const { id } = req.params;
    const order = await getOrders({ id });
    res.send(order);
});

app.post(
  "/pizza", 
  expressjwt(tokenConfig),
  async (req, res) => {
    const { body } = req
    const order = await createOrder(body);
    res.send(order);
  }
);

app.put(
  "/pizza/:id", 
  expressjwt(tokenConfig),
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const order = await updateOrder(id, body);
    res.send(order);
  }
);

app.delete(
  "/pizza/:id", 
  expressjwt(tokenConfig),
  async (req, res) => {
    const { id } = req.params;
    await deleteOrder(id);
    res.sendStatus(200);
  }
);

export default app;