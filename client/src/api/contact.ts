import axios from "axios";
import { Contact } from "../types/contact";
import { BASE_URL } from "../config/api";

export const createContact = async (contactData: Contact): Promise<Contact> => {
  const response = await axios.post<Contact>(BASE_URL, contactData);
  return response.data;
};

export const updateContact = async (
  contactId: string,
  contactData: Contact
): Promise<Contact> => {
  const response = await axios.put<Contact>(
    `${BASE_URL}/${contactId}`,
    contactData
  );
  return response.data;
};

export const deleteContact = async (contactId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${contactId}`);
};

export const fetchContacts = async (
  term?: string,
  type?: string
): Promise<Contact[]> => {
  if (term) {
    const response = await axios.get<Contact[]>(
      `${BASE_URL}/search/${type}/${term}`
    );
    return response.data;
  }

  const response = await axios.get<Contact[]>(BASE_URL);

  console.log(response.data);

  return response.data;
};

export const fetchContactById = async (id: string): Promise<Contact> => {
  const response = await axios.get<Contact>(`${BASE_URL}/${id}`);
  return response.data;
};
