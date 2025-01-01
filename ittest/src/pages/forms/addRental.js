import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


const AddRental = () => {

    const [rentid, setrentid] = useState('');
    const [rentDate, setrentDate] = useState('');
    const [returnDate, setreturnDate] = useState('');
    const [dueDate, setdueDate] = useState('');
    const [cost, setcost] = useState('');

    const navigate = useNavigate();

    const addRental = async () => {
        try {

            const response = await Axios.post('http://localhost:4001/api/addRental', {

                rentid: rentid,
                rentDate: rentDate,
                returnDate: returnDate,
                dueDate: dueDate,
                cost: cost
            });

            console.log("Rental adding is successful", response.data);
            Swal.fire({
                title: "Success!",
                text: "Rental was added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
            setrentid('');
            setrentDate('');
            setreturnDate('');
            setdueDate('');
            setcost('');
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
                            <h4>Add Rental Details</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rental ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="rentid"
                                        value={rentid}
                                        onChange={e => setrentid(e.target.value)}
                                        placeholder="Enter Rental ID"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rental Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="rentDate"
                                        value={rentDate}
                                        onChange={e => setrentDate(e.target.value.toString())}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Return Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="returnDate"
                                        value={returnDate}
                                        onChange={e => setreturnDate(e.target.value.toString())}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dueDate"
                                        value={dueDate}
                                        onChange={e => setdueDate(e.target.value.toString())}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Total cost</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cost"
                                        value={cost}
                                        onChange={e => setcost(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100" onClick={addRental}>
                                    Submit
                                </Button>
                                <br />
                                <br />
                                <Button variant="primary" type="submit" className="w-100" onClick={() => navigate('/rentals')}>
                                    Rentals
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Button onClick={() => navigate('/')}>Add Customer</Button>
                <Button onClick={() => navigate('/additem')}>Add Item</Button>
            </Row>
        </Container>
    )
}

export default AddRental
