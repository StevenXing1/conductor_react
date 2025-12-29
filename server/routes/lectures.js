import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Get all lectures
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.session_id, s.title, s.date, s.start_time, s.end_time,
              COUNT(sa.attendance_id) FILTER (WHERE sa.status = 'present') as present_count,
              COUNT(sa.attendance_id) as total_count
       FROM attendance_sessions s
       LEFT JOIN session_attendance sa ON s.session_id = sa.session_id
       WHERE s.session_type = 'lecture'
       GROUP BY s.session_id
       ORDER BY s.date DESC, s.start_time DESC`
    );
    
    const lectures = result.rows.map(row => ({
      ...row,
      attendance_percentage: row.total_count > 0 
        ? Math.round((row.present_count / row.total_count) * 100) 
        : 0
    }));
    
    res.json(lectures);
  } catch (error) {
    console.error('Error fetching lectures:', error);
    res.status(500).json({ error: 'Failed to fetch lectures' });
  }
});

export default router;
