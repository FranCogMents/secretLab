import React, { Component } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

class CreateSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: '',
      siteTimes: [],
      title: '',
      summary: '',
      content: '',
      media: '',
      week: '',
      siteTime: '',
      exitTicket: '',
      siteObj: '',
      site_id: '',
      day: '',
      startTime: '',
      endTime: '',
      siteNumber: ''
    };

    this.change = this.change.bind(this);
    this.handleSiteTimeChange = this.handleSiteTimeChange.bind(this);

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/sites/${this.props.match.params.id}`)
      .then(res => {
        // storing token from server
        this.setState({
          siteObj: res.data,
          site_id: res.data._id,
          day: res.data.siteTimes[0].day,
          startTime: res.data.siteTimes[0].startTime,
          endTime: res.data.siteTimes[0].endTime,
          siteNumber: res.data.siteTimes[0].siteNumber,
          siteTimes: res.data.siteTimes
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // takes an event and creates a key,value pair
  change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSiteTimeChange(event) {
    console.log(event.target.value);
    const newTimeList = this.state.siteTimes.filter(
      site => parseInt(site.siteNumber) === parseInt(event.target.value)
    );
    const newTime = newTimeList[0];
    console.log(newTime);
    console.log('???');
    this.setState({
      day: newTime.day,
      startTime: newTime.startTime,
      endTime: newTime.endTime,
      siteNumber: newTime.siteNumber
    });
  }
  submit(event) {
    event.preventDefault();
    console.log('LETS SEND THIS');
    console.log(this.state.day);
    console.log(this.state.startTime);
    console.log(this.state.endTime);
    console.log(this.state.siteNumber);
    axios
      .post('http://localhost:5000/api/lessons', {
        title: this.state.title,
        site_id: this.state.site_id,
        siteTime: [
          {
            day: this.state.day,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            siteNumber: this.state.siteNumber
          }
        ]
      })
      .then(res => {
        // storing token from server
        this.props.history.push(`/sites/${this.props.match.params.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="signUpBox">
          <div className="title">
            <div className="anova">CREATE A</div>
            <div className="labs">LESSON</div>
          </div>
          <form onSubmit={this.submit}>
            <div>
              <label htmlFor="title">
                Lesson Title
                <input
                  id="title"
                  type="text"
                  name="title"
                  onChange={this.change}
                  value={this.state.title}
                />
              </label>
            </div>
            <div>
              current day selected
              <label>
                Day
                <select
                  id="siteTime"
                  name="siteTime"
                  onChange={this.handleSiteTimeChange}
                >
                  {this.state.siteObj
                    ? this.state.siteObj.siteTimes.map(siteTime => (
                        <option key={siteTime._id} value={siteTime.siteNumber}>
                          {`${siteTime.siteNumber} ${siteTime.startTime} ${siteTime.day}`}
                        </option>
                      ))
                    : ''}
                </select>
              </label>
            </div>
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default CreateSite;