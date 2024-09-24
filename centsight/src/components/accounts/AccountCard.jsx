/* eslint-disable react/prop-types */
import { Card, CardBody } from '@nextui-org/react';

/**
 * AccountCard Component
 *
 * Slim card showing account name, type, and balance.
 *
 * Props:
 *  - name (string): The name of the account.
 *  - type (string): The type of the account.
 *  - balance (string): The account balance.
 *  - onPress (function): The function executed when the card is clicked.
 */
const AccountCard = ({ name = null, type = null, balance = null, onPress }) => {
  //Return nothing if name, type, or balance do not exist.
  if (!name || !type || !balance) return null;
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
