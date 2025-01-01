import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const AddRental = () => {

    const [rentid, setrentid] = useState('');
    const [rentDate, setrentDate] = useState('');
    const [returnDate, setreturnDate] = useState('');
    const [dueDate, setdueDate] = useState('');
    const [cost, setcost] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({
        rentid: Yup.string().required('Rent id is required'),
        rentDate: Yup.string().required('Rent Date  is Required'),
        returnDate: Yup.string().required('Return Date is required'),
        dueDate: Yup.string().required('Due Date is required'),
        cost: Yup.string().required('Cost is required'),
    })

    const addRental = async () => {
        try {

            await validateSchema.validate(
                {
                    rentid,
                    rentDate,
                    returnDate,
                    dueDate,
                    cost
                },
                { abortEarly: false }
            );
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
                        <Card.Header className=" text-white text-center" style={{ backgroundColor: 'green' }}>
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

                                    />
                                </Form.Group>
                                {errorMessage.rentid && <div className="d-flex justify-content-center text-danger">{errorMessage.rentid}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Rental Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="rentDate"
                                        value={rentDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={e => setrentDate(e.target.value.toString())}

                                    />
                                </Form.Group>
                                {errorMessage.rentDate && <div className="d-flex justify-content-center text-danger">{errorMessage.rentDate}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Return Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="returnDate"
                                        value={returnDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={e => setreturnDate(e.target.value.toString())}

                                    />
                                </Form.Group>
                                {errorMessage.returnDate && <div className="d-flex justify-content-center text-danger">{errorMessage.returnDate}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dueDate"
                                        value={dueDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={e => setdueDate(e.target.value.toString())}

                                    />
                                </Form.Group>
                                {errorMessage.dueDate && <div className="d-flex justify-content-center text-danger">{errorMessage.dueDate}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Total cost</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cost"
                                        value={cost}
                                        onChange={e => setcost(e.target.value)}
                                        placeholder="Enter Cost"
                                    />
                                </Form.Group>
                                {errorMessage.cost && <div className="d-flex justify-content-center text-danger">{errorMessage.cost}</div>}
                                <Button variant="primary" type="submit" className="w-100" onClick={addRental} style={{ backgroundColor: 'green' }}>
                                    Submit
                                </Button>
                                <br />
                                <br />
                                <Button variant="primary" type="submit" style={{ backgroundColor: 'green' }} className="w-100" onClick={() => navigate('/rentals')}>
                                    Rentals
                                </Button>
                                <br />
                                <br />
                                <Button onClick={() => navigate('/')}>Add Customer</Button>
                                <Button onClick={() => navigate('/additem')} style={{ marginLeft: 20 }}>Add Item</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    )
}

export default AddRental
