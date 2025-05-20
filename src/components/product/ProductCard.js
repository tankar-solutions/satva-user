import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { IoAdd, IoBagAddSharp, IoRemove } from "react-icons/io5";
import { useCart } from "react-use-cart";

import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import useGetSetting from "@hooks/useGetSetting";
import Discount from "@components/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@components/modal/ProductModal";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import { handleLogEvent } from "src/lib/analytics";

const ProductCard = ({ product, attributes }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { globalSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const currency = globalSetting?.default_currency || "₹";

  const handleAddItem = (p) => {
    if (p.stock < 1) return notifyError("Insufficient stock!");

    if (p?.variants?.length > 0) {
      setModalOpen(!modalOpen);
      return;
    }
    const { slug, variants, categories, description, ...updatedProduct } =
      product;
    const newItem = {
      ...updatedProduct,
      title: showingTranslateValue(p?.title),
      id: p._id,
      variant: p.prices,
      price: p.prices.price,
      originalPrice: product.prices?.originalPrice,
    };
    addItem(newItem);
  };

  const handleModalOpen = (event, id) => {
    setModalOpen(event);
  };

  return (
    <>
      {modalOpen && (
        <ProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={product}
          currency={currency}
          attributes={attributes}
        />
      )}

      <div
        className={`group relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center transition-transform transform duration-300 ease-in-out
          hover:scale-[1.05] hover:shadow-xl cursor-pointer select-none 
          ${
            product.stock < 1 ? "opacity-70 pointer-events-none" : ""
          }`}
      >
        {/* Stock & Discount badges */}
        <div className="w-full flex justify-between px-5 pt-5">
          <Stock
            product={product}
            stock={product.stock}
            card
          />
          <Discount
            product={product}
          />
        </div>

        {/* Product Image with hover zoom */}
        <div
          onClick={() => {
            handleModalOpen(!modalOpen, product._id);
            handleLogEvent(
              "product",
              `opened ${showingTranslateValue(product?.title)} product modal`
            );
          }}
          className="relative w-full h-60 flex justify-center items-center p-5 cursor-zoom-in overflow-hidden"
        >
          {product.image[0] ? (
            <ImageWithFallback
              src={product.image[0]}
              alt={showingTranslateValue(product?.title)}
              className="object-contain rounded-xl transition-transform duration-500 group-hover:scale-110"
              style={{ maxHeight: "180px", width: "auto" }}
            />
          ) : (
            <Image
              src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
              fill
              style={{ objectFit: "contain" }}
              sizes="100%"
              alt="product"
              className="rounded-xl"
            />
          )}
          {product.stock < 1 && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl">
              <span className="text-white font-bold text-xl tracking-wide">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="w-full px-6 pb-6 flex flex-col gap-3">
          <span className="text-gray-500 text-xs uppercase tracking-widest font-semibold select-text">
            {product.unit}
          </span>
          <h2 className="text-gray-800 text-xl font-semibold line-clamp-2 select-text">
            {showingTranslateValue(product?.title)}
          </h2>

          <div className="flex justify-between items-center mt-2">
            <Price
              card
              product={product}
              currency={currency}
              price={
                product?.isCombination
                  ? product?.variants[0]?.price
                  : product?.prices?.price
              }
              originalPrice={
                product?.isCombination
                  ? product?.variants[0]?.originalPrice
                  : product?.prices?.originalPrice
              }
            />

            {/* Cart controls */}
            {inCart(product._id) ? (
              <div className="flex items-center space-x-3 bg-emerald-600 rounded-full px-4 py-1 select-none shadow-lg">
                {items.map(
                  (item) =>
                    item.id === product._id && (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          className="bg-white hover:bg-gray-100 text-emerald-600 rounded-full p-2 shadow-md transition transform hover:scale-110 active:scale-95"
                        >
                          <IoRemove size={20} />
                        </button>
                        <p className="text-white font-semibold text-base font-serif min-w-[24px] text-center select-text">
                          {item.quantity}
                        </p>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            item?.variants?.length > 0
                              ? handleAddItem(item)
                              : handleIncreaseQuantity(item)
                          }
                          className="bg-white hover:bg-gray-100 text-emerald-600 rounded-full p-2 shadow-md transition transform hover:scale-110 active:scale-95"
                        >
                          <IoAdd size={20} />
                        </button>
                      </div>
                    )
                )}
              </div>
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                aria-label="Add to cart"
                className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-shadow shadow-md hover:shadow-xl active:scale-95"
              >
                <IoBagAddSharp size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
