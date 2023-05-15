import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import LessonsList from "./LessonsList";
import Card from "./ui/Card";
import ReactHlsPlayer from "react-hls-player/dist";
import LessonContext from "../store/lesson-context";
import classes from "./CourseItem.module.css";

const Course = () => {
  const playerRef = useRef(null);
  const lessonCtx = useContext(LessonContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showHelpInfo, setShowHelpInfo] = useState(false);
  const [courseData, setCourseData] = useState({});
  const [courseLessons, setCourseLessons] = useState([]);
  const [courseImageLink, setCourseImageLink] = useState();
  const [courseSkills, setCourseSkills] = useState([]);
  const token = localStorage.getItem("token");
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
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
        responseData.lessons[0].link &&
          responseData.lessons[0].link.includes(".m3u8")
          ? responseData.lessons[0].link
          : '' //alert("It could be an article, not a video")
      );
      lessonCtx.id = responseData.lessons[0].id;
      localStorage.setItem("lessonId", lessonCtx.id);
      lessonCtx.isActive = true;
      lessonCtx.locked = responseData.lessons[0].status;
      lessonCtx.videoLink = responseData.lessons[0].link;
      lessonCtx.startTime = parseInt(
        localStorage.getItem(`videoPausedCurrentTime ${lessonCtx.id}`)
      );
      setLoading(false);
    };
    courseFetch();
  }, []);

  const lessonLinkHandler = (props) => {
    lessonCtx.locked === "locked" && lessonCtx.videoLink
      ? alert("Sorry, lesson is locked")
      : setCurrentVideo(
          lessonCtx.videoLink ? lessonCtx.videoLink : "failed link"
        );
    if (!lessonCtx.videoLink.includes(".m3u8")) {
      alert("It could be an article, not a video"); // some ERROR!!!!
    }
  };

  const handlePause = (event) => {
    event.preventDefault();
    localStorage.setItem(
      `videoPausedCurrentTime ${lessonCtx.id}`,
      event.target.currentTime
    );
  };

  const skillList = courseSkills.map((skill) => (
    <li key={Math.random().toString()}>{skill}</li>
  ));

  const handlePictureInPicture = (event) => {
    event.target.requestPictureInPicture();
  };

  const handleKeyDown = (event) => {
    const video = document.querySelector("video");
    if (video) {
      switch (event.key) {
        case "1":
          video.playbackRate = 1;
          break;
        case "2":
          video.playbackRate = 1.25;
          break;
        case "3":
          video.playbackRate = 1.5;
          break;
        case "4":
          video.playbackRate = 2;
          break;
        default:
          break;
      }
    }
  };

  const mouseOverCaptureHandler = () => {
    setShowHelpInfo(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <ReactHlsPlayer
          playerRef={playerRef}
          hlsConfig={{
            startPosition: lessonCtx.startTime,
          }}
          className={classes.video}
          poster={courseImageLink}
          src={currentVideo}
          autoPlay={false}
          controls={true}
          width="300"
          height="auto"
          onTimeUpdate={handlePause}
          onKeyDown={handleKeyDown}
          onClick={handlePictureInPicture}
          onMouseOverCapture={mouseOverCaptureHandler}
        />
        <div>{`${
          showHelpInfo
            ? `here is some hotkeys for changing speed of video: "1" - 1x, "2" - 1,25x, "3" - 1,5x, "4" - 2x`
            : ""
        }`}</div>
        <div>
          <p>Lessons list:</p>
          <LessonsList
            lessons={courseLessons}
            onGetLessonLink={lessonLinkHandler}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default Course;
