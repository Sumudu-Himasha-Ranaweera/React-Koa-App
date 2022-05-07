import React from 'react'
import { Button, Col, Container, Row } from "react-bootstrap";

const Home = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col><h1>Home</h1></Col>
                </Row>
                <Row>
                    <Col lg={6} md={6} sm={6} xs={6}><h1>Customer</h1></Col>
                    <Col lg={6} md={6} sm={6} xs={6}><h1>Trader</h1></Col>
                </Row>
            </Container>
        </>
    )
}

export default Home