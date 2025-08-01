import Header from "./components/Header";

import { Outlet } from "react-router-dom";
import { addUser, removeUser } from "./utlis/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./utlis/firebase";
import Footer from "./Footer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, fullname } = user;
        dispatch(addUser({ uid, email, fullname }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <div>
      <Header />
<<<<<<< HEAD

      <Outlet />

=======
      <Outlet />
>>>>>>> 7a1e2ddaa01e5b01873035da095e90bde7b29c83
      <Footer />
    </div>
  );
};

export default App;
