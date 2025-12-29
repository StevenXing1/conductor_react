import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      totalStudents: 0,
      totalLectures: 0,
      avgAttendance: 0,
      upcomingDeadlines: 0
    };

    // Get total students
    const studentsResult = await pool.query(
      `SELECT COUNT(*) FROM enrollments WHERE enrollment_role = 'student'`
    );
    stats.totalStudents = parseInt(studentsResult.rows[0].count);

    // Get total lectures
    const lecturesResult = await pool.query(
      `SELECT COUNT(*) FROM attendance_sessions WHERE session_type = 'lecture'`
    );
    stats.totalLectures = parseInt(lecturesResult.rows[0].count);

    // Get average attendance
    const attendanceResult = await pool.query(
      `SELECT AVG(CASE WHEN status = 'present' THEN 1.0 ELSE 0.0 END) * 100 as avg_attendance
       FROM session_attendance`
    );
    stats.avgAttendance = Math.round(parseFloat(attendanceResult.rows[0]?.avg_attendance || 0));

    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get announcements
router.get('/announcements', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, u.name as author_name 
       FROM announcements a
       LEFT JOIN users u ON a.user_id = u.user_id
       ORDER BY a.created_at DESC
       LIMIT 10`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

export default router;
