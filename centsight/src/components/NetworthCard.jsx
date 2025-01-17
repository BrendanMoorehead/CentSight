import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody } from "@heroui/react";
import CountUp from 'react-countup';

const NetworthCard = ({ accounts }) => {
  // Calculate the current net worth
  const networth = accounts?.reduce(
    (acc, account) => acc + Number(account.balance),
    0
  );

  const [prevNetworth, setPrevNetworth] = useState(networth); // Initialize previous net worth
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip on first render
    } else {
      // Update previous net worth only if the current net worth has changed
      if (networth !== prevNetworth) {
        setPrevNetworth(prevNetworth); // Retain previous value for CountUp animation
      }
    }
  }, [accounts, networth]); // Recalculate when accounts or networth change

  // Trigger CountUp on every render where networth is different from prevNetworth
  useEffect(() => {
    if (networth !== prevNetworth) {
      setPrevNetworth(prevNetworth); // Store the current net worth for next render
    }
  }, [networth]);

  return (
    <Card className="flex-grow">
      <CardBody className="p-6 flex justify-end">
        <p className="text-gray-300 text-2xl font-headline ">
          <CountUp 
            start={prevNetworth} 
            end={networth} 
            decimals={2}
            duration={1.5} // Adjust duration as needed
            separator=","
            prefix="$"
            onEnd={() => console.log('Ended! 👏')}
            onStart={() => console.log('Started! 💨')}
          />
        </p>
        <p className="text-gray-400 text-lg font-headline font-extralight">
          Networth
        </p>
      </CardBody>
    </Card>
  );
};

export default NetworthCard;
