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
        dispatch(addUser({ uid: uid, email: email, fullname: fullname }));
        // ...
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
