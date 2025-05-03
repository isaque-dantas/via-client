import { DecimalWithTwoDigitsPipe } from './decimal-with-two-digits.pipe';

describe('DecimalWithTwoDigitsPipe', () => {
  it('create an instance', () => {
    const pipe = new DecimalWithTwoDigitsPipe();
    expect(pipe).toBeTruthy();
  });
});
