import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { timeLineApi } from "../../Api";
import { Link } from "react-router-dom";
import BackToDashboard from "../utils/BackToDashboard";
import Loading from "../utils/Loading";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddLinkIcon from "@mui/icons-material/AddLink";

function ManageTimeLine() {
  const [allTimeLine, setAllTimeLine] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    timeLineApi
      .get("/all")
      .then((res) => {
        // console.log(res.data);
        setAllTimeLine(res.data.allTimeLine);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [loading]);

  const handleDeleteTimeLine = async (id) => {
    setLoading(true);
    await timeLineApi
      .delete(`/delete/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message, { position: "bottom-left" });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "bottom-left" });
      });
    setLoading(false);
  };
  return (
    <div className="w-full flex justify-center p-2">
      <div
        id="timeline"
        className="p-2 gap-2 w-full sm:w-[69%] rounded-lg bg-gray-800 mb-4"
      >
        <div className="w-full p-2 rounded-lg bg-gray-900 mb-2 text-2xl font-bold items-center justify-between flex">
          <h2>Time Line</h2>
          <Link
            className="flex items-center gap-4 font-semibold text-white hover:text-indigo-500 hover:bg-gray-300 outline-1 px-4 bg-gray-300 rounded-2xl text-lg blur-[0.5px] hover:blur-none hover:shadow-xl/30 hover:shadow-indigo-900"
            to={"/add/timeline"}
          >
            <AddLinkIcon /> Add Skill
          </Link>
        </div>

        <BackToDashboard />
        {allTimeLine?.map((timeLine) => (
          <div
            className="w-full flex bg-gray-800 p-2 rounded-lg mb-2"
            key={timeLine._id}
          >
            <div className="w-full flex gap-2 flex-wrap outline-1 p-2 rounded-lg bg-gray-600">
              <div
                className={`outline-1 px-2 rounded-lg w-[38%] p-2 bg-gray-900`}
              >
                <input
                  className="w-full h-full rounded-lg px-2 outline-none"
                  disabled
                  defaultValue={timeLine?.name}
                ></input>
              </div>
              <div
                className={`w-[38%] flex outline-1 px-2 rounded-lg justify-around items-center p-2 bg-gray-900`}
              >
                <input
                  className="w-[40%] text-center outline-none h-full rounded-lg px-2"
                  defaultValue={timeLine?.from}
                  disabled
                ></input>
                <span>-</span>
                <input
                  className={`w-[40%] text-center outline-none h-full rounded-lg px-2`}
                  defaultValue={timeLine?.to}
                  disabled
                ></input>
              </div>
              <div className="flex w-[20%] outline-1 rounded-lg justify-around items-center bg-gray-900">
                <Link
                  className="text-yellow-800 hover:text-yellow-400 active:text-yellow-400 hover:scale-120 active:scale-120 group"
                  to={`/edit/timeline/${timeLine?._id}`}
                >
                  <EditIcon className="cursor-pointer" />
                  <span className="absolute text-sm -bottom-6 -left-6 bg-gray-300 px-2 rounded-lg text-black font-semibold hidden group-hover:inline-block">
                    Edit
                  </span>
                </Link>
                <Link
                  className="text-red-800 hover:text-red-400 active:text-red-400 hover:scale-120 active:scale-120 group"
                  onClick={() => handleDeleteTimeLine(timeLine?._id)}
                >
                  <DeleteIcon />
                  <span className="absolute text-sm -bottom-6 -left-6 bg-gray-300 px-2 rounded-lg text-black font-semibold hidden group-hover:inline-block">
                    Delete
                  </span>
                </Link>
              </div>
              <div className="outline-1 w-full rounded-lg p-2 bg-gray-900">
                <input type="text" defaultValue={timeLine?.about}/>

              </div>


            </div>
          </div>
        ))}
        <ToastContainer />
        {loading ? <Loading text="deleting..." /> : ""}
      </div>
    </div>
  );
}

export default ManageTimeLine;
