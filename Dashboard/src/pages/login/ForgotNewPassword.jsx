import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { userApi } from "../../Api";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";

function ForgotNewPassword() {
  const { resetToken } = useParams();
  const [resetData, setResetData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  if(resetData){}

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await userApi.put(
        `/forgot/password/${resetToken}`,
        resetData
      );
      toast.success(res.data.message, { position: "bottom-left" });
      setResetData({
        newPassword: "",
        confirmPassword: "",
      });
      console.log(res.data);
    } catch (err) {
      toast.error(err.response.data.message, { position: "bottom-left" });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" h-screen font-serif flex ">
      <div className="w-full lg:w-1/2 flex justify-around  items-center shadow-lg shadow-black">
        <form className="border-2 border-solid rounded-lg p-2 h-fit  m-2 w-full md:w-4/5 lg:w-3/4  shadow-lg shadow-black">
          <h2 className="text-3xl font-semibold text-center m-6 ">
            Reset Your Password
          </h2>
          <div>
            <label htmlFor="newPassword" className="font-semibold">
              New Password
            </label>
            <input
              required
              type="password"
              name="newPassword"
              id="newPassword"
              className=" border-b-1  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              onChange={handleChange}
              value={resetData.newPassword}
            />
          </div>
          <div className="my-6">
            <label htmlFor="confirmPassword" className="font-semibold">
              Confirm Password
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className=" border-b-1  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              onChange={handleChange}
              value={resetData.confirmPassword}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              loading ||
              resetData.newPassword === "" ||
              resetData.confirmPassword === ""
            }
            className="w-full block text-center bg-blue-400 font-semibold py-2 text-black hover:rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer disabled:cursor-not-allowed"
          >
            "Reset Password"
          </button>
        </form>
      </div>
      <img
        src="/hero.png"
        alt="Image"
        className="lg:w-1/2 object-cover  hidden lg:block"
      />
      <ToastContainer />
      {loading ? <Loading text="Setting New Password..." /> : ""}
    </div>
  );
}

export default ForgotNewPassword;
