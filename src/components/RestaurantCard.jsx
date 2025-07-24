import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { id, name, rating, cuisine, deliveryTime, price, image } = resData;

  return (
    <div className="w-full sm:max-w-xs bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-40 sm:h-44 object-cover"
        />
      )}

      <div className="p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          <Link
            to={`/restaurant/${id}`}
            className="hover:text-orange-600 transition-colors duration-200"
          >
            {name}
          </Link>
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1">{cuisine}</p>

        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="font-medium text-gray-800">{rating}</span>
          </div>
          <span>{deliveryTime}</span>
        </div>

        <div className="mt-2 text-sm text-gray-800">
          💰 <span className="font-medium">₹{price}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
