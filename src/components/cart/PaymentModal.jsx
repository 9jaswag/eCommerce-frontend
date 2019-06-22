import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { createOrder } from "../../action/cart.action";
import { processPayment } from "../../action/cart.action";

function PaymentModal({ stripe, cartDetails }) {
  const [isLoading, setisLoading] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);

  const processPay = async () => {
    setisSubmitting(true);

    try {
      let { token } = await stripe.createToken({ name: "stripeToken" });

      const orderPayload = {
        cart_id: cartDetails.cart_id,
        shipping_id: parseInt(cartDetails.shipping_id, 10),
        tax_id: 2
      };

      const { orderId } = await createOrder(orderPayload);

      const paymentPayload = {
        order_id: orderId,
        description: `Payment for order ${orderId}`,
        stripeToken: token.id,
        amount: parseFloat(cartDetails.amount) * 100
      };

      const payment = await processPayment(paymentPayload);

      setisSubmitting(false);

      const modal = document.querySelector(`.modal.payment`);
      modal.classList.remove("is-active");

      Swal.fire({
        title: "Payment successful!",
        html: `Thank you for your business, click <a target="__blank" href="${
          payment.receipt_url
        }">here</a> to see your receipt`,
        type: "success"
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      setisLoading(false);
      toast.error("Something went wrong with your payment. Please try again");
    }
  };

  return (
    <div className="modal payment">
      <div className="modal-background" />
      <div className="modal-content">
        <section className="section">
          <div className="columns">
            <div className="column is-8 has-background-white p2">
              <div className="">
                <p className="has-text-weight-semibold is-size-6">
                  Please enter your card details
                </p>
              </div>
              <div className="my-2">
                <CardElement />
              </div>
              <button
                className={`button is-primary ${
                  isSubmitting ? "is-loading" : ""
                }`}
                disabled={isSubmitting}
                onClick={processPay}
              >
                {isLoading ? "Processing" : "Pay"}
              </button>
            </div>
          </div>
        </section>
      </div>
      <button className="modal-close is-large" aria-label="close" />
    </div>
  );
}

export default injectStripe(PaymentModal);
