import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction, clearMessage } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import ButtonLoadingSpinner from "../components/loader/ButtonLoadingSpinner";
import Logo from "../assets/authlogo.png";

const SignUpNew = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpError = useSelector((state) => state.auth?.signUpError);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const [isConsentGiven, setIsConsentGiven] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingText("Signing up...");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("role", "general");
    formData.append("isConsentGiven", isConsentGiven.toString());

    const timeout = setTimeout(() => {
      setLoadingText(
        "This is taking longer than usual. Please wait while backend services are getting started."
      );
    }, 5000);

    await dispatch(signUpAction(formData, navigate, isConsentGiven, email));
    setLoading(false);
    setIsConsentGiven(false);
    clearTimeout(timeout);
  };

  const handleClearError = () => {
    dispatch(clearMessage());
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-6">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mx-auto flex justify-center">
            <img className="h-20 w-auto sm:h-20" src={Logo} alt="" />
          </div>
          {signUpError &&
            Array.isArray(signUpError) &&
            signUpError.map((err, i) => (
              <div
                className="mt-6 flex items-center rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
                key={i}
              >
                <span className="ml-2 block sm:inline">{err}</span>
                <button
                  className="ml-auto font-bold text-red-700"
                  onClick={handleClearError}
                >
                </button>
              </div>
            ))}

          <div className="mt-6 flex items-center justify-center">

            {/* <Link
              to={"/signup"}
              className="text-cente w-1/3 border-b-2 border-blue-500 pb-4 font-medium text-gray-800"
            > */}
            <h1 className="font-medium text-cente text-2xl text-gray-800">Register</h1>

            {/* </Link> */}
          </div>
          <div className="relative mt-8 flex items-center">

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="block w-full rounded-3xl  bg-gray-50 px-11 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Username"
              required
              autoComplete="off"
            />
          </div>

          <div className="relative mt-6 flex items-center">

            <input
              id="phone"
              type="number"
              value={phone}
              name="phone"
              className="block w-full rounded-3xl bg-gray-50 px-11 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Phone"
              required
              onChange={handlePhoneChange}
              autoComplete="off"
            />
          </div>


          <div className="relative mt-6 flex items-center">

            <input
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              type="email"
              className="block w-full rounded-3xl bg-gray-50 px-11 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
              onChange={handlePasswordChange}
              className="block w-full rounded-3xl bg-gray-50 px-10 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Password"
              required
              autoComplete="off"
            />
          </div>
          <div className="mt-6">
            <button
              disabled={loading}
              type="submit"
              className={`w-full transform rounded-3xl bg-gradient-to-r from-sky-600 to-blue-950 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${loading ? "cursor-not-allowed opacity-50" : ""
                }`}
            >
              {loading ? (
                <ButtonLoadingSpinner loadingText={loadingText} />
              ) : (
                <span>Sign Up</span>
              )}
            </button>
            <div className="mt-6 flex items-center justify-end">

              <Link
                to={"/signin"}
                className="text-center text-xs text-gray-500"
              >
                You have an account? Sign In
              </Link>
            </div>

            {/* <div onClick={() => setIsModalOpen(true)} className="mt-6">
              {isConsentGiven && !isModerator ? (
                <p className="mt-2 cursor-pointer rounded-3xl border border-green-500 px-4 py-3 text-center text-sm font-semibold text-green-600">
                  Context-Based Authentication is enabled
                </p>
              ) : (
                <p className="mt-2 cursor-pointer rounded-3xl border px-4 py-3 text-center text-sm font-semibold">
                  Context-Based Authentication is disabled
                </p>
              )}
            </div> */}


          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpNew;