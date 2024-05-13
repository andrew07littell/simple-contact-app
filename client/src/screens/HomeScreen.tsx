import React from "react";
import { NavLink } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { SearchBox, Avatar, ErrorMessage } from "../components";
import { useContactList, useDeleteContact } from "../hooks/contact";
import { Contact } from "../types/contact";
import { formatPhoneNumber } from "../utils/PhoneNumber";

const HomeScreen: React.FC = () => {
  const { contacts, refetch, isLoading, error } = useContactList();
  const { deleteContactHandler, error: deleteError } = useDeleteContact();

  const handleSearch = (searchTerm: string, searchType: string) => {
    refetch(searchTerm, searchType);
  };

  const handleDeleteContact = (
    event: React.MouseEvent<HTMLButtonElement>,
    contactId: string
  ) => {
    event.preventDefault();
    deleteContactHandler(contactId).then(() => refetch());
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <SearchBox onSearch={handleSearch} />
      </Box>
      {isLoading ? (
        <Container sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h6">Loading ...</Typography>
        </Container>
      ) : error || deleteError ? (
        <ErrorMessage message={error?.message || deleteError?.message} />
      ) : (
        <List>
          {contacts.length ? (
            contacts.map((contact: Contact) => (
              <NavLink to={`/update/${contact.id}`} key={contact.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={(event) =>
                        contact.id && handleDeleteContact(event, contact.id)
                      }
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar contact={contact} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${contact.firstName} ${contact.lastName}`}
                    secondary={`${
                      contact.phoneNumbers?.[0]
                        ? `${formatPhoneNumber(
                            contact.phoneNumbers[0].number
                          )} (${contact.phoneNumbers[0].label})`
                        : "No phone number"
                    }`}
                  />
                </ListItem>
              </NavLink>
            ))
          ) : (
            <Container sx={{ textAlign: "center", mt: 8 }}>
              <Typography variant="h6">No contacts found</Typography>
            </Container>
          )}
        </List>
      )}
    </Container>
  );
};

export default HomeScreen;
