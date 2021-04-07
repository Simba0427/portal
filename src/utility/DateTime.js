// import { DateTime } from 'luxon';

// export const onConvertDateString = (date) => {
//     return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)
// }

export const onConvertDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }