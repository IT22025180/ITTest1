import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateRental = () => {

    const { _id, rentid, rentDate, returnDate, dueDate, cost } = useParams();
    const [id_u, setID] = useState(_id);
    const [rentid_u, setrentid] = useState(rentid);
    const [rentDate_u, setrentDate] = useState(rentDate);
    const [returnDate_u, setreturnDate] = useState(returnDate);
    const [dueDate_u, setdueDate] = useState(dueDate);
    const [cost_u, setcost] = useState(cost);

    const navigate = useNavigate();

    const updateRental = async (_id, rentid, rentDate, returnDate, dueDate, cost) => {
        try {

            const response = await Axios.post('http://localhost:4001/api/updateRental', {
                _id: _id,
                rentid,
                rentDate,
                returnDate,
                dueDate,
                cost
            });

            console.log("Rental update is successful", response.data);
            navigate('/rentals');
        } catch (error) {
            console.log(error);
        }
    }

    const update = async () => {

        try {

            const response = await updateRental(id_u, rentid_u, rentDate_u, returnDate_u, dueDate_u, cost_u);

            console.log(response);
            setID(_id);
            setrentid('');
            setrentDate('');
            setreturnDate('');
            setdueDate('');
            setcost('');
            navigate('/rentals');
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
                            <h4>Update Rental Details</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rental ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="rentid"
                                        value={rentid_u}
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
                                        value={rentDate_u}
                                        onChange={e => setrentDate(e.target.value.toString())}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Return Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="returnDate"
                                        value={returnDate_u}
                                        onChange={e => setreturnDate(e.target.value.toString())}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dueDate"
                                        value={dueDate_u}
                                        onChange={e => setdueDate(e.target.value.toString())}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Total cost</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cost"
                                        value={cost_u}
                                        onChange={e => setcost(e.target.value)}
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

export default UpdateRental
