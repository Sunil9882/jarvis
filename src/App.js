import { Route, Routes, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Authentication from "./Component/Authentication/Authentication";
import HomePage from "./Component/HomePage/HomePage";
import { getUserProfile } from "./Store/Auth/Action";

function App() {
  const jwt = localStorage.getItem("jwt")
  // console.log(jwt)
  const auth = useSelector(store=>store.auth)
  // console.log(store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      navigate("/");
    } else {
      console.error("JWT token not found in localStorage");
    }
  }, [auth.jwt]);
  return (
    <div className="">
      <Routes>
        {/* <Route
          path="/*"
          element={auth? <HomePage /> : <Authentication />}
        ></Route> */}
        <Route path='/*' element={auth.user?<HomePage />:<Authentication />}></Route>
      </Routes>
    </div>
  );
}

export default App;
