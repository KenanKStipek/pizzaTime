import { Prisma as PrimsaType } from '@prisma/client'
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
    const dencryptedOrderInfo = decryptOrder(order)
    return dencryptedOrderInfo
  } else {
    const orders = await prisma.order.findMany()
    const dencryptedOrdersInfo = orders.map((order) => decryptOrder(order))
    return dencryptedOrdersInfo
  }
}

export const createOrder = (
  orderInfo: PrimsaType.OrderCreateInput
) => {
  // validate data
  const invalid = validateOrder(orderInfo)
  if(invalid) return invalid

  // encrypt sensitive customer data
  const encryptedOrderInfo = encryptOrder(orderInfo)
  
  // Store order
  const order = prisma.order.create({
    data: encryptedOrderInfo as PrimsaType.OrderCreateInput
  })
  return order
}

export const updateOrder = async (
  id: OrderParams,
  updatedOrder: PrimsaType.OrderUpdateInput
) => {
  // validate data
  const invalid = validateOrder(updatedOrder)
  if(invalid) return invalid

  // encrypt sensitive customer data
  const encryptedOrderInfo = encryptOrder(updateOrder)

  // Store order
  const orderId: number = +id
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

const encryptCustomerData = (data) => {
  const key = process.env.ENCRYPTION_KEY;
  return crypto.AES.encrypt(data, key).toString();
}

const decryptCustomerData = (data) => {
  const key = process.env.ENCRYPTION_KEY;
  const bytes = crypto.AES.decrypt(data, key);
  return bytes.toString(crypto.enc.Utf8); 
}

const encryptOrder = order => ({
  ...order,
  customerName: encryptCustomerData(order.customerName),
  customerAddress: encryptCustomerData(order.customerAddress),
  customerPhone: encryptCustomerData(order.customerPhone),
})

const decryptOrder = order => ({
  ...order,
  customerName: decryptCustomerData(order.customerName),
  customerAddress: decryptCustomerData(order.customerAddress),
  customerPhone: decryptCustomerData(order.customerPhone),
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