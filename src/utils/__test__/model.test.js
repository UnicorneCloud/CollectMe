import {DAYS_OF_THE_WEEK, createFrequence} from '../model';

const EXPECTED_FREQUENCE = new Map([
  ["days", new Set(DAYS_OF_THE_WEEK)],
  ["period", 1]
]);

let myFrequence;

describe("When creating the frequence", () => {
  beforeEach(() => {
    myFrequence = createFrequence(DAYS_OF_THE_WEEK, 1);
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