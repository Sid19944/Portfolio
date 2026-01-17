import React, { useEffect, useState } from "react";
import { skillApi } from "../../Api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../utils/Loading";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function EditSkill() {
  const navigate = useNavigate();
  const [skill, setSkill] = useState({});
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [skillImage, setSkillImage] = useState("");
  const [skillName, setSkillName] = useState("");

  const fileData = new FormData();
  fileData.append("skillImage", skillImage);
  fileData.append("skillName", skillName);

  useEffect(() => {
    skillApi
      .get(`/one/${id}`)
      .then((res) => {
        setSkill(res.data.skill);
      })
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    if (skill) {
      setSkillName(skill.skillName);
      setSkillImage(skill.skillImage);
    }
  }, [skill]);

  const handleSubmit = async () => {
    setLoading(true);
    await skillApi
      .put(`/update/${id}`, fileData, {
        headers: {
          "Content-Type": "multipary/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message, { position: "bottom-left" });
        setTimeout(() => {
          navigate("/manage/skills");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });

    setLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center p-8 font-serif">
      {Object.keys(skill).length !== 0 && (
        <form className="outline-1  md:w-2/5 lg:w-1/2 p-4 flex flex-col items-center rounded-3xl">
          <h2 className="text-3xl font-bold  p-3 w-full text-center rounded-3xl">
            Update Your Skill
          </h2>
          <div className="outline-1 mb-4 lg:h-1/2 md:w-2/5 lg:w-1/2 my-4">
            <img src={skill.skillImage.url} className="" />
          </div>
          <div className="w-full">
            <div className="my-4">
              <label htmlFor="skillImage" className="text-lg font-bold ">
                Enter Image
              </label>
              <input
                type="file"
                onChange={(e) => setSkillImage(e.target.files[0])}
                className=" outline-1 w-full px-2 mb-4 file:text-white rounded-3xl file:leading-4"
              />
            </div>
            <div>
              <label htmlFor="skillName" className="text-lg font-bold">
                Enter Name
              </label>
              <input
                type="text"
                name="skillName"
                defaultValue={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                className="border-b-1  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden   w-full text-center mb-4 text-2xl font-bold p-4"
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="outline-1 w-full block text-center cursor-pointer bg-blue-400 font-semibold p-1  hover:rounded-lg hover:bg-blue-600 text-white decoration-none disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Submit"}
                {loading ? "" : <ArrowUpwardIcon />}
              </button>
            </div>
          </div>
        </form>
      )}
      <ToastContainer />
      {loading ? <Loading text="Updating..." /> : ""}
    </div>
  );
}

export default EditSkill;
