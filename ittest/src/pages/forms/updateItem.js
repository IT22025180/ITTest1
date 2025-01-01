import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateItem = () => {

    const { _id, itemid, itemname, rentpday, finepday, availability } = useParams();
    const [id_u, setID] = useState(_id);
    const [itemid_u, setitemid] = useState(itemid);
    const [itemname_u, setitemname] = useState(itemname);
    const [rentpday_u, setrentpday] = useState(rentpday);
    const [finepday_u, setfinepday] = useState(finepday);
    const [availability_u, setavailable] = useState(availability);

    const navigate = useNavigate();

    const updateItem = async (_id, itemid, itemname, rentpday, finepday, availability) => {
        try {

            const response = await Axios.post('http://localhost:4001/api/updateItem', {
                _id: _id,
                itemid,
                itemname,
                rentpday,
                finepday,
                availability
            });

            console.log("Item update is successful", response.data);
            navigate('/items');
        } catch (error) {
            console.log(error);
        }
    }

    const update = async () => {

        try {

            const response = await updateItem(id_u, itemid_u, itemname_u, rentpday_u, finepday_u, availability_u);

            console.log(response);
            setID(_id);
            setitemid('');
            setitemname('');
            setrentpday('');
            setfinepday('');
            setavailable('');

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
                            <h4>Update Item Details</h4>
                            <p>ID : {_id}</p>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Item ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={itemid_u}
                                        onChange={e => setitemid(e.target.value)}
                                        placeholder="Enter item ID"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={itemname_u}
                                        onChange={e => setitemname(e.target.value)}
                                        placeholder="Enter Item name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rental Per Day</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={rentpday_u}
                                        onChange={e => setrentpday(e.target.value)}
                                        placeholder="Enter rental per day"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fine Per Day</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={finepday_u}
                                        onChange={e => setfinepday(e.target.value)}
                                        placeholder="Enter fine per day"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Availability</Form.Label>
                                    <Form.Control as='select' size='sm' value={availability_u} onChange={e => setavailable(e.target.value)}
                                        placeholder='Select Availability' >
                                        <option>Select Availability</option>
                                        <option>Available</option>
                                        <option>Not Available</option>

                                    </Form.Control>
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

export default UpdateItem
