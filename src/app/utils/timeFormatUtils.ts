import dayjs from 'dayjs';

/**
 * Utility function to format epoch time to human-readable format
 * 
 * @param {number} milisecond - The epoch time in milliseconds.
 * @param {string} format - The desired format for the output date string (default is 'DD-MMM-YYYY HH:mm:ss').
 * @returns {string} - The formatted date string.
 */
const getFormatedTime = (milisecond, format = 'DD-MMM-YYYY HH:mm:ss') => {
  if (!milisecond) {
    return '';
  }
  
  return dayjs.unix(milisecond / 1000).format(format);
};

export  { getFormatedTime };
