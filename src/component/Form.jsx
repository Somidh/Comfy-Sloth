import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../server/supabase";
import useProductStore from "../store/productStore";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState();
  const isLogin = pathName === "/login";

  const {
    full_name,
    email,
    password,
    setEmail,
    setPassword,
    setFullName,
    loading,
    setLoading,
    setUser,
    setUserId,
  } = useProductStore((state) => ({
    full_name: state.full_name,
    email: state.email,
    password: state.password,
    setEmail: state.setEmail,
    setPassword: state.setPassword,
    setFullName: state.setFullName,
    loading: state.loading,
    setLoading: state.setLoading,
    setUser: state.setUser,
    setUserId: state.setUserId,
  }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,

      options: {
        data: {
          full_name: full_name,
        },
      },
    });
    if (error) console.log("Error signing up:", error);
    else console.log("Signed up user:", data);
    alert("check email");
    setUser(true);
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log("error while loggin in", error);
    } else {
      console.log("userData:", data);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("session", JSON.stringify(data.session));
    }
    navigate("/");
    setUser(true);
    setLoading(false);
    setUserId(data.user.id);
    console.log("userID:", data.user.id);
  };

  return (
    <div className="flex flex-wrap h-[calc(100vh-167px)] w-full content-center justify-center bg-white py-10 ">
      <div className="flex shadow-md border-t-[5px] rounded-lg border-[#AB7A5F]">
        <div className="flex flex-wrap w-full md:w-[25em] h-full py-8 px-10 content-center justify-center rounded-l-md bg-white">
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
                  className="mb-4 block w-full text-center text-white  bg-gray-400 hover:bg-[#2260c4] px-2 py-1.5 rounded-md tracking-widest shadow-md transition-all duration-800"
                >
                  Submit
                </button>
              </div>
            </form>
            {/* 9359e7bc-231b-42f8-bbf0-ce00b00e3173 */}

            <div className="text-center">
              <span className=" text-[text-[#102A43]] font-light">
                {isLogin ? "Not a member yet?" : "Already a member?"}
              </span>
              <Link
                to={isLogin ? "/signup" : "/login"}
                className="ml-2 tracking-wider text-[#3b82f6]"
              >
                {isLogin ? "Register" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
