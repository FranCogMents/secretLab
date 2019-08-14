import React from 'react';
import { getUser } from '../../utils/utils';

const SitesList = props => {
  //const user = getUser();
  const siteTimes = props.sites.map(site => {
    console.log(site);
    return (
      <div key={site._id}>
        <h1>{site.schoolName}</h1>
        <div>this is a site</div>
        <div>this is a site</div>
        <button onClick={() => props.handleDeleteSite(site._id)}>DELETE</button>
        <button onClick={() => props.handleSiteView(site._id)}>
          TAKE ME TO THE
        </button>
        <button onClick={() => props.handleJoinSite(site._id, site._id)}>
          JOIN SITE
        </button>
      </div>
    );
  });
  return <div>SiteTimes{siteTimes}</div>;
};

export default SitesList;