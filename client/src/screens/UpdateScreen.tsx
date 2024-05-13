import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Container, AppBar, Toolbar, Grid } from "@mui/material";

import { ContactForm, BackButton, ErrorMessage } from "../components";
import { useUpdateContact, useContactById } from "../hooks/contact";
import { Contact } from "../types/contact";

const UpdateScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { contact, isLoading, error: loadingError } = useContactById(id);
  const { updateContactHandler, isUpdating, error } = useUpdateContact();

  const navigate = useNavigate();

  const handleSubmit = (contact: Contact) => {
    updateContactHandler(id, contact).then(() => navigate("/"));
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      {contact && (
        <>
          <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar variant="dense">
              <BackButton />
              <Typography variant="h6" color="inherit" component="div">
                Update Contact
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container>
            <ContactForm
              defaultContact={contact}
              onSubmit={handleSubmit}
              pending={isUpdating}
            />
          </Grid>
        </>
      )}
      {isLoading && <Typography>Loading...</Typography>}
      {(error || loadingError) && (
        <ErrorMessage message={error?.message || loadingError?.message} />
      )}
    </Container>
  );
};

export default UpdateScreen;
