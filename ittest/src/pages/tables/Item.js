import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Item = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const getItems = async () => {
        try {
            const response = await Axios.get('http://localhost:4001/api/items');
            setItems(response.data.allItem);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

    const deleteItems = async (id) => {
        try {
            await Axios.post('http://localhost:4001/api/deleteItem', { _id: id });
            setItems((prevCustomer) => prevCustomer.filter((items) => items._id !== id));
            console.log('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting Item:', error);
        }
    };

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteItems(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });
            }
        });
    };

    useEffect(() => {
        getItems();
    }, []);

    const filteredItemdata = items.filter(items => {
        return items.itemname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            <div >
                <br />
                <h3>Item Details</h3><br />
                <input placeholder="Search item name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /><br />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item ID</TableCell>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Rent per day </TableCell>
                                <TableCell>Fine per day</TableCell>
                                <TableCell>Availability</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredItemdata && filteredItemdata.length > 0 ? (
                                filteredItemdata.map((items) => (
                                    <TableRow key={items._id}>
                                        <TableCell>{items.itemid}</TableCell>
                                        <TableCell>{items.itemname}</TableCell>
                                        <TableCell>{items.rentpday}</TableCell>
                                        <TableCell>{items.finepday}</TableCell>
                                        <TableCell>{items.availability}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => navigate(`/updateItems/${items._id}/${items.itemid}/${items.itemname}/${items.rentpday}/${items.finepday}/${items.availability}`)}><FaEdit /></Button>
                                            <Button onClick={() => confirmDelete(items._id)}><FaTrash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>You have no Items added yet!!</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default Item
