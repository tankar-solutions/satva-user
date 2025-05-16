import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { IoLockOpenOutline } from "react-icons/io5";
import { FiPhoneCall, FiUser } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo } from "react";

// internal import
import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const NavBarTop = () => {
  const router = useRouter();
  const userInfo = getUserSession();
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const handleLogOut = () => {
    signOut();
    Cookies.remove("couponInfo");
    router.push("/");
  };

  useEffect(() => {
    if (userInfo?.token) {
      try {
        const decoded = jwtDecode(userInfo.token);
        const expireTime = new Date(decoded.exp * 1000);
        const currentTime = new Date();

        if (currentTime >= expireTime) {
          console.log("Token expired, signing out...");
          handleLogOut();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // Helper to check if a link is active
  const isActive = (href) => router.pathname === href;

  const navItems = useMemo(() => {
    const items = [];

    if (storeCustomizationSetting?.navbar?.about_menu_status) {
      items.push({
        key: "about",
        href: "/about-us",
        content: (
          <Link
            href="/about-us"
            className={`flex items-center gap-1 px-2 py-1 rounded transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 ${
              isActive("/about-us") ? "text-emerald-600 font-semibold underline" : ""
            }`}
            aria-current={isActive("/about-us") ? "page" : undefined}
          >
            {showingTranslateValue(storeCustomizationSetting?.navbar?.about_us)}
          </Link>
        ),
      });
    }

    if (storeCustomizationSetting?.navbar?.contact_menu_status) {
      items.push({
        key: "contact",
        href: "/contact-us",
        content: (
          <Link
            href="/contact-us"
            className={`flex items-center gap-1 px-2 py-1 rounded transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 ${
              isActive("/contact-us") ? "text-emerald-600 font-semibold underline" : ""
            }`}
            aria-current={isActive("/contact-us") ? "page" : undefined}
          >
            {showingTranslateValue(storeCustomizationSetting?.navbar?.contact_us)}
          </Link>
        ),
      });
    }

    items.push({
      key: "account",
      href: "/user/my-account",
      content: (
        <Link
          href="/user/my-account"
          className={`flex items-center gap-1 px-2 py-1 rounded transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 ${
            isActive("/user/my-account") ? "text-emerald-600 font-semibold underline" : ""
          }`}
          aria-current={isActive("/user/my-account") ? "page" : undefined}
        >
          {showingTranslateValue(storeCustomizationSetting?.navbar?.my_account)}
        </Link>
      ),
    });

    items.push({
      key: "auth",
      content: userInfo?.email ? (
        <button
          onClick={handleLogOut}
          className="flex items-center gap-1 px-2 py-1 rounded font-medium transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 focus:outline-none"
          aria-label="Logout"
        >
          <IoLockOpenOutline className="text-lg" />
          {showingTranslateValue(storeCustomizationSetting?.navbar?.logout)}
        </button>
      ) : (
        <Link
          href="/auth/login"
          className={`flex items-center gap-1 px-2 py-1 rounded font-medium transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 ${
            isActive("/auth/login") ? "text-emerald-600 font-semibold underline" : ""
          }`}
          aria-label="Login"
          aria-current={isActive("/auth/login") ? "page" : undefined}
        >
          <FiUser className="text-lg" />
          {showingTranslateValue(storeCustomizationSetting?.navbar?.login)}
        </Link>
      ),
    });

    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeCustomizationSetting, userInfo, showingTranslateValue, router.pathname]);

  const phoneNumber = storeCustomizationSetting?.navbar?.phone || "+099949343";
  const helpText = showingTranslateValue(storeCustomizationSetting?.navbar?.help_text);

  return (
    <nav
      aria-label="Top Navigation"
      className="hidden lg:block bg-emerald-500 border-b shadow-sm"
    >
      <div className="max-w-screen-3xl mx-auto px-3 sm:px-10">
        <div className="flex justify-between items-center py-2 text-xs font-medium font-sans text-gray-700">
          {/* Phone/Help Section */}
          <span className="flex items-center space-x-2 text-white">
            <FiPhoneCall className="text-emerald-500" size={16} />
            <span>{helpText}</span>
            <a
              href={`tel:${phoneNumber}`}
              className="font-bold text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
            >
              {phoneNumber}
            </a>
          </span>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-2 text-white">
            {navItems.map((item, index) => (
              <li key={item.key} className="flex items-center">
                {item.content}
                {index < navItems.length - 1 && (
                  <span className="mx-2 text-gray-300 select-none">|</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default dynamic(() => Promise.resolve(NavBarTop), { ssr: false });
