import express from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import profileRoutes from './routes/profiles';

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
