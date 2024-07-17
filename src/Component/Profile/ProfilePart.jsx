import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { Avatar, Button } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TweetCards from "../HomeSection/TweetCards";
import ProfileModal from "./ProfileModel";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, followUserAction } from "../../Store/Auth/Action";
import { getUsersTweets } from "../../Store/Twit/Action";

const ProfilePart = () => {
  const [openProfileModel, setOpenProfileModel] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModel(true);
  const handleClose = () => setOpenProfileModel(false);
  const auth = useSelector((store) => store.auth);
  const twit = useSelector((store) => store.twit);
  const dispatch = useDispatch();
  const { id } = useParams();
console.log("twit ", twit);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUsersTweets(id));
  }, [id]);

  // const handleOpenProfileModel = () => {
  //   console.log("open profile model");
  // };

  const handleFollowUser = () => {
    dispatch(followUserAction(id));
    console.log("handle followers");
  };
  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {auth?.findUser?.fullName}
        </h1>
      </section>

      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src={auth?.findUser?.backGroundImage}
          alt=""
        />
      </section>
      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="username"
            src={auth?.findUser?.image}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {auth?.findUser?.req_user ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {auth?.findUser?.followed ? "UnFollow" : "follow"}
            </Button>
          )}
        </div>

        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth?.findUser?.fullName}</h1>
            {true && (
              <div className={`text-blue-600`}>
                <VerifiedRoundedIcon />
              </div>
            )}
          </div>
          <h1 className="text-gray-500">
            @{auth?.findUser?.fullName?.split(" ").join("_").toLowerCase()}
          </h1>
        </div>

        <div className="mt-2 space-y-3">
          <p>{auth?.findUser?.bio}</p>

          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>
            {/* {auth?.findUser?.website ? (
              <div className="flex items-center text-gray-500">
                <BusinessCenterIcon />
                <p className="ml-2">{auth?.findUser?.website}</p>
              </div>
            ) : null} */}
            {auth?.user?.location ? (
              <div className="flex items-center text-gray-500">
                <LocationOnIcon />
                <p className="ml-2">{auth?.findUser?.location}</p>
              </div>
            ) : null}
            {true ? (
              <div className="flex items-center text-gray-500">
                <CalendarMonthIcon />
                <p className="ml-2">Joined Jun 2024</p>
              </div>
            ) : null}
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth?.findUser?.following?.length}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth?.findUser?.followers?.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Posts" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Highlights" value="3" />
                <Tab label="Media" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {twit.twits.map((item) => (
                <TweetCards item={item} />
              ))}
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">Item Three</TabPanel>
          </TabContext>
        </Box>
      </section>

      <section>
        <ProfileModal handleClose={handleClose} open={openProfileModel} />
      </section>
    </div>
  );
};

export default ProfilePart;
