import { useSelector } from "react-redux";

const MyOrders = () => {
  const orders = useSelector((store) => store.orders.items);

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-[70vh]">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <div className="mb-2 text-sm text-gray-500">
                Ordered on: {order.timestamp}
              </div>
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-1 border-b last:border-none"
                >
                  <span>{item.name}</span>
                  <span className="font-medium">₹{item.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
