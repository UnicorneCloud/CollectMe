import {WEEK_DAYS, createFrequence, upcomingCollectDates, getUpcomingCollectDates } from '../model';

const EXPECTED_FREQUENCE = new Map([
  ["days", new Set(WEEK_DAYS)],
  ["period", 1]
]);

let myFrequence;

describe("When creating the frequence", () => {
  beforeEach(() => {
    myFrequence = createFrequence(WEEK_DAYS, 1);
  });

  it("should by a set for 'days'", () => {
    expect(myFrequence.days.type).toBe(Set.prototype.type);
  });

  it("should create the days in the 'days' key", () => {
    expect(myFrequence.days).toEqual(EXPECTED_FREQUENCE.get("days"));
  });

  it("should return 1 as a period", () => {
    expect(myFrequence.period).toBe(EXPECTED_FREQUENCE.get("period"));
  });
});


describe('upcomingCollectDates', () => {
  it('should not crash', () => {
    const collectSchedule = {
      startDate: new Date(2019, 3, 9),
      daysInt: [0, 1, 2],
      period: 2
    }
    const upcomingCollectDatesGenerator = upcomingCollectDates(collectSchedule)
    expect(upcomingCollectDatesGenerator.next().value)
  })
})

describe('getUpcomingCollectDates', () => {
  it('should not crash', () => {
    const collectSchedule = {
      startDate: new Date(2019, 3, 9),
      daysInt: [0, 1, 2],
      period: 2
    }
    const result = getUpcomingCollectDates(collectSchedule, 14)
    console.log(result)
    expect(result).toHaveLength(14)
  })
})