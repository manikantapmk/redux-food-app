import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"; // Import star icons

const CardDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const getData = useSelector((state) => state.cartReducer.carts);

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id;
    });
    return compareData;
  };

  useEffect(() => {
    setData(compare());
  }, [id]);

  // Function to render the star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <div className="flex items-center gap-1">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className="w-4 h-4 text-yellow-300" />
        ))}

        {/* Half star */}
        {hasHalfStar && <FaStarHalfAlt className="w-4 h-4 text-yellow-300" />}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        {data.map((eachI) => (
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16" key={eachI.id}>
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto rounded-lg overflow-hidden">
              <img
                className="w-full hidden dark:block"
                src={eachI.imgdata}
                alt={eachI.rname}
              />
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="text-md">
                    <span className="font-semibold">Restaurant</span> : {eachI.rname}
                  </p>
                  <p className="text-md">
                    <span className="font-semibold">Price</span> : ₹ {eachI.price}/-
                  </p>
                  <p className="text-md">
                    <span className="font-semibold">Dishes</span> : {eachI.address}
                  </p>
                  <p className="text-md">
                    <span className="font-semibold">Total</span> : ₹ 300/-
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-md flex gap-2">
                    <span className="font-semibold">Rating</span>
                    {renderStars(eachI.rating)} {/* Render the stars here */}
                  </p>
                  <p className="text-md">
                    <span className="font-semibold">Overview</span> : {eachI.somedata}
                  </p>
                  <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                    <a
                      href="#"
                      title=""
                      className="text-black mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-between gap-3 border-blue-500 border-2"
                      role="button"
                    >
                      <span className="text-red-500 hover:text-red-700">
                        <MdDelete />
                      </span>
                      Remove from Cart
                    </a>
                  </div>
                </div>
              </div>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardDetails;
