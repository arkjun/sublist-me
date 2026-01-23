import { describe, expect, it } from 'vitest';
import {
  calculateMonthlyTotal,
  convertCurrency,
  EXCHANGE_RATES_TO_KRW,
  formatPrice,
  normalizeToMonthly,
  type SubscriptionForCalculation,
} from './currency';

describe('convertCurrency', () => {
  it('returns same amount when currencies match', () => {
    expect(convertCurrency(100, 'KRW', 'KRW')).toBe(100);
    expect(convertCurrency(50, 'USD', 'USD')).toBe(50);
  });

  it('converts USD to KRW correctly', () => {
    // $10 = 10 * 1400 = ₩14,000
    expect(convertCurrency(10, 'USD', 'KRW')).toBe(14000);
  });

  it('converts KRW to USD correctly', () => {
    // ₩14,000 = 14000 / 1400 = $10
    expect(convertCurrency(14000, 'KRW', 'USD')).toBe(10);
  });

  it('converts EUR to JPY correctly', () => {
    // €10 = 10 * 1500 = ₩15,000 = 15000 / 9.5 ≈ ¥1578.95
    const result = convertCurrency(10, 'EUR', 'JPY');
    expect(result).toBeCloseTo(1578.95, 1);
  });

  it('converts USD to EUR correctly', () => {
    // $15 = 15 * 1400 = ₩21,000 = 21000 / 1500 = €14
    expect(convertCurrency(15, 'USD', 'EUR')).toBe(14);
  });
});

describe('normalizeToMonthly', () => {
  it('returns same price for monthly billing', () => {
    expect(normalizeToMonthly(10000, 'monthly')).toBe(10000);
  });

  it('divides yearly price by 12', () => {
    expect(normalizeToMonthly(12000, 'yearly')).toBe(1000);
  });

  it('multiplies weekly price by 4', () => {
    expect(normalizeToMonthly(2500, 'weekly')).toBe(10000);
  });

  it('divides quarterly price by 3', () => {
    expect(normalizeToMonthly(30000, 'quarterly')).toBe(10000);
  });
});

describe('formatPrice', () => {
  it('formats KRW with ₩ symbol', () => {
    expect(formatPrice(10000, 'KRW')).toBe('₩10,000');
  });

  it('formats USD with $ symbol', () => {
    expect(formatPrice(99, 'USD')).toBe('$99');
  });

  it('formats JPY with ¥ symbol', () => {
    expect(formatPrice(1500, 'JPY')).toBe('¥1,500');
  });

  it('formats EUR with € symbol', () => {
    expect(formatPrice(50, 'EUR')).toBe('€50');
  });

  it('rounds decimal amounts', () => {
    expect(formatPrice(99.7, 'USD')).toBe('$100');
    expect(formatPrice(99.4, 'USD')).toBe('$99');
  });
});

describe('calculateMonthlyTotal', () => {
  it('returns 0 for empty subscriptions', () => {
    const result = calculateMonthlyTotal([], 'KRW');
    expect(result.total).toBe(0);
    expect(result.hasMixedCurrencies).toBe(false);
  });

  it('calculates total for single currency subscriptions', () => {
    const subscriptions: SubscriptionForCalculation[] = [
      { price: 10000, currency: 'KRW', billingCycle: 'monthly', isActive: true },
      { price: 5000, currency: 'KRW', billingCycle: 'monthly', isActive: true },
    ];
    const result = calculateMonthlyTotal(subscriptions, 'KRW');
    expect(result.total).toBe(15000);
    expect(result.hasMixedCurrencies).toBe(false);
  });

  it('excludes inactive subscriptions', () => {
    const subscriptions: SubscriptionForCalculation[] = [
      { price: 10000, currency: 'KRW', billingCycle: 'monthly', isActive: true },
      {
        price: 5000,
        currency: 'KRW',
        billingCycle: 'monthly',
        isActive: false,
      },
    ];
    const result = calculateMonthlyTotal(subscriptions, 'KRW');
    expect(result.total).toBe(10000);
  });

  it('detects mixed currencies', () => {
    const subscriptions: SubscriptionForCalculation[] = [
      { price: 10000, currency: 'KRW', billingCycle: 'monthly', isActive: true },
      { price: 10, currency: 'USD', billingCycle: 'monthly', isActive: true },
    ];
    const result = calculateMonthlyTotal(subscriptions, 'KRW');
    expect(result.hasMixedCurrencies).toBe(true);
  });

  it('converts and sums mixed currency subscriptions to KRW', () => {
    const subscriptions: SubscriptionForCalculation[] = [
      { price: 10000, currency: 'KRW', billingCycle: 'monthly', isActive: true },
      { price: 10, currency: 'USD', billingCycle: 'monthly', isActive: true },
    ];
    // ₩10,000 + $10 (= ₩14,000) = ₩24,000
    const result = calculateMonthlyTotal(subscriptions, 'KRW');
    expect(result.total).toBe(24000);
  });

  it('converts and sums mixed currency subscriptions to USD', () => {
    const subscriptions: SubscriptionForCalculation[] = [
      { price: 14000, currency: 'KRW', billingCycle: 'monthly', isActive: true },
      { price: 10, currency: 'USD', billingCycle: 'monthly', isActive: true },
    ];
    // ₩14,000 (= $10) + $10 = $20
    const result = calculateMonthlyTotal(subscriptions, 'USD');
    expect(result.total).toBe(20);
  });

  it('handles yearly billing cycle with currency conversion', () => {
    const subscriptions: SubscriptionForCalculation[] = [
      { price: 120, currency: 'USD', billingCycle: 'yearly', isActive: true },
    ];
    // $120/year = $10/month = ₩14,000/month
    const result = calculateMonthlyTotal(subscriptions, 'KRW');
    expect(result.total).toBe(14000);
  });

  it('handles complex scenario with mixed currencies and billing cycles', () => {
    const subscriptions: SubscriptionForCalculation[] = [
      { price: 10000, currency: 'KRW', billingCycle: 'monthly', isActive: true },
      { price: 120, currency: 'USD', billingCycle: 'yearly', isActive: true },
      { price: 30, currency: 'EUR', billingCycle: 'quarterly', isActive: true },
      { price: 500, currency: 'JPY', billingCycle: 'weekly', isActive: false },
    ];
    // KRW: ₩10,000/month
    // USD: $120/year = $10/month = ₩14,000/month
    // EUR: €30/quarter = €10/month = ₩15,000/month
    // JPY: inactive, ignored
    // Total: ₩39,000
    const result = calculateMonthlyTotal(subscriptions, 'KRW');
    expect(result.total).toBe(39000);
    expect(result.hasMixedCurrencies).toBe(true);
  });
});
