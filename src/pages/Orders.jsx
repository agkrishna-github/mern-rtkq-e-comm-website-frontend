import React from "react";
import { useGetOrdersQuery } from "../features/userApiSlice";

function Orders() {
  const { isSuccess, isError, isLoading, data } = useGetOrdersQuery();

  console.log(data);
  return (
    <section>
      {data?.map((order) => (
        <div className="bgg">
          {order?.orderItems.map((item) => (
            <div key={item?._id} className="bgr p-3 mt-3">
              <h3>{item._id}</h3>
              <h4>{item.title}</h4>
              <p>
                Color:{" "}
                <span
                  className="d-inline-block rounded-circle"
                  style={{
                    width: "25px",
                    height: "25px",
                    backgroundColor: `${item.color}`,
                  }}
                ></span>
              </p>
              <div className="mt-2">
                Rs. <b>{item.price}</b>
              </div>
              <div className="mt-2">
                Qty : <b>{item.quantity}</b>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Orders;
