import { getISOWeek, subWeeks, getMonth, subMonths } from 'date-fns';

function calculateAverage(values) {
  if (values.length === 0) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return parseFloat((total / values.length).toFixed(1));
}

function calculateAverageFromReports(reports) {
  if (reports.length === 0) {
    return {
      perspective: 0,
      other_centred: 0,
      willing_learn: 0,
      self_assess: 0,
    };
  }

  const perspective = calculateAverage(reports.map((report) => report.perspective));
  const otherCentred = calculateAverage(reports.map((report) => report.other_centred));
  const willingLearn = calculateAverage(reports.map((report) => report.willing_learn));
  const selfAssess = calculateAverage(reports.map((report) => report.self_assess));

  return {
    perspective,
    other_centred: otherCentred,
    willing_learn: willingLearn,
    self_assess: selfAssess,
  };
}

function getWeeklyAverages(reports) {
  const currentWeekReports = [];
  const previousWeekReports = [];

  const currentWeek = getISOWeek(new Date());
  const previousWeek = getISOWeek(subWeeks(new Date(), 1));

  reports.forEach((report) => {
    const reportWeek = getISOWeek(new Date(report.dateCreatedCli));

    if (reportWeek === currentWeek) {
      currentWeekReports.push(report);
    } else if (reportWeek === previousWeek) {
      previousWeekReports.push(report);
    }
  });

  return {
    currentWeek: calculateAverageFromReports(currentWeekReports),
    previousWeek: calculateAverageFromReports(previousWeekReports),
  };
}

function getMonthlyAverages(reports) {
  const currentMonthReports = [];
  const previousMonthReports = [];

  const currentMonth = getMonth(new Date());
  const previousMonth = getMonth(subMonths(new Date(), 1));

  reports.forEach((report) => {
    const reportMonth = getMonth(new Date(report.dateCreatedCli));

    if (reportMonth === currentMonth) {
      currentMonthReports.push(report);
    } else if (reportMonth === previousMonth) {
      previousMonthReports.push(report);
    }
  });

  return {
    currentMonth: calculateAverageFromReports(currentMonthReports),
    previousMonth: calculateAverageFromReports(previousMonthReports),
  };
}

function getAllTimeAverages(reports) {
  return calculateAverageFromReports(reports);
}

export { getWeeklyAverages, getMonthlyAverages, getAllTimeAverages };