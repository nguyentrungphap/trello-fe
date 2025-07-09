import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import theme from "@/context/theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const MENU_STYLE = {
  color: "primary.main",
  backgroundColor: "white",
  border: "none",
  px: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: `${theme.trello.boardBarHeight}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflow: "auto",
        borderTop: "1px solid #00bfa5",
        paddingX: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          label="Trello"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to google drive"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          sx={MENU_STYLE}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: "16px",
            },
            "& .MuiAvatarGroup-avatar": {
              border: "2px solid white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            },
          }}
        >
          <Tooltip title="User 1">
            <Avatar
              alt="User 1"
              src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209992395613788_frame-218.png"
            />
          </Tooltip>
          <Tooltip title="User 1">
            <Avatar
              alt="User 1"
              src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209992395613788_frame-218.png"
            />
          </Tooltip>
          <Tooltip title="User 1">
            <Avatar
              alt="User 1"
              src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209992395613788_frame-218.png"
            />
          </Tooltip>
          <Tooltip title="User 1">
            <Avatar
              alt="User 1"
              src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209992395613788_frame-218.png"
            />
          </Tooltip>
          <Tooltip title="User 1">
            <Avatar
              alt="User 1"
              src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209992395613788_frame-218.png"
            />
          </Tooltip>
          <Tooltip title="User 1">
            <Avatar
              alt="User 1"
              src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209992395613788_frame-218.png"
            />
          </Tooltip>
          <Tooltip title="User 1">
            <Avatar
              alt="User 1"
              src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209992395613788_frame-218.png"
            />
          </Tooltip>
          <Tooltip title="User 1">
            <Avatar
              alt="User 1"
              src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209992395613788_frame-218.png"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
