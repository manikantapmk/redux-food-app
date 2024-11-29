import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { DEL, incrementQuantity, decrementQuantity } from "../redux/actions/action";

const Navbar = () => {
  const getData = useSelector((state) => state.cartReducer.carts);
  const [dropDown, setDropDown] = useState(false);
  const [price, setPrice] = useState(0);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const dispatch = useDispatch();

  const toggleDropdown = () => setDropDown((prevState) => !prevState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropDown(false);
  }, [location]);

  const totalPrice = () => {
    let total = 0; // Initialize total to 0
    getData.forEach((item) => {
      total += item.price * item.quantity; // Multiply price by quantity and add to total
    });
    setPrice(total); // Update the state with the calculated total
  };
  
  useEffect(() => {
    totalPrice();
  }, [getData]); // Recalculate whenever cart data changes

  const handleDelete = (id) => {
    dispatch(DEL(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Home
                </Link>
                <Link
                  to="/view-cart"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>

          <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              onClick={toggleDropdown}
              className="text-2xl relative -top-1 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -top-1 left-5 rounded-full bg-blue-700 text-sm px-1 text-white">
                {getData.length}
              </span>
              <FaShoppingCart />
            </button>
          </div>

          {dropDown && (
            <div
              ref={dropdownRef}
              className="absolute top-16 right-0 gap-4 border-b p-4 mb-4 bg-slate-100 rounded-sm max-h-lvh overflow-y-scroll"
            >
              <div className="flex min-w-[512px] w-full justify-between border-b-4 border-blue-950">
                <h1 className="font-bold">Photo</h1>
                <h4 className="font-bold">Restaurant Name</h4>
              </div>

              {getData.length === 0 ? (
                <h1 className="text-3xl text-center">No Products Added</h1>
              ) : (
                <div>
                  {getData.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="grid grid-cols-3 bg-slate-50 p-3 rounded-lg"
                    >
                      <Link to={`/view-cart/${item.id}`}>
                        <img
                          src={item.imgdata}
                          alt={item.rname}
                          className="w-40 min-h-30 max-h-[100px] rounded object-cover"
                        />
                      </Link>
                      <div className="flex-1 ml-4">
                        <h3 className="font-semibold">{item.rname}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹ {item.price}/-</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.qty}</span>
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-2xl inline-flex items-center justify-end"
                      >
                        <span className="text-red-500 hover:text-red-700">
                          <MdDelete />
                        </span>
                      </button>
                    </div>
                  ))}
                  <h6 className="text-lg border-t">
                    Total : <span className="font-semibold">₹ {price}</span>
                  </h6>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
