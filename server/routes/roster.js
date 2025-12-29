import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Get all enrolled users (students, TAs, tutors)
router.get('/', async (req, res) => {
  try {
    const { role, status, search } = req.query;
    
    let query = `
      SELECT u.user_id, u.email, u.name, u.avatar_url, u.pid,
             e.enrollment_role, e.enrollment_status
      FROM users u
      JOIN enrollments e ON u.user_id = e.user_id
      WHERE 1=1
    `;
    const params = [];
    
    if (role) {
      params.push(role);
      query += ` AND e.enrollment_role = $${params.length}`;
    }
    
    if (status) {
      params.push(status);
      query += ` AND e.enrollment_status = $${params.length}`;
    }
    
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (u.name ILIKE $${params.length} OR u.email ILIKE $${params.length} OR u.pid ILIKE $${params.length})`;
    }
    
    query += ` ORDER BY e.enrollment_role, u.name`;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching roster:', error);
    res.status(500).json({ error: 'Failed to fetch roster' });
  }
});

export default router;
