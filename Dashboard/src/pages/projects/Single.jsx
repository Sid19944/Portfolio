import React, { useEffect, useState } from "react";
import { projectApi } from "../../Api";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";

function Single() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [description, setDescription] = useState([]);

  // if (description.length) {
  //   console.log(description);
  // }

  useEffect(() => {
    projectApi
      .get(`/single/${id}`)
      .then((res) => {
        //   console.log(res.data);
        setProject(res.data.project);
        const desc = res.data.project?.description
          ?.split(".")
          .filter((item) => item !== "");
        setDescription(desc);
        // toast.success(res.data.message, { position: "bottom-left" });
      })
      .catch((err) => toast.error(err.response.data.message));
  }, []);

  // console.log(project);
  return (
    <div className="h-screen font-serif flex justify-center">
      {/* <div className=" flex flex-wrap md:justify-evenly "> */}
      <div className="w-full md:w-[50%] p-2">
        <p className=" rounded-lg p-3 mb-3 w-full h-fit font-semibold text-2xl border-b-2 border-l-2">
          {project.title}
        </p>

        <div className="rounded-lg mb-3 sm:h-1/2 w-full flex justify-center ">
          <video
            src={project?.image?.url}
            autoPlay
            muted
            loop
            alt="Project Image"
            className="rounded-lg h-full outline-1"
          />
        </div>

        <div className="flex flex-col justify-between w-full h-fit mb-3">
          <p className="font-bold mb-3 underline">Description</p>

          {description.length ? (
            <ul className="list-disc list-inside">
              {description.map((desc, idx) => (
                <li key={idx}>
                  {desc}.
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>

        <div className="mb-4">
          <p className="font-bold mb-1 underline">Stack</p>
          <p className="rounded-lg w-full text-xs">{project.stack}</p>
        </div>

        <div className="mb-4">
          <p className="font-bold mb-1 underline">Deployed</p>
          <p className="rounded-lg w-full text-xs">
            {project.deployed ? "YES" : "NO"}
          </p>
        </div>

        {project?.gitHubUrl ? (
          <div className="mb-4">
            <p className="font-bold mb-1 underline">
              Github Repository Link <GitHubIcon />
            </p>
            <Link to={project?.gitHubUrl} target="_blank" className="rounded-lg w-full text-sm text-blue-400 hover:underline cursor-pointer">
              {project.gitHubUrl}
            </Link>
          </div>
        ) : (
          ""
        )}

        {project?.projectUrl ? (
          <div className="mb-4">
            <p className="font-bold mb-1 underline">Project Link</p>
            <Link to={project?.projectUrl} target="_blank" className="rounded-lg w-full text-sm text-blue-400 hover:underline cursor-pointer">
              {project?.projectUrl}
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col justify-between w-full h-fit mb-3">
          <p className="font-bold mb-3 underline">Used Technologies</p>
          <ul className="list-disc list-inside">
            {project?.technologies?.map((tech,idx) => (
              <li key={idx}>{tech.skillName}</li>
            ))}
          </ul>
        </div> 

        <div className="h-25"></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Single;
