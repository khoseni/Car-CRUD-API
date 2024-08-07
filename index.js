import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { countNissansFromCk, vehicle } from './nissanFromCk.js';



const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))

app.get('/api/nissansFromCK', (req, res) => {
  const count = req.query.count;
  const search = countNissansFromCk(count);
  console.log(search)
  res.json({ search });
});

const router = express.Router();

//get all motors
app.get('/api/vehicles', (req, res) => {
  res.json(vehicle);
});

// add a new vehicle
app.post('/api/vehicles', (req, res) => {
  const newVehicle = req.body;
  vehicle.push(newVehicle);
  res.json(newVehicle);
});

// delete a vehicle by registration number
app.get('/api/vehicles/delete', (req, res) => {
  const reg_number = req.query.reg_number; // Use req.query to get query parameters
  const index = vehicle.findIndex(v => v.reg_number === reg_number);

  if (index !== -1) {
    vehicle.splice(index, 1);
    res.status(200).json({ message: 'Vehicle deleted' });
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
});




let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});