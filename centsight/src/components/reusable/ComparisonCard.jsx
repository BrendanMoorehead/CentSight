/* eslint-disable react/prop-types */
import { Card, Tabs, Tab } from "@heroui/react";

/**
 * ComparisonCard Component
 *
 * Card to visualize the comparison between two number values.
 *
 * Props:
 *  - text (string): The descriptor of the comparison (spending, count...).
 *  - currentValue (number): The current value.
 *  - comparisonValue (number): The number that the currentValue is compared with.
 *  - period (string): A string representation of the period the comparison is made in.
 * - formate (string): The format in which the number is to be displayed
 */
const ComparisonCard = ({
  text,
  currentValue,
  comparisonValue,
  period = '',
  format,
}) => {
  // TODO: Build out the functionality.
  return (
    <Card className="p-4 w-96">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xl">{text}</p>
          {/* Value that is the primary focus of the card */}
          <p className="text-4xl">{currentValue}</p>
          {/* A string for the period of the value */}
          <p>{period}</p>
          <p className="text-xl">Up 20% from average</p>
        </div>
        <Tabs aria-label="Options" isVertical={true}>
          <Tab key="photos" title="$" />
          <Tab key="music" title="%" />
        </Tabs>
      </div>
    </Card>
  );
};

export default ComparisonCard;
