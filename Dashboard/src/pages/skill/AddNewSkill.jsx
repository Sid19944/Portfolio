import React, { useState } from "react";
import { skillApi } from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";

function AddNewSkill() {
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fileData = new FormData();
  fileData.append("skillImage", skillImage);
  fileData.append("skillName", skillName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    skillApi
      .post("/add/skill", fileData, {
        headers: { "Content-Type": "multipary/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message, { position: "bottom-left" });
        setSkillName("");
        setSkillImage("");
        setTimeout(() => {
          navigate("/manage/skills");
        }, 5000);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center font-serif">
      <form className="outline-1 w-[95%] lg:w-1/2 p-4 rounded-2xl">
        <h1 className="font-semibold text-2xl text-center p-4 rounded-t-2xl mb-4">
          Add New Skill
        </h1>
        <div>
          <label htmlFor="skillImage" className="font-semibold text-lg">
            Select Skill Image
          </label>
          <input
            type="file"
            onChange={(e) => setSkillImage(e.target.files[0])}
            className="w-full outline-1 p-3 mb-4 rounded-2xl file:text-xl"
          />
        </div>
        <div>
          <label htmlFor="skillName" className="font-semibold text-lg">
            Enter Skill Name
          </label>
          <input
            type="text"
            placeholder="Enter Skill Name"
            onChange={(e) => setSkillName(e.target.value)}
            value={skillName}
            className="w-full border-b-3 outline-none hover:border-indigo-500 p-3 mb-4   file:text-xl "
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading || skillName === ""}
          className="w-full outline-1 p-1 rounded-b-2xl bg-blue-400 hover:rounded-2xl hover:bg-blue-600 cursor-pointer hover:text-white hover:font-semibold blur-[0.5px] hover:blur-none disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Skill"}
        </button>
      </form>
      <ToastContainer />
      {loading ? <Loading text="Adding..." /> : ""}
    </div>
  );
}

export default AddNewSkill;
