import { isValidDescription } from '../is-valid-description'

describe('#isValidDescription', () => {
  describe('Valid description inputs', () => {
    test.each([
      ['Groceries', 'standard description'],
      ["McDonald's", 'with apostrophe'],
      ['Pizza-Hut', 'with hyphen'],
      ['AT&T', 'with ampersand'],
      ['Dr.Pepper', 'with dot'],
      ['Sale!', 'with exclamation mark'],
      ['Vitamin+C', 'with plus sign'],
      ['50% off deal', 'with percentage sign and spaces'],
      ['Movie (3D)', 'with parentheses'],
      ['Buy 1/Get 1', 'with forward slash'],
      ['iPhone 12', 'with numbers'],
      ['Sale!!', 'with multiple valid special characters in a row'],
    ])('%s - %s', (text: string) => {
      expect(isValidDescription(text)).toBe(true)
    })
  })

  describe('Invalid description inputs', () => {
    test.each([
      [
        'This is a very long description that exceeds the character limit.',
        'exceeds the 50 character limit',
      ],
      ['Invalid@Description', 'invalid special character'],
      ['', 'empty description'],
    ])('%s - %s', (text: string) => {
      expect(isValidDescription(text)).toBe(false)
    })
  })
})
