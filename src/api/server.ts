import express from 'express';
import apiRouter from './routes';

const app = express();

app.use(express.json());

// Montamos el router principal bajo /api
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
