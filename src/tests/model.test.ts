import { expect, test } from '@jest/globals'

import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  encrypt,
  decrypt,
  encryptOrder,
  decryptOrder,
  validateOrder
} from '../api/models/orders'

test('get a collection of orders', async () => {
  const orders = await getOrders();
  expect(orders).toHaveLength;
})

test('create an order', async () => {
  const order = await createOrder({
    "customerName": "Kenan Stipek",
    "customerPhone": "360-224-6691",
    "customerAddress": "3309 Ceedarside Ct. Bellingham WA",
    "pizzaType": "Chicago",
    "size": "Large",
    "toppings": ["Mushrooms"],
    "status": "Preparing"
  });
  expect(order).toHaveProperty('id');
})

test('update an order', async () => {
  const latestOrders = await getOrders() as [];
  const latestOrder = latestOrders[latestOrders.length - 1]

  // @ts-ignore
  const order = await updateOrder(latestOrder.id, {
    "status": "Baking"
  });
  // @ts-ignore
  expect(order?.status).toBe("Baking")
})


test('delete an order', async () => {
  const latestOrders = await getOrders() as [];
  const latestOrder = latestOrders[latestOrders.length - 1]
  // @ts-ignore
  const order = await deleteOrder(latestOrder.id)
  // @ts-ignore
  expect(order).toBeTruthy();
})

test('encrypt and decrypt string', async () => {
  const testString = 'test string'
  const encryptedString = encrypt(testString)
  const decryptedString = decrypt(encryptedString)
  expect(decryptedString).toBe(testString)
  expect(encryptedString).not.toBe(testString)
})

test('encrypt and decrypt customer data', async () => {
  const customerData = {
    customerName: "Kenan Stipek",
    customerPhone: "360-224-6691",
    customerAddress: "3309 Ceedarside Ct. Bellingham WA",
  }
  const encryptedData = encryptOrder(customerData)
  const decryptedData = decryptOrder(encryptedData)

  expect(decryptedData.customerName).toBe(customerData.customerName)
  expect(encryptedData.customerName).not.toBe(customerData.customerName)
})

test('confirm data validation on protected columns', async () => {
  const invalidOrder = {
    "customerName": "Kenan Stipek",
    "customerPhone": "360-224-6691",
    "customerAddress": "3309 Ceedarside Ct. Bellingham WA",
    "pizzaType": "Cheese Soup",
    "size": "Double Large",
    "toppings": ["Mushrooms"],
    "status": "Wishing"
  }

  const validOrder = {
    "customerName": "Kenan Stipek",
    "customerPhone": "360-224-6691",
    "customerAddress": "3309 Ceedarside Ct. Bellingham WA",
    "pizzaType": "Chicago",
    "size": "Large",
    "toppings": ["Mushrooms"],
    "status": "Preparing"
  }

  const isOrderValid = validateOrder(invalidOrder)
  expect(isOrderValid).toEqual('Invalid Pizza Type Invalid Pizza Size Invalid Order Status')
  const isThisOrderInvalid = validateOrder(validOrder)
  expect(isThisOrderInvalid).toBeFalsy()
})