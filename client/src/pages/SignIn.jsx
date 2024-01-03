import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, clearMessage } from "../redux/actions/authActions";
import ButtonLoadingSpinner from "../components/loader/ButtonLoadingSpinner";
import Logo from "../assets/authlogo.png";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingText("Signing in...");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const timeout = setTimeout(() => {
      setLoadingText(
        "This is taking longer than usual. Please wait while backend services are getting started."
      );
    }, 5000);
    await dispatch(signInAction(formData, navigate));
    setLoading(false);
    clearTimeout(timeout);
  };

  const signInError = useSelector((state) => state.auth?.signInError);
  const successMessage = useSelector((state) => state.auth?.successMessage);

  const handleClearMessage = () => {
    dispatch(clearMessage());
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-6">
        <form className="w-full max-w-md">
          <div className="mx-auto flex justify-center">
            <img  className="h-20 w-auto sm:h-20"  src={Logo} alt="" />
          </div>
          {signInError && (
            <div
              className="mt-6 flex items-center justify-between rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <div>
                <span className="block sm:inline">{signInError}</span>
              </div>
              <button
                className="font-bold text-red-700"
                onClick={handleClearMessage}
              >
              </button>
            </div>
          )}
          {successMessage && (
            <div
              className="mt-6 flex items-center justify-between rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
              role="alert"
            >
              <div>
                <span className="block sm:inline">{successMessage}</span>
              </div>
              <button
                className="font-bold text-green-700"
                onClick={handleClearMessage}
              >
              </button>
            </div>
          )}
          <div className="mt-6 flex items-center justify-center">
          <h1 className="font-medium text-cente text-2xl text-gray-800">Sign In</h1>

            {/* <Link
              to={"/signin"}
              className="w-1/3 border-b-2 border-blue-500 pb-4 text-center font-medium text-gray-800 "
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className="w-1/3 border-b border-gray-400 pb-4 text-center font-medium text-gray-500 "
            >
              Sign Up
            </Link> */}
          </div>

          <div className="relative mt-6 flex items-center">

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-3xl bg-gray-50 px-10 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Email address"
              required
              autoComplete="off"
            />
          </div>
          <div className="relative mt-4 flex items-center">

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-3xl bg-gray-50 px-10 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Password"
              required
              autoComplete="off"
            />
          </div>
          <div className="mt-6">
            <button
              disabled={loading}
              onClick={handleSubmit}

              className={`w-full transform rounded-3xl bg-gradient-to-r from-sky-600 to-blue-950 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${loading ? "cursor-not-allowed opacity-50" : ""
                }`}
            >
              {loading ? (
                <ButtonLoadingSpinner loadingText={loadingText} />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default SignIn;