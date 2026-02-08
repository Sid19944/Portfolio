import React from "react";
import { Link } from "react-router-dom";

import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import GitHubIcon from "@mui/icons-material/GitHub";

function RightImage({ project }) {
  const description = project?.description?.split(".");
  return (
    <div className="flex p-4 mb-8 border border-gray-500 rounded-lg flex-wrap-reverse items-center">
      <div className="text-sm flex items-center gap-2 justify-around w-full">
        <Link className="bg-blue-500 rounded-full px-3 flex gap-2 cursor-pointer py-1 items-center" to={project.projectUrl} target="_blank">
          <OnlinePredictionIcon style={{ width: "20px", height: "20px" }} />
          Go Live
        </Link>
        <Link className="bg-blue-500 rounded-full flex gap-2 px-3 cursor-pointer py-1 items-center" to={project.gitHubUrl} target="_blank">
          <GitHubIcon style={{ width: "20px", height: "20px" }} /> GitHub
        </Link>
      </div>
      <h1 className="text-lg md:text-2xl font-bold tracking-[2px] mb-3 sm:block text-center w-full">
        {project?.title}
      </h1>

      <Link to={`/view/${project?._id}`} className="">
        <video
          src={project?.image?.url}
          autoPlay
          muted
          loop
          alt="Project Image"
          className="h-full shadow-[0px_0px_5px_5px] shadow-blue-600 rounded-lg"
        />
        <p className="text-gray-500 text-center">click to view more detail</p>
      </Link>
    </div>
  );
}

export default RightImage;
