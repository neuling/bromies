import React from 'react';

import { Tabs, Tab, TabPanel, TabList } from 'react-tabs';

import Inbox from 'Inbox';
import Friends from 'Friends';
import Profile from 'Profile';

export default ({ name, avatar, inbox, friends }) => {
  console.log(friends, inbox);
  return (
    <Tabs className="panel">
      <TabList>
        <Tab>Inbox</Tab>
        <Tab>Friends</Tab>
        <Tab>Profile</Tab>
      </TabList>
      <TabPanel>
        <Inbox inbox={inbox} />
      </TabPanel>
      <TabPanel>
        <Friends friends={friends} />
      </TabPanel>
      <TabPanel>
        <Profile name={name} avatar={avatar} />
      </TabPanel>
    </Tabs>
  );
};
