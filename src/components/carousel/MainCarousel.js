import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const MainCarousel = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue, showingUrl, showingImage } = useUtilsFunction();

  const sliderData = [
    {
      id: 1,
      title: showingTranslateValue(storeCustomizationSetting?.slider?.first_title),
      info: showingTranslateValue(storeCustomizationSetting?.slider?.first_description),
      buttonName: showingTranslateValue(storeCustomizationSetting?.slider?.first_button),
      url: showingUrl(storeCustomizationSetting?.slider?.first_link),
      image: showingImage(storeCustomizationSetting?.slider?.first_img) || "/slider/slider-1.jpg",
    },
    {
      id: 2,
      title: showingTranslateValue(storeCustomizationSetting?.slider?.second_title),
      info: showingTranslateValue(storeCustomizationSetting?.slider?.second_description),
      buttonName: showingTranslateValue(storeCustomizationSetting?.slider?.second_button),
      url: showingUrl(storeCustomizationSetting?.slider?.second_link),
      image: showingImage(storeCustomizationSetting?.slider?.second_img) || "/slider/slider-2.jpg",
    },
    {
      id: 3,
      title: showingTranslateValue(storeCustomizationSetting?.slider?.third_title),
      info: showingTranslateValue(storeCustomizationSetting?.slider?.third_description),
      buttonName: showingTranslateValue(storeCustomizationSetting?.slider?.third_button),
      url: showingUrl(storeCustomizationSetting?.slider?.third_link),
      image: showingImage(storeCustomizationSetting?.slider?.third_img) || "/slider/slider-3.jpg",
    },
    {
      id: 4,
      title: showingTranslateValue(storeCustomizationSetting?.slider?.four_title),
      info: showingTranslateValue(storeCustomizationSetting?.slider?.four_description),
      buttonName: showingTranslateValue(storeCustomizationSetting?.slider?.four_button),
      url: showingUrl(storeCustomizationSetting?.slider?.four_link),
      image: showingImage(storeCustomizationSetting?.slider?.four_img) || "/slider/slider-1.jpg",
    },
    {
      id: 5,
      title: showingTranslateValue(storeCustomizationSetting?.slider?.five_title),
      info: showingTranslateValue(storeCustomizationSetting?.slider?.five_description),
      buttonName: showingTranslateValue(storeCustomizationSetting?.slider?.five_button),
      url: showingUrl(storeCustomizationSetting?.slider?.five_link),
      image: showingImage(storeCustomizationSetting?.slider?.five_img) || "/slider/slider-2.jpg",
    },
  ];

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1000} // Faster transition
        effect="slide" // Changed from "fade" to "slide"
        grabCursor={true}
        preloadImages={true} // Preload images
        pagination={
          (storeCustomizationSetting?.slider?.bottom_dots ||
            storeCustomizationSetting?.slider?.both_slider) && {
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className} bg-white opacity-50 hover:opacity-100 transition-opacity duration-300"></span>`;
            },
          }
        }
        navigation={
          (storeCustomizationSetting?.slider?.left_right_arrow ||
            storeCustomizationSetting?.slider?.both_slider) && {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }
        }
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData?.map((item, i) => (
          <SwiperSlide key={i + 1}>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
              {/* Background Image with Blur Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover w-full h-full"
                  priority={i < 3} // Prioritize first 3 images
                  loading={i < 3 ? "eager" : "lazy"} // Eager load first 3 images
                  quality={100}
                  placeholder="blur"
                  blurDataURL="/placeholder-blur.jpg"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                  <div className="max-w-2xl text-white">
                    <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                      {item.title}
                    </h1>
                    <p className="mb-8 text-lg md:text-xl leading-relaxed drop-shadow-md">
                      {item.info}
                    </p>
                    <Link
                      href={item.url}
                      className="inline-block px-8 py-3 text-lg font-medium text-center text-[#5faf34] bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {item.buttonName}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        {(storeCustomizationSetting?.slider?.left_right_arrow ||
          storeCustomizationSetting?.slider?.both_slider) && (
          <>
            <div className="swiper-button-prev !text-white !w-12 !h-12 !rounded-full !bg-black/30 hover:!bg-black/50 !transition-all !duration-300 after:!text-xl"></div>
            <div className="swiper-button-next !text-white !w-12 !h-12 !rounded-full !bg-black/30 hover:!bg-black/50 !transition-all !duration-300 after:!text-xl"></div>
          </>
        )}
      </Swiper>

      {/* Custom Pagination Position */}
      {(storeCustomizationSetting?.slider?.bottom_dots ||
        storeCustomizationSetting?.slider?.both_slider) && (
        <style jsx global>{`
          .swiper-slide {
            will-change: transform, opacity;
          }
          .swiper-pagination {
            bottom: 20px !important;
          }
          .swiper-pagination-bullet-active {
            background: white !important;
            opacity: 1 !important;
            width: 30px !important;
            border-radius: 4px !important;
          }
        `}</style>
      )}
    </div>
  );
};

export default MainCarousel;