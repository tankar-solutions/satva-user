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
        className={`group relative bg-white 
          rounded-3xl border-2 border-gray-100 shadow-lg overflow-hidden flex flex-col items-center 
          transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-[#5faf34]
          cursor-pointer select-none ${
            product.stock < 1 ? "opacity-70 pointer-events-none" : ""
          }`}
      >
        {/* Stock & Discount badges */}
        {/* <div className="w-full flex justify-between px-5 pt-5 z-10">
          <Stock product={product} stock={product.stock} card />
          <Discount product={product} />
        </div> */}

        {/* Product Image with hover zoom */}
        <div
          onClick={() => {
            handleModalOpen(!modalOpen, product._id);
            handleLogEvent(
              "product",
              `opened ${showingTranslateValue(product?.title)} product modal`
            );
          }}
          className="relative w-full aspect-[4/3] flex justify-center items-center bg-white cursor-zoom-in overflow-hidden group"
        >
          {product.image[0] ? (
            <ImageWithFallback
              src={product.image[0]}
              alt={showingTranslateValue(product?.title)}
              fill
              className="object-contain rounded-xl transition-transform duration-500 group-hover:scale-110"
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <Image
              src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
        <div className="w-full px-5 pb-5 pt-3 flex flex-col gap-2">
          <span className="text-gray-500 text-xs uppercase tracking-widest font-medium select-text">
            {product.unit}
          </span>
          <h2 className="text-gray-800 text-lg font-semibold line-clamp-2 select-text">
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
            //   originalPrice={
            //     product?.isCombination
            //       ? product?.variants[0]?.originalPrice
            //       : product?.prices?.originalPrice
            //   }
            />

            {/* Cart controls */}
            {/* {inCart(product._id) ? (
              <div className="flex items-center space-x-2 bg-[#5faf34] rounded-full px-3 py-1 select-none shadow-md">
                {items.map(
                  (item) =>
                    item.id === product._id && (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3"
                      >
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          className="bg-white hover:bg-gray-100 text-[#5faf34] rounded-full p-1.5 shadow-sm transition transform hover:scale-110 active:scale-95"
                        >
                          <IoRemove size={18} />
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
                          className="bg-white hover:bg-gray-100 text-[#5faf34] rounded-full p-1.5 shadow-sm transition transform hover:scale-110 active:scale-95"
                        >
                          <IoAdd size={18} />
                        </button>
                      </div>
                    )
                )}
              </div>
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                aria-label="Add to cart"
                className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-[#5faf34] text-[#5faf34] hover:bg-[#5faf34] hover:text-white transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                <IoBagAddSharp size={20} />
              </button>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
