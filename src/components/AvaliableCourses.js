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
      setCourses(responseData.courses);
      setLoading(false);
    };

    fetchCourses().catch((error) => {
      setLoading(false);
      console.log(error.message);
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
      videoLinkProps={course.meta.courseVideoPreview}
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
      <ul className={"list-gtoup mb-4 " + classes.courses}>{currentCourses}</ul>
      <Pagination
        coursesPerPage={coursesPerPage}
        totalCourses={coursesList.length}
        paginate={paginate}
      />
    </Fragment>
  );
};

export default AvaliableCourses;
