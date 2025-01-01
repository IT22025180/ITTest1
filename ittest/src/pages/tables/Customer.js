import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Swal from 'sweetalert2';

const Customer = () => {
    const [customer, setcustomer] = useState([]);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const getCustomer = async () => {
        try {
            const response = await Axios.get('http://localhost:4001/api/customers');
            setcustomer(response.data.allCustomer);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

    useEffect(() => {
        getCustomer();
    }, []);

    const deleteCustomer = async (id) => {
        try {
            await Axios.post('http://localhost:4001/api/deleteCustomer', { _id: id });
            setcustomer((prevCustomer) => prevCustomer.filter((customer) => customer._id !== id));
            console.log('Customer deleted successfully');
        } catch (error) {
            console.error('Error deleting Customer:', error);
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
                deleteCustomer(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });
            }
        });
    };

    const filteredCustomerdata = customer.filter(customer => {
        return customer.cname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            <div >
                <br />
                <h3>Customer Details</h3><br />
                <input placeholder="Search customer name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /><br />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer ID</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Contact </TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCustomerdata && filteredCustomerdata.length > 0 ? (
                                filteredCustomerdata.map((customer) => (
                                    <TableRow key={customer._id}>
                                        <TableCell>{customer.cid}</TableCell>
                                        <TableCell>{customer.cname}</TableCell>
                                        <TableCell>{customer.contact}</TableCell>
                                        <TableCell>{customer.city}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => navigate(`/updateCustomer/${customer._id}/${customer.cname}/${customer.contact}/${customer.city}`)}>Update</Button>
                                            <Button onClick={() => confirmDelete(customer._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>You have no Customers added yet!!</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default Customer
