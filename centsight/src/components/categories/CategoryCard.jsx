/* eslint-disable react/prop-types */
import { Card, CardBody } from "@heroui/react";
const selected = 'bg-neutral-600';
/**
 * CategoryCard Component
 *
 * Card to display category details.
 *
 * Props:
 *  - name (string): Name of the category.
 *  - subcategoryCount (number): The number of subcategories.
 *  - onPress (function): The function to run when the card is clicked.
 *  - isSelected (boolean): Boolean representing if the card is actively selected.
 */
const CategoryCard = ({
  name = null,
  subcategoryCount = null,
  onPress,
  isSelected,
}) => {
  // Do not display a category if it doesn't have details.
  if (!name || subcategoryCount === null) return null;
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
