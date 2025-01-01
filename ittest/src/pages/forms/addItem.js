import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


const AddItem = () => {

    const [itemid, setitemid] = useState('');
    const [itemname, setitemname] = useState('');
    const [rentpday, setrentpday] = useState('');
    const [finepday, setfinepday] = useState('');
    const [availability, setavailable] = useState('');

    const navigate = useNavigate();

    const addItem = async () => {
        try {

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
            console.log(error);
        }
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h4>Add Item Details</h4>
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
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="itemname"
                                        value={itemname}
                                        onChange={e => setitemname(e.target.value)}
                                        placeholder="Enter Item name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rental Per Day</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="rentpday"
                                        value={rentpday}
                                        onChange={e => setrentpday(e.target.value)}
                                        placeholder="Enter rental per day"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fine Per Day</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="finepday"
                                        value={finepday}
                                        onChange={e => setfinepday(e.target.value)}
                                        placeholder="Enter fine per day"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Availability</Form.Label>
                                    <Form.Control as='select' size='sm' value={availability} onChange={e => setavailable(e.target.value)}
                                        placeholder='Select Availability' >
                                        <option>Select Availability</option>
                                        <option>Available</option>
                                        <option>Not Available</option>

                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100" onClick={addItem}>
                                    Submit
                                </Button>
                                <br />
                                <br />
                                <Button variant="primary" type="submit" className="w-100" onClick={() => navigate('/items')}>
                                    Items
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Button onClick={() => navigate('/')}>Add Customer</Button>
                <Button onClick={() => navigate('/addrental')}>Add Rental</Button>
            </Row>
        </Container>
    )
}

export default AddItem
