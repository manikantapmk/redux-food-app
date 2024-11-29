import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { DEL, incrementQuantity, decrementQuantity } from "../redux/actions/action";

const CardDetails = () => {
  const [itemData, setItemData] = useState(null); // Store the selected item
  const { id } = useParams();
  const cartItems = useSelector((state) => state.cartReducer.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the selected item's data
  useEffect(() => {
    const selectedItem = cartItems.find((item) => item.id === Number(id));
    if (selectedItem) {
      setItemData(selectedItem);
    }
  }, [id, cartItems]);

  // Render the star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className="w-4 h-4 text-yellow-300" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="w-4 h-4 text-yellow-300" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  // Handle increment
  const handleIncrement = () => {
    if (itemData) {
      dispatch(incrementQuantity(itemData.id));
      setItemData({ ...itemData, quantity: itemData.quantity + 1 });
    }
  };

  // Handle decrement
  const handleDecrement = () => {
    if (itemData && itemData.quantity > 1) {
      dispatch(decrementQuantity(itemData.id));
      setItemData({ ...itemData, quantity: itemData.quantity - 1 });
    }
  };

  // Handle delete
  const handleDelete = () => {
    dispatch(DEL(itemData.id));
    navigate("/");
  };

  if (!itemData) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Image Section */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto h-[340px] rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={itemData.imgdata}
              alt={itemData.rname}
            />
          </div>

          {/* Details Section */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="flex flex-col gap-2">
                <p className="text-md">
                  <span className="font-semibold">Restaurant</span>: {itemData.rname}
                </p>
                <p className="text-md">
                  <span className="font-semibold">Price</span>: ₹ {itemData.price}/-
                </p>
                <p className="text-md">
                  <span className="font-semibold">Dishes</span>: {itemData.address}
                </p>
                <p className="text-md">
                  <span className="font-semibold">Total</span>: ₹{" "}
                  {itemData.price * itemData.quantity}/-
                </p>
                <div className="inline-flex items-center bg-slate-300 justify-start space-x-4 w-1/3">
                  {/* Decrement Button */}
                  <button
                    onClick={handleDecrement}
                    className="text-xl font-bold px-4 py-1 bg-slate-300 text-white hover:bg-slate-400 focus:outline-none"
                  >
                    -
                  </button>
                  {/* Quantity */}
                  <span className="text-2xl font-semibold">{itemData.quantity}</span>
                  {/* Increment Button */}
                  <button
                    onClick={handleIncrement}
                    className="text-xl font-bold px-4 py-1 bg-slate-300 text-white hover:bg-slate-400 focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-2">
                <p className="text-md flex gap-2">
                  <span className="font-semibold">Rating</span>
                  {renderStars(itemData.rating)}
                </p>
                <p className="text-md">
                  <span className="font-semibold">Overview</span>: {itemData.somedata}
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleDelete}
                    className="text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-3 border-blue-500 border-2"
                  >
                    <span className="text-red-500 hover:text-red-700">
                      <MdDelete />
                    </span>
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardDetails;
