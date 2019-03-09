import { WEEK_DAYS_MAP, createFrequence } from '../model';
import { getFrequence } from '../GeoUtils';

const EXPECTED_FREQUENCE_1 = createFrequence(WEEK_DAYS_MAP.MONDAY, 1);
const EXPECTED_FREQUENCE_1 = createFrequence([WEEK_DAYS_MAP.MONDAY, WEEK_DAYS_MAP.THURSDAY], 1);

describe("when testing", () => {
  describe("in a hackathon", () => {
    beforeEach(() => {
      
    })
  });
});

test('ez', () => {
  expect(getFrequence(FEATURE_OBJECT)).toBeTruthy();
});

