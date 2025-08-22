import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <div>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/* <Navbar.Brand href="#home">Construction Site Safety</Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/dashboard">Safety Detection</Nav.Link>
            <Nav.Link href="/falldetection">Fall Detection</Nav.Link>
            <Nav.Link href="/help">Help</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header