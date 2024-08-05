import express from 'express';
import bodyParser from 'body-parser';
import router from './router';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});
