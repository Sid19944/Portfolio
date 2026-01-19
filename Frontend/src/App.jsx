import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";

import CircleIcon from "@mui/icons-material/Circle";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import { userUrl, projectUrl, skillUrl, timeLineUrl, messageUrl } from "./Api";

function App() {
  const [section, setSection] = useState("profile");
  const [user, setUser] = useState({});
  const [timeLines, setTimeLines] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    userUrl
      .get("/me/portfolio")
      .then((res) => {
        // console.log(res.data)
        setUser(res?.data?.user);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err?.response?.data?.message);
      });

    timeLineUrl
      .get("/all")
      .then((res) => {
        setTimeLines(res?.data?.allTimeLine);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err.response);
      });

    skillUrl.get("/all").then((res) => {
      setSkills(res?.data?.skills);
    });

    projectUrl
      .get("/all")
      .then((res) => {
        setProjects(res?.data?.projects);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  }, []);

  return (
    <div className="w-full flex justify-center p-1 font-serif">
      <div className="w-full max-w-[900px] flex text-sm sm:text-lg flex-wrap">
        <nav className="flex justify-end w-full gap-3 group py-2 border-b-1 mb-4 bg-black z-3 ">
          <a
            href="#aboutMe"
            className={`${section == "profile" ? "text-blue-500 font-semibold underline" : ""}  px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none `}
            onClick={() => setSection("profile")}
          >
            Profile
          </a>
          <a
            href="#skill"
            className={`${section == "skill" ? "text-blue-500 font-semibold underline" : ""}  px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
            onClick={() => setSection("skill")}
          >
            Skill
          </a>
          <a
            href="#project"
            className={`${section == "project" ? "text-blue-500 font-semibold underline" : ""}  px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
            onClick={() => setSection("project")}
          >
            Project
          </a>
          <a
            href="#contactMe"
            className={`${section == "contactMe" ? "text-blue-500 font-semibold underline" : ""}  px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
            onClick={() => setSection("contactMe")}
          >
            Contact Me
          </a>
        </nav>

        <div className="w-full flex px-2 flex-wrap gap-5 mt-15">
          <div id="hero" className="mb-5 w-full overflow-x-hidden">
            <div className="text-sm flex gap-1 items-center mb-3">
              <span className="bg-green-400 h-2 w-2 rounded-full"></span>
              <span className="font-extralight font-mono text-[12px]">
                Online
              </span>
            </div>
            <div className="w-full">
              <span className="tracking-[2px] mb-3">
                Hey, I'm {user?.fullName}
              </span>
              <h1 className="text-2xl tracking-[15px] animate-pulse mb-3">
                <Typewriter
                  words={user?.iAm}
                  loop={100}
                  typeSpeed={70}
                  deleteSpeed={70}
                  cursor
                />
              </h1>

              <div className="flex gap-4">
                <div
                  id="links"
                  className="outline-1 w-fit flex gap-2 px-2 bg-white rounded-2xl items-center justify-center mb-3"
                >
                  {user?.githubUrl && (
                    <Link
                      to={user?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" hover:scale-120 active:scale-120 group text-black"
                    >
                      <GitHubIcon style={{ fontSize: "25px" }} />
                    </Link>
                  )}

                  {user?.instagramUrl && (
                    <Link
                      to={user?.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" hover:scale-120 active:scale-120 group text-red-600"
                    >
                      <InstagramIcon />
                    </Link>
                  )}

                  {user?.linkedInUrl && (
                    <Link
                      to={user?.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" hover:scale-120 active:scale-120 group text-blue-600"
                    >
                      <LinkedInIcon />
                    </Link>
                  )}
                </div>

                <div className="w-fit h-fit px-2  rounded-2xl bg-white text-black">
                  <Link
                    className="hover:font-bold"
                    to={user?.resume?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <OpenInNewIcon />
                    <span className="text-xs">Resume</span>
                  </Link>
                </div>
              </div>

              <p className="my-5 tracking-[2px]">{user?.aboutMe}</p>
            </div>
          </div>

          <div id="timeline" className="mb-5 w-full overflow-x-hidden">
            <div className="relative flex justify-center items-center mb-3">
              <div className=" z-2 bg-black">
                <h1 className="animate-pulse tracking-[8px] text-5xl font-extrabold font-mono">
                  Timeline
                </h1>
              </div>

              <span className="border-1 w-full absolute"></span>
            </div>
            <ol class="relative border-s border-default ms-2 border-blue-600">
              {timeLines?.map((timeLine) => (
                <li key={timeLine?._id} className="mb-5  ms-5">
                  <span className="h-2 w-2 bg-blue-600 absolute rounded-full -left-[4.5px] shadow-[0px_0px_3px_3px] shadow-blue-600"></span>
                  <p className="relative -top-2">{timeLine.name}</p>
                  <p className="text-xs opacity-50 relative -top-3">
                    {timeLine.from} - {timeLine.to}
                  </p>
                  <p className="relative -top-2 text-sm opacity-80">
                    {timeLine?.about}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div id="aboutMe" className="mb-5 w-full overflow-x-hidden">
            <div className="relative w-full flex justify-center items-center mb-3">
              <div className="bg-black z-2">
                <h1 className="animate-pulse tracking-[8px] text-5xl font-extrabold font-mono">
                  ABOUT ME
                </h1>
              </div>
              <span className="absolute border-1 w-full"></span>
            </div>
            <p className="text-center relative -top-3 opacity-40 text-sm">
              ALLOW ME TO INTRODUCE MYSELF
            </p>

            <div className="flex leading-relaxed">
              <div className="p-8">
                <img
                  src={user?.avatar?.url}
                  alt="avatar"
                  className="shadow-[0px_0px_4px_4px] w-full max-w-35 md:max-w-40 mb-4 mx-20 rotate-15 float-start"
                />
                <p className="font-bold">{user?.fullName}</p>
                <p className="font-bold">{user?.email}</p>
                <p className="font-sans font-bold">{user?.phone}</p>
                {user?.aboutMe}
              </div>
              {/* <div className="w-1/2 sm:w-6/10">
                <p></p>
              </div> */}
            </div>
          </div>

          <div id="skill" className="mb-5 w-full">
            <div className="relative w-full flex justify-center items-center mb-3">
              <h1 className="animate-pulse tracking-[8px] text-4xl font-extrabold ">
                Skills
              </h1>
            </div>
            <div className="flex flex-wrap gap-2 outline-1 p-2 rounded-lg outline-gray-600">
              {skills?.map((skill) => (
                <div
                  key={skill?._id}
                  className="w-22 h-22 outline-1 rounded-lg"
                >
                  <img
                    src={skill?.skillImage?.url}
                    className="object-cover h-[70%] w-full rounded-t-lg"
                  />
                  <p className="text-center">{skill?.skillName}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="project" className="mb-5 w-full">
            <div className="relative w-full flex justify-center items-center mb-3">
              <div className="bg-black z-2">
                <h1 className="animate-pulse tracking-[8px] text-5xl font-extrabold font-mono">
                  PROJECTS
                </h1>
              </div>
              <span className="absolute border-1 w-full"></span>
            </div>

            {/* {projects?.map((project) => (
              <div className="flex flex-wrap gap-2">
                <img src={project?.image.url} alt="" className="h-35 w-35"/>

              </div>
            ))} */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
