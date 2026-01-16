import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { projectApi } from "../../Api";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
import BackToDashboard from "../utils/BackToDashboard";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

function ManageProject() {
  // const navigate = useNavigate();
  const [allProject, setAllProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buffering, setBuffering] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    await projectApi
      .delete(`/delete/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message, { position: "bottom-left" });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setBuffering(true);
    projectApi
      .get("/all")
      .then((res) => {
        setAllProject(res.data.projects);
        setBuffering(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data);
        setBuffering(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-2 font-serif ">
      <div className="w-full flex justify-between p-6 items-center outline-1 rounded-b-lg mb-4 bg-blue-400">
        <h1 className="lg:w-[80%] lg:px-8 text-2xl font-bold font-serif">
          Projects
        </h1>
        <Link
          to={"/add/project"}
          className=" md:w-[20%] p-2 font-serif rounded-lg outline-2 text-lg gap-4 bg-gray-400 hover:outline-indigo-500 flex justify-center items-center text-white hover:text-indigo-500 hover:bg-gray-300 blur-[0.5px] hover:blur-none hover:shadow-xl/30 hover:shadow-indigo-900"
        >
          Add New
          <AddCircleOutlineOutlinedIcon />
        </Link>
      </div>
      <BackToDashboard />
      <div className="w-full flex justify-around mb-4  outline-1 rounded-lg p-2 text-center bg-gray-200">
        <div className="outline-1 rounded-lg m-1 md:w-[25%] w-[33%] lg:w-[15%] font-semibold text-xl bg-gray-600 text-amber-50 p-1 hidden sm:flex">
          Banner
        </div>
        <div className="outline-1 rounded-lg m-1 md:w-[25%] w-[33%] lg:w-[40%] font-semibold text-xl bg-gray-600 text-amber-50 p-1">
          Title
        </div>
        <div className="outline-1 rounded-lg m-1 md:w-[25%] w-[33%] lg:w-[20%] font-semibold text-xl bg-gray-600 text-amber-50 p-1">
          Stack
        </div>
        <div className="outline-1 rounded-lg m-1 md:w-[25%] w-[33%] lg:w-[15%] font-semibold text-xl bg-gray-600 text-amber-50 p-1">
          Deployed
        </div>
        <div className="outline-1 rounded-lg m-1 md:w-[25%] lg:w-[30%] font-semibold text-xl hidden md:inline-block bg-gray-600 text-amber-50 p-1">
          Actions
        </div>
      </div>

      {allProject?.map((project) => (
        <div
          key={project._id}
          className="w-full flex justify-between mb-4 flex-wrap outline-1 rounded-lg p-2 text-center shadow-md shadow-blue-600"
        >
          <div className="w-full md:w-[70%] flex justify-around items-center">
            <div className="w-[10%] hidden md:inline-block">
              <img
                src={project?.image.url}
                alt="Banner"
                className="h-full outline-1 rounded-lg"
              />
            </div>
            <div className="w-full md:w-[33%] lg:w-[40%] font-semibold p-2">
              {project.title}
            </div>
            <div className="w-full md:w-[33%] lg:w-[20%] font-semibold p-2">
              {project.stack}
            </div>
            <div className="w-full md:w-[33%] lg:w-[10%] font-semibold p-2">
              {project.deployed ? "YES" : "NO"}
            </div>
          </div>
          <div className="w-full md:w-[25%] flex justify-around outline-1 rounded-lg items-center bg-gray-100">
            <Link
              to={`/update/project/${project._id}`}
              className="w-[10%] px-4 rounded-lg flex justify-center text-amber-400 hover:text-shadow-sm text-shadow-black"
            >
              Edit
              <EditIcon className="cursor-pointer" />
            </Link>
            <Link
              to={`/view/${project._id}`}
              className=" w-[10%] px-4 rounded-lg flex justify-center text-green-600 hover:text-shadow-sm text-shadow-black"
            >
              Visit
              <VisibilityOutlinedIcon className="cursor-pointer" />
            </Link>

            <Link
              className=" w-[10%] px-4 rounded-lg flex justify-center text-red-700 hover:text-shadow-sm text-shadow-black"
              onClick={() => handleDelete(project._id)}
            >
              Del
              <DeleteIcon className="cursor-pointer" />
            </Link>
          </div>
        </div>
      ))}

      <ToastContainer />
      {loading ? <Loading text="Deleting..." /> : <></>}
      {buffering ? <Loading text="Loading..." /> : <></>}
    </div>
  );
}

export default ManageProject;
