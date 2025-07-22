import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Signin } from "./sign-in"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { HelmetProvider } from "react-helmet-async"

describe('SignIn', () => {
  it('should set default email input value if email is present on search params', () => {
    const wrapper = render(
      <>
      <Signin/>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <HelmetProvider>
              <MemoryRouter initialEntries={['/sign-in?email=johndoe@example.com']}>
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </MemoryRouter>
            </HelmetProvider>
          )
        } 
      }
    )
    const emailInput = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement

    expect(emailInput.value).toEqual('johndoe@example.com')
  })
})