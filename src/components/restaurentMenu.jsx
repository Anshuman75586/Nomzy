import { useParams } from "react-router-dom";
import { useState } from "react";
import resData from "../utlis/mockdata";
import { useDispatch } from "react-redux";
import { addItem } from "../utlis/cartSlice";

const RestaurantMenu = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const restaurant = resData.find((r) => r.id === parseInt(id));
  const [filter, setFilter] = useState("ALL");

  if (!restaurant)
    return <h2 className="text-center mt-10">Restaurant Not Found</h2>;

  const filteredMenu = restaurant.menu.filter((item) => {
    if (filter === "VEG") return item.isVeg;
    if (filter === "NONVEG") return !item.isVeg;
    return true;
  });

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-orange-600">
        {restaurant.name}
      </h1>
      <p className="text-gray-600 mb-4">
        {restaurant.cuisine} • ⭐ {restaurant.rating} •{" "}
        {restaurant.deliveryTime}
      </p>
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <div className="flex gap-4 mb-6">
        {["ALL", "VEG", "NONVEG"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded border ${
              filter === type ? "bg-gray-300 font-semibold" : "bg-gray-100"
            }`}
          >
            {type === "ALL" ? "All" : type === "VEG" ? "Veg" : "Non-Veg"}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3">Menu</h2>
      <div className="space-y-4">
        {filteredMenu.length === 0 ? (
          <p className="text-gray-500">No items found.</p>
        ) : (
          filteredMenu.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-md shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-medium text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-semibold">₹{item.price}</p>
              <button
                className="mt-2 px-4 py-1 bg-gray-800 text-white rounded hover:bg-orange-500"
                onClick={() => {
                  handleAddItem(item);
                  alert("Item Added successfully!");
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
