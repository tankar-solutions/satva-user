import useUtilsFunction from "@hooks/useUtilsFunction";

const VariantList = ({
  att,
  option,
  variants,
  setValue,
  varTitle,
  selectVariant,
  setSelectVariant,
  setSelectVa,
}) => {
  const { showingTranslateValue } = useUtilsFunction();

  const handleChangeVariant = (v) => {
    setValue(v);
    setSelectVariant({
      ...selectVariant,
      [att]: v,
    });
    setSelectVa({ [att]: v });
  };
  // console.log("option", );

  return (
    <>
      {option === "Dropdown" ? (
        <select
          onChange={(e) => handleChangeVariant(e.target.value)}
          className="focus:shadow-none w-3/4 px-2 py-1 form-select outline-none h-10 text-sm focus:outline-none block rounded-md bg-gray-100 border-transparent focus:bg-white border-[#5faf34] focus:border-emerald-400 focus:ring-0 focus:ring-emerald-200"
          name="parent"
        >
          {[
            ...new Map(
              variants.map((v) => [v[att], v].filter(Boolean))
            ).values(),
          ]
            .filter(Boolean)
            .map(
              (vl, i) =>
                Object?.values(selectVariant).includes(vl[att]) &&
                varTitle.map((vr) =>
                  vr?.variants?.map(
                    (el) =>
                      vr?._id === att &&
                      el?._id === vl[att] && (
                        <option
                          key={i + 1}
                          value={selectVariant[att]}
                          defaultValue={selectVariant[att]}
                          hidden
                        >
                          {showingTranslateValue(el.name)}
                        </option>
                      )
                    // console.log('el', el._id === v[att] && el.name)
                  )
                )
            )}

          {[
            ...new Map(
              variants.map((v) => [v[att], v].filter(Boolean))
            ).values(),
          ]
            .filter(Boolean)
            .map((vl, i) =>
              varTitle.map((vr) =>
                vr?.variants?.map(
                  (el) =>
                    vr?._id === att &&
                    el?._id === vl[att] && (
                      <option key={el._id} value={vl[att]} defaultValue>
                        {showingTranslateValue(el.name)}
                      </option>
                    )
                )
              )
            )}
        </select>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            ...new Map(
              variants?.map((v) => [v[att], v].filter(Boolean))
            ).values(),
          ]
            .filter(Boolean)
            .map((vl, i) =>
              varTitle.map((vr) =>
                vr?.variants?.map(
                  (el) =>
                    vr?._id === att &&
                    el?._id === vl[att] && (
                      <button
                        onClick={(e) => handleChangeVariant(vl[att])}
                        key={i + 1}
                        className={`${
                          Object?.values(selectVariant).includes(vl[att])
                            ? "bg-[#5faf34] text-white mr-2 border-0 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-serif mt-2 focus:outline-none"
                            : "bg-gray-100 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-serif mt-2 focus:outline-none"
                        }`}
                      >
                        {showingTranslateValue(el.name)}
                      </button>
                    )
                )
              )
            )}
        </div>
      )}
    </>
  );
};

export default VariantList;
