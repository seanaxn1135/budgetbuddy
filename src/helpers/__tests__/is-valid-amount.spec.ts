import { isValidAmount } from '../is-valid-amount'

describe('#isValidAmount', () => {
  describe('Valid amount inputs', () => {
    test.each([
      ['20.00', 'standard decimal amount'],
      ['20', 'whole number'],
      ['20.', 'decimal point without following numbers'],
      ['.20', 'decimal without leading digit'],
    ])('%s - %s', (text: string) => {
      expect(isValidAmount(text)).toBe(true)
    })
  })

  describe('Invalid amount inputs', () => {
    test.each([
      ['1,000', 'with comma'],
      ['20.000', 'more than 2 decimal points'],
      ['$20', 'with dollar sign prefix'],
      ['$20.00', 'with dollar sign prefix and decimal'],
      ['$.20', 'dollar sign without leading digit'],
      ['20.0.0', 'multiple decimal points'],
      ['$$20', 'multiple dollar signs'],
      ['2 0', 'space in the amount'],
      ['20.12.12', 'multiple decimal points'],
    ])('%s - %s', (text: string) => {
      expect(isValidAmount(text)).toBe(false)
    })
  })
})
