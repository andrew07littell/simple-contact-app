import { useState, useEffect, useCallback } from "react";
import { Contact } from "../types/contact";

import {
  createContact,
  updateContact,
  deleteContact,
  fetchContacts,
  fetchContactById,
} from "../api/contact";

export const useCreateContact = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createContactHandler = async (contactData: Contact) => {
    try {
      setIsCreating(true);
      await createContact(contactData);
      setIsCreating(false);
    } catch (error) {
      setError(error as Error);
      setIsCreating(false);
    }
  };

  return { createContactHandler, isCreating, error };
};

export const useUpdateContact = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateContactHandler = async (
    contactId: string,
    contactData: Contact
  ) => {
    try {
      setIsUpdating(true);
      await updateContact(contactId, contactData);
      setIsUpdating(false);
    } catch (error) {
      setError(error as Error);
      setIsUpdating(false);
    }
  };

  return { updateContactHandler, isUpdating, error };
};

export const useDeleteContact = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteContactHandler = async (contactId: string) => {
    try {
      setIsDeleting(true);
      await deleteContact(contactId);
      setIsDeleting(false);
    } catch (error) {
      setError(error as Error);
      setIsDeleting(false);
    }
  };

  return { deleteContactHandler, isDeleting, error };
};

export const useContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchContactsData = async (term?: string, type?: string) => {
    try {
      setIsLoading(true);
      const contactsData = await fetchContacts(term, type);
      setContacts(contactsData);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContactsData();
  }, []);

  return { contacts, isLoading, error, refetch: fetchContactsData };
};

export const useContactById = (id: string) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchContact = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchContactById(id);
      setContact(data);
    } catch (error) {
      setError(error as Error);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  return { contact, isLoading, error };
};
