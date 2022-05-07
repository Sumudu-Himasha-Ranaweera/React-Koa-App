import React, { useEffect } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getInventories } from "../actions/inventoryAction";
import Navigation from "../Components/Navigation";
import CartTable from './CartTable';

const Cart = () => {

    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 2, margin: "20px" }}>
                    <Navigation />
                </div>
                <div style={{ flex: 6, margin: "20px" }}>

                {[
                    'Warning',
                 ].map((variant) => (

                    <Card
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                        className="mb-2"
                    >
                        <Card.Header style={{ fontSize: "50px" }}>Cart Management</Card.Header>
                        <Card.Body>
                            <Card.Title style={{ fontSize: "25px" }}>Cart Details</Card.Title>
                            <Row>
                                <CartTable />
                            </Row>
                        </Card.Body>
                    </Card>
                 ))},
                </div>
            </div>
        </>
    )
}

export default Cart