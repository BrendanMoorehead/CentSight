/* eslint-disable react/prop-types */
import { Card } from "@heroui/card";
import { formatAsCurrency } from '../../../utils/currencyUtils';
/**
 * ValueCard Component
 *
 * Card that displays a large value, with small text below.
 *
 * Props:
 *  - value (number): The value to be displayed.
 *  - text (string): The text to be displayed.
 *  - format (string): How to format the value.
 */
const ValueCard = ({ value, text, format }) => {
  //TODO: Make sizing responsive.
  return (
    <Card className="p-6 flex gap-2">
      <p className="text-6xl font-semibold">
        {format === 'currency' ? formatAsCurrency(value) : value}
      </p>
      <p className="text-xl font-light">{text}</p>
    </Card>
  );
};

export default ValueCard;
