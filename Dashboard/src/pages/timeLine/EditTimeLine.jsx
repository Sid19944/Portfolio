import React, { useEffect, useState } from "react";
import { timeLineApi } from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../utils/Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ManageTimeLine() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [timeLine, setTimeLine] = useState({});
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    await timeLineApi
      .put(`/edit/${id}`, { name, from, to }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    setLoading(false);
  };
  useEffect(() => {
    timeLineApi
      .get(`/one/${id}`)
      .then((res) => {
        setName(res.data.timeLine.name);
        setFrom(res.data.timeLine.from);
        setTo(res.data.timeLine.to);
        setTimeLine(res.data.timeLine);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <div className="h-[90vh] overflow-y-auto font-serif p-2 flex justify-center items-center">
      <div className="p-4 w-[95%] sm:w-2/3 md:w-1/3 outline-1 rounded-lg gap-2 flex flex-col">
        <div className="outline-1 flex p-2 rounded-lg gap-2 items-center">
          <label htmlFor="name" className="w-[20%]">
            Name
          </label>
          <input
            type="text"
            className="w-full outline-3 rounded-lg px-2 outline-purple-600"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="outline-1 flex p-2 rounded-lg gap-2 items-center">
          <label htmlFor="from" className="w-[20%]">
            From
          </label>
          <input
            type="number"
            defaultValue={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full outline-3 rounded-lg px-2 outline-purple-600"
            placeholder={`from 1980 to ${new Date().getFullYear()}`}
          />
        </div>
        <div className="outline-1 flex p-2 rounded-lg gap-2 items-center">
          <label htmlFor="to" className="w-[20%]">
            To
          </label>
          <input
            type="number"
            defaultValue={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder={`from 1980 to ${new Date().getFullYear()}`}
            className="w-full outline-3 rounded-lg px-2 outline-purple-600"
          />
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
            onClick={() => handleSubmit(timeLine?._id)}
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
          <Link
            to={"/"}
            className="outline-1 py-1 px-3  rounded-lg bg-blue-500 hover:bg-blue-800 text-black font-semibold hover:text-white cursor-pointer active:text-white"
          >
            Cancle
          </Link>
        </div>
      </div>

      {loading ? <Loading text="deleting..." /> : ""}
      <ToastContainer />
    </div>
  );
}

export default ManageTimeLine;
