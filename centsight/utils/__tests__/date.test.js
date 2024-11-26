import {
  convertDashedDateToCalendarDate,
  getTodayCalendarDate,
  convertCalendarDateToDashedDateString,
} from '../date.jsx';
import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
import { describe, it, expect } from 'vitest';
describe('Date Utilities', () => {
  it("should return today's date in CalendarDate format", () => {
    const todayDate = new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    );
    expect(getTodayCalendarDate).toEqual(todayDate);
  });

  describe('convertDashedDateToCalendarDate', () => {
    it('should return a CalendarDate object', () => {
      const dateString = '2024-11-26';
      const calendarDateObject = convertDashedDateToCalendarDate(dateString);
      expect(calendarDateObject).toBeInstanceOf(CalendarDate);
    });
    it('should throw a doesnt exist error', () => {
      const invalidInput = null;
      expect(() => convertDashedDateToCalendarDate(invalidInput)).toThrow(
        "Invalid input: dateString doesn't exist"
      );
    });
    it('should throw a invalid type error', () => {
      const invalidInput = [1, 2, 5];
      expect(() => convertDashedDateToCalendarDate(invalidInput)).toThrow(
        'Invalid type: dateString is not a string'
      );
    });
    it('should throw a invalid format error', () => {
      const invalidInput = '2021-22-44-23';
      expect(() => convertDashedDateToCalendarDate(invalidInput)).toThrow(
        'Invalid format: dateString is not of the correct format'
      );
    });
  });
  describe('convertCalendarDateToDashedDateString', () => {
    it('should return a dashed date string', () => {
      const dateString = new CalendarDate(2024, 11, 26);
      expect(convertCalendarDateToDashedDateString(dateString)).toBe(
        '2024-11-26'
      );
    });
    it('should throw a invalid input error', () => {
      const invalidInput = null;
      expect(() => convertCalendarDateToDashedDateString(invalidInput)).toThrow(
        "Invalid input: calendarDate doesn't exist"
      );
    });
    it('should throw a invalid type error', () => {
      const invalidInput = 45;
      expect(() => convertCalendarDateToDashedDateString(invalidInput)).toThrow(
        'Invalid type: calendarDate is not an object'
      );
    });
    it('should throw a empty input error', () => {
      const invalidInput = {};
      expect(() => convertCalendarDateToDashedDateString(invalidInput)).toThrow(
        'Invalid input: calendarDate is empty'
      );
    });
  });
});
