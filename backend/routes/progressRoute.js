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
    const existing = await progressModel.findOne({
      where: { user_id, course_id, chapter_id },
    });

    if (existing) {
      if (parseFloat(progress) > parseFloat(existing.progress)) {
        existing.progress = progress;
        await existing.save();
        return res
          .status(200)
          .json({ message: 'Progress updated', data: existing });
      } else {
        return res
          .status(200)
          .json({ message: 'No update needed; progress is not higher', data: existing });
      }
    }

    const newProgress = await progressModel.create({
      user_id,
      course_id,
      chapter_id,
      progress,
    });

    return res
      .status(201)
      .json({ message: 'Progress created', data: newProgress });

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

// router.patch("/course/:id", isAuthenticated, async (req, res) => {
//   const progressId = req.params.id;
//   const { course_id, chapter_id, progress: newProgress } = req.body;

//   try {
//     const entry = await progressModel.findOne({
//       where: { id: progressId, user_id: req.user.id },
//     });

//     if (!entry) {
//       return res.status(404).json({ error: "Progress entry not found" });
//     }

//     const currentProgress = parseFloat(entry.progress);
//     const updatedProgress = parseFloat(newProgress);

//     if (updatedProgress > currentProgress) {
//       entry.course_id = course_id;
//       entry.chapter_id = chapter_id;
//       entry.progress = updatedProgress;
//       entry.updated_at = new Date();
//       await entry.save();

//       return res.status(200).json({
//         message: "Progress updated",
//         newProgress: entry.progress,
//       });
//     } else {
//       return res.status(200).json({
//         message: "No update needed; current progress is higher",
//         currentProgress,
//       });
//     }
//   } catch (error) {
//     console.error("PATCH error:", error);
//     res.status(500).json({ error: "Failed to update progress", details: error.message });
//   }
// });

module.exports = router;
