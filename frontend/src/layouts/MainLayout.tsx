import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;