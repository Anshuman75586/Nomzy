import resData from "../utlis/mockdata";
import RestaurantCard from "./RestaurantCard";
import { useState } from "react";

const BODY = () => {
  const [resList, setResList] = useState(resData);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="body bg-[#f8f9fb] ] text-[#2C2C2C];">
      <div className="filter flex flex-col lg:flex-row">
        <div className="search mx-4 p-4 flex flex-col lg:flex-row items-start lg:items-center">
          <input
            type="text"
            className="bg-white border border-orange-300 text-gray-500 placeholder-orange-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:border-orange-500 hover:border-orange-400 transition font-medium mb-2 lg:mb-0 lg:mr-4 w-full lg:w-auto"
            placeholder="Search Restaurants"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-white border text-orange-500 border-orange-300 rounded-md shadow-sm hover:border-orange-50 transition font-medium w-full lg:w-auto"
            onClick={() => {
              const filteredRestaurent = resList.filter((res) =>
                res.name.includes(searchText)
              );
              setResList(filteredRestaurent);
            }}
          >
            Search
          </button>
        </div>

        <div className="m-4 p-4 flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
          <button
            className="px-4 py-2 bg-white border text-orange-500 border-orange-300 rounded-md shadow-sm hover:border-orange-50 transition font-medium w-full lg:w-auto"
            onClick={() => {
              const filtered = resData.filter((r) => r.rating >= 4.5);
              setResList(filtered);
            }}
          >
            Top Rated Restaurant
          </button>
          <button
            className="px-4 py-2 bg-white border text-orange-500 border-orange-300 rounded-md shadow-sm hover:border-orange-50 transition font-medium w-full lg:w-auto"
            onClick={() => setResList(resData)}
          >
            Reset All
          </button>
        </div>
      </div>

      <div className="  bg-[#f8f9fb] mx-18  justify-center items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default BODY;
