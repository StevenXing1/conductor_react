import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Get all attendance records
router.get('/reports', async (req, res) => {
  try {
    const { type, status } = req.query;
    
    let query = `
      SELECT s.session_id, s.title, s.date, s.start_time, s.end_time, s.session_type, s.session_status,
             COUNT(sa.attendance_id) FILTER (WHERE sa.status = 'present') as present_count,
             COUNT(sa.attendance_id) as total_count
      FROM attendance_sessions s
      LEFT JOIN session_attendance sa ON s.session_id = sa.session_id
      WHERE 1=1
    `;
    const params = [];
    
    if (type) {
      params.push(type);
      query += ` AND s.session_type = $${params.length}`;
    }
    
    if (status) {
      params.push(status);
      query += ` AND s.session_status = $${params.length}`;
    }
    
    query += ` GROUP BY s.session_id ORDER BY s.date DESC, s.start_time DESC`;
    
    const result = await pool.query(query, params);
    
    const reports = result.rows.map(row => ({
      ...row,
      attendance_percentage: row.total_count > 0 
        ? Math.round((row.present_count / row.total_count) * 100) 
        : 0
    }));
    
    res.json(reports);
  } catch (error) {
    console.error('Error fetching attendance reports:', error);
    res.status(500).json({ error: 'Failed to fetch attendance reports' });
  }
});

export default router;
