const { chapters } = require("../../model");


// Add a new course chapter
exports.addCourseChapter = async (req, res) => {
  try {
    const { chapterTitle, chapterDescription, courseVideo, chapterStatus, chapterType } = req.body;
    const newChapter = await chapters.create({
      chapterTitle,
      chapterDescription,
      courseVideo,
      chapterStatus,
      chapterType
    });
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course chapter
exports.deleteCourseChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChapterCount = await chapters.destroy({ where: { id } });
    if (deletedChapterCount === 0) {
      return res.status(404).json({ message: "Course chapter not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course chapter
exports.updateCourseChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { chapterTitle, chapterDescription, courseVideo, chapterStatus, chapterType } = req.body;
    const [updatedCount] = await chapters.update(
      {
        chapterTitle,
        chapterDescription,
        courseVideo,
        chapterStatus,
        chapterType
      },
      { where: { id } }
    );
    if (updatedCount === 0) {
      return res.status(404).json({ message: "Course chapter not found" });
    }
    res.status(200).json({ message: "Course chapter updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all course chapters
exports.getAllCourseChapters = async (req, res) => {
    const {id} = req.params; // Assuming courseId is passed as a route parameter
    console.log(id)
    try {
      // Assuming you have a Chapter model with a courseId field
      const chapterData = await chapters.findAll({ where: { courseId: id } });
      console.log(chapterData)
      res.status(200).json(chapterData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get a single course chapter by id
exports.getCourseChapterById = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await chapters.findByPk(id);
    if (!chapter) {
      return res.status(404).json({ message: "Course chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
