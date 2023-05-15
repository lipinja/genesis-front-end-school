import React from "react";
import { Link } from "react-router-dom";
import Card from "./ui/Card";
import classes from "./CourseItem.module.css";
import ReactHlsPlayer from "react-hls-player";

const CourseItem = (props) => {
  const token = localStorage.getItem("token");
  // try {
  const videoLink = props.videoLink;
  try {
    const fetchCourseItem = async () => {
      const response = await fetch("${videoLink}", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    };
    fetchCourseItem();
  } catch (error) {
    console.error("error", error);
  }
  const image = props.imageLink + "/cover.webp";
  const skillList = props.skills.map((skill) => (
    <li key={Math.random().toString()}>{skill}</li>
  ));

  return (
    <li className="list-group mb-3" key={props.id}>
      <Card className={classes.courses}>
        <div className={classes.desc}>
          {props.description}
        </div>

        <div>
          <Link to={props.id}>
            <div>
              <ReactHlsPlayer
                poster={image}
                src={videoLink}
                autoPlay={false}
                controls={false}
                muted="muted"
                width="100%"
                height="auto"
                onMouseOverCapture={(event) => event.target.play()}
                onMouseOutCapture={(event) => event.target.pause()}
              />
            </div>
          </Link>
        </div>
        <div>Count of lessons: {props.lessonsCount}</div>
        <div>
          Skills you will imrove:
          <ul>{skillList}</ul>
        </div>
        <div>Raiting: {props.rating}</div>
      </Card>
    </li>
  );
  // } catch (error) {
  //   console.error("fake link oт course: ", props.id , error);
  //   console.log(" console log - fake link oт course: ", props.id , error);
  // }
};

export default CourseItem;
