export const profileStatus = user => {
  if (
    !user.address_1 ||
    !user.city ||
    !user.country ||
    !user.credit_card ||
    (!user.day_phone || !user.eve_phone || !user.mob_phone) ||
    !user.postal_code ||
    !user.region
  ) {
    return false;
  }
  return true;
};
