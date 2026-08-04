import { 
  format, 
  parse, 
  parseISO, 
  isValid, 
  isAfter, 
  isBefore, 
  isEqual, 
  isToday, 
  isTomorrow, 
  isYesterday,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  addDays,
  addHours,
  addMinutes,
  addWeeks,
  addMonths,
  addYears,
  subDays,
  subHours,
  subMinutes,
  subWeeks,
  subMonths,
  subYears,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  getDaysInMonth,
  getDay,
  getMonth,
  getYear,
  getHours,
  getMinutes,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  isWithinInterval,
  areIntervalsOverlapping,
  max,
  min,
} from 'date-fns';

/**
 * Parse date safely
 */
export const parseDate = (date, formatStr = 'yyyy-MM-dd') => {
  if (!date) return null;
  if (date instanceof Date && isValid(date)) return date;
  if (typeof date === 'string') {
    const parsed = parseISO(date);
    if (isValid(parsed)) return parsed;
    const parsedFormat = parse(date, formatStr, new Date());
    if (isValid(parsedFormat)) return parsedFormat;
  }
  return null;
};

/**
 * Format date safely
 */
export const safeFormat = (date, formatStr = 'MMM dd, yyyy') => {
  const parsed = parseDate(date);
  if (!parsed) return '';
  return format(parsed, formatStr);
};

/**
 * Get date range
 */
export const getDateRange = (startDate, endDate) => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  if (!start || !end) return [];
  return eachDayOfInterval({ start, end });
};

/**
 * Get week range
 */
export const getWeekRange = (date) => {
  const parsed = parseDate(date);
  if (!parsed) return { start: null, end: null };
  return {
    start: startOfWeek(parsed),
    end: endOfWeek(parsed),
  };
};

/**
 * Get month range
 */
export const getMonthRange = (date) => {
  const parsed = parseDate(date);
  if (!parsed) return { start: null, end: null };
  return {
    start: startOfMonth(parsed),
    end: endOfMonth(parsed),
  };
};

/**
 * Get year range
 */
export const getYearRange = (date) => {
  const parsed = parseDate(date);
  if (!parsed) return { start: null, end: null };
  return {
    start: startOfYear(parsed),
    end: endOfYear(parsed),
  };
};

/**
 * Check if date is in range
 */
export const isInDateRange = (date, startDate, endDate) => {
  const d = parseDate(date);
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  if (!d || !start || !end) return false;
  return isWithinInterval(d, { start, end });
};

/**
 * Get days difference
 */
export const getDaysDiff = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return null;
  return Math.abs(differenceInDays(d1, d2));
};

/**
 * Get hours difference
 */
export const getHoursDiff = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return null;
  return Math.abs(differenceInHours(d1, d2));
};

/**
 * Get minutes difference
 */
export const getMinutesDiff = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return null;
  return Math.abs(differenceInMinutes(d1, d2));
};

/**
 * Get seconds difference
 */
export const getSecondsDiff = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return null;
  return Math.abs(differenceInSeconds(d1, d2));
};

/**
 * Check if date is today
 */
export const isDateToday = (date) => {
  const d = parseDate(date);
  if (!d) return false;
  return isToday(d);
};

/**
 * Check if date is tomorrow
 */
export const isDateTomorrow = (date) => {
  const d = parseDate(date);
  if (!d) return false;
  return isTomorrow(d);
};

/**
 * Check if date is yesterday
 */
export const isDateYesterday = (date) => {
  const d = parseDate(date);
  if (!d) return false;
  return isYesterday(d);
};

/**
 * Check if dates are same day
 */
export const isSameDayDate = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return false;
  return isSameDay(d1, d2);
};

/**
 * Check if dates are same week
 */
export const isSameWeekDate = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return false;
  return isSameWeek(d1, d2);
};

/**
 * Check if dates are same month
 */
export const isSameMonthDate = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return false;
  return isSameMonth(d1, d2);
};

/**
 * Check if dates are same year
 */
export const isSameYearDate = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return false;
  return isSameYear(d1, d2);
};

/**
 * Add days to date
 */
export const addDaysToDate = (date, days) => {
  const d = parseDate(date);
  if (!d) return null;
  return addDays(d, days);
};

/**
 * Add hours to date
 */
export const addHoursToDate = (date, hours) => {
  const d = parseDate(date);
  if (!d) return null;
  return addHours(d, hours);
};

