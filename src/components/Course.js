import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import LessonsList from "./LessonsList";
import Card from "./ui/Card";
import ReactHlsPlayer from "react-hls-player/dist";
import LessonContext from "../store/lesson-context";

const Course = () => {
  const [duration1, setDuration1] = useState(null);
  const [currentTime1, setCurrentTime1] = useState(null);
  const [buffered1, setBuffered1] = useState(null);
  const lessonCtx = useContext(LessonContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({});
  const [courseLessons, setCourseLessons] = useState([]);
  const [courseImageLink, setCourseImageLink] = useState();
  const [courseSkills, setCourseSkills] = useState([]);
  const token = localStorage.getItem("token");
  const [currentVideo, setCurrentVideo] = useState();

  function handleProgress(event) {
    const { buffered, duration, currentTime } = event;
    setDuration1(duration);
    setCurrentTime1(currentTime);
    setBuffered1(buffered);
    console.log('started progress', 'duration= ', duration1, 'currentTime= ', currentTime1, 'buffered= ', buffered1, 'event ', event )
  }

  useEffect(() => {
    courseFetch();
  }, []);

 
  const lessonLinkHandler = (props) => {
    lessonCtx.locked === "locked" && lessonCtx.videoLink
      ? alert("Sorry, lesson is locked")
      : setCurrentVideo(lessonCtx.videoLink ? lessonCtx.videoLink : "");
  };

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

    setCurrentVideo(
      responseData.lessons[0].link ? responseData.lessons[0].link : ""
    ); ////// error

    lessonCtx.id = responseData.lessons[0].id;
    lessonCtx.isActive = true;
    lessonCtx.locked = responseData.lessons[0].status;
    setLoading(false);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  const skillList = courseSkills.map((skill) => (
    <li key={Math.random().toString()}>{skill}</li>
  ));

  return (
    <Fragment>
      <Card>
        <h1>{courseData.title}</h1>
        <div>{courseData.description}</div>
        <div>Main tags: {courseData.tags}</div>
        <div>Course duration: {courseData.duration}</div>
        <div>Raiting: {courseData.rating}</div>
        <div>
          Skills:
          <ul>{skillList}</ul>
        </div>
        <div>
          <ReactHlsPlayer
            className="video"
            poster={courseImageLink}
            src={currentVideo}
            autoPlay={false}
            controls={true}
            width="300"
            height="auto"
            onProgress={handleProgress}
          />
        </div>
        <div>
          <p>Lessons list:</p>
          <LessonsList
            lessons={courseLessons}
            onGetLessonLink={lessonLinkHandler}
          />
        </div>
        <div>Duration: {duration1}</div>
      <div>Current time: {currentTime1}</div>
      <div>Buffered: {buffered1}</div>
      </Card>
    </Fragment>
  );
};

export default Course;
