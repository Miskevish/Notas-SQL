import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import logo from "../assets/logo2.png";
import "./Home.css";
import BackgroundParticles from "../components/BackgroundParticles";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";

const Home = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="home">
      <div className="particles-wrapper">
        <BackgroundParticles />
      </div>

      <Container className="text-center home-content">
        <img src={logo} alt="NoteVault Logo" className="home-logo" />
        <h1 className="home-title">NoteVault</h1>
        <p className="home-slogan">Secure Your Thoughts.</p>
        <p className="home-slogan">Unlock Your Potential.</p>

        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Button
              variant="custom"
              className="home-btn"
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="custom"
              className="home-btn"
              onClick={() => setShowRegister(true)}
            >
              Register
            </Button>
          </Col>
        </Row>
      </Container>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Home;
