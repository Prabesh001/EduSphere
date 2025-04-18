const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/isAuthenticated');
const db = require('../model');
const progressModel = db.progress;

// POST: Create or update progress
router.post('/', isAuthenticated, async (req, res) => {
  const { course_id, chapter_id, progress } = req.body;
  const user_id = req.user.id;

  try {
    const [entry, created] = await progressModel.findOrCreate({
      where: { user_id, course_id, chapter_id },
      defaults: { progress }
    });

    if (!created) {
      entry.progress = progress;
      await entry.save();
    }

    res.status(200).json({ message: created ? 'Progress created' : 'Progress updated', data: entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save progress', details: error.message });
  }
});

// GET: Get all progress for authenticated user
router.get('/', isAuthenticated, async (req, res) => {
  const user_id = req.user.id;

  try {
    const progress = await progressModel.findAll({
      where: { user_id }
    });

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress', details: error.message });
  }
});

// PATCH: Update progress for a course and chapter
router.patch('/course/:id', isAuthenticated, async (req, res) => {
  const progressId = req.params.id;
  const { course_id, chapter_id, progress } = req.body;

  try {
    const updated = await db('progress')
      .where('id', progressId)
      .update({ course_id, chapter_id, progress, updated_at: new Date() });

    res.status(200).json({ message: "Progress updated", updated });
  } catch (error) {
    console.error("PATCH error:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});


module.exports = router;
