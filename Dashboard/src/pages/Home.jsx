import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import { Link, useNavigate } from "react-router-dom";
import AddProject from "../pages/projects/AddProject";
import AddSkill from "../pages/skill/AddNewSkill";
import ManageMessage from "./message/ManageMessage";
import Account from "./user/Account";
import { userApi } from "../Api";

function Home() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const logout = () => {
    userApi
      .post("/logout")
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="h-screen flex font-serif z-3">
      {/* Nav for desktop */}
      <nav className="w-[35px] h-full hidden border-r-1 sm:flex justify-between flex-col items-center py-2 gap-3 ">
        <div className="group">
          <Link
            className="h-fit w-full group"
            onClick={() => setActivePage("dashboard")}
          >
            <DashboardIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              Dashboard
            </span>
          </Link>
        </div>

        <div className="group">
          <Link
            className="h-fit w-full group"
            onClick={() => setActivePage("addProject")}
          >
            <NoteAddIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden  group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              App Project
            </span>
          </Link>
        </div>
        <div className="group">
          <Link
            className="h-fit w-full group"
            onClick={() => setActivePage("addSkill")}
          >
            <AddCircleOutlineIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              Add Skill
            </span>
          </Link>
        </div>
        <div className="group">
          <Link
            className="h-fit w-full group"
            onClick={() => setActivePage("messages")}
          >
            <MailOutlineIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              Messages
            </span>
          </Link>
        </div>
        <div className="group">
          <Link
            className="h-fit w-full group"
            onClick={() => setActivePage("account")}
          >
            <AccountCircleIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
            <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
              Account
            </span>
          </Link>
        </div>

        <div className="h-full flex items-center justify-center">
          <div className="group">
            <Link className="h-fit w-full group" onClick={logout}>
              <LogoutIcon className="hover:scale-110 hover:blur-none blur-[0.5px] cursor-pointer" />
              <span className="absolute left-[40px] rounded-lg mb-2 hidden group-hover:inline-block bg-amber-100 text-black px-2 group-active:inline-block">
                Logout
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="w-full overflow-hidden">
        {/* Nav for mobile */}
        <nav className="sm:hidden h-fit w-full flex justify-between ">
          <Link className="sm:hidden py-3 px-2 h-fit outline-1 w-full flex justify-between items-center">
            <MenuIcon
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            />
            <span>
              Welcome back, <span className="font-bold">Siddharth Sarkar</span>
            </span>
          </Link>
          {showMenu ? (
            <div className="sm:hidden fixed top-[55px] left-2 w-fit outline-1 rounded-md p-1 bg-black z-10">
              <ul className="flex flex-col gap-2">
                <li className="cursor-pointer">
                  <Link
                    className="h-fit w-full group"
                    onClick={() => {
                      setShowMenu(!showMenu);
                      setActivePage("dashboard");
                    }}
                  >
                    <DashboardIcon /> Dashboard
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link
                    className="h-fit w-full group"
                    onClick={() => {
                      setShowMenu(!showMenu);
                      setActivePage("addProject");
                    }}
                  >
                    <NoteAddIcon /> Add Project
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link
                    className="h-fit w-full group"
                    onClick={() => {
                      setShowMenu(!showMenu);
                      setActivePage("addSkill");
                    }}
                  >
                    <AddCircleOutlineIcon /> Add Skill
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link
                    className="h-fit w-full group"
                    onClick={() => {
                      setShowMenu(!showMenu);
                      setActivePage("messages");
                    }}
                  >
                    <MailOutlineIcon /> Messages
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link
                    className="h-fit w-full group"
                    onClick={() => {
                      setShowMenu(!showMenu);
                      setActivePage("account");
                    }}
                  >
                    <AccountCircleIcon /> Account
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link className="h-fit w-full group" onClick={logout}>
                    <LogoutIcon /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </nav>

        <header className="hidden sm:flex w-full p-3 border-b-1 h-fit sm:items-center gap-4">
          <img
            src="/public/hero.png"
            alt="Profile"
            className="w-[7%] rounded-lg"
          />
          <span className="text-xl">
            Welcome back, <span className="font-bold">Siddharth Sarkar</span>
          </span>
        </header>

        <div className=" h-full">
          {(() => {
            switch (activePage) {
              case "dashboard":
                // return <Dashboard />;
                break;
              case "addProject":
                return (
                  <div className="overflow-y-auto mb-[100px]">
                    <AddProject />
                  </div>
                );
                break;
              case "addSkill":
                return (
                  <div className="mb-[100px]">
                    <AddSkill />
                  </div>
                );
                break;
              case "messages":
                return (
                  <div className="">
                    <ManageMessage />
                  </div>
                );
                break;
              case "account":
                return (
                  <div className=" mb-[100px]">
                    <Account />
                  </div>
                );
                break;
            }
          })()}
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}

export default Home;
