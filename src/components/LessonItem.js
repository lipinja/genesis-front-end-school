import React, { useContext } from "react";
import LessonContext from "../store/lesson-context";
import Card from "./ui/Card";
import classes from "./ui/Card.module.css";

const LessonItem = (props) => {

  const lessonCtx = useContext(LessonContext);
  
  const lessonItemHandler = () => {
    lessonCtx.id = props.id;
    lessonCtx.isActive = true;
    lessonCtx.videoLink = props.link;
    lessonCtx.locked = props.status;
    props.onClick(props.link);
  };
  return (
    <Card>
      <div
        onClick={lessonItemHandler}
        className={
          lessonCtx.id === props.id && lessonCtx.isActive ? classes.active : ""
        }
      >
        <div>Lesson {props.title}</div>
        <div>{props.status}</div>
        <div>{props.link}</div>
        <div>{props.type}</div>
      </div>
    </Card>
  );
};

export default LessonItem;
