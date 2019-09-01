import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../utils/utils';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const LessonItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
  width: 300px;
`;

const LessonDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const LessonList = props => {
  const user = getUser();
  console.log(props.userSiteTimes);
  console.log('user site times');
  console.log(props.lessons);
  console.log('all lesson');
  if (props.lessons.length !== 0) {
    const lessonPlans = props.lessons.map(lesson => {
      var showLesson = false;
      for (let index = 0; index < props.userSiteTimes.length; index++) {
        const userSiteTimeEl = props.userSiteTimes[index];
        if (userSiteTimeEl._id === lesson.siteTime_id) {
          console.log(userSiteTimeEl._id);
          console.log(lesson.siteTime_id);
          showLesson = true;
          console.log('ITS TRUE!');
        }
      }
      if (showLesson) {
        return (
          <LessonItem key={lesson._id}>
            <LessonDetailsContainer>
              <h1>{lesson.title ? lesson.title : ''}</h1>
              <div>SUMMARY: {lesson.summary ? lesson.summary : ''}</div>
              <div>WEEK: {lesson.week ? lesson.week : ''}</div>
            </LessonDetailsContainer>

            <button
              style={{
                color: 'black',
                backgroundColor: '#5CCFB4',
                textDecoration: 'none',
                border: 'solid #333 3px',
                borderRadius: '6px',
                boxShadow: '4px 4px 0px #333',
                padding: '10px',
                margin: '10px'
              }}
              onClick={() => props.handleLessonView(lesson._id)}
            >
              VIEW LESSON
            </button>
            {user.role === 'EXEC' || user.role === 'SITE LEADER' ? (
              <button
                style={{
                  color: 'black',
                  backgroundColor: '#63CBFB',
                  textDecoration: 'none',
                  border: 'solid #333 3px',
                  borderRadius: '6px',
                  boxShadow: '4px 4px 0px #333',
                  padding: '10px',
                  margin: '10px'
                }}
                onClick={() => props.handleEditLesson(lesson._id)}
              >
                EDIT LESSON
              </button>
            ) : (
              ''
            )}
            {user.role === 'EXEC' || user.role === 'SITE LEADER' ? (
              <button
                style={{
                  color: 'black',
                  backgroundColor: '#EE7E80',
                  textDecoration: 'none',
                  border: 'solid #333 3px',
                  borderRadius: '6px',
                  boxShadow: '4px 4px 0px #333',
                  padding: '10px',
                  margin: '10px'
                }}
                onClick={() => props.handleDeleteLesson(lesson._id)}
              >
                DELETE LESSON
              </button>
            ) : (
              ''
            )}
          </LessonItem>
        );
      } else {
        return null;
      }
    });
    return (
      <ListContainer>
        <h1>Lesson Plans</h1>
        {lessonPlans}
      </ListContainer>
    );
  } else {
    return <div>currently no lessons</div>;
  }
};

export default withRouter(LessonList);
