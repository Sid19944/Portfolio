import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { projectApi } from "../../Api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LoginIcon from "@mui/icons-material/Login";

function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [image, setImage] = useState(null);
  const [deployed, setDeployed] = useState(false);
  const [stack, setStack] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (image) {
    formData.append("image", image);
  }
  technologies?.map((id) => {
    formData.append("technologies", id);
  });

  formData.append("deployed", deployed);
  formData.append("stack", stack);
  if (gitHubUrl) {
    formData.append("gitHubUrl", gitHubUrl);
  }
  if (projectUrl) {
    formData.append("projectUrl", projectUrl);
  }

  const handleDeploy = (e) => {
    setDeployed(JSON.parse(e.target.value));
  };

  const handleDelete = (id, techId) => {
    projectApi
      .delete(`/${id}/delete/tech/${techId}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message, { position: "bottom-left" });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    projectApi
      .put(`/update/${id}`, formData, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message, { position: "bottom-left" });
        setLoading(false);
        setTimeout(() => {
          navigate("/manage/projects");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    projectApi.get(`/single/${id}`).then((res) => {
      // console.log(res.data);
      setTitle(res.data.project.title);
      setDescription(res.data.project.description);
      setDeployed(res.data.project.deployed);
      setStack(res.data.project.stack);
      setGitHubUrl(res.data.project?.gitHubUrl);
      setProjectUrl(res.data.project?.projectUrl);
      setTechnologies(res.data.project.technologies.map((item) => item._id));
      setProject(res.data.project);
      // toast.success(res.data.message, { position: "bottom-left" });
    });
  }, [loading]);
  return (
    <div className="h-screen font-serif flex justify-center">
      <div className="w-full md:w-[50%] p-2">
        <p className="w-full outline-1 p-2 bg-gray-400 text-xl font-bold rounded-b-xl text-center mb-4 sticky top-0 z-2">
          Edit Your Project
        </p>
        <div className="rounded-lg mb-4 sm:h-1/2 w-full flex justify-center">
          <img
            src={project?.image?.url}
            alt="Project Image"
            className="rounded-lg h-full outline-4 "
          />
        </div>
        <div className="w-full mb-4">
          <div className="flex outline-1 flex-wrap rounded-lg p-3 justify-between mb-2 items-center">
            <p className=" w-full lg:w-[25%] px-2 font-bold underline">
              New Image
            </p>
            <input
              className="w-full lg:w-[75%] border-b-3 outline-none hover:border-indigo-500 p-2  file:text-xl "
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </div>
          <div className="flex outline-1 flex-wrap rounded-lg p-3 justify-between mb-2 items-center">
            <p className=" w-full lg:w-[25%] px-2 font-bold underline">Title</p>
            <input
              className="disabled:cursor-not-allowed disabled:hover:border-b-red-600 disabled:active:border-b-red-600 w-full lg:w-[75%] border-b-3 outline-none hover:border-indigo-500 p-2  file:text-xl "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="flex outline-1 flex-wrap rounded-lg p-3 justify-between mb-2 items-center">
            <p className=" w-full lg:w-[25%] px-2 font-bold underline">Stack</p>
            <input
              className="disabled:cursor-not-allowed disabled:hover:border-b-red-600 disabled:active:border-b-red-600 w-full lg:w-[75%] border-b-3 outline-none hover:border-indigo-500 p-2 file:text-xl "
              value={stack}
              onChange={(e) => setStack(e.target.value)}
            ></input>
          </div>
          <div className="flex outline-1 flex-wrap rounded-lg p-3 justify-between mb-2 items-center">
            <p className=" w-full lg:w-[25%] px-2 font-bold underline">
              Github Link
            </p>
            <input
              className="disabled:cursor-not-allowed disabled:hover:border-b-red-600 disabled:active:border-b-red-600 w-full lg:w-[75%] border-b-3 outline-none hover:border-indigo-500 p-2 file:text-xl "
              value={gitHubUrl || ""}
              onChange={(e) => setGitHubUrl(e.target.value)}
            ></input>
          </div>
          <div className="flex outline-1 flex-wrap rounded-lg p-3 justify-between mb-2 items-center">
            <p className=" w-full lg:w-[25%] px-2 font-bold underline">
              Project Url
            </p>
            <input
              className="disabled:cursor-not-allowed disabled:hover:border-b-red-600 disabled:active:border-b-red-600 w-full lg:w-[75%] border-b-3 outline-none hover:border-indigo-500 p-2 file:text-xl "
              value={projectUrl || ""}
              onChange={(e) => setProjectUrl(e.target.value)}
            ></input>
          </div>
          <div className="flex outline-1 flex-wrap rounded-lg p-3 justify-between mb-2 items-center">
            <p className=" w-full lg:w-[25%] px-2 font-bold underline">
              Deployed
            </p>
            <div className="flex gap-3 w-full lg:w-[75%]">
              <div>
                <input
                  type="radio"
                  id="true"
                  name="deployed"
                  value={true}
                  checked={deployed == true}
                  onChange={handleDeploy}
                />
                <label htmlFor="true"> Yes</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="true"
                  name="deployed"
                  value={false}
                  checked={deployed == false}
                  onChange={handleDeploy}
                />
                <label htmlFor="true"> No</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col outline-1 rounded-lg px-5 pb-5 justify-between ">
            <p className="font-bold underline mb-3">Description</p>
            <textarea
              rows={5}
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="outline-1 p-3 rounded-lg"
            ></textarea>
          </div>
        </div>

        <p className="outline-1 p-2 rounded-lg mb-3 font-bold bg-gray-400 text-amber-100 flex justify-between items-center">
          Used Technologies{" "}
          <Link
            to={`/${id}/project/add/tech`}
            className="outline-1 rounded-lg p-2 bg-blue-300 blur-[0.5px] hover:blur-none hover:bg-blue-600"
          >
            Add New <AddCircleOutlineOutlinedIcon />
          </Link>
        </p>
        {project?.technologies?.map((tech, idx) => (
          <div
            key={idx}
            className="outline-1 w-full  mb-2 p-2 px-4 flex justify-between  items-center flex-wrap rounded-lg"
          >
            <img
              src={tech?.skillImage?.url}
              className="object-fit outline-2 outline-black w-[16%] max-h-[60px] max-w-[90px] rounded-lg"
            />

            <span className="text-center text-xl font-semibold ">
              {tech.skillName}
            </span>

            <Link
              className=" px-3 rounded-lg flex justify-center text-red-700"
              onClick={() => handleDelete(id, tech._id)}
            >
              Del
              <DeleteIcon className="cursor-pointer" />
            </Link>
          </div>
        ))}

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={
            loading || !title || !description || !technologies || !stack
          }
          className="w-full blur-[0.5px] hover:blur-none my-6 block text-center bg-blue-400 font-semibold py-2 text-black hover:rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Submit
          {loading ? "" : <LoginIcon />}
        </button>
      </div>

      <ToastContainer />
      {loading ? <Loading text="Updating..." /> : ""}
    </div>
  );
}

export default EditProject;
