import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import TweetCards from "./TweetCards";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, getAllTweets } from "../../Store/Twit/Action";
import { uploadToCloudinary } from "../../Utils/UploadToCloudinary";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

export const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, setSelectImage] = useState("");
  const dispatch = useDispatch();
  const twit = useSelector((store) => store.twit);
  const auth = useSelector((store) => store.auth);
  const handleSubmit = (values, actions) => {
    dispatch(createTweet(values));
    actions.resetForm();
    console.log("values", values);
    setSelectImage("");
  };

  useEffect(() => {
    dispatch(getAllTweets());
  }, [twit.like, twit.retwit]);
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  console.log("auth in home section ", auth);

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0]);
    setSelectImage(imgUrl);
    formik.setFieldValue("image", imgUrl);
    setUploadingImage(false);
  };

  console.log("twit in home section ", twit);
  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className={`pb-10`}>
        <div className="flex space-x-5">
          <Avatar alt="username" src={auth?.user?.image} />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening?!"
                  className="border-none outline-none text-xl bg-transparent"
                  {...formik.getFieldProps("content")}
                />
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
              </div>
              <div className="flex justify-between items-center mt-5 mb-3">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon alt="upload image" className="text-[#1d9bf0]" />
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

            {selectImage && <img src={selectImage} alt="" />}
          </div>
        </div>
      </section>
      <hr />
      <section>
        {twit?.twits.map((item, index) => (
          <TweetCards item={item} key={index}/>
        ))}
      </section>
    </div>
  );
};

// import { Avatar, Button } from "@mui/material";
// import { useFormik } from "formik";
// import React, { useState } from "react";
// import * as Yup from "yup";
// import ImageIcon from "@mui/icons-material/Image";
// import FmdGoodIcon from "@mui/icons-material/FmdGood";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import TweetCards from "./TweetCards";

// const validationSchema = Yup.object().shape({
//   content: Yup.string().required("Tweet text is required"),
// });
// export const HomeSection = () => {
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [selectImage, setSelectImage] = useState("");
//   const handleSubmit = (values) => {
//     console.log("value ", values);
//   };
//   const formik = useFormik({
//     initialValues: {
//       content: "",
//       image: "",
//     },
//     onSubmit: handleSubmit,
//     validationSchema,
//   });

//   const handleSelectImage = (event) => {
//     setUploadingImage(true);
//     const imgUrl = event.target.files[0];
//     formik.setFieldValue("image", imgUrl);
//     setSelectImage(imgUrl);
//     setUploadingImage(false);
//   };
//   return (
//     <div className="space-y-5">
//       <section>
//         <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
//       </section>
//       <section className={`pb-10`}>
//         <div className="flex space-x-5">
//           <Avatar
//             alt="username"
//             src="https://cdn.pixabay.com/photo/2023/08/08/10/50/hot-wheels-8177051_960_720.jpg"
//           />
//           <div className="w-full">
//             <form onSubmit={formik.handleSubmit}>
//               <div>
//                 <input
//                   type="text"
//                   name="content"
//                   placeholder="What is happening?!"
//                   className={`border-none outline-none text-xl bg-transparent`}
//                   {...formik.getFieldProps("content")}
//                   {...(formik.errors.content && formik.touched.content && (
//                     <span className="text-red-500">
//                       {formik.errors.content}
//                     </span>
//                   ))}
//                 />
//               </div>
//               <div className="flex justify-between items-center mt-5">
//                 <div className="flex space-x-5 items-center">
//                   <label className="flex items-center space-x-2 rounded-md cursor-pointer">
//                     <ImageIcon className="text-[#1d9bf0]" />
//                     <input
//                       type="file"
//                       name="imageFile"
//                       className="hidden"
//                       onChange={handleSelectImage}
//                     />
//                   </label>
//                   <FmdGoodIcon className="text-[#1d9bf0]" />
//                   <EmojiEmotionsIcon className="text-[#1d9bf0]" />
//                 </div>
//                 <div>
//                   <Button
//                     sx={{
//                       width: "100%",
//                       borderRadius: "20px",
//                       paddingY: "8px",
//                       paddingX: "20px",
//                       bgcolor: "#1e88e5",
//                     }}
//                     variant="contained"
//                     type="submit"
//                   >
//                     Post
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//       <hr className="" />
//       <section>
//         {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
//           <TweetCards Key={index}/>
//         ))}
//       </section>
//     </div>
//   );
// };
