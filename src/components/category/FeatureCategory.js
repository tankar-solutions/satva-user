import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoChevronForwardSharp } from "react-icons/io5";

//internal import
import CategoryServices from "@services/CategoryServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const FeatureCategory = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await CategoryServices.getShowingCategory(),
  });

  const handleCategoryClick = (id, categoryName) => {
    const category_name = categoryName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");
    const url = `/search?category=${category_name}&_id=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  return (
    <>
      {loading ? (
        <CMSkeleton count={10} height={20} error={error} loading={loading} />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
          {data[0]?.children?.map((category, i) => (
            <li className="group" key={i + 1}>
              <div
                className="flex flex-col items-center justify-between text-center border border-gray-100 shadow-sm bg-white p-5 cursor-pointer transition duration-300 ease-in-out transform hover:shadow-lg hover:bg-orange-50 h-68 w-56 rounded-md"
                onClick={() =>
                  handleCategoryClick(
                    category._id,
                    showingTranslateValue(category?.name)
                  )
                }
              >
                <div className="mb-3">
                  <Image
                    src={category?.icon || "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"}
                    alt="category"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-sm text-gray-700 font-semibold group-hover:text-orange-500 mb-2 line-clamp-1">
                  {showingTranslateValue(category?.name)}
                </h3>

                <ul className="space-y-1">
                  {category?.children?.slice(0, 3).map((child) => (
                    <li
                      key={child._id}
                      className="transition-all duration-150 hover:ml-1"
                    >
                      <a
                        onClick={(e) => {
                          e.stopPropagation(); // prevent parent click
                          handleCategoryClick(
                            child._id,
                            showingTranslateValue(child?.name)
                          );
                        }}
                        className="flex items-center text-xs text-gray-400 font-serif hover:text-orange-500 cursor-pointer"
                      >
                        <IoChevronForwardSharp className="mr-1" />
                        {showingTranslateValue(child?.name)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FeatureCategory;