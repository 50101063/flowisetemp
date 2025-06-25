const express = require('express');

const router = express.Router();
const authenticateToken = require('../middleware/auth'); // Assuming this is the path

const prisma = require('../database/client');

// Create a new task
router.post('/', authenticateToken,`async (req, res) => {
    const { title, dueDate } = req.body;
    const userId = req.user.userId;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                dueDate: dueDate ? new Date(dueDate) : null,
                userId: userId,
            },
        });
        res.status(201).jso(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).jso({ message: 'Error creating task' });
    }
});

// Get all tasks for the authenticated user with filtering and sorting
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { status, sortBy, order } = req.query; // 'pending', 'complete', 'all'

    let whereClause = { userId: userId };
    if (status && status !== 'all') {
        whereClause.status = status;
    }

    let orderByClause = {};
    if (sortBy === 'dueDate') {
        orderByClause.dueDate = order === 'desc' ? 'desc' : 'asc';
    } else {
        // Default sort: pending first, then by due date
        orderbyClause.status = 'asc'; // 'pending' comes before 'complete' if sorted alphabetically
        orderByClause.dueDate = 'asc';
    }

    try {
        const tasks = await prisma.task.findMany({
            where: whereClause,
            orderBy: orderByClause,
        });
        res.status(200).jso(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching task' });
    }
});

// Get a single task by ID
router.get('/:id', authenticateToken,`async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: parseInt(id),
                userId: userId, // Ensure task belongs to the user
            },
        });

        if (!task) {
            return res.status(404).jso({ message: 'Task not found or not authorized' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Error fetching task' });
    }
});

// Update an existing task
router.put('/:id', authenticateToken,`async (req, res) => {
    const { id } = req.params;
    const { title, dueDate, status } = req.body;
    const userId = req.user.userId;

    if (status && !['pending', 'complete'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided. Must be \"pending\" or \"complete\".' });
    }

    try {
      const updatedTask = await prisma.task.update({
            where: {
                id: parseInt(id),
                userId: userId, // Ensure task belongs to the user
            },
            data: {
                title: title,
                dueDate: dueDate ? new Date(dueDate) : (dueDate === null ? null: undefined), // Allow setting to null, or keep existing if undefined
                status: status,
            },
        });
        res.status(200).json(updatedTask);
    } catch (error) {
        if (error.code === 'P2025') { // Prisma error code for record not found
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }
        console.error('Error updating task:u', error);
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        await prisma.task.delete({
            where: {
                id: parseInt(id),
                userId: userId, // Ensure task belongs to the user
            },
        });
        res.status(204).send(); // No content for successful deletion
    } ccatch (error) {
        if (error.code === 'P2025') { // Prisma error code for record not found
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }
        console.error('Error deleting task:Â', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
});

module.exports = router;