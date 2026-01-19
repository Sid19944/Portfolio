import React, { useEffect, useState } from "react";
import { timeLineApi } from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../utils/Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddTimeLine() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [about, setAbout] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    timeLineApi
      .post("/add", { name, from, to, about }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message, { position: "bottom-left" });
        setName("");
        setFrom("");
        setTo("");
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div className="h-[90vh] overflow-y-auto font-serif p-2 flex justify-center items-center">
      <div className="p-4 w-[95%] sm:w-2/3 md:w-1/3 outline-1 rounded-lg gap-2 flex flex-col bg-gray-700">
        <h1 className="text-center outline-1 p-2 rounded-lg text-lg font-semibold bg-gray-900">
          Add New TimeLine
        </h1>

        <div className="outline-1 flex p-2 rounded-lg gap-2 items-center bg-gray-900">
          <label htmlFor="name" className="w-[20%]">
            Name
          </label>
          <input
            type="text"
            className="w-full outline-3 rounded-lg px-2 outline-purple-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="outline-1 flex p-2 rounded-lg gap-2 items-center bg-gray-900">
          <label htmlFor="from" className="w-[20%]">
            From
          </label>
          <input
            type="number"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full outline-3 rounded-lg px-2 outline-purple-600"
            placeholder={`from 1980 to ${new Date().getFullYear()}`}
          />
        </div>
        <div className="outline-1 flex p-2 rounded-lg gap-2 items-center bg-gray-900">
          <label htmlFor="to" className="w-[20%]">
            To
          </label>
          <input
            type="number"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder={`from 1980 to ${new Date().getFullYear()}`}
            className="w-full outline-3 rounded-lg px-2 outline-purple-600"
          />
        </div>
        <div className="outline-1 flex p-2 rounded-lg gap-2 items-center bg-gray-900">
          <label htmlFor="to" className="w-[20%]">
            about
          </label>
          <textarea
          rows={4}
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Enter detail "
            className="w-full outline-3 rounded-lg px-2 outline-purple-600"
          ></textarea>
        </div>
        {from > new Date().getFullYear() || to > new Date().getFullYear() ? (
          <h1 className="text-red-600 underline">
            Maximum Year {new Date().getFullYear()}
          </h1>
        ) : (
          ""
        )}

        {to < 1980 || from < 1980 ? (
          <h1 className="text-red-600 underline">Minimun Year 1980</h1>
        ) : (
          ""
        )}

        <div className="flex justify-around">
          <button
            type="submit"
            onClick={handleAdd}
            disabled={
              from < 1980 ||
              from > new Date().getFullYear() ||
              to > new Date().getFullYear() ||
              to < 1908
            }
            className="outline-1 py-1 px-3  rounded-lg bg-blue-500 hover:bg-blue-800 text-black font-semibold hover:text-white cursor-pointer active:text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>

      {loading ? <Loading text="Adding..." /> : ""}
      <ToastContainer />
    </div>
  );
}

export default AddTimeLine;
