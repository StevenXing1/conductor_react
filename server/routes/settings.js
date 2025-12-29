import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Get course settings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM course_offerings LIMIT 1`
    );
    res.json(result.rows[0] || {});
  } catch (error) {
    console.error('Error fetching course settings:', error);
    res.status(500).json({ error: 'Failed to fetch course settings' });
  }
});

// Update course settings
router.put('/', async (req, res) => {
  try {
    const { course_code, course_name, department, credits, term, year, start_date, end_date, location, theme_color } = req.body;
    
    const result = await pool.query(
      `UPDATE course_offerings 
       SET course_code = $1, course_name = $2, department = $3, credits = $4, 
           term = $5, year = $6, start_date = $7, end_date = $8, location = $9, theme_color = $10
       WHERE offering_id = (SELECT MIN(offering_id) FROM course_offerings)
       RETURNING *`,
      [course_code, course_name, department, credits, term, year, start_date, end_date, location, theme_color]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating course settings:', error);
    res.status(500).json({ error: 'Failed to update course settings' });
  }
});

export default router;
