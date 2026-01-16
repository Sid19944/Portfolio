import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import ForgotPassword from "./pages/login/ForgotPassword.jsx";
import ForgotNewPassword from "./pages/login/ForgotNewPassword.jsx";
import Home from "./pages/Home.jsx";
import ManageSkill from "./pages/skill/ManageSkill.jsx";
import EditSkill from "./pages/skill/EditSkill.jsx";
import AddNewSkill from "./pages/skill/AddNewSkill.jsx";
import ManageProject from "./pages/projects/ManageProject.jsx";
import AddProject from "./pages/projects/AddProject.jsx";
import AddTech from "./pages/projects/AddTech.jsx";
import Single from "./pages/projects/Single.jsx";
import { useState } from "react";

import EditProject from "./pages/projects/EditProject.jsx";
import AddTechForUpdate from "./pages/projects/AddTechForUpdate.jsx";
import ManageMessage from "./pages/message/ManageMessage.jsx";
import UpdatePassword from "./pages/user/subComponent/UpdatePassword.jsx";
import UpdateProfile from "./pages/user/subComponent/UpdateProfile.jsx";
import EditTimeLine from "./pages/timeLine/EditTimeLine.jsx";

function App() {
  const [data, setData] = useState("");

  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route
          path="/forgot/password/:resetToken"
          element={<ForgotNewPassword />}
        />

        {/* Skills */}
        <Route path="/manage/skills" element={<ManageSkill />} />
        <Route path="/edit/skill/:id" element={<EditSkill />} />
        <Route path="/add/skill" element={<AddNewSkill />} />

        {/* Project */}
        <Route path="/manage/projects" element={<ManageProject />} />
        <Route path="/add/project" element={<AddProject techs={data} />} />
        <Route
          path="/add/techs"
          element={<AddTech tech={(data) => setData(data)} />}
        />
        <Route path="/view/:id" element={<Single />} />
        <Route path="/update/project/:id" element={<EditProject />} />
        <Route path="/:id/project/add/tech" element={<AddTechForUpdate />} />

        {/* Message */}
        <Route path="/manage/message" element={<ManageMessage />} />

        {/* User */}
        <Route path="/update/profile" element={<UpdateProfile />} />
        <Route path="/update/password" element={<UpdatePassword />} />

        {/* timeLine */}
        <Route path="/edit/timeline/:id" element={<EditTimeLine />} />

        <Route path="*" element={<Home />} />
      </Routes>
    
  );
}

export default App;
