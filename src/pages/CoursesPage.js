import React, { Fragment } from "react";
import CoursesList from "../components/CoursesList";

const CoursesPage = (props) => {
  return (
    <Fragment>
      <nav></nav>
      <div className="container mt-5">
        <h1 className="text-primary mb-3">Courses</h1>
      </div>
      <CoursesList />
    </Fragment>
  );
};

export default CoursesPage;
