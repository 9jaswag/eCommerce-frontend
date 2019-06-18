export const profileStatus = user => {
  if (
    !user.address_1 ||
    !user.city ||
    !user.region ||
    !user.postal_code ||
    !user.country
  ) {
    return false;
  }
  return true;
};
