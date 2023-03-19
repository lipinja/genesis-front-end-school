import React from "react";
// import LessonContext from "../store/lesson-context";
import LessonItem from "./LessonItem";

const LessonsList = (props)=>{
  // const lessonCtx= useContext(LessonContext)
  const lessonHandler=()=>{
      }
  const lessonList = props.lessons.map((lesson) => (
    <LessonItem
      key={lesson.id}
      id={lesson.id}
      title={lesson.title}
      status={lesson.status}
      link={lesson.link}
      previewImageLink={lesson.previewImageLink}
      onClick={lessonHandler}
      
    />
  ));

  return <ul>{lessonList}</ul>
}

export default LessonsList;