/**
 * Add minutes to date
 */
export const addMinutesToDate = (date, minutes) => {
  const d = parseDate(date);
  if (!d) return null;
  return addMinutes(d, minutes);
};

/**
 * Add weeks to date
 */
export const addWeeksToDate = (date, weeks) => {
  const d = parseDate(date);
  if (!d) return null;
  return addWeeks(d, weeks);
};

/**
 * Add months to date
 */
export const addMonthsToDate = (date, months) => {
  const d = parseDate(date);
  if (!d) return null;
  return addMonths(d, months);
};

/**
 * Add years to date
 */
export const addYearsToDate = (date, years) => {
  const d = parseDate(date);
  if (!d) return null;
  return addYears(d, years);
};

/**
 * Subtract days from date
 */
export const subDaysFromDate = (date, days) => {
  const d = parseDate(date);
  if (!d) return null;
  return subDays(d, days);
};

/**
 * Subtract hours from date
 */
export const subHoursFromDate = (date, hours) => {
  const d = parseDate(date);
  if (!d) return null;
  return subHours(d, hours);
};

/**
 * Subtract minutes from date
 */
export const subMinutesFromDate = (date, minutes) => {
  const d = parseDate(date);
  if (!d) return null;
  return subMinutes(d, minutes);
};

/**
 * Get start of day
 */
export const getStartOfDay = (date) => {
  const d = parseDate(date);
  if (!d) return null;
  return startOfDay(d);
};

/**
 * Get end of day
 */
export const getEndOfDay = (date) => {
  const d = parseDate(date);
  if (!d) return null;
  return endOfDay(d);
};

/**
 * Get days in month
 */
export const getDaysInMonthDate = (date) => {
  const d = parseDate(date);
  if (!d) return null;
  return getDaysInMonth(d);
};

/**
 * Get week number
 */
export const getWeekNumber = (date) => {
  const d = parseDate(date);
  if (!d) return null;
  return getDay(d);
};

/**
 * Get month number
 */
export const getMonthNumber = (date) => {
  const d = parseDate(date);
  if (!d) return null;
  return getMonth(d) + 1;
};

/**
 * Get year number
 */
export const getYearNumber = (date) => {
  const d = parseDate(date);
  if (!d) return null;
  return getYear(d);
};

/**
 * Get hour
 */
export const getHour = (date) => {
  const d = parseDate(date);
  if (!d) return null;
  return getHours(d);
};

/**
 * Get minute
 */
export const getMinute = (date) => {
  const d = parseDate(date);
  if (!d) return null;
  return getMinutes(d);
};

/**
 * Get second
 */
export const getSecond = (date) => {
  const d = parseDate(date);
  if (!d) return null;
  return getSeconds(d);
};

/**
 * Check if date is valid
 */
export const isValidDate = (date) => {
  const d = parseDate(date);
  return d !== null && isValid(d);
};

/**
 * Get age from date of birth
 */
export const getAge = (dateOfBirth) => {
  const dob = parseDate(dateOfBirth);
  if (!dob) return null;
  const today = new Date();
  const age = differenceInYears(today, dob);
  if (age < 0) return null;
  return age;
};

/**
 * Difference in years
 */
export const getYearsDiff = (date1, date2) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return null;
  const diff = differenceInYears(d1, d2);
  return Math.abs(diff);
};

export default {
  parseDate,
  safeFormat,
  getDateRange,
  getWeekRange,
  getMonthRange,
  getYearRange,
  isInDateRange,
  getDaysDiff,
  getHoursDiff,
  getMinutesDiff,
  getSecondsDiff,
  isDateToday,
  isDateTomorrow,
  isDateYesterday,
  isSameDayDate,
  isSameWeekDate,
  isSameMonthDate,
  isSameYearDate,
  addDaysToDate,
  addHoursToDate,
  addMinutesToDate,
  addWeeksToDate,
  addMonthsToDate,
  addYearsToDate,
  subDaysFromDate,
  subHoursFromDate,
  subMinutesFromDate,
  getStartOfDay,
  getEndOfDay,
  getDaysInMonthDate,
  getWeekNumber,
  getMonthNumber,
  getYearNumber,
  getHour,
  getMinute,
  getSecond,
  isValidDate,
  getAge,
  getYearsDiff,
};