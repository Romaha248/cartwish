import React, { useEffect, useState } from "react";

import "./MyOrderPage.css";
import Table from "../Common/Table";
import { getOrdersAPI } from "../../services/orderServices";
import { toast } from "react-toastify";

const MyOrderPage = () => {
  const [orders, getOrders] = useState([]);
  const toastId = "fetch-orders-error";

  useEffect(() => {
    getOrdersAPI()
      .then((response) => {
        getOrders(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch orders.", { toastId });
      });
  }, []);

  console.log(orders);

  return (
    <section className="align_center myorder_page">
      {orders && (
        <Table headings={["Order", "Product", "Total", "Status"]}>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {order.products
                    .map(
                      (product) =>
                        `${product.product.title}(${product.quantity})`
                    )
                    .join(", ")}
                </td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default MyOrderPage;
