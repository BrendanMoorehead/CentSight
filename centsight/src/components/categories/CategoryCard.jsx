import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Skeleton } from '@nextui-org/skeleton';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const selected =
  'rounded-lg bg-neutral-800 p-6 flex justify-between align-center w-80';

const CategoryCard = ({ name, subcategoryCount }) => {
  return (
    <Card className="hover:bg-neutral-700 hover:cursor-pointer">
      <CardBody>
        <p className="font-bold">{name}</p>
        <p>{subcategoryCount + ' subcategories'}</p>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
