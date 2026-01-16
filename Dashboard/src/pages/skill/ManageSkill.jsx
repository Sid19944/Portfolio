import React from "react";
import { skillApi } from "../../Api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../utils/BackToDashboard";

import Loading from "../utils/Loading"

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddLinkIcon from "@mui/icons-material/AddLink";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

function ManageSkill() {
  const [allSkill, setAllSkill] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    skillApi
      .get("/all")
      .then((res) => setAllSkill(res.data.skills))
      .catch((err) =>
        toast.error(err.response.data.message, { position: "top-right" })
      );
      setBuffering(false)
  }, [loading]);

  const handleDelete = async (id) => {
    setLoading(true);
    skillApi
      .delete(`/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message, { position: "bottom-left" });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message, { position: "top-right" });
        setLoading(false);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit/skill/${id}`);
  };

  return (
    <div className="h-screen font-serif flex justify-center">
      <div className="w-full md:w-[70%] p-2">
        <div className="outline-1 rounded-2xl mb-4 p-2 flex justify-between items-center">
          <span className="font-bold text-2xl">Skills</span>{" "}
          <Link
            to={"/add/skill"}
            className="flex items-center gap-4 font-semibold text-white hover:text-indigo-500 hover:bg-gray-300 outline-1 px-4 bg-gray-300 rounded-2xl text-lg blur-[0.5px] hover:blur-none hover:shadow-xl/30 hover:shadow-indigo-900"
          >
            Add New Skill
            <AddLinkIcon />
          </Link>
        </div>
        <BackToDashboard/>
        {allSkill.map((skill) => (
          <div
            className="outline-1 w-full rounded-lg mb-4 p-1 h-fit min-h-[10%] flex justify-around items-center flex-wrap"
            key={skill._id}
          >
            <img
              src={skill.skillImage.url}
              alt="Skill Image"
              className="object-cover w-[20%] outline-2 outline-black max-h-[70px] max-w-[90px] mb-2"
            />
            <span className=" text-center p-2 mb-2">{skill.skillName}</span>

            <div className="flex gap-2.5">
              <Button
                onClick={() => handleEdit(skill._id)}
                variant="contained"
                endIcon={<EditIcon />}
                className="outline-1 w-fit  text-center bg-blue-400 font-semibold px-4 py-2 rounded-2xl  hover:rounded-lg hover:bg-blue-600 text-white cursor-pointer hover:shadow-xl/30 "
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(skill._id)}
                variant="contained"
                endIcon={<DeleteIcon />}
                className="outline-1 w-fit  text-center bg-blue-400 font-semibold px-4 py-2 rounded-2xl  hover:rounded-lg hover:bg-blue-600 text-white cursor-pointer active:bg-red-500 decoration-none"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        <ToastContainer />
        {loading ? <Loading text="Deleting..." /> : ""}
        {buffering ? <Loading text="Loading..." /> : <></>}
      </div>
    </div>
  );
}

export default ManageSkill;
