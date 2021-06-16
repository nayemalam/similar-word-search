import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/api.js';

const app = express();
const PORT = 4000;

app.use(bodyParser.json()); // can see the contents of page within console
app.use('/', router);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
