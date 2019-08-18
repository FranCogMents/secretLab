import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

const SiteTimesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-right: 24px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
`;

const SiteTimeItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  border-left: solid #333 5px;
  padding-left: 10px;
`;

const SiteTimeContent = styled.div`
  margin: 10px;
`;
const SiteTimeField = styled.span`
  font-weight: bold;
  color: #333;
  margin-right: 3px;
`;

const EmptyStateMessage = styled.div`
  font-weight: bold;
  color: #333;
  margin-right: 3px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
  padding: 20px;
`;

const SiteTimeList = props => {
  if (props.sites.length !== 0) {
    const siteTimes = props.sites.map(site => {
      console.log(site);
      return (
        <SiteTimeItem key={Math.random()}>
          <SiteTimeContent>
            <SiteTimeField>site number:</SiteTimeField> {site.siteNumber}
          </SiteTimeContent>
          <SiteTimeContent>
            <SiteTimeField>site day:</SiteTimeField> {site.day}
          </SiteTimeContent>
          <SiteTimeContent>
            <SiteTimeField>start time:</SiteTimeField>
            {moment.tz(site.startTime, 'America/Los_Angeles').format('h:mm a')}
          </SiteTimeContent>
          <SiteTimeContent>
            <SiteTimeField>end time:</SiteTimeField>
            {moment.tz(site.endTime, 'America/Los_Angeles').format('h:mm a')}
          </SiteTimeContent>
          <SiteTimeContent>
            <button onClick={() => props.handleDeleteSiteTime(site.siteNumber)}>
              DELETE
            </button>
          </SiteTimeContent>
        </SiteTimeItem>
      );
    });
    return <SiteTimesContainer>{siteTimes}</SiteTimesContainer>;
  } else {
    return (
      <EmptyStateMessage>
        You currently haven't added any time slots to this site - start by
        filing out the slot time fields and then clicking "ADD TIME SLOT"
      </EmptyStateMessage>
    );
  }
};

export default SiteTimeList;
