import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/api/index';
import thoughtRouter from './routes/api/index';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/thoughts', thoughtRouter);

mongoose.connect('mongodb://localhost:27017/socialNetwork')
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch(err => console.error(err));