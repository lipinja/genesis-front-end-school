import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Card from "./ui/Card";
import classes from "./CourseItem.module.css";
import ReactHlsPlayer from "react-hls-player";

const CourseItem = (props) => {
  const playerRef = useRef(null);
  const videoLink = props.videoLinkProps.link;
  const image = props.imageLink + "/cover.webp";
  const skillList = props.skills.map((skill) => (
    <li>{skill}</li>
  ));
  return (
    <li className="list-group mb-3" key={props.id}>
      <Card className={classes.courses}>
        <div className={classes.desc}>
          About this course: {props.description}
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
                ref={playerRef}
                onMouseOver={(event) => event.target.play()}
                onMouseOut={(event) => event.target.pause()}
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
};

export default CourseItem;
