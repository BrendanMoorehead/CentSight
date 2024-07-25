import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
const TransactionCountCard = ({ title, number }) => {
  return (
    <Card className="p-6 flex gap-2">
      <p className="text-6xl font-semibold">{number}</p>
      <p className="text-xl font-light">{title}</p>
    </Card>
  );
};

export default TransactionCountCard;
