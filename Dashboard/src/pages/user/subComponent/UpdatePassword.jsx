import React, { useState } from "react";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { userApi } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/Loading";

function UpdatePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await userApi
      .put("/update/password", passwords, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setLoading(false);
  };

  return (
    <div className="h-[90vh] w-full font-serif flex justify-center">
      <div className="w-full flex justify-center items-center">
        <form className="rounded-lg w-[75%] ">
          <h2 className="text-3xl font-semibold text-center mb-6 bg-black w-full">
            Update Password
          </h2>

          <div className="mb-6">
            <label htmlFor="cuurrentPassword" className="font-semibold">
              Current Password
            </label>
            <br />
            <input
              required
              type="password"
              id="currentPassword"
              placeholder="Enter current password"
              className="border-b-1  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              name="currentPassword"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="newPassword">New Password</label>
            <input
              required
              type="text"
              placeholder="Enter new password"
              className="border-b-1  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              name="newPassword"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmNewPassword"> Confirm Password</label>
            <input
              required
              type="password"
              placeholder="Confirm password"
              name="confirmNewPassword"
              onChange={handleChange}
              className="border-b-1  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
            />
          </div>

          {passwords.currentPassword.length > 7 &&
          passwords.newPassword.length > 7 ? (
            ""
          ) : (
            <p className=" outline-1 px-4 rounded-lg text-red-600 mb-4">
              Min 8 Character
            </p>
          )}

          {passwords.newPassword.length >= 8 &&
          passwords.newPassword != passwords.confirmNewPassword ? (
            <p className="outline-1 px-4 rounded-lg text-black-600 bg-red-700 mb-4">
              Confirm Password did't match
            </p>
          ) : (
            ""
          )}
          {passwords.newPassword.length >= 8 &&
          passwords.confirmNewPassword.length >= 8 &&
          passwords.newPassword == passwords.confirmNewPassword ? (
            <p className="outline-1 px-4 rounded-lg text-black-600 bg-green-600 mb-4">
              <DownloadDoneIcon /> Now Update
            </p>
          ) : (
            ""
          )}

          <button
            type="submit"
            disabled={
              loading ||
              passwords.currentPassword === "" ||
              passwords.newPassword === "" ||
              passwords.confirmNewPassword === "" ||
              passwords.newPassword?.length < 8 ||
              passwords.confirmNewPassword?.length < 8 ||
              passwords.newPassword !== passwords.confirmNewPassword
            }
            className="w-full cursor-pointer block text-center disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-400 font-semibold py-2 text-black hover:rounded-lg hover:bg-blue-600 hover:text-white cursor-pointerdisabled:cursor-not-allowed"
            onClick={handleSubmit}
          >
            Update
          </button>
        </form>
      </div>
      {/* <div className="h-30"></div> */}
      {loading ? <Loading text="Updating...." /> : ""}
      <ToastContainer />
    </div>
  );
}

export default UpdatePassword;
