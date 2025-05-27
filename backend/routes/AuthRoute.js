import express from 'express';
import AuthController from '../controllers/AuthController.js';
import verifyToken from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Rute untuk register
router.post('/register', AuthController.register);

// Rute untuk login
router.post('/login', AuthController.login);

// Rute untuk logout (token dihapus di client)
router.post('/logout', AuthController.logout);

// Contoh rute yang dilindungi, hanya bisa diakses dengan token yang valid
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Halo ${req.user.username}, kamu sudah login!` });
});

export default router;
