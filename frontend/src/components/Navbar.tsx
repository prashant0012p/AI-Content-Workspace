import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>

        <Button color="inherit" component={Link} to="/generate">
          Generate
        </Button>

        <Button color="inherit" component={Link} to="/drafts">
          Drafts
        </Button>

        <Button color="inherit" component={Link} to="/preferences">
          Preferences
        </Button>

        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
