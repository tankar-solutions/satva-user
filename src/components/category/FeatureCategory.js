import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoChevronForward } from "react-icons/io5";

// Internal imports
import CategoryServices from "@services/CategoryServices";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const FeatureCategory = ({
  className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6",
  itemClassName = "group relative overflow-hidden rounded-xl bg-white shadow transition-all duration-300 border border-gray-100 hover:border-primary-500 hover:shadow-xl",
  imageContainerClassName = "relative w-full aspect-[4/3] overflow-hidden rounded-t-xl",
  imageClassName = "object-cover transition-transform duration-500 group-hover:scale-105",
  overlayClassName = "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:backdrop-blur-[2px] transition-all",
  titleClassName = "absolute bottom-0 left-0 w-full p-4 text-white font-bold text-lg text-center drop-shadow",
  countClassName = "absolute top-3 right-3 bg-white/90 text-gray-900 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm border border-gray-200",
  subcategoryClassName = "text-sm text-gray-600 hover:text-primary-500 transition-colors cursor-pointer flex items-center group/subcat",
}) => {
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
    const category_name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    const url = `/search?category=${category_name}&_id=${id}`;
    router.push(url);
    setIsLoading(!isLoading);
  };

  return (
    <>
      {loading ? (
        <div className={className}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={itemClassName}>
              <div className="animate-pulse bg-gray-200 aspect-[4/3] w-full rounded-t-xl" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          Failed to load categories
        </div>
      ) : (
        <div className={className}>
          {data[0]?.children?.map((category) => (
            <div
              key={category._id}
              className={itemClassName}
              tabIndex={0}
              role="button"
              aria-label={`View category ${showingTranslateValue(category?.name)}`}
              onClick={() =>
                handleCategoryClick(
                  category._id,
                  showingTranslateValue(category?.name)
                )
              }
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCategoryClick(
                    category._id,
                    showingTranslateValue(category?.name)
                  );
                }
              }}
            >
              <div className={imageContainerClassName}>
                <Image
                  src={category.icon || "/default-category-bg.jpg"}
                  alt={showingTranslateValue(category?.name)}
                  fill
                  className={`${imageClassName} rounded-t-xl`}
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
                <div className={overlayClassName} />
                <span className={countClassName}>
                  {category.children?.length || 0} items
                </span>
                <h3 className={titleClassName}>
                  {showingTranslateValue(category?.name)}
                </h3>
              </div>

              <div className="p-4 space-y-2 bg-gray-50 border-t border-gray-100">
                <h3 className="text-center font-semibold text-gray-800 mb-2 truncate">
                  {showingTranslateValue(category?.name)}
                </h3>
                <ul className="space-y-1.5">
                  {category?.children?.slice(0, 3).map((child) => (
                    <li key={child._id}>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(
                            child._id,
                            showingTranslateValue(child?.name)
                          );
                        }}
                        className={subcategoryClassName}
                        tabIndex={0}
                        role="button"
                        aria-label={`View subcategory ${showingTranslateValue(child?.name)}`}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            handleCategoryClick(
                              child._id,
                              showingTranslateValue(child?.name)
                            );
                          }
                        }}
                      >
                        <IoChevronForward className="flex-shrink-0 mr-1 text-xs text-gray-400 group-hover/subcat:text-primary-500" />
                        <span className="truncate">
                          {showingTranslateValue(child?.name)}
                        </span>
                      </div>
                    </li>
                  ))}
                  {category?.children?.length > 3 && (
                    <li>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(
                            category._id,
                            showingTranslateValue(category?.name)
                          );
                        }}
                        className="text-xs text-primary-600 hover:underline cursor-pointer block mt-1 text-center"
                        tabIndex={0}
                        role="button"
                        aria-label={`View all subcategories of ${showingTranslateValue(category?.name)}`}
                      >
                        + View all
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FeatureCategory;
