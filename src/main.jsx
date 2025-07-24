import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Body from "./components/body.jsx";
import Error from "./components/Error.jsx";
import Cart from "./components/cart.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestuarentMenu from "./components/restaurentMenu.jsx";
import BrowseRestaurants from "./components/browse.jsx";
import Login from "./components/login.jsx";
import appStore from "./utlis/Appstore.jsx";
import { Provider } from "react-redux";
import MyOrders from "./components/MyOrders.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Body />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/Browse",
        element: <BrowseRestaurants />,
      },

      {
        path: "/my-orders",
        element: <MyOrders />,
      },

      {
        path: "/restaurant/:id",
        element: <RestuarentMenu />,
      },
      {
        path: "/error",
        element: <Error />,
      },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={Router} />
    </Provider>
  </StrictMode>
);
