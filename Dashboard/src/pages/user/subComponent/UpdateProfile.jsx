import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userApi } from "../../../Api";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Loading from "../../utils/Loading";

function UpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedInUrl, setLinkenInUrl] = useState("");

  const [avatar, setAvatar] = useState("");
  const [resume, setResume] = useState("");

  const [iAm, setIAm] = useState([]);
  const [newIam, setNewIam] = useState("");
  const [sendIam, setSendIam] = useState([]);

  useEffect(() => {
    const para = iAm?.join(",");
    if (para) {
      setNewIam(para);
    }
  }, [iAm]);


  useEffect(()=>{
    setSendIam(newIam.split(","));
  },[newIam])
  

  const formData = new FormData();
  if (fullName?.trim()) {
    formData.append("fullName", fullName);
  }
  if (email?.trim()) {
    formData.append("email", email);
  }
  if (phone?.trim()) {
    formData.append("phone", phone);
  }
  if (aboutMe?.trim()) {
    formData.append("aboutMe", aboutMe);
  }
  if (portfolioUrl?.trim()) {
    formData.append("portfolioUrl", portfolioUrl);
  }
  if (githubUrl?.trim()) {
    formData.append("githubUrl", githubUrl);
  }
  if (instagramUrl?.trim()) {
    formData.append("instagramUrl", instagramUrl);
  }
  if (linkedInUrl?.trim()) {
    formData.append("linkedInUrl", linkedInUrl);
  }
  if (sendIam) {
    sendIam?.map((item) => {
      formData.append("iAm", item);
    });
  }
  if (avatar) {
    formData.append("avatar", avatar);
  }
  if (resume) {
    formData.append("resume", resume);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await userApi
      .put("/update/me", formData, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data);
      });
    setLoading(false);
  };

  useEffect(() => {
    userApi
      .get("/me")
      .then((res) => {
        // console.log(res.data.user);
        setFullName(res.data.user.fullName);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setAboutMe(res.data.user.aboutMe);
        setPortfolioUrl(res.data.user?.portfolioUrl);
        setGithubUrl(res.data.user?.githubUrl);
        setInstagramUrl(res.data.user?.instagramUrl);
        setLinkenInUrl(res.data.user?.linkedInUrl);
        setIAm(res.data.user?.iAm);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      });
  }, [Loading]);
  return (
    <div className="h-screen py-4 overflow-y-auto">
      <div className="flex flex-col items-center justify-center sm:justify-around gap-4 ">
        <div className="w-[90%] md:w-[60%] outline-1 p-2 gap-4 flex flex-col rounded-lg mb-25">
          <h1 className="text-3xl font-semibold text-center m-6 sticky top-0 bg-black rounded-lg py-2 outline-1">
            Update Profile
          </h1>
          <div className="gap-3 flex">
            <label htmlFor="avatar" className="w-[15%]">
              Avatar
            </label>
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="px-4 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600"
            />
          </div>
          <div className="gap-3 flex">
            <label htmlFor="resume" className="w-[15%]">
              Resume
            </label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="px-4 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600"
            />
          </div>
          <div className="gap-3 flex">
            <label htmlFor="name" className="w-[15%]">
              Name
            </label>
            <input
              type="text"
              placeholder="fullName"
              defaultValue={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="px-2 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600 text-blue-500 border-white"
            />
          </div>
          <div className="gap-3 flex">
            <label htmlFor="email" className="w-[15%]">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600 text-blue-500 border-white"
            />
          </div>
          <div className="gap-3 flex">
            <label htmlFor="phone" className="w-[15%]">
              Phone
            </label>
            <input
              type="number"
              placeholder="phone"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-2 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600 text-blue-500 border-white"
            />
          </div>
          <div>
            <textarea
              rows={5}
              name="aboutMe"
              placeholder="aboutMe"
              defaultValue={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="px-2 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600 text-blue-500 border-white"
            ></textarea>
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="portfolioUtl" className="w-full">
              Portfolio
            </label>
            <input
              type="text"
              defaultValue={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="portfolio Url"
              className="px-2 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600 text-blue-500 border-white"
            />
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="githubUrl" className="w-full">
              Git Hub
            </label>
            <input
              type="text"
              placeholder="github Url"
              defaultValue={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="px-2 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600 text-blue-500 border-white"
            />
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="instagramUrl" className="w-full">
              Intagaram
            </label>
            <input
              type="text"
              placeholder="instagram Url"
              defaultValue={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="px-2 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600 text-blue-500 border-white"
            />
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="linkedInUrl" className="w-full">
              LinkedIn
            </label>
            <input
              type="text"
              placeholder="Linked In"
              defaultValue={linkedInUrl}
              onChange={(e) => setLinkenInUrl(e.target.value)}
              className="px-2 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600 text-blue-500 border-white"
            />
          </div>

          <div className="flex flex-wrap">
            <label htmlFor="iAm" className="w-full">
              iAm
            </label>
            <input
              type="text"
              placeholder="Add iAm"
              defaultValue={iAm}
              onChange={(e) => setNewIam(e.target.value)}
              className="px-2 rounded-lg border-1 hover:border-2 hover:border-t-0 hover:border-r-0 w-full hover:border-purple-600 text-blue-500 border-white"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            disabled={
              loading ||
              fullName?.trim() === "" ||
              email?.trim() === "" ||
              phone?.trim() === ""
            }
            className="sticky bottom-0 cursor-pointer hover:font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed p-2 rounded-xl text-center bg-blue-600 shadow-md hover:shadow-red-600 outline-1 w-full"
          >
            Update
          </button>
        </div>
      </div>

      <ToastContainer />
      {loading ? <Loading text={"Updating..."} /> : ""}
    </div>
  );
}

export default UpdateProfile;
