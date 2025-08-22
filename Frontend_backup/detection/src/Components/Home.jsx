// import React from 'react'
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import img from "../Images/homeimg.jpg"
// import img1 from "../Images/helmetc.jpg"
// import img2 from "../Images/vestc.jpg"
// import img3 from "../Images/shoesc.jpg"
// import img4 from "../Images/glovec.jpg"
// import img5 from "../Images/beltc.jpg"
// import img6 from "../Images/glassc.jpg"
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Header from './Header';

// function Home() {
//   return (
//     <div>
//       <Header/>
//     <br/>
//       <Container>
//       <Row>
//         <Col>
//         <img src={img} style={{width:"94%", marginLeft:"-28.5%"}}/>
//         </Col>
//         <Col >
//         <br/>
//         <br/>
        

//         <h1 style={{marginRight:"-7%"}}>Construction Site Safety</h1>
//         <h4>Keep safe while working </h4>
//         <br/>
//         <br/>
//         <Row>
//         <Col>
//         <img src={img1} style={{marginRight:"-60%"}}/>
//         </Col>
//         <Col>
//         <img src={img2} style={{marginLeft:"15%", marginTop:"-3%"}}/>
//         </Col>
//         <Col>
//         <img src={img6} style={{marginLeft:"8%", marginTop:"-1%"}}/>
//         </Col>
//       </Row>
//     <br/>
//       <Row>
//         <Col>
//         <img src={img4} style={{marginRight:"-60%", marginTop:"1.5%"}}/>
//         </Col>
//         <Col>
//         <img src={img5} style={{marginLeft:"15%"}}/>
//         </Col>
//         <Col>
//         <img src={img3} style={{marginLeft:"8%", marginTop:"-3%"}}/>
//         </Col>
//        </Row>
        
//         </Col>
//       </Row>
//     </Container>
//     </div>
//   )
// }

// export default Home


import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from './Header';

function Home() {
  return (
    <div>
      <Header/>
        <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Banner Section */}
      <div
        style={{
          background: "url('https://via.placeholder.com/1500x300') center/cover",
          color: "white",
          textAlign: "center",
          padding: "50px 0",
        }}
      >
        <h1>Construction Site Safety</h1>
        <p>Ensuring safety for everyone on the construction site.</p>
      </div>

      {/* Cards Section */}
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <Col md={4}>
            <Card style={{ textAlign: "center" }}>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/150"
                style={{ padding: "10px", height: "200px" }}
              />
              <Card.Body>
                <Card.Title>Helmet Safety</Card.Title>
                <Card.Text>
                  Learn about the importance of wearing a safety helmet at the site.
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ textAlign: "center" }}>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/150"
                style={{ padding: "10px", height: "200px" }}
              />
              <Card.Body>
                <Card.Title>Vest Protection</Card.Title>
                <Card.Text>
                  High-visibility vests save lives in hazardous environments.
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ textAlign: "center" }}>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/150"
                style={{ padding: "10px", height: "200px" }}
              />
              <Card.Body>
                <Card.Title>Mask Usage</Card.Title>
                <Card.Text>
                  Stay safe from harmful dust and particles with proper masks.
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Center Image Section */}
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <img
          src="https://via.placeholder.com/600x300"
          alt="Construction Site"
          style={{ width: "80%", borderRadius: "10px" }}
        />
      </div>

      {/* About Section */}
      <Container>
        <Row className="align-items-center" style={{ marginTop: "30px" }}>
          <Col md={6}>
            <img
              src="https://via.placeholder.com/500x300"
              alt="About Us"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Col>
          <Col md={6}>
            <h3>About Our Website</h3>
            <p>
              Our mission is to promote safety and awareness in construction sites.
              We provide tools, guidelines, and resources to ensure that every worker
              goes home safe. Explore our site for information about proper safety
              gear and techniques to stay protected in hazardous environments.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: "#333",
          color: "white",
          textAlign: "center",
          padding: "10px 0",
          marginTop: "30px",
        }}
      >
        <p>&copy; 2025 Construction Site Safety. All rights reserved.</p>
      </footer>
    </div>
    </div>
    
  );
}

export default Home;


