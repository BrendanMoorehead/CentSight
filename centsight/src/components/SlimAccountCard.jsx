import { Card, CardBody, CardHeader } from '@nextui-org/react';

const SlimAccountCard = ({ name, type = '', balance, onClick }) => {
  const formattedBalance =
    balance < 0
      ? `-$${Math.abs(balance).toFixed(2)}`
      : `$${balance.toFixed(2)}`;

  return (
    <Card
      className="hover:bg-neutral-700 hover:cursor-pointer my-2"
      onClick={onClick}
    >
      <CardBody>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-300 text-md font-headline">{name}</p>
            <p className="text-gray-400 text-sm font-headline font-extralight">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          </div>
          <p className="text-md font-body text-gray-300 align-center">
            {formattedBalance}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default SlimAccountCard;
