import React from 'react';
import { Tabs, Tab } from '@nextui-org/tabs';
const CategoryTabs = () => {
  return (
    <Tabs fullWidth aria-label="Options" className="flex">
      <Tab key="week" title="This Week"></Tab>
      <Tab key="month" title="This Month"></Tab>
      <Tab key="year" title="This Year"></Tab>
      <Tab key="average" title="Average"></Tab>
    </Tabs>
  );
};

export default CategoryTabs;
