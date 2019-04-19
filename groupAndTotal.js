import _ from "lodash";
import { format } from "date-fns";

/**
 *
 * @param {Array} obj large array of objects to organize and total
 * @param {PropertyKey} toGroupBy key to group object by
 * @param {PropertyKey} toTotal key to add together
 * @returns {Array} returns array of objects
 * [{
 *  week:date,
 *  total:number
 * }]
 */

function groupAndTotal(obj, toGroupBy, toTotal) {
  const getGroup = _.groupBy(obj, data => {
    return data[toGroupBy];
  });
  const totalByWeek = Object.keys(getGroup) //puts all keys of object into an array
    .map(key => {
      const item = getGroup[key]; //creates an array of each key's value
      const week = format(new Date(item[0][toGroupBy] * 1000), "MM/DD/YYYY"); //formats date (more formatting is needed)
      const addition = item.map(item => item[toTotal]); //creates an array of just one peice of the object
      const total = addition.reduce((total, num) => total + num, 0); // totals the peices
      return { week, total };
    });

  return totalByWeek;
}

export default groupAndTotal;
