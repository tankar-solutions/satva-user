import dayjs from "dayjs";
import Cookies from "js-cookie";
import useGetSetting from "./useGetSetting";

const useUtilsFunction = () => {
  const lang = Cookies.get("_lang");

  const { globalSetting } = useGetSetting();

  // Default to Indian Rupee (₹) but can be overridden by globalSetting if needed
  const currency = globalSetting?.default_currency || "₹";

  //for date and time format
  const showTimeFormat = (data, timeFormat) => {
    return dayjs(data).format(timeFormat);
  };

  const showDateFormat = (data) => {
    return dayjs(data).format(globalSetting?.default_date_format);
  };

  const showDateTimeFormat = (data, date, time) => {
    return dayjs(data).format(`${date} ${time}`);
  };

  //for formatting number
  const getNumber = (value = 0) => {
    return Number(parseFloat(value || 0).toFixed(2));
  };

  const getNumberTwo = (value = 0) => {
    return parseFloat(value || 0).toFixed(globalSetting?.floating_number || 2);
  };

  //for translation
  const showingTranslateValue = (data) => {
    return data !== undefined && Object?.keys(data).includes(lang)
      ? data[lang]
      : data?.en;
  };

  const showingImage = (data) => {
    return data !== undefined && data;
  };

  const showingUrl = (data) => {
    return data !== undefined ? data : "!#";
  };

  // Format currency value with Indian Rupee symbol
  const formatIndianCurrency = (value) => {
    return `${currency} ${getNumberTwo(value)}`;
  };

  return {
    lang,
    currency,
    getNumber,
    getNumberTwo,
    showTimeFormat,
    showDateFormat,
    showingImage,
    showingUrl,
    globalSetting,
    showDateTimeFormat,
    showingTranslateValue,
    formatIndianCurrency, // Add this new function
  };
};

export default useUtilsFunction;