import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Swal from 'sweetalert2';
import { FaEdit, FaFilePdf, FaTrash } from 'react-icons/fa';
import jsPDF from 'jspdf';

const Rental = () => {
    const [rental, setRentals] = useState([]);
    const navigate = useNavigate();

    const getRentals = async () => {
        try {
            const response = await Axios.get('http://localhost:4001/api/rentals');
            setRentals(response.data.allRental);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

    const deleteRental = async (id) => {
        try {
            await Axios.post('http://localhost:4001/api/deleteRental', { _id: id });
            setRentals((prevRental) => prevRental.filter((rental) => rental._id !== id));
            console.log('Rental deleted successfully');
        } catch (error) {
            console.error('Error deleting Rental:', error);
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
                deleteRental(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });
            }
        });
    };

    useEffect(() => {
        getRentals();
    }, []);

    const genBill = async (rental) => {

        const doc = new jsPDF();
        let y = 10;

        const genPDF = `Sample Bill
                            \nRental details\n
                            ---------------\n 
                            Customer name : \n
                            Rental item : \n
                            Rental Start Date : ${rental.rentDate}\n
                            Expected Return Date : ${rental.returnDate}\n
                            Total Cost : ${rental.cost}\n
                            Offered by : Rental Management System
                            `;
        doc.text(genPDF, 10, y);
        y += 50;

        doc.save(`${rental.rentid}_report.pdf`);
    }

    return (
        <div>
            <div >
                <br />
                <h3>Rental Details</h3><br />

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rent ID</TableCell>
                                <TableCell>Rent Date</TableCell>
                                <TableCell>Return Date </TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rental && rental.length > 0 ? (
                                rental.map((rental) => (
                                    <TableRow key={rental._id}>
                                        <TableCell>{rental.rentid}</TableCell>
                                        <TableCell>{rental.rentDate}</TableCell>
                                        <TableCell>{rental.returnDate}</TableCell>
                                        <TableCell>{rental.dueDate}</TableCell>
                                        <TableCell>{rental.cost}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => navigate(`/updateRentals/${rental._id}/${rental.rentid}/${rental.rentDate}/${rental.returnDate}/${rental.dueDate}/${rental.cost}`)}><FaEdit /></Button>
                                            <Button onClick={() => confirmDelete(rental._id)}><FaTrash /></Button>
                                            <Button onClick={() => genBill(rental)}><FaFilePdf /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>You have no Rentals added yet!!</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default Rental
