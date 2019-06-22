import React, { useState, useEffect } from "react";
import { getOrder } from "../../action/customer.action";

export default function Order({ id }) {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await getOrder(id);

      setOrder(response);
    };

    fetchOrder();
  }, [id]);
  return (
    <div className="">
      {order.length > 0 ? (
        <div className="box">
          {order.map((order, index) => (
            <article key={`${order.order_id} ${index}`} className="media">
              <div className="media-left" />
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{order.product_name}</strong>
                  </p>
                  <p>
                    <small>Size: {order.attributes.split(",")[0]}</small>
                  </p>
                  <p>
                    <small>Color: {order.attributes.split(",")[1]}</small>
                  </p>
                  <p>
                    <small>Quantity: {order.quantity}</small>
                  </p>
                  <p>
                    <small>SubTotal: {`$${order.subtotal}`}</small>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
