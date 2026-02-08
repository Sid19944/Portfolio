import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Loading from "../utils/Loading";
import { projectApi, skillApi, timeLineApi, userApi } from "../../Api";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

function dashboard() {
  const [user, setUser] = useState({});
  const [allProject, setAllProject] = useState([]);
  const [allSkill, setAllSkill] = useState([]);
  const [allTimeLine, setAllTimeLine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buffering, setBuffering] = useState(true);

  useEffect(() => {
    (async () => {
      await projectApi
        .get("/all")
        .then((res) => {
          // console.log(res);
          setAllProject(res.data.projects);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err.response.data);
        });

      await skillApi
        .get("/all")
        .then((res) => {
          setAllSkill(res.data.skills);
        })
        .catch((err) => {
          toast.error(err.response.data.message, { position: "top-right" });
        });

      await timeLineApi
        .get("/all")
        .then((res) => {
          // console.log(res.data);
          setAllTimeLine(res.data.allTimeLine);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
      await userApi
        .get("/me")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err.data);
          toast.error(err.response.data.message);
        });

      setBuffering(false);
    })();
  }, [loading]);



  return (
    <div className="h-[85vh] p-2 overflow-y-auto font-serif">
      <div className="flex flex-wrap gap-1">
        <div
          id="head"
          className="flex gap-2 w-full rounded-lg bg-gray-800 mb-4"
        >
          <div className="w-1/2 p-2 gap-2 hidden md:flex ">
            <div className="w-full h-full outline-1 p-4 landing-relaxed bg-gray-900 rounded-lg">
              <img
                src={user?.avatar?.url}
                alt="Avatar"
                className="max-w-50 max-h-40 float-left outline-1 rounded-2xl mr-2 mb-1 shadow-[0px_0px_4px_4px] shadow-blue-500"
              />
              <p>About Me</p>
              <Link className="w-fit inline-block text-center rounded-sm hover:rounded-2xl bg-blue-400 font-semibold px-2 text-black blur-[0.5px] hover:blur-none active:blur-none hover:rounded-lg hover:bg-blue-600 hover:text-white active:text-white cursor-pointer">
                View Portfolio
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex gap-4 p-2 justify-around w-full">
            <div className="w-1/2 h-full outline-1 p-4 flex flex-col rounded-xl justify-between bg-gray-900">
              <div className="mb-3">
                <h1>Project Completed</h1>{" "}
                <span className="text-2xl">{allProject?.length}</span>
              </div>
              <Link
                to={"/manage/projects"}
                className="w-full block text-center rounded-sm hover:rounded-2xl bg-blue-400 font-semibold px-2 text-black blur-[0.5px] hover:blur-none active:blur-none hover:rounded-lg hover:bg-blue-600 hover:text-white active:text-white cursor-pointer"
              >
                Manage Project's
              </Link>
            </div>
            <div className="w-1/2 h-full outline-1 p-4 flex flex-col rounded-xl justify-between bg-gray-900">
              <div className="mb-3">
                <h1>Skills </h1>{" "}
                <span className="text-2xl ">{allSkill?.length}</span>
              </div>
              <Link
                to={"/manage/skills"}
                className="w-full block text-center rounded-sm hover:rounded-2xl bg-blue-400 font-semibold px-2 text-black blur-[0.5px] hover:blur-none active:blur-none hover:rounded-lg hover:bg-blue-600 hover:text-white active:text-white cursor-pointer"
              >
                Manage Skill's
              </Link>
            </div>
          </div>
        </div>

        <div
          id="projects"
          className="p-2 gap-2 w-full rounded-lg bg-gray-800 mb-4"
        >
          <div className="flex w-full p-2 rounded-lg bg-gray-900 mb-2 text-2xl font-bold font-serif items-center justify-between">
            <h1>Projects</h1>
          </div>
          <div className="w-full flex justify-around mb-4  outline-1 rounded-lg p-2 text-center bg-gray-900">
            <div className="outline-1 rounded-lg m-1 md:w-[25%] w-[33%] lg:w-[15%] font-semibold text-xl bg-gray-500 text-amber-50 p-1 hidden sm:flex">
              Banner
            </div>
            <div className="outline-1 rounded-lg m-1 md:w-[25%] w-[33%] lg:w-[40%] font-semibold text-xl bg-gray-500 text-amber-50 p-1 overflow-hidden">
              Title
            </div>
            <div className="outline-1 rounded-lg m-1 md:w-[25%] w-[33%] lg:w-[20%] font-semibold text-xl bg-gray-500 text-amber-50 p-1 overflow-hidden">
              Stack
            </div>
            <div className="outline-1 rounded-lg m-1 md:w-[25%] w-[33%] lg:w-[15%] font-semibold text-xl bg-gray-500 text-amber-50 p-1 overflow-hidden">
              Deployed
            </div>
            <div className="outline-1 rounded-lg m-1 md:w-[25%] lg:w-[10%] font-semibold text-xl hidden md:inline-block bg-gray-500 text-amber-50 p-1">
              Actions
            </div>
          </div>
          {allProject?.map((project) => (
            <div
              key={project._id}
              className="w-full flex gap-2  mb-2 justify-around flex-wrap p-1 outline-1 rounded-lg text-center shadow-md hover:shadow-blue-600 bg-gray-900"
            >
              <div className="w-[10%] hidden md:inline-block">
                <video
                  src={project.image.url}
                  autoPlay
                  muted
                  loop
                  alt="Banner"
                  className="max-w-20 outline-1 rounded-lg"
                />
              </div>
              <div className="w-[80%] md:w-[75%] flex justify-around items-center">
                <div className="md:w-[33%] lg:w-[40%] font-semibold p-2">
                  {project.title}
                </div>
                <div className="md:w-[33%] lg:w-[20%] font-semibold p-2">
                  {project.stack}
                </div>
                <div className="md:w-[33%] lg:w-[10%] font-semibold p-2">
                  {project.deployed ? "YES" : "NO"}
                </div>
              </div>
              <div className="w-[10%] flex justify-centerrounded-lg items-center">
                <Link
                  to={`/view/${project._id}`}
                  className="w-[20%] flex items-center justify-center text-green-700 hover:scale-120 hover:text-green-400 active:text-green-400 active:scale-120"
                >
                  <VisibilityOutlinedIcon className="cursor-pointer" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div
          id="skills"
          className="p-2 gap-2 w-full sm:w-[30%] rounded-lg bg-gray-800 mb-4"
        >
          <h2 className="w-full p-2 rounded-lg bg-gray-900 mb-2 text-2xl font-bold items-center justify-between">
            Skills
          </h2>
          {allSkill?.map((skill) => (
            <div
              key={skill._id}
              className="p-2 gap-2 w-full rounded-lg bg-gray-900 mb-4 flex justify-between outline-1 shadow-md hover:shadow-blue-600"
            >
              <div className="w-[25%] ">
                <img
                  src={skill?.skillImage.url}
                  alt="Banner"
                  className="max-w-20 outline-1 rounded-lg"
                />
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <h1>{skill?.skillName}</h1>
              </div>
            </div>
          ))}
        </div>

        <div
          id="timeline"
          className="p-2 gap-2 w-full sm:w-[69%] rounded-lg bg-gray-800 mb-4"
        >
          <div className="w-full p-2 rounded-lg bg-gray-900 mb-2 text-2xl font-bold items-center justify-between flex">
            <h2>Time Line</h2>
            <Link
              to={"/manage/timeline"}
              className="px-4 py-1 bg-blue-400 text-black blur-[0.5px] hover:blur-none hover:text-white hover:font-semibold hover:bg-blue-600 active:text-white active:font-semibold active:bg-blue-600 text-sm rounded-lg"
            >
              Manage
            </Link>
          </div>
          {allTimeLine?.map((timeLine) => (
            <div
              className="w-full flex bg-gray-800 p-2 rounded-lg mb-2"
              key={timeLine._id}
            >
              <div className="w-full flex gap-2 ">
                <div
                  className={`outline-1 px-2 rounded-lg w-1/2 bg-gray-900`}
                >
                  <input
                    className="w-full h-full rounded-lg px-2 outline-none"
                    disabled
                    defaultValue={timeLine?.name}
                  ></input>
                </div>
                <div
                  className={`w-1/2 flex outline-1 px-2 rounded-lg justify-around items-center bg-gray-900`}
                >
                  <input
                    className="w-[40%] text-center outline-none h-full rounded-lg"
                    defaultValue={timeLine?.from}
                    disabled
                  ></input>
                  <span>-</span>
                  <input
                    className={`w-[40%] text-center outline-none h-full rounded-lg`}
                    defaultValue={timeLine?.to}
                    disabled
                  ></input>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {buffering ? <Loading text="Loading..." /> : <></>}
      <ToastContainer />
    </div>
  );
}

export default dashboard;
