import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts,addToCart  } from '../features/products/productsSlice';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    //this is where the api call is made with use of useDispatch
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleIconClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity when modal opens
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // Here we send the selected product with quantiy to be stored in state.
    dispatch(addToCart({ ...selectedProduct, quantity }));
    // closeModal(); // Close modal after adding to cart
  };

  return (
    <div className="container  px-4 mt-10">

    <div className='ml-5'> 
      <span>Showing Products </span>
      <span className='ml-3'>|</span>
      <span className='ml-3'>Sort by : Default</span>
      <span><KeyboardArrowDownOutlinedIcon/></span>
    </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* items are been mapped and rendered */}

        {products.map((product) => (
          <li
            key={product.id}
            className="relative bg-white p-4 rounded-lg flex flex-col items-center group"
          >
            <div className="relative w-full h-50 cursor-pointer overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.Name}
                className="w-full h-50 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-4">
                <div className="bg-white md:w-8 md:h-8 w-7 h-7 rounded-full flex items-center justify-center">


                  <AddOutlinedIcon
                    className="text-black md:text-3xl text-sm cursor-pointer"
                    onClick={() => handleIconClick(product)}
                  />
                </div>
                <div className="bg-white md:w-8 md:h-8 w-7 h-7 rounded-full flex items-center justify-center">


                  <FavoriteBorderOutlinedIcon className="text-black md:text-3xl text-sm" />
                </div>
                <div className="bg-white md:w-8 md:h-8 w-7 h-7 rounded-full flex items-center justify-center">
                  <ShoppingBagOutlinedIcon className="text-black md:text-3xl text-sm" />
                </div>
                </div>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-center mt-4">{product.Name}</h2>
            <p className="text-gray-500 font-bold mt-2">${product.Price}</p>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white w-11/12 md:w-[70%]   rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.Name}
                className="w-[100%] md:w-1/2 md:h-auto h-[200px] rounded-lg object-cover"
              />
              <div className="">
                <h2 className="text-2xl font-thin mb-2">{selectedProduct.Name}</h2>
                <div className="flex items-center gap-2  mb-2">
                  <span className='font-bold text-sm'>Available :</span>
                  <span className="text-green-500 text-sm">in stock</span>
                </div>
                <p className="text-2xl font-semibold text-gray-800 mb-2">
                ${selectedProduct.Price}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedProduct.description ||
                    'At vero accusamus et iusto odio dignissimos blanditiis praesentium dolores molest.'}
                </p>
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-bold">SKU:</span> {selectedProduct.SKU || 'N/A'}
                  </p>
                  <p>
                    <span className="font-bold">Categories:</span>{' '}
                    {selectedProduct.Category || 'N/A'}
                  </p>
                  <p>
                    <span className="font-bold">Tag:</span> {selectedProduct.tag}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                    <button className="px-3 py-1 text-gray-600" onClick={decrementQuantity}>
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 text-center border-l border-r border-gray-300"
                    />
                    <button className="px-3 py-1 text-gray-600" onClick={incrementQuantity}>
                      +
                    </button>
                  </div>
                  <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800" onClick={handleAddToCart}>
                    Add to cart
                  </button>
                  <button className="border border-gray-300 px-3 py-2 rounded hover:bg-gray-100">
                    <FavoriteBorderOutlinedIcon/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
