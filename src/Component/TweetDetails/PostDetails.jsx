import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TweetCards from "../HomeSection/TweetCards";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findTwitsById } from "../../Store/Twit/Action";

const PostDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { twit } = useSelector((store) => store.twit);
  const { auth } = useSelector((store) => store.auth);

  useEffect(() => {
    if(id) {
      dispatch(findTwitsById(id));
    }
  },[id]);

  console.log("twit in postdetials ",twit);
  return (
    <React.Fragment>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">posts</h1>
      </section>

      <section>
        <TweetCards item={twit} />
        <Divider sx={{ margin: "2rem 0rem" }} />
      </section>

      <section>
        {twit?.replyTwit?.map((item) => (
          <TweetCards item={item} />
        ))}
      </section>
    </React.Fragment>
  );
};

export default PostDetails;
