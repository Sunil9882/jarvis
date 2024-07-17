import BarChartIcon from "@mui/icons-material/BarChart";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RepeatIcon from "@mui/icons-material/Repeat";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createReTweet, findTwitsById, likeTweet } from "../../Store/Twit/Action";
import ReplyModel from "./ReplyModel";

const TweetCards = ({ item }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const 
  // const [isLiked, setIsLiked] = useState(false);
  // const [isLikedt, setIsLikedt] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openReplyModel, setOpenReplyModel] = useState(false);
  const handleOpenReplyModel = () => setOpenReplyModel(true);
  const handleCloseReplyModel = () => setOpenReplyModel(false);
  const dispatch = useDispatch();
  const auth = useSelector(store=>store.auth);
  // const twit = useSelector(store=>store.twit);
  // const id = useParams();

  // const handleOpenReplyModel = () => {
  //   console.log("open model");
  // };

  const handleCreateRetweet = () => {
    dispatch(createReTweet(item?.id));
    // setIsLikedt(!isLikedt);
    console.log("create retweet");
  };
  console.log("item ", item)

  const handleLiketweet = () => {
    dispatch(likeTweet(item?.id));
    // setIsLiked(!isLiked);
    console.log("liked tweet");
  };

  console.log(item);
  console.log("auth ", auth);

  return (
    <React.Fragment>
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
              onClick={() => navigate(`/twit/${item?.id}`)}
            >
              <span className="font-semibold">{item?.user?.fullName}</span>
              <div className={`text-blue-600`}>
                <VerifiedRoundedIcon />
              </div>
              <span className="text-gray-600">
                @{item?.user?.fullName?.split(" ").join("_").toLowerCase()}
                <span>·</span> 3h
              </span>
            </div>
            <div>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>Details</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2">
            <div
              onClick={() => navigate(`/twit/${item?.id}`)}
              className="cursor-pointer"
            >
              <p className="mb-2 p-0">{item?.content}</p>
              {/* <p className="text-[#1d9bf0]">#buddha</p> */}
              {item?.image ? (
                <img
                  className="w-[28rem] border border-gray-400 p-5 rounded-mb"
                  src={item?.image}
                />
              ) : null}
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>{item?.totalReplies}</p>
              </div>
              <div
                className={`${
                  item?.retwit ? "text-green-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  className="cursor-pointer"
                  onClick={handleCreateRetweet}
                />
                <p>{item?.totalRetweets}</p>
              </div>
              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteIcon
                    onClick={handleLiketweet}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteOutlinedIcon
                    onClick={handleLiketweet}
                    className="cursor-pointer"
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon />
                <p>3.3k</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModel
          item={item}
          open={openReplyModel}
          handleClose={handleCloseReplyModel}
        />
      </section>
    </React.Fragment>
  );
};

export default TweetCards;
