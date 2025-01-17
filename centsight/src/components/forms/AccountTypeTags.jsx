/* eslint-disable react/prop-types */
import { Tabs, Tab } from "@heroui/tabs";

const AccountTypeTags = ({ onChange, type = 'chequing' }) => {
  return (
    <div>
      <Tabs
        selectedKey={type}
        onSelectionChange={onChange}
        fullWidth
        aria-label="Options"
        className="flex"
      >
        <Tab key="chequing" title="Chequing"></Tab>
        <Tab key="credit" title="Credit"></Tab>
        <Tab key="cash" title="Cash"></Tab>
      </Tabs>
    </div>
  );
};

export default AccountTypeTags;
