import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedIcon from "@mui/icons-material/Verified";

export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Explore",
    icon: <ExploreIcon />,
    path: "/explore",
  },
  {
    title: "Notification",
    icon: <NotificationsIcon />,
    path: "/notification",
  },
  {
    title: "Message",
    icon: <EmailIcon />,
    path: "/message",
  },
  {
    title: "Bookmarks",
    icon: <BookmarkIcon />,
    path: "/bookmarks",
  },
  {
    title: "Premium",
    icon: <VerifiedIcon />,
    path: "/premium",
  },
  {
    title: "Communities",
    icon: <GroupIcon />,
    path: "/communities",
  },
  {
    title: "Profile",
    icon: <PersonIcon />,
    path: "/profile",
  },
  {
    title: "More",
    icon: <MoreHorizIcon />,
    path: "/more",
  },
];
