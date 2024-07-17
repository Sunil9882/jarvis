import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import AuthModal from "./AuthModel";

const Authentication = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const handleOpenAuthModel = () => setOpenAuthModel(true);
  const handleCloseAuthModel = () => setOpenAuthModel(false);
  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen"
            src="https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute top-[26%] left-[19%]">
            <img
              height="300"
              width="300"
              viewBox="0 0 24 24"
              aria-hidden="true"
              src="https://cdn.pixabay.com/photo/2016/11/18/11/16/social-1834013_1280.png"
              alt=""
            />
          </div>
        </Grid>

        <Grid className="px-10" item lg={5} xs={12}>
          <h1 className="mt-10 font-bold text-7xl">Happening Now</h1>
          <h1 className="font-bold text-3xl py-16">Join Twitter Today</h1>

          <div className="w-[75%]">
            <div className="w-full">
              <GoogleLogin width={400} />
              <p className="py-5 text-center">OR</p>

              <Button
                onClick={handleOpenAuthModel}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px",
                }}
              >
                Create Account
              </Button>

              <p className="text-sm mt-2">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>

            <div>
              <h1 className="font-bold text-xl mb-5 mt-5">
                Already Have Account?
              </h1>
              <Button
                onClick={handleOpenAuthModel}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px",
                }}
              >
                log in
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Authentication;
