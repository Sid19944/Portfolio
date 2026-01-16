import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { projectApi } from "../../Api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";

import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

function AddProject({ techs }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    stack: "",
  });
  const [image, setImage] = useState("");

  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (techs) {
    techs.map((tech) => {
      formData.append("technologies", tech);
    });
  }
  formData.append("stack", data.stack);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    projectApi
      .post("/add/project", formData, {
        headers: {
          "Content-Type": "multipary/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message, { position: "bottom-left" });
        techs.length = 0;
        setImage("");
        setLoading(false);
        setData({
          title: "",
          description: "",
          stack: "",
        });
        setTimeout(() => {
          navigate("/manage/projects");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div className="h-[85vh] p-4 font-serif overflow-y-auto">
      <div className="flex justify-center items-center">
        <form className="w-[95%] md:w-[75%] lg:w-1/2 p-4 ">
          <h1 className="outline-1 p-2 rounded-b-lg text-center font-bold mb-4 bg-gray-400 sticky top-0">
            ADD NEW PROJECT
          </h1>
          <div className="mb-2 outline-1 rounded-lg  p-2items-center">
            {techs?.length ? (
              <h1 className="font-semibold  inline-block ">
                Selected Techs :{" "}
                <span className="text-3xl">{techs.length}</span>
              </h1>
            ) : (
              <Link
                to={"/add/techs"}
                className="animate-bounce outline-1 mt-2 p-2 rounded-lg items-center flex w-fit gap-2 bg-red-400 hover:bg-blue-600 cursor-pointerblur-[0.5px] hover:blur-none"
              >
                First Select the Tech
                <AddCircleOutlineOutlinedIcon />
              </Link>
            )}
          </div>
          <div className="mb-2 outline-1 rounded-lg p-3">
            <label
              htmlFor="projectImage"
              className="font-semibold underline inline-block mb-2"
            >
              Project Image
            </label>
            <input
              disabled={!techs}
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="disabled:cursor-not-allowed disabled:hover:border-b-red-600 disabled:active:border-b-red-600 w-full border-b-3 outline-none hover:border-indigo-500 p-2 file:text-xl "
            />
          </div>
          <div className="mb-2 outline-1 rounded-lg p-3">
            <label
              htmlFor="projectTitle"
              className="font-semibold underline inline-block mb-2"
            >
              Project Title
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              onChange={handleChange}
              disabled={!techs}
              value={data.title}
              className="disabled:cursor-not-allowed disabled:hover:border-b-red-600 disabled:active:border-b-red-600 w-full border-b-3 outline-none hover:border-indigo-500 p-2  file:text-xl "
            />
          </div>
          <div className="mb-2 outline-1 rounded-lg p-3">
            <label
              htmlFor="projectDescription"
              className="font-semibold underline inline-block mb-2"
            >
              Project Description
            </label>
            <textarea
              rows={5}
              type="text"
              placeholder="Enter description"
              name="description"
              onChange={handleChange}
              value={data.description}
              disabled={!techs}
              className=" disabled:cursor-not-allowed disabled:hover:border-b-red-600 disabled:active:border-b-red-600 w-full border-b-3 outline-none hover:border-indigo-500 p-2  file:text-xl "
            />
          </div>
          <div className="mb-2 outline-1 rounded-lg p-3">
            <label
              htmlFor="projectStack"
              className="font-semibold underline inline-block mb-2"
            >
              Project Stack
            </label>
            <input
              type="text"
              placeholder="Enter stack"
              name="stack"
              onChange={handleChange}
              value={data.stack}
              disabled={!techs}
              className="disabled:cursor-not-allowed disabled:hover:border-b-red-600  disabled:active:border-b-red-600 w-full border-b-3 outline-none hover:border-indigo-500 p-2  file:text-xl "
            />
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              data.title === "" ||
              data.description === "" ||
              data.stack === "" ||
              techs.length === 0 ||
              image === ""
            }
            onClick={handleSubmit}
            className="w-full flex justify-center items-center gap-2 outline-1 p-1 rounded-b-2xl bg-blue-400 hover:rounded-2xl hover:bg-blue-600 cursor-pointer hover:font-semibold blur-[0.5px] hover:blur-none disabled:bg-gray-400 disabled:cursor-not-allowed sticky bottom-0"
          >
            Add New Project
            <SendIcon className="px-1" />
          </button>
          {/* <div className="pb-12"></div> */}
        </form>
        
        <ToastContainer />
        {loading ? <Loading text="Adding...." /> : ""}
        
      </div>
    </div>
  );
}

export default AddProject;
