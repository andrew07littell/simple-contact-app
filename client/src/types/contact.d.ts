export interface PhoneNumber {
  number: string;
  label: string;
}

export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumbers: PhoneNumber[];
}
