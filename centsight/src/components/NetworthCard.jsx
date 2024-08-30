import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody } from '@nextui-org/react';

const NetworthCard = ({ accounts }) => {
  const networth = accounts?.reduce(
    (acc, account) => acc + Number(account.balance),
    0
  );
  const formattedNetworth = networth?.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <Card className="flex-grow">
      <CardBody className="p-6 flex justify-end">
        <p className="text-gray-300 text-2xl font-headline ">
          {formattedNetworth}
        </p>
        <p className="text-gray-400 text-lg font-headline font-extralight">
          Networth
        </p>
      </CardBody>
    </Card>
  );
};

export default NetworthCard;
