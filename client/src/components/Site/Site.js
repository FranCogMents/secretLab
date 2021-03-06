import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import LessonList from '../Lesson/LessonList';
import JoinSiteTimeList from '../Site/JoinSiteTimeList';
import { getUser, getJWT } from '../../utils/utils';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const SchoolContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SchoolContainerItems = styled.div`
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const SchoolName = styled.div`
  font-size: 2em;
  margin: 10px;
`;
const SchoolItem = styled.div`
  margin: 10px;
`;

class Site extends Component {
  constructor(props) {
    super(props);
    this.onCreateLesson = this.onCreateLesson.bind(this);
    this.handleLessonView = this.handleLessonView.bind(this);
    this.handleRosterView = this.handleRosterView.bind(this);
    this.handleJoinSiteTime = this.handleJoinSiteTime.bind(this);
    this.handleLeaveSitetime = this.handleLeaveSitetime.bind(this);
    this.handleDeleteLesson = this.handleDeleteLesson.bind(this);
    this.handleEditLesson = this.handleEditLesson.bind(this);
    this.state = {
      lessons: [],
      allSiteTimes: [],
      userSitetimes: [],
      schoolName: '',
      schoolAddress: '',
      style: '',
      level: '',
      classroom: ''
    };
  }
  async componentDidMount() {
    const user = getUser();
    const token = getJWT();
    try {
      //get lesosns by SITE ID
      const resUserSiteTimes = await axios.get(
        `/api/users/sitetimes/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const resLessons = await axios.get(
        `/api/lessons/site/${this.props.match.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const resSiteTimes = await axios.get(
        `/api/sites/${this.props.match.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      this.setState({
        userSiteTimes: resUserSiteTimes.data.siteTimes,
        lessons: resLessons.data,
        allSiteTimes: resSiteTimes.data.siteTimes,
        schoolName: resSiteTimes.data ? resSiteTimes.data.schoolName : '',
        schoolAddress: resSiteTimes.data ? resSiteTimes.data.schoolAddress : '',
        style: resSiteTimes.data ? resSiteTimes.data.style : '',
        level: resSiteTimes.data ? resSiteTimes.data.level : '',
        classroom: resSiteTimes.data ? resSiteTimes.data.classroom : '',
        semester: resSiteTimes.data ? resSiteTimes.data.semester : '',
        year: resSiteTimes.data ? resSiteTimes.data.year : ''
      });
    } catch (e) {
      console.log(e);
    }
  }
  handleRosterView() {
    this.props.history.push(`/sites/${this.props.match.params.id}/roster`);
  }
  onCreateLesson() {
    this.props.history.push(
      `/sites/${this.props.match.params.id}/createlesson`
    );
  }
  handleLessonView(lessonId) {
    this.props.history.push(`/lessons/${lessonId}`);
  }
  handleEditLesson(lessonId) {
    this.props.history.push(`/edit/lessons/${lessonId}`);
  }
  async handleDeleteLesson(lessonId) {
    const token = getJWT();
    try {
      await axios.delete(`/api/lessons/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resLessons = await axios.get(
        `/api/lessons/site/${this.props.match.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      this.setState({ lessons: resLessons.data });
    } catch (e) {
      console.log(e);
    }
  }
  handleJoinSiteTime(userId, siteTimeId, siteId) {
    const token = getJWT();
    axios
      .put(
        '/api/users/sitetimes/join',
        {
          userId: userId,
          siteTimeId: siteTimeId,
          siteId: siteId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(async res => {
        // need to update lessons
        const user = getUser();
        const token = getJWT();
        const resUserSiteTimes = await axios.get(
          `/api/users/sitetimes/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const resLessons = await axios.get('/api/lessons', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const resSiteTimes = await axios.get(
          `/api/sitetimes/site/${this.props.match.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.setState({
          userSiteTimes: resUserSiteTimes.data.siteTimes,
          lessons: resLessons.data,
          allSiteTimes: resSiteTimes.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async handleLeaveSitetime(userId, siteTimeId) {
    const token = getJWT();
    try {
      await axios.put(
        '/api/users/sitetimes/leave',
        {
          userId: userId,
          siteTimeId: siteTimeId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const user = getUser();
      const resUserSiteTimes = await axios.get(
        `/api/users/sitetimes/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const resLessons = await axios.get('/api/lessons', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resSiteTimes = await axios.get(
        `/api/sitetimes/site/${this.props.match.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      this.setState({
        userSiteTimes: resUserSiteTimes.data.siteTimes,
        lessons: resLessons.data,
        allSiteTimes: resSiteTimes.data
      });
    } catch (e) {
      console.log(e);
    }

    //need to refresh state
  }

  render() {
    const user = getUser();
    return (
      <Container>
        <SchoolContainer>
          <SchoolContainerItems>
            <SchoolName>
              {this.state.schoolName ? this.state.schoolName : ''}
            </SchoolName>
          </SchoolContainerItems>
          <SchoolContainerItems>
            <SchoolItem>
              {this.state.schoolAddress ? this.state.schoolAddress : ''}
            </SchoolItem>
          </SchoolContainerItems>
          <SchoolContainerItems>
            <SchoolItem>
              {this.state.style ? this.state.style : ''} Site
            </SchoolItem>
          </SchoolContainerItems>
          <SchoolContainerItems>
            <SchoolItem>{this.state.level ? this.state.level : ''}</SchoolItem>
          </SchoolContainerItems>
          <SchoolContainerItems>
            <SchoolItem>
              Room {this.state.classroom ? this.state.classroom : ''}
            </SchoolItem>
          </SchoolContainerItems>
        </SchoolContainer>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <button
            style={{
              color: 'black',
              backgroundColor: '#E9CDDB',
              textDecoration: 'none',
              border: 'solid #333 3px',
              borderRadius: '6px',
              boxShadow: '4px 4px 0px #333',
              padding: '10px',
              margin: '10px'
            }}
            onClick={this.handleRosterView}
          >
            SITE ROSTER
          </button>
          {user.role === 'EXEC' || user.role === 'SITE LEADER' ? (
            <button
              style={{
                color: 'black',
                backgroundColor: '#48D7C6',
                textDecoration: 'none',
                border: 'solid #333 3px',
                borderRadius: '6px',
                boxShadow: '4px 4px 0px #333',
                padding: '10px',
                margin: '10px'
              }}
              onClick={this.onCreateLesson}
            >
              CREATE A LESSON
            </button>
          ) : (
            ''
          )}
        </div>
        <JoinSiteTimeList
          userSiteTimes={this.state.userSiteTimes}
          allSiteTimes={this.state.allSiteTimes}
          handleJoinSiteTime={this.handleJoinSiteTime}
          handleLeaveSiteTime={this.handleLeaveSitetime}
        />

        <LessonList
          lessons={this.state.lessons}
          userSiteTimes={this.state.userSiteTimes}
          handleLessonView={this.handleLessonView}
          handleDeleteLesson={this.handleDeleteLesson}
          handleEditLesson={this.handleEditLesson}
        />
      </Container>
    );
  }
}

export default withRouter(Site);
