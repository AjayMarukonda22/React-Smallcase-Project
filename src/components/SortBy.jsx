import React from "react";

const SortBy = ({ selectedSort, setSelectedSort }) => {
  let orderBy = selectedSort.orderBy.order;

  const handleSortChange = (option) => {
    setSelectedSort((prevState) => ({
      ...prevState,
      sortBy: option,
      orderBy: {
        ...prevState.orderBy,
        status: false,
        order: "High-Low",
      },
    }));
  };

  const handleTimePeriodChange = (option) => {
    setSelectedSort((prevState) => ({
      ...prevState,
      sortBy: option,
      orderBy: {
        ...prevState.orderBy,
        status: true,
      },
    }));
  };
  const handleOrderByChange = (sortBy) => {
    setSelectedSort((prevState) => ({
      ...prevState,
      orderBy: {
        ...prevState.orderBy,
        order: sortBy,
      },
    }));
  };

  return (
    <div className="dropdown dropdown-bottom flex justify-center items-center">
      <label tabIndex={0} className="btn m-1">
        Sort by: &nbsp;&nbsp;
        {selectedSort.orderBy.status
          ? `${selectedSort.sortBy} ${
              orderBy === "High-Low" ? `(H → L)` : "(L → H)"
            }`
          : `${selectedSort.sortBy}`}{" "}
        ▼
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow mt-1 text-[15px]"
      >
        {["Popularity", "Minimum Amount", "Recently Rebalanced"].map(
          (option) => (
            <li key={option} onClick={() => handleSortChange(option)}>
              <label
                className={`label cursor-pointer justify-between ${
                  selectedSort.sortBy === option
                    ? "font-semibold text-blue-500"
                    : ""
                }`}
              >
                {option}
                <input
                  type="radio"
                  name="sort"
                  className="appearance-none w-4 h-4 border-1 border-gray-300 rounded-full checked:border-blue-600 checked:border-5"
                  checked={selectedSort.sortBy === option}
                  readOnly
                />
              </label>
            </li>
          )
        )}
        <li className="flex flex-col  text-gray-500">
          <p className="hover:bg-transparent hover:cursor-default no-animation custom-no-active">
            Returns
          </p>
          <p className="hover:bg-transparent hover: cursor-default custom-no-active">
            Time period
          </p>
          <div className="duration flex border border-gray-200 font-bold h-10 custom-no-active hover:bg-transparent cursor-default p-0">
            {["1M", "6M", "1Y", "3Y", "5Y"].map((period) => (
              <button
                key={period}
                onClick={() => handleTimePeriodChange(period)}
                className={` hover:bg-gray-100 cursor-pointer flex-1 h-full ${
                  selectedSort.sortBy === period
                    ? "border border-blue-500 text-blue-500"
                    : ""
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          {selectedSort.orderBy.status && (
            <>
              <p className="hover:bg-transparent hover:cursor-default no-animation custom-no-active">
                {" "}
                Order by
              </p>
              <div className="sortby flex border border-gray-200 justify-between font-bold hover:bg-transparent cursor-default h-10 custom-no-active p-0">
                {["High-Low", "Low-High"].map((order) => (
                  <button
                    key={order}
                    onClick={() => handleOrderByChange(order)}
                    className={`hover:bg-gray-100 cursor-pointer flex-1 h-full ${
                      selectedSort.orderBy.order === order
                        ? "border border-blue-500 text-blue-500"
                        : ""
                    }`}
                  >
                    {order}
                  </button>
                ))}
              </div>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SortBy;
