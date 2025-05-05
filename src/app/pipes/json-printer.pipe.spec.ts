import { JsonPrinterPipe } from './json-printer.pipe';

describe('JsonPrinterPipe', () => {
  it('create an instance', () => {
    const pipe = new JsonPrinterPipe();
    expect(pipe).toBeTruthy();
  });
});
