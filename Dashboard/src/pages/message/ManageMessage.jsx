import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";

import { messageApi } from "../../Api";
import { ToastContainer, toast } from "react-toastify";

function ManageMessage() {
  const [allMessage, setAllMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleReaded = async (id) => {
    setLoading(true);
    await messageApi
      .put(`/readed/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await messageApi
      .delete(`/delete/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    setLoading(false);
  };

  useEffect(() => {
    messageApi
      .get("/getall")
      .then((res) => {
        // console.log(res.data);
        setAllMessage(res?.data.allMessage);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [loading]);

  return (
    <div className="h-screen p-4 font-serif">
      
      <h1 className="outline-1 p-4 rounded-lg text-2xl font-bold font-serif">
        All Messages
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 py-4">
        {allMessage?.map((message) => (
          <div
            key={message._id}
            className="outline-1 p-2 rounded-lg bg-gradient-to-r from-red-300 to-purple-600 "
          >
            <div className="p-2 flex justify-between outline-1 rounded-lg mb-2">
              <label htmlFor="senderName" className="underline">
                From
              </label>
              <p className="text-black w-fit overflow-hidden sm:w-[85%] text-center pr-4">
                {message.senderName}
              </p>
            </div>
            <div className="p-2 flex justify-between outline-1 rounded-lg mb-2 flex-wrap">
              <label htmlFor="email" className="underline">
                Email
              </label>
              <p className="text-black w-fit overflow-hidden sm:w-[85%] text-center pr-4">
                {message.email}
              </p>
            </div>
            <div className="p-2 flex justify-between outline-1 rounded-lg mb-2">
              <textarea
                name="message"
                rows={4}
                readOnly
                className="text-black w-full outline-1 rounded-lg p-2 cursor-not-allowed"
                value={message.message}
              ></textarea>
            </div>
            <div className="text-end">
              {message.readed ? (
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(message._id)}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleReaded(message._id)}
                >
                  Mark as Read
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="h-[100px]"></div>
      <ToastContainer />
    </div>
  );
}

export default ManageMessage;
