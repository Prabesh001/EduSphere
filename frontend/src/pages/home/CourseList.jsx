import { useEffect, useState } from "react";
import { baseUrl } from "../../config";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [teachers, setTeachers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const getAllData = async () => {
    try {
      const response = await axios.get(baseUrl + "/user/courses");
      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };

  const getCategoryData = async () => {
    try {
      const response = await axios.get(baseUrl + "/get-all-category");
      if (response.status === 200) {
        setCategories(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };

  useEffect(() => {
    getAllData();
    getCategoryData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  console.log(teachers);

  const renderCourseCards = () => {
    let filteredCourses = teachers;

    // Filter by search query
    filteredCourses = filteredCourses.filter((course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter by category
    if (selectedCategory) {
      filteredCourses = filteredCourses.filter(
        (course) => course?.courseCategory?.categoryName === selectedCategory
      );
    }

    // Filter by price range
    if (priceRange === "free") {
      filteredCourses = filteredCourses.filter(
        (course) => course.coursePrice === 0
      );
    } else if (priceRange === "paid") {
      filteredCourses = filteredCourses.filter(
        (course) => course.coursePrice > 0
      );
    }

    return filteredCourses.map((course) => (
      <div
        key={course.id}
        className="max-w-full rounded overflow-hidden shadow-2xl "
      >
        <Link to={"/course/" + course.id}>
          {/* Course Image */}
          <img
            className=" h-[300px] w-full object-cover"
            src={baseUrl + "/" + course.courseImage}
            alt="Course"
          />

          {/* Course Details */}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 capitalize">
              {course.courseName}
            </div>
            <p className="text-gray-700 text-base">
              {course.courseDescription}
            </p>
          </div>

          {/* Price */}
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Price: ${course.coursePrice}
            </span>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className="mb-5">
      <h2 className="text-center text-2xl">Courses</h2>
      <div className="flex flex-col flex-wrap gap-3 pt-10 w-[90%] m-auto min-h-[100vh]">
        <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-md h-[200px] max-w-xl">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="px-3 py-2 mb-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          {/* Category Filter */}
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="px-3 py-2 mb-2 text-black  rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => {
              return <option key={category.id}>{category.categoryName}</option>;
            })}
          </select>

          {/* Price Filter */}
          <select
            onChange={handlePriceRangeChange}
            value={priceRange}
            className="px-3 py-2 mb-2 text-black  rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {renderCourseCards()}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
