import { useState } from "react";
import { Link } from "react-router-dom";
import resData from "../utlis/mockdata";

const Browse = () => {
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const cuisines = ["All", ...new Set(resData.map((res) => res.cuisine))];

  const filteredRestaurants =
    selectedCuisine === "All"
      ? resData
      : resData.filter((res) => res.cuisine === selectedCuisine);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Browse Restaurants
      </h1>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setSelectedCuisine(cuisine)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCuisine === cuisine
                ? "bg-orange-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <Link
                to={`/restaurant/${restaurant.id}`}
                className="text-xl font-semibold mb-1 text-orange-600 hover:underline block"
              >
                {restaurant.name}
              </Link>
              <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
                <span>⭐ {restaurant.rating}</span>
                <span>{restaurant.deliveryTime}</span>
                <span>₹{restaurant.price} avg</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <p className="text-center mt-8 text-gray-500">No restaurants found.</p>
      )}
    </div>
  );
};

export default Browse;
