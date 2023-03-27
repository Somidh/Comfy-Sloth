import React from "react";
import { Link, useLocation } from "react-router-dom";
import useProductStore from "../store/productStore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Form = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();
  const isLogin = pathName === "/login";

  const { logIn, signUp } = useAuth();

  const { full_name, email, password, setEmail, setPassword, setFullName } =
    useProductStore((state) => ({
      full_name: state.full_name,
      email: state.email,
      password: state.password,
      setEmail: state.setEmail,
      setPassword: state.setPassword,
      setFullName: state.setFullName,
    }));

  const handleSignup = (e) => {
    e.preventDefault();
    signUp({
      email: email,
      password: password,
      option: { data: { full_name: full_name } },
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    logIn({ email: email, password: password });
    navigate("/");
  };

  return (
    <div className="flex flex-wrap h-[calc(100vh-163px)]  w-full items-center  content-center justify-center bg-white py-10">
      <div className="flex shadow-md border-t-[5px] rounded-lg border-[#AB7A5F]">
        <div className="flex flex-wrap w-[22em] md:w-[25em] h-full py-8 px-10 content-center justify-center rounded-l-md bg-white">
          <div className="w-full">
            <div className="flex flex-col items-center justify-center gap-6">
              <h1 className="text-[#102A43] text-3xl tracking-wider">
                Register
              </h1>
            </div>

            <form className="mt-4">
              {!isLogin && (
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="text-[#102A43] text-base mb-2 block tracking-wider"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="email"
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full bg-[#F0F4F8] font-semibold rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1.5   px-1.5 text-gray-500"
                  />
                </div>
              )}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="text-[#102A43] text-base mb-2 block tracking-wider"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full bg-[#F0F4F8] font-semibold  rounded-md border  border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1.5 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="text-[#102A43] text-base mb-2 block tracking-wider"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full bg-[#F0F4F8] font-semibold rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1.5 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3 ">
                <button
                  onClick={isLogin ? handleLogin : handleSignup}
                  className="mb-4 block w-full text-center text-white  bg-[#AB7A5F]/90 hover:bg-[#AB7A5F] px-2 py-1.5 rounded-md tracking-widest shadow-md transition-all duration-800"
                >
                  Submit
                </button>
              </div>
            </form>

            <div className=" flex items-center justify-center">
              <span className="text-[#617D98] font-light">
                {isLogin ? "Not a member yet?" : "Already a member?"}
              </span>
              <Link
                to={isLogin ? "/signup" : "/login"}
                className="ml-2 tracking-wider text-[#102A42] "
              >
                {isLogin ? "Register" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[30em] top-[20em]">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-[#102A42]" >Test Email:</h1>
          <span className="">somidhroyy@gmail.com</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-[#102A42]">Pass:</h1>
          <span>password</span>
        </div>
      </div>
    </div>
  );
};

export default Form;
