import {
  getLocalTimeZone,
  today,
  parseDate,
  CalendarDate,
} from '@internationalized/date';

export const getTodayCalendarDate = today(getLocalTimeZone());

export const convertDashedDateToCalendarDate = (dateString) => {
  if (!dateString) throw new Error("Invalid input: dateString doesn't exist");
  else if (typeof dateString !== 'string')
    throw new Error('Invalid type: dateString is not a string');
  else if (dateString.split('-').length - 1 !== 2)
    throw new Error('Invalid format: dateString is not of the correct format');

  const [year, month, day] = dateString.split('-').map(Number);
  return new CalendarDate(year, month, day);
};

export const convertCalendarDateToDashedDateString = (calendarDate) => {
  if (!calendarDate)
    throw new Error("Invalid input: calendarDate doesn't exist");
  else if (typeof calendarDate !== 'object')
    throw new Error('Invalid type: calendarDate is not an object');
  else if (Object.keys(calendarDate).length === 0)
    throw new Error('Invalid input: calendarDate is empty');
  return `${calendarDate.year}-${calendarDate.month}-${calendarDate.day}`;
};
