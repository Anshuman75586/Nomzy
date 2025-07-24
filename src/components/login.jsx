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
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [errorMessge, SetErrorMessge] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  const handlePasswordChange = () => {
    if (isSigninForm) return;
    const value = password.current.value;
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!strongRegex.test(value)) {
      setPasswordMessage(
        "Password must be 8-16 chars, include uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordMessage("Strong password ✅");
    }
  };

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
        .then(() => {
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
        .then(() => {
          navigate("/home");
        })
        .catch((error) => {
          SetErrorMessge(error.code + "-" + error.message);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSigninForm(!isSigninForm);
    setPasswordMessage("");
    setShowPassword(false);
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

            <div className="relative w-full">
              <input
                ref={password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handlePasswordChange}
                className="w-full p-2 rounded bg-gray-200 text-black focus:outline-none"
              />
              {!isSigninForm && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>

            {!isSigninForm && passwordMessage && (
              <p className="text-yellow-300 text-sm">{passwordMessage}</p>
            )}

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
