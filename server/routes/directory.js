import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Get staff directory
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    
    let query = `
      SELECT u.user_id, u.email, u.name, u.avatar_url, u.office_hours, u.bio,
             e.enrollment_role
      FROM users u
      JOIN enrollments e ON u.user_id = e.user_id
      WHERE e.enrollment_role IN ('professor', 'instructor', 'ta', 'tutor')
    `;
    
    if (role) {
      query += ` AND e.enrollment_role = $1`;
    }
    
    query += ` ORDER BY e.enrollment_role, u.name`;
    
    const result = await pool.query(query, role ? [role] : []);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching directory:', error);
    res.status(500).json({ error: 'Failed to fetch directory' });
  }
});

export default router;
