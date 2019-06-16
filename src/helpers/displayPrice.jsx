export const displayPrice = (price, discountedPrice) => {
  if (parseInt(discountedPrice) === 0) return [`$${price}`, null];
  return [`$${discountedPrice}`, `$${price}`];
};
