import React, { useState } from 'react'
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';

const AddCustomer = () => {

    const [cid, setcid] = useState('');
    const [cname, setcname] = useState('');
    const [contact, setcontact] = useState('');
    const [city, setCity] = useState('');

    const navigate = useNavigate();

    const addCustomer = async () => {
        try {

            const response = await Axios.post('http://localhost:4001/api/addCustomer', {

                cid: cid,
                cname: cname,
                city: city,
                contact: contact
            });

            console.log("Customer adding is successful", response.data);
            Swal.fire({
                title: "Success!",
                text: "Customer was added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
            setcid('');
            setcname('');
            setcontact('');
            setCity('');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Add Customer Details</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cid"
                                        value={cid}
                                        onChange={e => setcid(e.target.value)}
                                        placeholder="Enter customer's ID"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cname"
                                        value={cname}
                                        onChange={e => setcname(e.target.value)}
                                        placeholder="Enter customer Name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        placeholder="Enter city"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="contact"
                                        value={contact}
                                        onChange={e => setcontact(e.target.value)}
                                        placeholder="Enter contact number"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100" onClick={addCustomer}>
                                    Submit
                                </Button>
                                <br />
                                <br />
                                <Button variant="primary" type="submit" className="w-100" onClick={() => navigate('/customers')}>
                                    Customers
                                </Button>
                                <br />
                                <br />
                                <Button onClick={() => navigate('/additem')}>Add Item</Button>
                                <Button onClick={() => navigate('/addrental')}>Add Rental</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AddCustomer

