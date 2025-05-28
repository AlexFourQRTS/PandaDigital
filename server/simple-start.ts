import express from 'express';
import { registerRoutes } from './routes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static('../client/dist'));

// Register API routes
registerRoutes(app).then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🐼 Panda server running on http://0.0.0.0:${PORT}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
});