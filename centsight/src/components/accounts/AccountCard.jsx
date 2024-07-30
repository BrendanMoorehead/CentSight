import { Card, CardBody, CardHeader } from '@nextui-org/react';

const AccountCard = ({ name, type, balance }) => {
  return (
    <Card className="hover:bg-neutral-700 hover:cursor-pointer">
      <CardBody>
        <p className="font-bold">{name}</p>
      </CardBody>
    </Card>
  );
};

export default AccountCard;
