import React from 'react';

import { Tabs, Tab, TabPanel, TabList } from 'react-tabs';

import Inbox from 'Inbox';
import Friends from 'Friends';
import Profile from 'Profile';

export default ({ profile, inbox, friends, friendRequests }) => {
  return (
    <Tabs className="panel" selectedIndex={1}>
      <TabList>
        <Tab>Inbox</Tab>
        <Tab>Friends</Tab>
        <Tab>Profile</Tab>
      </TabList>
      <TabPanel>
        <Inbox inbox={inbox} />
      </TabPanel>
      <TabPanel>
        <Friends friends={friends} friendRequests={friendRequests} />
      </TabPanel>
      <TabPanel>
        <Profile {...profile} />
      </TabPanel>
    </Tabs>
  );
};
