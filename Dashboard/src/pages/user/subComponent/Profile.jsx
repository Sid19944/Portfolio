import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { userApi } from "../../../Api";

function Profile() {
  const [user, setUser] = useState({});
  // console.log(user);
  useEffect(() => {
    userApi
      .get("/me")
      .then((res) => {
        // console.log(res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      });
  }, []);
  return (
    <div className="h-screen">
      <div id="profile" className="flex p-4 sm:max-w-3xl lg:max-w-5xl">
        <div className="flex gap-2 flex-wrap w-full h-full justify-around">
          <div className="flex w-[90%] sm:w-full gap-2 min-w-[230px] justify-around flex-wrap">
            <Link to={user?.avatar?.url} className="group">
              <img
                src={user?.avatar?.url}
                alt="Avatar"
                className="max-h-[200px] max-w-[200px]"
              />
              <span className="group-hover:inline-block hidden absolute">Avatar</span>
            </Link>
            <Link to={user?.resume?.url} className="group">
              <img
                src={user?.resume?.url}
                alt="Avatar"
                className="max-h-[200px] max-w-[200px]"
              />
              <span className="group-hover:inline-block hidden absolute">Resume</span>
            </Link>
          </div>
          <div className="flex w-[90%] min-w-[220px] flex-col gap-1">
            <div className="flex gap-2 flex-wrap">
              <label htmlFor="name">Name</label>
              <h1 className="font-bold">{user?.fullName}</h1>
            </div>
            <div className="flex gap-2 flex-wrap">
              <label htmlFor="email" className="w-fit">
                Email
              </label>
              <h1 className="font-bold">{user?.email}</h1>
            </div>
            <div className="flex gap-2 flex-wrap">
              <label htmlFor="phone">Phone</label>
              <h1 className="font-bold">{user?.phone}</h1>
            </div>
          </div>
          <div className="w-[90%] outline-1 rounded-lg p-2">
            <textarea
              rows={4}
              className="h-full w-full rounded-lg p-2"
              disabled
              value={user?.aboutMe}
            ></textarea>
          </div>

          {user?.githubUrl ||
          user?.portfolioUrl ||
          user?.instagramUrl ||
          user?.linkedInUrl ? (
            <div className="w-[90%] outline-1 gap-4 flex flex-col rounded-lg p-2 ">
              {user?.githubUrl ? (
                <div className="flex flex-col ">
                  <label htmlFor="gitHubUrl" className="w-full">
                    GirHub Repositery{" "}
                  </label>
                  <Link className="text-blue-600 hover:underline">
                    {user.githubUrl}
                  </Link>
                </div>
              ) : (
                ""
              )}

              {user?.portfolioUrl ? (
                <div className="flex flex-col">
                  <label htmlFor="gitHubUrl" className="w-full">
                    Portfolio URL{" "}
                  </label>
                  <Link className="text-blue-600 hover:underline">
                    {user.portfolioUrl}
                  </Link>
                </div>
              ) : (
                ""
              )}

              {user?.instagramUrl ? (
                <div className="flex flex-col ">
                  <label htmlFor="instagram" className="w-full">
                    Instagram ID
                  </label>
                  <Link className="text-blue-600 hover:underline">
                    {user.instagramUrl}
                  </Link>
                </div>
              ) : (
                ""
              )}

              {user?.linkedInUrl ? (
                <div className="flex flex-col ">
                  <label htmlFor="linkedInUrl" className="w-full">
                    LinkedInUrl
                  </label>
                  <Link className="text-blue-600 hover:underline">
                    {user.linkedInUrl}
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <div className="h-30"></div> */}
      <ToastContainer />
    </div>
  );
}

export default Profile;
