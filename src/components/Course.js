import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonsList from "./LessonsList";
import Card from "./ui/Card";
import ReactHlsPlayer from "react-hls-player/dist";
// import TokenContext from "../store/token-context";

const Course = () => {
  const { id } = useParams();
  // const playerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({});
  const [courseLessons, setCourseLessons] = useState([]);
  const [courseVideoLink, setCourseVideoLink] = useState();
  const [courseImageLink, setCourseImageLink] = useState();
  const [courseSkills, setCourseSkills] = useState([]);
  const token = localStorage.getItem("token");
  // const [currentVideo, setCurrentVideo] = useState();
 

  useEffect(() => {
    courseFetch();
  }, []);

  const courseFetch = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.wisey.app/api/v1/core/preview-courses/${id}`,
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
    setCourseData(responseData);
    setCourseLessons(responseData.lessons);
    setCourseSkills(responseData.meta.skills);
    setCourseImageLink(
      responseData.lessons[0].previewImageLink +
        "/lesson-" +
        responseData.lessons[0].order +
        ".webp"
    );
    setCourseVideoLink(responseData.meta.courseVideoPreview.link);
    setLoading(false);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  const skillList = courseSkills.map((skill) => <li>{skill}</li>);

  return (
    <Fragment>
      <Card>
        <h1>{courseData.title}</h1>
        <div>{courseData.description}</div>
        <div>Main tags: {courseData.tags}</div>
        <div>Course duration: {courseData.duration}</div>
        <div>Raiting: {courseData.rating}</div>
        <div>Skills:
          <ul>{skillList}</ul>
        </div>
        <div>
          <ReactHlsPlayer
            poster={courseImageLink}
            src={courseVideoLink}
            autoPlay={false}
            controls={true}
            width="300"
            height="auto"
            // ref={playerRef}
          />
        </div>
        <div>
          <p>Lessons list:</p>
          <LessonsList lessons={courseLessons} />
        </div>
      </Card>
    </Fragment>
  );
};

export default Course;
