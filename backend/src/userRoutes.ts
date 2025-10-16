import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create user
router.post('/', async (req: any, res: any) => {
  try {
    const { email, name, firebaseId } = req.body;
    
    if (!email || !name || !firebaseId) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    const user = await prisma.user.create({
      data: { email, name, firebaseId }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

export default router;