import React from 'react';

import { Tabs, Tab, TabPanel, TabList } from 'react-tabs';

import Inbox from 'Inbox';
import Friends from 'Friends';

export default ({ name, avatar, inbox, friends }) => {
  return (
    <Tabs className="panel">
      <TabList>
        <Tab>Inbox</Tab>
        <Tab>Friends</Tab>
      </TabList>
      <TabPanel>
        <Inbox inbox={inbox} />
      </TabPanel>
      <TabPanel>
        <Friends friends={friends} />
      </TabPanel>
    </Tabs>
  );
};
