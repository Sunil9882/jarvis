// import * as React from 'react';
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createTweetReply } from "../../Store/Twit/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function ReplyModel({ handleClose, open, item}) {
  //     const [openReplyModel, setOpenReplyModel]=useState(false);
  //   const handleOpenReplyModel = () => setOpenReplyModel(true);
  //   const handleCloseReplyModel = () => setOpenReplyModel(false);

  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectImage, setSelectImage] = React.useState("");
  const dispatch = useDispatch();
  const auth = useSelector(store=>store.auth);
  const twit = useSelector(store=>store.twit);
  console.log("auth in model repyly", auth);
  console.log("twit ", twit);

  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  const handleSubmit = (values) => {
    dispatch(createTweetReply(values));
    handleClose();
    console.log("value ", values);
  };
  // const twitd = !twit ? twit.id : item.id;
  // console.log("twitId ",twitd);

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitId: item?.id,
    },
    onSubmit: handleSubmit,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectImage(imgUrl);
    setUploadingImage(false);
  };

  const navigate = useNavigate();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex space-x-5">
            <Avatar
              onClick={() => navigate(`/profile/${item?.user?.id}`)}
              className="cursor-pointer"
              alt="username"
              src={item?.user?.image}
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div
                  className="flex cursor-pointer items-center space-x-2"
                  onClick={() => navigate(`/post/${5}`)}
                >
                  <span className="font-semibold">{item?.user?.fullName}</span>
                  <div className={`text-blue-600`}>
                    <VerifiedRoundedIcon />
                  </div>
                  <span className="text-gray-600">
                    @{item?.user?.fullName?.split(" ").join("_").toLowerCase()} <span>·</span> 3h
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <div className="cursor-pointer">
                  <p className="mb-2 p-0">{item?.content}</p>
                  {/* <p className="text-[#1d9bf0]">#buddha</p> */}
                  <img
              className="w-[28rem] border border-gray-400 p-5 rounded-mb"
              src={item?.image}
              alt=""
            />
                </div>
              </div>
            </div>
          </div>
          <section className={`py-10`}>
            <div className="flex space-x-5">
              <Avatar
                alt="username"
                src={auth?.user?.image}
              />
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="content"
                      placeholder="What is happening?!"
                      className={`border-none outline-none text-xl bg-transparent`}
                      {...formik.getFieldProps("content")}
                      {...(formik.errors.content && formik.touched.content && (
                        <span className="text-red-500">
                          {formik.errors.content}
                        </span>
                      ))}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center">
                      <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                        <ImageIcon className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="imageFile"
                          className="hidden"
                          onChange={handleSelectImage}
                        />
                      </label>
                      <FmdGoodIcon className="text-[#1d9bf0]" />
                      <EmojiEmotionsIcon className="text-[#1d9bf0]" />
                    </div>
                    <div>
                      <Button
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                          paddingY: "8px",
                          paddingX: "20px",
                          bgcolor: "#1e88e5",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
