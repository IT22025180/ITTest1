import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCustomer from './pages/forms/addCustomer';
import AddItem from './pages/forms/addItem';
import AddRental from './pages/forms/addRental';
import Customer from './pages/tables/Customer';
import Item from './pages/tables/Item';
import Rental from './pages/tables/Rental';
import UpdateCustomer from './pages/forms/updateCustomer';
import UpdateItem from './pages/forms/updateItem';
import UpdateRental from './pages/forms/updateRental';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AddCustomer />} />
        <Route path='/additem' element={<AddItem />} />
        <Route path='/addrental' element={<AddRental />} />
        <Route path='/customers' element={<Customer />} />
        <Route path='/items' element={<Item />} />
        <Route path='/rentals' element={<Rental />} />
        <Route path='/updateCustomer/:_id/:cid/:cname/:contact/:city' element={<UpdateCustomer />} />
        <Route path='/updateItems/:_id/:itemid/:itemname/:rentpday/:finepday/:availability' element={<UpdateItem />} />
        <Route path='/updateRentals/:_id/:rentid/:rentDate/:returnDate/:dueDate/:cost' element={<UpdateRental />} />
      </Routes>
    </Router>
  );
}

export default App;
