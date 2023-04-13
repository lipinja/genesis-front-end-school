import React, { useContext, useState } from "react";
import LessonContext from "../store/lesson-context";
import LessonItem from "./LessonItem";

const LessonsList = (props) => {
  const lessonCtx = useContext(LessonContext);
  const [isActive, setIsActive] = useState(false);
  const lessonHandler = (param) => {
    setIsActive(lessonCtx.isActive);
    props.onGetLessonLink();
    // отримання часу перегляду відео
    // const video = document.getElementById('myVideo');
    const currentVIdeoTime = lessonCtx.videoLink.currentTime;

    // збереження часу перегляду в локальному сховищі
    localStorage.setItem("lessonId", lessonCtx.id);
    localStorage.setItem("videoProgress", currentVIdeoTime);
  };
  const lessonList = props.lessons.map((lesson) => (
    <LessonItem
      key={lesson.id}
      id={lesson.id}
      title={lesson.title}
      status={lesson.status}
      type={lesson.type}
      link={lesson.link}
      previewImageLink={lesson.previewImageLink}
      onClick={lessonHandler}
      isActive={isActive}
    />
  ));

  return <ul>{lessonList}</ul>;
};

export default LessonsList;
