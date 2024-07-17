import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();

  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = location.pathname === "/signup" ? "/signin" : "/signup";
    navigate(path);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/signup" ? (
            <h1 className="text-center font-bold text-3xl pb-20">
              Create Your Account
            </h1>
          ) : (
            <h1 className="text-center font-bold text-3xl pb-20">
              Welcome back
            </h1>
          )}

          {location.pathname === "/signup" ? <SignUpForm /> : <SignInForm />}

          <h1 className="text-center py-5 font-semibold text-lg text-gray-500">
            {location.pathname === "/signup"
              ? "Already have Account"
              : "If you don't have account"}
          </h1>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleNavigate}
            sx={{ borderRadius: "29px", py: "15px" }}
          >
            {location.pathname === "/signup" ? "signin" : "signup"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
