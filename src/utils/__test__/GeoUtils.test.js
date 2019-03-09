import { WEEK_DAYS_MAP, createFrequence } from '../model';
import { getFrequence, extractWeekDays, getPeriod } from '../GeoUtils';
import {FEATURE_OBJECT_1, FEATURE_OBJECT_2, FEATURE_OBJECT_3} from './GeoUtilsDataset';

const EXPECTED_FREQUENCE_1 = createFrequence([WEEK_DAYS_MAP.MONDAY], 1);
const EXPECTED_FREQUENCE_2 = createFrequence([WEEK_DAYS_MAP.MONDAY, WEEK_DAYS_MAP.THURSDAY], 1);
const EXPECTED_FREQUENCE_3 = createFrequence([WEEK_DAYS_MAP.MONDAY], 2);

describe("when doing tdd", () => {
  describe("in a hackathon", () => {
    it("should work 1", () => {
      expect(getFrequence(FEATURE_OBJECT_1)).toEqual(EXPECTED_FREQUENCE_1);
    });

    it("should work 2", () => {
      expect(getFrequence(FEATURE_OBJECT_2)).toEqual(EXPECTED_FREQUENCE_2);
    });

    it("should work 3", () => {
      expect(getFrequence(FEATURE_OBJECT_3)).toEqual(EXPECTED_FREQUENCE_3);
    });
    
  });

  describe("for extracting week day", () => {
    it("should 1", () => {
      expect(extractWeekDays(FEATURE_OBJECT_1.properties.JOUR_COLLECTE)).toEqual(["lundi"]);
    });

    it("should 2", () => {
      expect(extractWeekDays(FEATURE_OBJECT_2.properties.JOUR_COLLECTE)).toEqual(["lundi", "jeudi"]);
    });

    it("should 3", () => {
      expect(extractWeekDays(FEATURE_OBJECT_3.properties.JOUR_COLLECTE)).toEqual(["lundi"]);
    });
  });

  describe("for period", () => {
    it("should 1", () => {
      expect(getPeriod(FEATURE_OBJECT_1.properties.JOUR_COLLECTE)).toBe(1);
    });

    it("should 2", () => {
      expect(getPeriod(FEATURE_OBJECT_2.properties.JOUR_COLLECTE)).toBe(1);
    });

    it("should 3", () => {
      expect(getPeriod(FEATURE_OBJECT_3.properties.JOUR_COLLECTE)).toBe(2);
    });
  });
});
