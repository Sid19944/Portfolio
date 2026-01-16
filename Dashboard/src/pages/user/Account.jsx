import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./subComponent/Profile";

import PasswordIcon from "@mui/icons-material/Password";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import UpdatePassword from "./subComponent/UpdatePassword";
import UpdateProfile from "./subComponent/UpdateProfile";

function Account() {
  const [activePage, setActivePage] = useState("profile");

  return (
    <div className="h-screen">
      <div
        id="account"
        className="sm:flex sm:h-full sm:gap-4 flex-col sm:flex-row justify-around "
      >
        <ul className="w-full sm:w-[25%] flex border-b-1 sm:border-none sm:block justify-around bg-black z-3 py-2 rounded-lg ">
          <li className={`hover:underline text-center blur-[0.4px] hover:blur-none hover:scale-105 active:scale-105 hover:text-yellow-400 active:text-yellow-400 ${activePage === "profile" ? "text-blue-400 scale-105 blur-none" :""}`}>
            <Link onClick={() => setActivePage("profile")}>
              Profile <AccountCircleIcon />
            </Link>
          </li>
          <li className={`hover:underline text-center blur-[0.4px] hover:blur-none hover:scale-105 active:scale-105 hover:text-yellow-400 active:text-yellow-400 ${activePage === "updateProfile" ? "text-blue-400 scale-105 blur-none" :""}`}>
            <Link onClick={() => setActivePage("updateProfile")}>
              Update <AccountBoxIcon />
            </Link>
          </li>
          <li className={`hover:underline text-center blur-[0.4px] hover:blur-none hover:scale-105 active:scale-105 hover:text-yellow-400 active:text-yellow-400 ${activePage === "updatePassword" ? "text-blue-400 scale-105 blur-none" :""}`}>
            <Link onClick={() => setActivePage("updatePassword")}>
              Update <PasswordIcon />
            </Link>
          </li>
        </ul>
        <div className="w-full overflow-y-auto h-screen pb-25">
          {(() => {
            switch (activePage) {
              case "profile":
                return <Profile />;
                break;
              case "updateProfile":
                return <UpdateProfile />;
                break;
              case "updatePassword":
                return <UpdatePassword />;
                break;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default Account;
