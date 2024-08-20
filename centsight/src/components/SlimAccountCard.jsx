import { Card, CardBody, CardHeader } from '@nextui-org/react';

const SlimAccountCard = ({ name, type = '', balance, onPress }) => {
  const formattedBalance =
    balance < 0
      ? `-$${Math.abs(balance).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : `$${balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  return (
    <Card
      isPressable
      className="hover:bg-neutral-700 hover:cursor-pointer my-2 w-full"
      onPress={onPress}
    >
      <CardBody>
        <div className="flex justify-between items-center gap-4">
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
