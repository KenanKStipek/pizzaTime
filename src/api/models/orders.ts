import "dotenv/config";

import { prisma } from '../../services/postgres'
import crypto from "crypto-js";

import {
  PIZZA_TYPES,
  PIZZA_SIZES,
  STATUSES
} from '../../constants'

export type OrderType = {
  id: string,
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  pizzaType: string;
  size: string;
  toppings: string[];
  status: string
}

export type OrderParams = {
  id?: string
}

export const getOrders = async (
  params?: OrderParams
) => {
  if(params?.id) {
    const orderId: number = +params.id
    const order = await prisma.order.findFirst({ where: { id: orderId }})
    const decryptedOrderInfo = {
      ...order,
      ...decryptOrder(order)
    }
    return decryptedOrderInfo
  } else {
    const orders = await prisma.order.findMany()
    const decryptedOrdersInfo = orders.map((order) => ({
      ...order,
      ...decryptOrder(order)
    }))
    return decryptedOrdersInfo
  }
}

export const createOrder = (
  orderInfo: any
) => {
  // validate data
  const invalid = validateOrder(orderInfo)
  if(invalid) return invalid

  // encrypt sensitive customer data
  const encryptedOrderInfo = {
    ...orderInfo,
    ...encryptOrder(orderInfo)
  }

  // Store order
  const order = prisma.order.create({
    data: encryptedOrderInfo
  })
  return order
}

export const updateOrder = async (
  params: OrderParams,
  updatedOrder: any
) => {
  // validate data
  const invalid = validateOrder(updatedOrder)
  if(invalid) return invalid

  // encrypt sensitive customer data
  const originalOrder = await getOrders({ id: params.id })[0]
  const encryptedOrderInfo = {
    ...originalOrder,
    ...updatedOrder,
    ...encryptOrder(updatedOrder),
  };

  // Store order
  const orderId: number = +params
  const order = await prisma.order.update({
     where: { id: orderId }, 
     data: encryptedOrderInfo
  })
  return order;
}

export const deleteOrder = async (
  id: OrderParams
) => {
  const orderId: number = +id
  const order = await prisma.order.delete({
     where: { id: orderId }
  })
  return order;
}

//////////////////////
// Helper functions //
//////////////////////

const encrypt = (data) => {
  const key = process.env.ENCRYPTION_KEY;
  return crypto.AES.encrypt(data, key).toString();
}

const decrypt = (data) => {
  const key = process.env.ENCRYPTION_KEY;
  const bytes = crypto.AES.decrypt(data, key);
  return bytes.toString(crypto.enc.Utf8);
}

const encryptOrder = (order) => ({
  ...(order.customerName && { customerName: encrypt(order.customerName) }),
  ...(order.customerAddress && { customerAddress: encrypt(order.customerAddress) }),
  ...(order.customerPhone && { customerPhone: encrypt(order.customerPhone) }),
})

const decryptOrder = (order) => ({
  ...(order.customerName && { customerName: decrypt(order.customerName) }),
  ...(order.customerAddress && { customerAddress: decrypt(order.customerAddress) }),
  ...(order.customerPhone && { customerPhone: decrypt(order.customerPhone) }),
})

// I would normally setup a more sophisticated 
// validation process, but for this use case
// I decided to keep it simple.
const validateOrder = (order) => {
  let errors = ''
  errors += order.pizzaType && 
    !PIZZA_TYPES.includes(order.pizzaType) && 
    'Invalid Pizza Type' || ''
  errors += order.pizzaType && 
    !PIZZA_SIZES.includes(order.size) && 
    ' Invalid Pizza Size' || ''
  errors += order.pizzaType && 
    !STATUSES.includes(order.status) && 
    ' Invalid Order Status' || ''
  return errors.length > 0 && errors || false
}