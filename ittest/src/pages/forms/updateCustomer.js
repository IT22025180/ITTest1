
import React, { useState } from 'react'
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

const UpdateCustomer = () => {
    const { _id, cid, cname, contact, city } = useParams();
    const [id_u, setID] = useState(_id);
    const [cid_u, setcid] = useState(cid);
    const [cname_u, setcname] = useState(cname);
    const [contact_u, setcontact] = useState(contact);
    const [city_u, setCity] = useState(city);
    // const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const updateCustomer = async (_id, cid, cname, contact, city) => {
        try {

            const response = await Axios.post('http://localhost:4001/api/updateCustomer', {
                _id: _id,
                cid,
                cname,
                city,
                contact
            });

            console.log("Customer update is successful", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const update = async () => {

        try {

            const response = await updateCustomer(id_u, cid_u, cname_u, contact_u, city_u);

            console.log(response);
            setID(_id);
            setcid('');
            setcname('');
            setcontact('');
            setCity('');
            navigate('/customers');
        } catch (error) {
            console.log("Error", error);
        }

    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Update Customer Details</h4>
                            <p>ID : {_id}</p>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={cid_u}
                                        onChange={e => setcid(e.target.value)}
                                        // placeholder="Enter customer's ID"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={cname_u}
                                        onChange={e => setcname(e.target.value)}
                                        // placeholder="Enter customer Name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={city_u}
                                        onChange={e => setCity(e.target.value)}
                                        // placeholder="Enter city"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={contact_u}
                                        onChange={e => setcontact(e.target.value)}
                                        // placeholder="Enter contact number"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100" onClick={update}>
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UpdateCustomer
