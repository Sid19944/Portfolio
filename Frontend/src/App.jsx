import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  const [section, setSection] = useState("profile");

  return (
    <div className="w-full flex justify-center p-1 font-serif">
      <div className="w-full sm:w-[60%] flex outline-1 text-sm sm:text-lg flex-wrap p-2">
        <nav className="flex justify-end w-full gap-3 group py-2 border-b-1 mb-4">
          <Link
            to={"#profile"}
            className={`${section == "profile" ? "text-blue-500 font-semibold underline" : ""}  px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none `}
            onClick={() => setSection("profile")}
          >
            Profile
          </Link>
          <Link
            to={"#skill"}
            className={`${section == "skill" ? "text-blue-500 font-semibold underline" : ""}  px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
            onClick={() => setSection("skill")}
          >
            Skill
          </Link>
          <Link
            to={"#project"}
            className={`${section == "project" ? "text-blue-500 font-semibold underline" : ""}  px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
            onClick={() => setSection("project")}
          >
            Project
          </Link>
          <Link
            to={"#contactMe"}
            className={`${section == "contactMe" ? "text-blue-500 font-semibold underline" : ""}  px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
            onClick={() => setSection("contactMe")}
          >
            Contact Me
          </Link>
        </nav>

        <div className="w-full flex leading-relaxed">
          <img
            src="/hero.png"
            alt=""
            className=" w-35 h-35 mr-5 float-start rounded-[100%] shadow-[0.5px_0.5px_3px_3px] shadow-green-400"
          />
          <h1 className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            provident mollitia enim laudantium ducimus inventore officiis
            impedit doloremque laborum amet atque aut, ratione fugiat
            reprehenderit natus magni nesciunt est omnis. Eos illum voluptatum
            officia praesentium placeat repellendus, ex repudiandae blanditiis
            alias odit soluta incidunt fugit minima consequatur temporibus eum
            ullam magni iste tempora accusantium id ad exercitationem eius?
            Facere, beatae! Nisi, consequuntur iste possimus quibusdam sequi
            accusamus dignissimos dolorum dicta? Quaerat, iusto cum! Vitae ex,
            saepe nostrum voluptate praesentium error illo odit fugit facilis
            neque quaerat, facere iusto. Doloribus, suscipit.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
