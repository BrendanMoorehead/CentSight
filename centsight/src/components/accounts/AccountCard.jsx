import { Card, CardBody, CardHeader } from '@nextui-org/react';

const AccountCard = ({ name, type = '', balance, onClick }) => {
  return (
    <Card
      className="hover:bg-neutral-700 hover:cursor-pointer my-4"
      onClick={onClick}
    >
      <CardBody>
        <p className="text-gray-300 text-lg font-headline">{name}</p>
        <p className="text-4xl font-semibold font-body text-gray-300 pt-4">
          {'$' + balance.toFixed(2)}
        </p>

        <p className="text-gray-400 text-md font-headline font-extralight">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
      </CardBody>
    </Card>
  );
};

export default AccountCard;
