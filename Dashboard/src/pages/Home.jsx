import React, { useState } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [showAc, setShowAc] = useState(false);
  console.log(showMenu);

  return (
    <div className="min-h-screen flex">
      <nav className="w-[35px] min-h-full hidden outline-1 sm:flex justify-between flex-col items-center py-2 gap-3">
        <div className="group">
          <Link className="h-fit w-full group">
            <DashboardIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              Dashboard
            </span>
          </Link>
        </div>

        <div className="group">
          <Link className="h-fit w-full group">
            <NoteAddIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden  group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              App Project
            </span>
          </Link>
        </div>
        <div className="group">
          <Link className="h-fit w-full group">
            <AddCircleOutlineIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              App Skill
            </span>
          </Link>
        </div>
        <div className="group">
          <Link className="h-fit w-full group">
            <MailOutlineIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              Messages
            </span>
          </Link>
        </div>
        <div className="group">
          <Link className="h-fit w-full group">
            <AccountCircleIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              Accound
            </span>
          </Link>
        </div>

        <div className="mt-auto">
          <div className="group">
            <Link className="h-fit w-full group">
              <LogoutIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
              <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
                Logout
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <nav className="sm:hidden h-fit w-full flex justify-between">
        <Link className="sm:hidden py-3 px-2 h-fit outline-1 w-full flex justify-between">
          <MenuIcon onClick={() => setShowMenu(!showMenu)} />
          <AccountCircleIcon onClick={() => setShowAc(!showAc)} />
        </Link>
        {showMenu ? (
          <div className="sm:hidden fixed top-[55px] left-2 w-fit outline-1 rounded-md p-1 ">
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer">
                <Link className="h-fit w-full group">
                  <DashboardIcon /> Dashboard
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link className="h-fit w-full group">
                  <NoteAddIcon /> Add Project
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link className="h-fit w-full group">
                  <AddCircleOutlineIcon /> Add Skill
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link className="h-fit w-full group">
                  <MailOutlineIcon /> Messages
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}

        {showAc ? (
          <div className="sm:hidden fixed top-[55px] right-2 w-fit outline-1 rounded-md p-1">
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer">
                <Link className="h-fit w-full group">
                  <AccountCircleIcon /> Accound
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link className="h-fit w-full group">
                  <LogoutIcon /> Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
}

export default Home;
