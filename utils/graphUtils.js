import { getISOWeek, subWeeks, getMonth, subMonths } from 'date-fns';

function getStatsForLastXDays(reports, dayCount) {
  if (reports == null) return;
  let statsAtDates = {};
  let now = Date.now();
  for (let report of reports) {
    let reportDate = new Date(report.dateCreatedCli);
    if (dayCount && reportDate.getTime() < now-(86400000*dayCount)) continue; // we only care about reports in the last 7 days
    let dayIndex = Math.floor(reportDate.getTime() / 86400000);
    if (!Object.keys(statsAtDates).includes(dayIndex.toString())) {
      statsAtDates[dayIndex] = {
        perspective: 0,
        other_centred: 0,
        willing_learn: 0,
        self_assess: 0,
        count: 0,
      };
    }
    statsAtDates[dayIndex].perspective += report.perspective;
    statsAtDates[dayIndex].other_centred += report.other_centred;
    statsAtDates[dayIndex].willing_learn += report.willing_learn;
    statsAtDates[dayIndex].self_assess += report.self_assess;
    statsAtDates[dayIndex].count += 1;
  };
  let res = [];
  let dayIndex = dayCount ? Math.floor(now / 86400000)-(dayCount-1) : Object.keys(statsAtDates).map(v => parseInt(v)).sort()[0];
  for (; dayIndex <= Math.floor(now / 86400000); dayIndex++) {
    if (Object.keys(statsAtDates).includes(dayIndex.toString())) {
      res.push({
        perspective: statsAtDates[dayIndex].perspective / statsAtDates[dayIndex].count,
        other_centred: statsAtDates[dayIndex].other_centred / statsAtDates[dayIndex].count,
        willing_learn: statsAtDates[dayIndex].willing_learn / statsAtDates[dayIndex].count,
        self_assess: statsAtDates[dayIndex].self_assess / statsAtDates[dayIndex].count,
        average: (statsAtDates[dayIndex].perspective + statsAtDates[dayIndex].other_centred + statsAtDates[dayIndex].willing_learn + statsAtDates[dayIndex].self_assess) / statsAtDates[dayIndex].count / 4,
      });
    } else {
      res.push({
        perspective: null,
        other_centred: null,
        willing_learn: null,
        self_assess: null,
        average: null,
      });
    }
  }
  return res;
}

function getLastWeekStats(reports) {
  return getStatsForLastXDays(reports, 7);
}

function getLastMonthStats(reports) {
  return getStatsForLastXDays(reports, 30);
}

function getAllTimeStats(reports) {
  return getStatsForLastXDays(reports, null);
}

export { getLastWeekStats, getLastMonthStats, getAllTimeStats };