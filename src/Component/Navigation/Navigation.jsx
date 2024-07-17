import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Button } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Store/Auth/Action";
import { navigationMenu } from "./NavigationMenu";

const Navigation = () => {
  const auth = useSelector(store => store.auth);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  // const auth = useSelector(store=>store.auth);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    console.log("logout");
    // Create a synthetic event object
    const syntheticEvent = { target: document.body };
    handleClose(syntheticEvent);
    dispatch(logout());
  };

  return (
    <div className="h-screen sticky top-0">
      <div className="py-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          area-hidden="true"
          viewBox="0 0 1200 1227"
          fill="none"
        >
          <g clipPath="url(#clip0_1_2)">
            <path
              d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_2">
              <rect width="1200" height="1227" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="space-y-6">
        {navigationMenu.map((item, index) => (
          <div
          key={index}
            className="cursor-pointer flex space-x-3 items-center"
            onClick={() =>
              item?.title === "Profile"
                ? navigate(`/profile/${auth?.user?.id}`)
                : navigate(item?.path)
            }
          >
            {item?.icon}
            <p className="text-xl">{item?.title}</p>
          </div>
        ))}
      </div>

      <div className="py-10">
        <Button
          sx={{
            width: "100%",
            borderRadius: "29px",
            py: "15px",
            bgcolor: "#1e88e5",
          }}
          variant="contained"
        >
          Tweet
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            alt="username"
            src={auth?.user?.image}
          />
          <div>
            <p>{auth.user?.fullName}</p>
            <span className="opacity-70">
              @{auth.user?.fullName?.split(" ").join("_").toLowerCase()}
            </span>
          </div>

          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreHorizIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
};

export default Navigation;


// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { Avatar, Button } from "@mui/material";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
// import Grow from "@mui/material/Grow";
// import MenuItem from "@mui/material/MenuItem";
// import MenuList from "@mui/material/MenuList";
// import Paper from "@mui/material/Paper";
// import Popper from "@mui/material/Popper";
// import * as React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../Store/Auth/Action";
// import { navigationMenu } from "./NavigationMenu";

// const Navigation = () => {
//   const auth = useSelector(store => store.auth);
//   console.log(auth);
//   const navigate = useNavigate();
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);

//   const dispatch = useDispatch();

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   function handleListKeyDown(event) {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       setOpen(false);
//     } else if (event.key === "Escape") {
//       setOpen(false);
//     }
//   }

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   const handleLogout = () => {
//     console.log("logout");
//     handleClose();
//     dispatch(logout);
//   };

//   return (
//     <div className="h-screen sticky top-0">
//       <div className="py-5">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="30"
//           height="30"
//           area-hidden="true"
//           viewBox="0 0 1200 1227"
//           fill="none"
//         >
//           <g clipPath="url(#clip0_1_2)">
//             <path
//               d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
//               fill="black"
//             />
//           </g>
//           <defs>
//             <clipPath id="clip0_1_2">
//               <rect width="1200" height="1227" fill="white" />
//             </clipPath>
//           </defs>
//         </svg>
//       </div>
//       <div className="space-y-6">
//         {navigationMenu.map((item, index) => (
//           <div
//             key = {index}
//             className="cursor-pointer flex space-x-3 items-center"
//             onClick={() =>
//               item?.title === "Profile"
//                 ? navigate(`/profile/${5}`)
//                 : navigate(item?.path)
//             }
//           >
//             {item?.icon}
//             <p className="text-xl">{item?.title}</p>
//           </div>
//         ))}
//       </div>

//       <div className="py-10">
//         <Button
//           sx={{
//             width: "100%",
//             borderRadius: "29px",
//             py: "15px",
//             bgcolor: "#1e88e5",
//           }}
//           variant="contained"
//         >
//           Tweet
//         </Button>
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <Avatar
//             alt="username"
//             src="https://cdn.pixabay.com/photo/2023/08/08/10/50/hot-wheels-8177051_960_720.jpg"
//           />
//           <div>
//             <p>{auth.user?.fullName}</p>
//             <span className="opacity-70">
//               @{auth.user?.fullName.split(" ").join("_").toLowerCase()}
//             </span>
//           </div>

//           <Button
//             ref={anchorRef}
//             id="composition-button"
//             aria-controls={open ? "composition-menu" : undefined}
//             aria-expanded={open ? "true" : undefined}
//             aria-haspopup="true"
//             onClick={handleToggle}
//           >
//             <MoreHorizIcon />
//           </Button>
//           <Popper
//             open={open}
//             anchorEl={anchorRef.current}
//             role={undefined}
//             placement="bottom-start"
//             transition
//             disablePortal
//           >
//             {({ TransitionProps, placement }) => (
//               <Grow
//                 {...TransitionProps}
//                 style={{
//                   transformOrigin:
//                     placement === "bottom-start" ? "left top" : "left bottom",
//                 }}
//               >
//                 <Paper>
//                   <ClickAwayListener onClickAway={handleClose}>
//                     <MenuList
//                       autoFocusItem={open}
//                       id="composition-menu"
//                       aria-labelledby="composition-button"
//                       onKeyDown={handleListKeyDown}
//                     >
//                       <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                     </MenuList>
//                   </ClickAwayListener>
//                 </Paper>
//               </Grow>
//             )}
//           </Popper>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navigation;
