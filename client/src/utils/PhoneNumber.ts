export const formatPhoneNumber = (phoneNumber: string) => {
  const digits = phoneNumber.replace(/\D/g, "");

  return digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    : phoneNumber;
};
