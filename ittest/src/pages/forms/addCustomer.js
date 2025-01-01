import React, { useState } from 'react'
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const AddCustomer = () => {

    const [cid, setcid] = useState('');
    const [cname, setcname] = useState('');
    const [contact, setcontact] = useState('');
    const [city, setCity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({
        cid: Yup.string().required('Customer id is required'),
        cname: Yup.string().required('Customer name is Required'),
        contact: Yup.string().required('Contact is required'),
        city: Yup.string().required('City is required'),
    })

    const addCustomer = async () => {
        try {

            await validateSchema.validate(
                {
                    cid,
                    cname,
                    contact,
                    city
                },
                { abortEarly: false }
            );

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
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach(err => {
                    errors[err.path] = err.message;
                });
                setErrorMessage(errors);
            } else {
                console.error('Error', error);
            }
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
                                    />
                                </Form.Group>
                                {errorMessage.cid && <div className="d-flex justify-content-center text-danger">{errorMessage.cid}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cname"
                                        value={cname}
                                        onChange={e => setcname(e.target.value)}
                                        placeholder="Enter customer Name"
                                    />
                                </Form.Group>
                                {errorMessage.cname && <div className="d-flex justify-content-center text-danger">{errorMessage.cname}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        placeholder="Enter city"
                                    />
                                </Form.Group>
                                {errorMessage.city && <div className="d-flex justify-content-center text-danger">{errorMessage.city}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="contact"
                                        value={contact}
                                        onChange={e => setcontact(e.target.value)}
                                        placeholder="Enter contact number"
                                    />
                                </Form.Group>
                                {errorMessage.contact && <div className="d-flex justify-content-center text-danger">{errorMessage.contact}</div>}
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
                                <Button onClick={() => navigate('/addrental')} style={{ marginLeft: 20 }}>Add Rental</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AddCustomer

