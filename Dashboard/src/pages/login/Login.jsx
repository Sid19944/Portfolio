import { Link } from "react-router-dom";
import { userApi } from "../../Api";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import Loading from "../utils/Loading";

function Login() {
  const navigate = useNavigate();
  const [loginDate, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginDate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await userApi.post("/login", loginDate, {
        withCredentials: true,
      });
      toast.success(res?.data?.message, { position: "bottom-left" });
      // console.log(res);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message, { position: "bottom-left" });
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen font-serif flex">
      <div className="w-full lg:w-1/2 flex justify-around items-center shadow-lg shadow-black">
        <form className=" rounded-lg w-[95%] md:w-4/5 lg:w-3/4 shadow-lg shadow-black">
          <h2 className="text-3xl font-semibold text-center m-6 ">Login</h2>
          <p className="text-center text-gray-500">
            Enter your email and password to login
          </p>

          <div className="mb-6">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <br />
            <input
              required
              type="email"
              id="email"
              placeholder="Enter Email Id"
              className="border-b-1  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              name="email"
              value={loginDate.email?.trim()}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="font-semibold ">
              Password
            </label>
            <br />
            <input
              required
              type="password"
              id="password"
              placeholder="Enter Password"
              className=" border-b-1  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              value={loginDate.password}
              name="password"
              onChange={handleChange}
              minLength={8}
            />
          </div>
          <div className="justify-self-end mb-2">
            <Link
              to={"/forgot/password"}
              className="text-blue-700  hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              loading ||
              loginDate.email === "" ||
              loginDate.password === "" ||
              loginDate.password.length < 8
            }
            className="w-full block text-center bg-blue-400 font-semibold py-2 text-black hover:rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer disabled:cursor-not-allowed"
          >
            Login
            {loading ? "" : <LoginIcon />}
          </button>
        </form>
      </div>

      <img
        src="/hero.png"
        alt="Image"
        className="lg:w-1/2 object-cover  hidden lg:block"
      />
      <ToastContainer />
      {loading ? <Loading text="Logging..." /> : ""}
    </div>
  );
}

export default Login;
