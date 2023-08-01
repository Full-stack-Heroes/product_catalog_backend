import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbInit } from './db/dbInit';
import { productsController } from './controllers/products';
import { phonesController } from './controllers/phones';
import { tabletsController } from './controllers/tablets';
import { accessoriesController } from './controllers/accessories';

dotenv.config();
const app = express();
dbInit();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.get('/products', productsController.getProducts);

app.get('/phones', phonesController.getAll);
app.get('/phones/:id', phonesController.getById);

app.get('/tablets', tabletsController.getAll);
app.get('/tablets/:id', tabletsController.getById);

app.get('/accessories', accessoriesController.getAll);
app.get('/accessories/:id', accessoriesController.getById);

app.listen(3000, () => {
  console.log(`Server works on ${process.env.SERVER_HOST}:${process.env.PORT}`);
});
