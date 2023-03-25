import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { green } from "@mui/material/colors";
import { pink } from "@mui/material/colors";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

export const Home = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const [name, setName] = React.useState({
    segment_name: "",
    schema: [{ first_name: "" }, { last_name: "" }]
  });

  const [segment, setSegment] = React.useState("");

  const handleChange = (event) => {
    setSegment(event.target.value);
  };

  const [ids, setIds] = React.useState([
    {
      id: 1
    }
  ]);

  const AddUser = (event) => {
    let updateData = { id: ids.length + 1 };
    setIds((prevState) => {
      return [...prevState, updateData];
    });
    setSegment("");
  };
  const RemoveUser = (value) => {
    setIds((prevState) => {
      prevState = prevState.filter((item) => item.id !== value);
      return [...prevState];
    });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function submitHandler() {
    axios.post("https://webhook.site/47601c6a-2821-4edf-b403-e1476737c56e", {
      segment_name: name.segment_name,
     schema:name.schema
    });
  }

  React.useEffect(() => {
    axios
      .get("https://webhook.site/47601c6a-2821-4edf-b403-e1476737c56e")
      .then((res) => setName(res.data));
  }, []);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ background: "#39aebc", width: "auto", height: "4rem" }}>
        <div className="d-flex p-3">
          {" "}
          <Typography sx={{ color: "#fff", fontSize: "22px" }}>
            <ArrowBackIosIcon onClick={toggleDrawer(anchor, false)} /> Saving
            Segment
          </Typography>
        </div>
      </div>
      <div className="p-2">
        <Typography className="mt-4 text-start">
          Enter the Name of the Segment
        </Typography>
        <div className="p-2">
          {" "}
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name of the Segment"
            variant="outlined"
            // value="segment_name"
            onChange={(e) => setName({ ...name, segment_name: e.target.value })}
          />
          <Typography className="mt-4 text-start">
            To save the segment, you need to add the schemas to build the query
          </Typography>
          <div className="d-flex align-items-center justify-content-end">
            {" "}
            <FiberManualRecordIcon
              fontSize="small"
              sx={{
                color: "#00e676"
              }}
            />
            -User Traits
            <FiberManualRecordIcon
              className="mx-1"
              fontSize="small"
              sx={{
                color: pink[800]
              }}
            />
            -Group Traits
          </div>
          <div>
            {" "}
            {ids.map((data) => (
              <>
                <div className="d-flex p-2 align-items-center">
                  <FormControl key={data.id} className="mt-4" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Add schema to segment
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={segment}
                      label="Add schema to segment"
                      onChange={(e) => setName({ ...name, schema: e.target.value })}
                    >
                      <MenuItem value="first_name">First Name</MenuItem>
                      <MenuItem value="last_name">Last Name</MenuItem>
                      <MenuItem value="gender">Gender</MenuItem>
                      <MenuItem value="age">Age</MenuItem>
                      <MenuItem value="account_name">Account Name</MenuItem>
                      <MenuItem value="city">City</MenuItem>
                      <MenuItem value="state">State</MenuItem>
                    </Select>
                  </FormControl>
                  <IndeterminateCheckBoxOutlinedIcon
                    className="mx-2"
                    onClick={() => RemoveUser(data.id)}
                  />
                </div>
              </>
            ))}
          </div>
          <Typography
            onClick={AddUser}
            className="mt-2"
            sx={{ color: "#39aebc", textDecoration: "underline" }}
          >
            +Add new schema
          </Typography>
        </div>
      </div>
      <div style={{ marginTop: "32vh" }}>
        <div
          className="d-flex align-items-center mx-2"
          style={{ background: "#f6f6f6", width: "auto", height: "6rem" }}
        >
          {" "}
          <Button
          onClick={submitHandler}
            variant="contained"
            sx={{
              background: "#39aebc",
              "&:hover": {
                backgroundColor: "#39aebc"
              }
            }}
          >
            Save Segment
          </Button>
          <Button
            className="mx-3"
            variant="contained"
            sx={{
              background: "#fff",
              color: "#da6b90",
              "&:hover": {
                backgroundColor: "#fff"
              }
            }}
            onClick={toggleDrawer(anchor, false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Box>
  );
  return (
    <div>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ background: "#39aebc" }} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div style={{ marginTop: "5rem", textAlign: "center" }}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              style={{ background: "#39aebc" }}
              variant="contained"
            >
              Save Segment
            </Button>
          </div>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            // onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
