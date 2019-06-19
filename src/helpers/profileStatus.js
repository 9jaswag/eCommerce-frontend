export const profileStatus = (user, checkCard = false) => {
  if (
    !user.address_1 ||
    !user.city ||
    !user.region ||
    !user.postal_code ||
    !user.country
  ) {
    return false;
  }

  if (checkCard && !user.credit_card) return false;

  return true;
};
