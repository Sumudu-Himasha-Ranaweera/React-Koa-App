import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, deleteCustomer, createCustomer, updateCustomer } from "../actions/customerAction";
import Navigation from "../Components/Navigation";

const Customer = () => {
    const dispatch = useDispatch();
    const [test, settest] = useState(true);
    const [currentId, setCurrentId] = useState(0);
    const formDataState = useSelector((state) => (currentId ? state.customer.find((value) => value.id === currentId) : null));
    const customer = useSelector((state) => state.customer);

    const [formData, setFormData] = useState({
        name: '',
        contactNo: '',
        email: '',
        address: ''
    })

    useEffect(() => {
        try {
            dispatch(getCustomers());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, currentId, test]);

    useEffect(() => {
        if (formDataState) setFormData(formDataState);
    }, [formDataState]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)

        if (currentId === 0) {
            dispatch(createCustomer(formData));
            settest(test == false ? true : false);
            clear();
        } else {
            dispatch(updateCustomer(currentId, formData));
            clear();
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteCustomer(id))
        dispatch(getCustomers());
    }

    const clear = () => {
        setCurrentId(0);
        setFormData(
            {
                name: '',
                contactNo: '',
                email: '',
                address: ''
            }
        );
    };

    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 2, margin: "20px" }}>
                    <Navigation />
                </div>
                <div style={{ flex: 6, margin: "20px" }}>

                {[
                    'Secondary',
                 ].map((variant) => (

                    <Card
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                        className="mb-2"
                    >
                        <Card.Header style={{ fontSize: "50px" }}>Customer Management</Card.Header>
                        <Card.Body>
                            <Card.Title>{variant}Customer Details</Card.Title>
                            <Row>
                                <Col md={12}>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>name</th>
                                                <th>contactNo</th>
                                                <th>address</th>
                                                <th>email</th>
                                                <th>createdDate</th>
                                                <th>updatedDate</th>
                                                <th style={{ width: "250px" }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody hover={true}>
                                            {
                                                customer.map((cd, index) => {
                                                    return (
                                                        <>
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{cd.name}</td>
                                                                <td>{cd.contactNo}</td>
                                                                <td style={{ whiteSpace: "none" }}>{cd.address}</td>
                                                                <td>{cd.email}</td>
                                                                <td>{cd.createdDate}</td>
                                                                <td>{cd.updatedDate}</td>
                                                                <td style={{ display: 'flex' }}>
                                                                    <Button variant="primary" style={{ margin: '1%' }} onClick={() => setCurrentId(cd.id)}>update </Button>
                                                                    <Button variant="danger" style={{ margin: '1%' }} onClick={() => handleDelete(cd.id)}>delete </Button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Card.Title>{currentId == 0 ? "Create Customer" : "Update Customer"}</Card.Title>
                            <Row>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="g-2">
                                        <Col md={4}>
                                            <FloatingLabel style={{ color: "black" }} controlId="floatingInputGrid" label="Name">
                                                <Form.Control onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} name="name" type="text" placeholder='Nimal Gamage' />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={4}>
                                            <FloatingLabel style={{ color: "black" }} controlId="floatingInputGrid" label="Contact Number">
                                                <Form.Control onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })} value={formData.contactNo} name="contactNo" type="text" placeholder='Nimal Gamage' />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={4}>
                                            <FloatingLabel style={{ color: "black" }} controlId="floatingInputGrid" label="Email Address">
                                                <Form.Control onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} name="email" type="email" placeholder='Nimal Gamage' />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={12}>
                                            <FloatingLabel style={{ color: "black" }} controlId="floatingInputGrid" label="Address">
                                                <Form.Control onChange={(e) => setFormData({ ...formData, address: e.target.value })} value={formData.address} name="address" type="text" placeholder='Nimal Gamage' />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md style={{ marginTop: "1%" }} >
                                            <Button type='submit' variant="success" style={{ float: "right", marginLeft: "1%" }} >{currentId == 0 ? "Create Customer" : "Update Customer"}</Button>
                                            <Button type='button' variant="warning" onClick={clear} style={{ float: "right", marginLeft: "1%" }} >clear</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
                        </Card.Body>
                    </Card>
                ))},
                </div>
            </div>
        </>
    )
}

export default Customer