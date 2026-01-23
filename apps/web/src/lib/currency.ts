export type Currency = 'KRW' | 'USD' | 'JPY' | 'EUR';

export const EXCHANGE_RATES_TO_KRW: Record<Currency, number> = {
  KRW: 1,
  USD: 1400,
  JPY: 9.5,
  EUR: 1500,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
  EUR: '€',
};

export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
): number {
  if (fromCurrency === toCurrency) return amount;
  const toKRW = amount * EXCHANGE_RATES_TO_KRW[fromCurrency];
  return toKRW / EXCHANGE_RATES_TO_KRW[toCurrency];
}

export function formatPrice(amount: number, currency: Currency): string {
  return `${CURRENCY_SYMBOLS[currency]}${Math.round(amount).toLocaleString()}`;
}

export type BillingCycle = 'monthly' | 'yearly' | 'weekly' | 'quarterly';

export function normalizeToMonthly(price: number, cycle: BillingCycle): number {
  switch (cycle) {
    case 'yearly':
      return price / 12;
    case 'weekly':
      return price * 4;
    case 'quarterly':
      return price / 3;
    case 'monthly':
    default:
      return price;
  }
}

export interface SubscriptionForCalculation {
  price: number;
  currency: Currency;
  billingCycle: BillingCycle;
  isActive: boolean;
}

export function calculateMonthlyTotal(
  subscriptions: SubscriptionForCalculation[],
  targetCurrency: Currency,
): { total: number; hasMixedCurrencies: boolean } {
  const activeSubscriptions = subscriptions.filter((s) => s.isActive);
  const currencies = new Set(activeSubscriptions.map((s) => s.currency));
  const hasMixedCurrencies = currencies.size > 1;

  const total = activeSubscriptions.reduce((sum, s) => {
    const monthlyPrice = normalizeToMonthly(s.price, s.billingCycle);
    const converted = convertCurrency(monthlyPrice, s.currency, targetCurrency);
    return sum + converted;
  }, 0);

  return { total, hasMixedCurrencies };
}
