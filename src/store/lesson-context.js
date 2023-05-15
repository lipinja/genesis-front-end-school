import React from "react";


const LessonContext = React.createContext({
  id: '',
  isActive: false,
  locked: '',
  videoLink: '',
  startTime: '',
});


export const LessonContextProvider = (props) => {
  const contextValue = {
    id: props.id,
    isActive: props.isActive,
    locked: props.locked,
    videoLink: props.videoLink,
    startTime: props.startTime,
  };

  return (
    <LessonContext.Provider value={contextValue}>
      {props.children}
    </LessonContext.Provider>
  );
};

export default LessonContext;
