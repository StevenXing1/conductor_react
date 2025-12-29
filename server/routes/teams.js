import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.team_id, t.team_name, t.team_logo, t.team_mantra,
              COUNT(e.user_id) as member_count
       FROM teams t
       LEFT JOIN enrollments e ON t.team_id = e.team_id
       GROUP BY t.team_id
       ORDER BY t.team_name`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Get team meetings
router.get('/:teamId/meetings', async (req, res) => {
  try {
    const { teamId } = req.params;
    
    const result = await pool.query(
      `SELECT s.session_id, s.title, s.date, s.start_time, s.end_time,
              COUNT(sa.attendance_id) FILTER (WHERE sa.status = 'present') as present_count,
              COUNT(sa.attendance_id) as total_count
       FROM attendance_sessions s
       LEFT JOIN session_attendance sa ON s.session_id = sa.session_id
       WHERE s.session_type = 'team_meeting' AND s.team_id = $1
       GROUP BY s.session_id
       ORDER BY s.date DESC, s.start_time DESC`,
      [teamId]
    );
    
    const meetings = result.rows.map(row => ({
      ...row,
      attendance_percentage: row.total_count > 0 
        ? Math.round((row.present_count / row.total_count) * 100) 
        : 0
    }));
    
    res.json(meetings);
  } catch (error) {
    console.error('Error fetching team meetings:', error);
    res.status(500).json({ error: 'Failed to fetch team meetings' });
  }
});

export default router;
