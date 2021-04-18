import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { addToCartController } from './useCases/AddToCart'
import { deleteCartController } from './useCases/DeleteCart'
import { listCartItemController } from './useCases/ListCartItem'
import addToCartSchema from './useCases/AddToCart/AddToCartSchema'
import { authorizeApiController } from './useCases/AuthorizeApi'

const app = express().use(cors()).use(bodyParser.json()).disable('x-powered-by')
app.use(authorizeApiController.handler)
app.get('/cart/:cart', (request, response) => {
  return listCartItemController.handler(request, response)
})
app.post(
  '/cart',
  [addToCartSchema],
  (request, response) => {
    return addToCartController.handler(request, response)
  }
)
app.put('/cart/:cart', (request, response) => {
  return addToCartController.handler(request, response)
})

app.delete('/cart/:cart', (request, response) => {
  return deleteCartController.handler(request, response)
})

app.listen(3030, () => {
  console.log(`> Server Started ${3030}`)
})
