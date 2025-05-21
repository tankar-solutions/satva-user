import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import Tab from "react-bootstrap/Tab";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//internal import
import Layout from "@layout/Layout";
import useFilter from "@hooks/useFilter";
import Card from "@components/cta-card/Card";
import Loading from "@components/preloader/Loading";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import { SidebarContext } from "@context/SidebarContext";
import AttributeServices from "@services/AttributeServices";

const Search = ({ products, attributes }) => {
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const [visibleProduct, setVisibleProduct] = useState(18);

  useEffect(() => {
    setIsLoading(false);
  }, [products]);

  const { setSortedField, productData } = useFilter(products);

  return (
    <Layout title="Search" description="This is search page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="flex py-10 lg:py-12">
          <div className="flex w-full">
            <div className="w-full ">
              <div className="w-full grid grid-col gap-6 grid-cols-1 2xl:gap-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 mb-20 ">
                <Card />
              </div>

              <section className="about-section pt-20 pb-28">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content - LEFT SIDE */}
                    <div className="flex-1">
                      <div className="about-two-content wow fadeInUp delay-0-4s">
                        <div className="section-title mb-6">
                          <span className="sub-title text-[#ef8201] text-2xl font-semibold mb-2 block">
                            Our Products
                          </span>
                          <h2 className="text-3xl font-bold leading-snug mb-4">
                            Fresh. Organic. Delivered.
                          </h2>
                        </div>

                        <Tab.Container defaultActiveKey="vegetables">
                          <Tab.Content>
                            <Tab.Pane eventKey="vegetables">
                              <p className="text-gray-700 leading-relaxed">
                                Discover our range of handpicked, organic
                                products-grown and harvested with care, and
                                delivered fresh to your door. From vibrant
                                vegetables and fruits to wholesome eggs and
                                bakery, we bring you the best of nature's
                                bounty.
                              </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      </div>
                    </div>
                    
                    {/* Image Grid - RIGHT SIDE */}
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <img
                        className="image"
                        src="/about/about4.jpg"
                        alt="Our Products"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {productData?.length === 0 ? (
                <div className="mx-auto p-5 my-5">
                  <Image
                    className="my-4 mx-auto"
                    src="/no-result.svg"
                    alt="no-result"
                    width={400}
                    height={380}
                  />
                  <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium font-serif text-gray-600">
                    {t("common:sorryText")} 😞
                  </h2>
                </div>
              ) : (
                <div className="flex justify-between my-3 bg-orange-100 border border-gray-100 rounded p-3">
                  <h6 className="text-sm font-serif">
                    {t("common:totalI")}{" "}
                    <span className="font-bold">{productData?.length}</span>{" "}
                    {t("common:itemsFound")}
                  </h6>
                  <span className="text-sm font-serif">
                    <select
                      onChange={(e) => setSortedField(e.target.value)}
                      className="py-0 text-sm font-serif font-medium block w-full rounded border-0 bg-white pr-10 cursor-pointer focus:ring-0"
                    >
                      <option className="px-3" value="All" defaultValue hidden>
                        {t("common:sortByPrice")}
                      </option>
                      <option className="px-3" value="Low">
                        {t("common:lowToHigh")}
                      </option>
                      <option className="px-3" value="High">
                        {t("common:highToLow")}
                      </option>
                    </select>
                  </span>
                </div>
              )}

              {isLoading ? (
                <Loading loading={isLoading} />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {productData?.slice(0, visibleProduct).map((product, i) => (
                      <ProductCard
                        key={i + 1}
                        product={product}
                        attributes={attributes}
                      />
                    ))}
                  </div>

                  {productData?.length > visibleProduct && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setVisibleProduct((pre) => pre + 9)}
                        className="w-auto mx-auto md:text-sm leading-5 flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none bg-indigo-100 text-gray-700 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-[#5faf34] h-12 text-sm lg:text-sm"
                      >
                        {t("common:loadMoreBtn")}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? encodeURIComponent(query) : "",
    }),
    AttributeServices.getShowingAttributes({}),
  ]);

  return {
    props: {
      attributes,
      products: data?.products,
    },
  };
};