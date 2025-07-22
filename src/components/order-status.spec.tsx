import { render} from '@testing-library/react'
import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text when order status is pending', () => {
    /* Pending */ 
    const wrapper = render(<OrderStatus status="pending"/>)

    const statusText = wrapper.getByText('Pendente')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-slate-400')
  })

   it('should display the right text when order status is canceled', () => {
    /* Canceled */ 
    const wrapper = render(<OrderStatus status="canceled"/>)

    const statusText = wrapper.getByText('Cancelado')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-rose-500')
  })

  it('should display the right text when order status is delivering', () => {
    /* Delivering */ 
    const wrapper = render(<OrderStatus status="delivering"/>)

    const statusText = wrapper.getByText('Saiu para entrega')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-500')
  })

  it('should display the right text when order status is processing', () => {
    /* Processing */ 
    const wrapper = render(<OrderStatus status="processing"/>)

    const statusText = wrapper.getByText('Em preparo')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-500')
  })

    it('should display the right text when order status is delivered', () => {
    /* Delivered */ 
    const wrapper = render(<OrderStatus status="delivered"/>)

    const statusText = wrapper.getByText('Entregue')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-emerald-500')
  })
})


    