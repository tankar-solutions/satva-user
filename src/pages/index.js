import { SidebarContext } from "@context/SidebarContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Tab from "react-bootstrap/Tab";

//internal import
import FeatureCategory from "@components/category/FeatureCategory";
import Layout from "@layout/Layout";
import Banner from "@components/banner/Banner";
import useGetSetting from "@hooks/useGetSetting";
import StickyCart from "@components/cart/StickyCart";
import Loading from "@components/preloader/Loading";
import ProductServices from "@services/ProductServices";
import MainCarousel from "@components/carousel/MainCarousel";
import AttributeServices from "@services/AttributeServices";
import PhotoGallery from "@components/slider/PhotoGallery";
import ProductCard from "@components/product/Homeproduct"; // Import ProductCard

const Home = ({ popularProducts, attributes }) => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { storeCustomizationSetting } = useGetSetting();

  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            <StickyCart />
            <div className="bg-white">
              <div className="mx-auto py-5 max-w-screen-3xl px-3 sm:px-10">
                <div className="flex w-full">
                  <div className="flex-shrink-0 xl:pr-6 lg:block w-full  lg:h-[50%]">
                    <MainCarousel />
                  </div>
                </div>
                {storeCustomizationSetting?.home?.promotion_banner_status && (
                  <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6">
                    <Banner />
                  </div>
                )}
              </div>
            </div>

            {/* feature category's */}
            {storeCustomizationSetting?.home?.featured_status && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl font-serif tracking-tight">
                      Nourishing Earth, Growing Health
                    </h2>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                      Our Categories
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className=" w-full max-w-4xl h-full blur-3xl rounded-full"></div>
                    </div>


                    <FeatureCategory
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10"
                      itemClassName="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-primary-200"
                      imageClassName="w-full h-56 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                      overlayClassName="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      titleClassName="absolute bottom-6 left-6 text-white font-semibold text-xl sm:text-2xl opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                      countClassName="absolute top-5 right-5 bg-white/90 text-gray-900 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300"
                      infoClassName="absolute bottom-0 left-0 w-full p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                    />
                    {/* Replace FeatureCategory with Product Grid */}
                    {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
                      {popularProducts?.slice(0, 5).map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          attributes={attributes}
                        />
                      ))}
                    </div> */}
                  </div>

                  <div className="mt-16 text-center">

                    <button className="inline-flex items-center px-8 py-3.5 bg-primary-600 hover:bg-[#5faf34]
                     text-black hover:text-white font-medium rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none"  
                    onClick={() => router.push("/search?category=medicine&_id=6822d273a4bb520067068be1")}>
                      View All Categories
                      <svg
                        className="ml-2 -mr-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* About Section */}
            <section className="about-section pt-20 pb-28">
              <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Image Grid - LEFT SIDE */}
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                      <img
                      
                        src="/about/about1.jpg"
                        alt="About"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                      <img
                        src="/about/about3.jpg"
                        alt="About"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                    <div className="flex items-center">
                      <img
                        src="/about/about2.jpg"
                        alt="About"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Text Content - RIGHT SIDE */}
                  <div className="flex-1">
                    <div className="about-content">
                      <div className="section-title mb-6">
                        <span className="sub-title text-orange-500 text-2xl font-semibold mb-2 block">
                          About Company
                        </span>
                        <h2 className="text-3xl font-bold leading-snug mb-4">
                          Botanical Based Bio-Pesticides Manufacturer In India
                        </h2>
                      </div>

                      <Tab.Container defaultActiveKey="vegetables">
                        <Tab.Content>
                          <Tab.Pane eventKey="vegetables">
                            <p className="text-gray-700 leading-relaxed">
                              Satvacare provides ECOCERT-approved, NOP-NPOP
                              certified, and patented organic pest management
                              solutions including bio-insecticides, fungicides,
                              acaricides, adjuvants, and CIBRC-certified
                              neem-based products. With a strong focus on
                              reducing production costs for farmers, Satvacare
                              promotes biodiversity and healthy living by
                              replacing harmful chemical pesticides with
                              botanical-based, eco-friendly alternatives that
                              meet global export standards and protect the
                              environment.
                            </p>
                          </Tab.Pane>
                          <Tab.Pane eventKey="agriculture">
                            <p className="text-gray-700 leading-relaxed">
                              On the other hand we denounce with righteous
                              indignation and dislike men who are beguiled and
                              demoralized by the charms of pleasure of the
                              moment so blinded by desire, that they cannot
                              foresee the pain.
                            </p>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* promotional banner card */}
            <section className="gallery-area pt-130 rpt-100">
              <PhotoGallery />
            </section>
          </div>
        </Layout>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? query : "",
    }),

    AttributeServices.getShowingAttributes(),
  ]);

  return {
    props: {
      attributes,
      cookies: cookies,
      popularProducts: data.popularProducts,
      discountProducts: data.discountedProducts,
    },
  };
};

export default Home;
