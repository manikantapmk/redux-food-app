import React, { useState } from "react";
import { CardsData } from "./CardsData";
import { useDispatch } from "react-redux";

import { ADD } from "../redux/actions/action";

const Cards = () => {
  const [data, setData] = useState(CardsData);
  // console.log(data);

  const dispatch = useDispatch();

 const send = (product) => {
  dispatch({ type: "ADD_CART", payload: product });
};

  return (
    <section>
      <div className="container py-5">
        <h1 className="text-3xl font-bold text-center">Add to Cart Projects</h1>
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center place-content-between">
          {data.map((prod) => {
            const { id, rname, imgdata, address, price } = prod;
            return (
              <div
                key={id}
                className="min-w-[300px] rounded-lg bg-base-100 w-64 overflow-hidden shadow-md"
              >
                <figure>
                  <img className="h-[200px] w-full" src={imgdata} alt={rname} />
                </figure>
                <div className="card-body flex flex-col gap-4 p-4">
                  <h2 className="text-lg font-semibold">{rname}</h2>
                  <p>{address}</p>
                  <p className="font-bold text-sm">
                    <span className="bg-yellow-300 px-2 py-1 rounded-xl">
                      ₹ {price}
                    </span>
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => send(prod)}
                      className="text-white bg-blue-800 hover:bg-blue-600 duration-300 px-4 py-1 rounded-md shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Cards;
