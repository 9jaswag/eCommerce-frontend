// import React from 'react'
// import { Elements, StripeProvider } from "react-stripe-elements";

// class Element {
//   mount() { }
//   update() { }
//   destroy() { }
//   on() { }
// }

// global.Stripe = {
//   element: {
//     create: () => {
//       return new Element()
//     }
//   },
//   // injectStripe: () => jest.fn()
// }
class Element {
  mount() { }
  update() { }
  destroy() { }
  on() { }
}

export default function mockStripe() {
  const elements = {
    create: () => {
      return new Element()
    }
  }
  const card = {}
  card.mount = jest.fn()
  card.on = jest.fn()
  card.change = jest.fn()
  //elements.create = jest.fnb().returns(card)
  const stripe = {
    createToken: () => {
      console.log('create token')
    },
    elements: jest.fn()//.returns(elements)
  }

  function Stripe(key) {
    stripe.key = key
    return stripe
  }
  return { elements, card, stripe, Stripe }
}

global.Stripe = mockStripe()