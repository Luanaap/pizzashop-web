import { http, HttpResponse} from 'msw'
import type { GetOrderDetailsResponse, GetOrderDetailsParams } from '../get-order-details'


export const getOrderDetailsMock = http.get<GetOrderDetailsParams, never, GetOrderDetailsResponse>('/orders/:orderId', ({ params}) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '12432425253536',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    totalInCents: 5000,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: { name: 'Pizza Pepperoni' },
        quantity: 1 as number | null,
      },
      {
        id: 'order-item-2',
        priceInCents: 2000,
        product: { name: 'Pizza Marguerita' },
        quantity: 2 as number | null,
      }
    ]
  })
})