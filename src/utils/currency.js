export const formatPrice = (amount, language = 'uz') => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return language === 'ru' ? '0 сум' : language === 'en' ? '0 UZS' : "0 so'm";
  }
  const num = Math.round(Number(amount));
  const spaced = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (language === 'ru') return `${spaced} сум`;
  if (language === 'en') return `${num.toLocaleString('en-US')} UZS`;
  return `${spaced} so'm`;
};

export const getCurrencyLabel = (language = 'uz') => {
  if (language === 'ru') return 'сум';
  if (language === 'en') return 'UZS';
  return "so'm";
};

