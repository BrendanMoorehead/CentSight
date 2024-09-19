import React from 'react'
import { Card, Tabs, Tab } from '@nextui-org/react'
//A Card to compare a value to averages or previous
const ComparisonCard = ({title, curVal, compVal, periodString = "", type}) => {
  return (
    <Card className='p-4 w-96'>
        <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
            {/* Title of the card (spending, count) */}
            <p className='text-xl'>{title}</p>
            {/* Value that is the primary focus of the card */}
            <p className='text-4xl'>{curVal}</p>
            {/* A string for the period of the value */}
            <p>{periodString}</p>
            <p className='text-xl'>Up 20% from average</p>
            </div>
        <Tabs aria-label="Options" isVertical={true}>
            <Tab key="photos" title="$"/>
            <Tab key="music" title="%" />
        </Tabs>
      </div>
    </Card>
  )
}

export default ComparisonCard