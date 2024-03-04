import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(1000); // Saldo inicial
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleDeposit = () => {
    const amount = parseFloat(prompt("Ingrese el monto a depositar:"));
    if (!isNaN(amount)) {
      setBalance(balance + amount);
    }
  };

  const handleTransfer = () => {
    const amount = parseFloat(prompt("Ingrese el monto a transferir:"));
    if (!isNaN(amount) && amount <= balance) {
      setBalance(balance - amount);
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src="https://i.ibb.co/Hx9yWV4/logo.jpg"
            width="140"
            height="60"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#activity">Tu Actividad</Nav.Link>
            <Nav.Link href="#transfer">Transferir Dinero</Nav.Link>
            <Nav.Link href="#loans">Prestamos</Nav.Link>
            <Nav.Link href="#payment">Link de Pago</Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <Button variant="danger" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          ) : (
            <div className="ml-auto" style={{alignContent:"right", marginLeft: "300px" }}>
              <Button variant="light" onClick={() => setShowLoginModal(true)}>
                Iniciar Sesión
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>

      {isLoggedIn && (
        <Container className="mt-4">
          <Row>
            <Col md={4}>
              <div className="bg-light p-3 rounded">
                <h4>Saldo Actual</h4>
                <p>Tu saldo actual es: ${balance.toFixed(2)}</p>
                <Button
                  variant="success"
                  className="mr-2"
                  onClick={handleDeposit}
                >
                  Ingresar Dinero
                </Button>
                <Button variant="warning" onClick={handleTransfer}>
                  Transferir Dinero
                </Button>
              </div>
            </Col>
            <Col md={8}>
              <h2>Tu Actividad</h2>
              <ul>
                <li>Transacción: +$500</li>
                <li>Transacción: -$200</li>
                <li>Transacción: +$1000</li>
              </ul>
            </Col>
          </Row>
        </Container>
      )}

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
          {error && <p className="text-danger">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowLoginModal(false)}>
            Cancelar
          </Button>
          <Button variant="light" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
