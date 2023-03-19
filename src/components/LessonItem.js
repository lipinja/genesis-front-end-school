import React from "react";
import Card from "./ui/Card";
import classes from "./ui/Card.module.css";
const LessonItem = (props) => {
  return (
    <Card>
      <div className={props.clicked ? classes.clicked : ""}>
        <div>Lesson {props.title}</div>
        <div>{props.status}</div>
      </div>
    </Card>
  );
};

export default LessonItem;
