import { prisma } from '../../services/postgres.ts'

import {
  PIZZA_TYPES,
  PIZZA_SIZES,
  STATUSES
} from '../../constants.ts'

export type OrderType = {
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

export const getOrders = (
  params?: OrderParams
) => {
  return prisma.orders.getOrders
}

export const createOrder = (
  orderInfo: Partial<OrderType>
) => {
  prisma.orders
}

export const updateOrder = (
  params: OrderParams
) => {
  prisma.orders
}

export const deleteOrder = (
  orderInfo: Partial<OrderType>
) => {
  prisma.orders
}