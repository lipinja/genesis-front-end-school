import React, { useContext, useState } from "react";
import LessonContext from "../store/lesson-context";
import LessonItem from "./LessonItem";

const LessonsList = (props) => {
  const lessonCtx = useContext(LessonContext);
  const [isActive, setIsActive] = useState(false);
  const lessonHandler = (param) => {
    setIsActive(lessonCtx.isActive);
    props.onGetLessonLink();
    
    localStorage.setItem("lessonId", lessonCtx.id);
    localStorage.setItem("lesson start time", localStorage.getItem(`videoPausedCurrentTime ${lessonCtx.id}`) );
    lessonCtx.startTime = parseInt(localStorage.getItem(`videoPausedCurrentTime ${lessonCtx.id}`)) 
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
