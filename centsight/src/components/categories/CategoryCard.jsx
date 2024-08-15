import { Card, CardBody } from '@nextui-org/react';

const selected = 'bg-neutral-600';

const CategoryCard = ({ name, subcategoryCount, onPress, isSelected }) => {
  return (
    <Card
      isPressable
      onPress={onPress}
      className={`hover:bg-neutral-700 hover:cursor-pointer ${
        isSelected ? selected : ''
      }`}
    >
      <CardBody>
        <p className="font-bold">{name}</p>
        <p>{subcategoryCount + ' subcategories'}</p>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
