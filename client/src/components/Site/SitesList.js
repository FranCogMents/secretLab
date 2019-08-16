import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 100px;
`;

const SiteItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  width: 200px;
  border: solid #333 3px;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #333;
`;

const SitesList = props => {
  const user = JSON.parse(localStorage.getItem('anovaUser'));
  //const user = getUser();
  const siteTimes = props.sites.map(site => {
    console.log(site);
    return (
      <SiteItem key={site._id}>
        <h1>{site.schoolName}</h1>
        <div>this is a site</div>
        <div>this is a site</div>
        <button onClick={() => props.handleDeleteSite(site._id)}>
          DELETE SITE
        </button>
        <button onClick={() => props.handleSiteView(site._id)}>
          VIEW SITE
        </button>
        <button onClick={() => props.handleJoinSite(site._id, user._id)}>
          JOIN SITE
        </button>
      </SiteItem>
    );
  });
  return <ListContainer>SiteTimes{siteTimes}</ListContainer>;
};

export default SitesList;
