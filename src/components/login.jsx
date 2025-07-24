import { useRef, useState } from "react";
import { checkValidData } from "../../../../netflix-learning phase/Netflix-gpt/src/utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utlis/firebase";
import { addUser } from "../utlis/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [errorMessge, SetErrorMessge] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    SetErrorMessge(message);
    if (message) return;

    if (!isSigninForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: fullname.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
              navigate("/home");
            })
            .catch((error) => {
              SetErrorMessge(error.message);
            });
        })
        .catch((error) => {
          SetErrorMessge(error.code + "-" + error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          navigate("/home");
        })
        .catch((error) => {
          SetErrorMessge(error.code + "-" + error.message);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSigninForm(!isSigninForm);
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
      <div className="bg-[#2e2e48] w-full max-w-[400px] p-6 sm:p-8 rounded-lg shadow-lg flex flex-col justify-center items-center -translate-y-[20px] sm:-translate-y-[40px]">
        <div className="w-full">
          <h2 className="text-center text-orange-400 text-xl font-bold mb-4">
            {isSigninForm ? "Sign In" : "Sign Up"}
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            {!isSigninForm && (
              <input
                ref={fullname}
                type="text"
                placeholder="Name"
                className="w-full p-2 rounded bg-gray-200 text-black focus:outline-none"
              />
            )}
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-gray-200 text-black focus:outline-none"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded bg-gray-200 text-black focus:outline-none"
            />
            <p className="text-red-500 font-bold text-sm sm:text-lg py-1 sm:py-2">
              {errorMessge}
            </p>
            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 cursor-pointer rounded font-semibold"
              onClick={handleButtonClick}
            >
              {isSigninForm ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p
            className="text-center text-sm text-white mt-4 cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {isSigninForm
              ? "New to Nomzy? Sign Up Now"
              : "Already registered? Sign In Now"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
