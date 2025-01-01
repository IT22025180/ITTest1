import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const AddItem = () => {

    const [itemid, setitemid] = useState('');
    const [itemname, setitemname] = useState('');
    const [rentpday, setrentpday] = useState('');
    const [finepday, setfinepday] = useState('');
    const [availability, setavailable] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({
        itemid: Yup.string().required('Item id is required'),
        itemname: Yup.string().required('Item name is Required'),
        rentpday: Yup.string().required('Rent is required'),
        finepday: Yup.string().required('Fine is required'),
        availability: Yup.string().required('Availability is required'),
    })

    const addItem = async () => {
        try {

            await validateSchema.validate(
                {
                    itemid,
                    itemname,
                    rentpday,
                    finepday,
                    availability
                },
                { abortEarly: false }
            );

            const response = await Axios.post('http://localhost:4001/api/addItem', {

                itemid: itemid,
                itemname: itemname,
                rentpday: rentpday,
                finepday: finepday,
                availability: availability
            });

            console.log("Item adding is successful", response.data);
            Swal.fire({
                title: "Success!",
                text: "Item was added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
            setitemid('');
            setitemname('');
            setrentpday('');
            setfinepday('');
            setavailable('');
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
                        <Card.Header className=" text-white text-center" style={{ backgroundColor: 'black' }}>
                            <h4 >Add Item Details</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Item ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="itemid"
                                        value={itemid}
                                        onChange={e => setitemid(e.target.value)}
                                        placeholder="Enter item ID"
                                    />
                                </Form.Group>
                                {errorMessage.itemid && <div className="d-flex justify-content-center text-danger">{errorMessage.itemid}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="itemname"
                                        value={itemname}
                                        onChange={e => setitemname(e.target.value)}
                                        placeholder="Enter Item name"
                                    />
                                </Form.Group>
                                {errorMessage.itemname && <div className="d-flex justify-content-center text-danger">{errorMessage.itemname}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Rental Per Day</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="rentpday"
                                        value={rentpday}
                                        onChange={e => setrentpday(e.target.value)}
                                        placeholder="Enter rental per day"

                                    />
                                </Form.Group>
                                {errorMessage.rentpday && <div className="d-flex justify-content-center text-danger">{errorMessage.rentpday}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Fine Per Day</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="finepday"
                                        value={finepday}
                                        onChange={e => setfinepday(e.target.value)}
                                        placeholder="Enter fine per day"
                                    />
                                </Form.Group>
                                {errorMessage.finepday && <div className="d-flex justify-content-center text-danger">{errorMessage.finepday}</div>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Availability</Form.Label>
                                    <Form.Control as='select' size='sm' value={availability} onChange={e => setavailable(e.target.value)}
                                        placeholder='Select Availability' >
                                        <option>Select Availability</option>
                                        <option>Available</option>
                                        <option>Not Available</option>

                                    </Form.Control>
                                </Form.Group>
                                {errorMessage.availability && <div className="d-flex justify-content-center text-danger">{errorMessage.availability}</div>}
                                <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: 'black' }} onClick={addItem}>
                                    Submit
                                </Button>
                                <br />
                                <br />
                                <Button variant="primary" style={{ backgroundColor: 'black' }} type="submit" className="w-100" onClick={() => navigate('/items')}>
                                    Items
                                </Button>
                                <br />
                                <br />
                                <Button onClick={() => navigate('/')}>Add Customer</Button>
                                <Button onClick={() => navigate('/addrental')} style={{ marginLeft: 20 }}>Add Rental</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AddItem
