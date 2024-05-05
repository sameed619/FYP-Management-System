import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  const expand = "false";

  console.log("----- IN Navbar ------  ");

  return (
    <>
      <div className="navDiv">
        <Navbar
          expand={expand}
          variant="dark"
          className="bg-body-tertiary  mb-3 navMain"
          sticky="top"
          z-index-n1
        >
          <Container fluid className="navContainer">
            <Navbar.Brand href="#">FYP PORTAL</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/SupervisorHome">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/AddGroup">
                    Add Groups
                  </Nav.Link>
                  <Nav.Link as={Link} to="/assignedGroups">
                    Assigned Groups
                  </Nav.Link>

                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavbarMenu;
