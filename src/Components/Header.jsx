import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import { removeFromCart } from "../features/products/productsSlice";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle the sidebar
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.products.cart); // Select cart items from Redux ,this  will used to display the items added in cart 

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);

  return (
    <>
      <div className="flex justify-around items-center p-3 mt-4">
        {/* Search bar */}
        <form className="md:flex hidden  items-center relative justify-center md:w-[18%] w-[40%] shadow-xl border-b-[1px] border-black">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className=" w-full">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-10 p-4"
              placeholder="Search Anything"
              required
            />
          </div>
          <div className="absolute end-0">
            <SearchOutlinedIcon />
          </div>
        </form>

        {/* Logo */}
        <div className="w-[45%] flex items-center justify-center">
          <h1 className="font-bold text-4xl">Helendo</h1>
        </div>

        {/* Icons */}
        <div className="md:w-[20%] w-[45%] flex justify-evenly">
          <PermIdentityOutlinedIcon style={{ fontWeight: "lighter" }} />
          <div className="relative">

            <FavoriteBorderOutlinedIcon style={{ fontWeight: "lighter" }} />
            <div className="absolute right-[-5px] bottom-[-8px]  bg-yellow-200 rounded-lg w-4 h-4 flex justify-center items-center ">
              <span className="text-black  text-xs">0</span>
            </div>
          </div>
          <div className="relative">

            <ShoppingBagOutlinedIcon style={{ fontWeight: "lighter", cursor: "pointer" }} onClick={() => setIsSidebarOpen(true)} />
            <div className="absolute right-[-5px] bottom-[-8px]  bg-yellow-200 rounded-lg w-4 h-4 flex justify-center items-center ">
              <span className="text-black  text-xs">{cartItems.length}</span>
            </div>
          </div>
          <DensityMediumOutlinedIcon
            style={{ fontWeight: "lighter", cursor: "pointer" }}

          />
        </div>
      </div>

      {/* Sidebar Modal */}

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-white w-[75%] md:w-[30%] h-full p-6 shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              onClick={() => setIsSidebarOpen(false)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

            {
              cartItems.length === 0 ? (
                <div className="flex justify-center items-center flex-col">
                  {/* <h1>Empty Cart</h1> */}
                  <img src="/empty.jpg" className="md:w-[85%]" alt="" />
                </div>
              ) : (
                <>


                  <div className="flex flex-col gap-4 overflow-y-auto h-[65%]">
                  {/* items are been mapped and rendered */}
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.Name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-bold text-lg">{item.Name}</h3>
                            <p className="text-gray-600">Qty: {item.quantity}</p>
                            <p className="text-gray-800 font-semibold">
                              Price: ${item.Price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        {/* here we call the removecart with the id of the item to be removed  */}
                        <button className="text-gray-500 hover:text-black" onClick={() => dispatch(removeFromCart(item.id))}>&times;</button>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal and Actions */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center text-lg font-bold mb-4">
                      <span>Subtotal:</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded-lg mb-4 hover:bg-gray-800">
                      View cart
                    </button>
                    <button className="w-full border border-black py-2 rounded-lg hover:bg-gray-100">
                      Checkout
                    </button>
                  </div>
                </>
              )
            }

          </div>
        </div>
      )}
    </>
  );
};

export default Header;
