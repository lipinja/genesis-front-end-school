import React, { Fragment, useEffect, useState } from "react";
import classes from "./AvaliableCourses.module.css";
import CourseItem from "./CourseItem";
import Pagination from "./Pagination";

const AvaliableCourses = (props) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const response = await fetch(
        "https://api.wisey.app/api/v1/core/preview-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const responseData = await response.json();
      const coursesWithValidLinks = [];
      responseData.courses.map((course) => {
        if (course.meta.courseVideoPreview) {
         coursesWithValidLinks.push(course);
        }
      });
      setCourses(coursesWithValidLinks.reverse());
      setLoading(false);
    };

    fetchCourses().catch((error) => {
      setLoading(false);
      console.log('error.message from fetch: ',error.message);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const coursesList = courses.map((course) => (
    <CourseItem
      key={course.id}
      id={course.id}
      title={course.title}
      imageLink={course.previewImageLink}
      description={course.description}
      lessonsCount={course.lessonsCount}
      skills={course.meta.skills}
      rating={course.rating}
      videoLink={course.meta.courseVideoPreview.link}
    />
  ));

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = coursesList.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Fragment>
      <Pagination
        coursesPerPage={coursesPerPage}
        totalCourses={coursesList.length}
        paginate={paginate}
      />
      <ul className={classes.courses}>{currentCourses}</ul>
    </Fragment>
  );
};

export default AvaliableCourses;
