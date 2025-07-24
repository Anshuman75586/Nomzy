import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearCart } from "../utlis/cartSlice";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../utlis/orderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    dispatch(addOrder(cartItems));
    dispatch(clearCart());
    alert("Order placed successfully!");
    navigate("/my-orders");
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded-md shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ₹{totalAmount}</p>
            <div className="space-x-3">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-orange-500"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
