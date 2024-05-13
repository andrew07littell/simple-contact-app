import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container, Grid, AppBar, Toolbar } from "@mui/material";

import { ContactForm, ErrorMessage, BackButton } from "../components";
import { useCreateContact } from "../hooks/contact";
import { Contact } from "../types/contact";

const CreateScreen: React.FC = () => {
  const { createContactHandler, isCreating, error } = useCreateContact();
  const navigate = useNavigate();

  const handleCreateContact = (formData: Contact) => {
    createContactHandler(formData).then(() => navigate("/"));
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense">
          <BackButton />
          <Typography variant="h6" color="inherit" component="div">
            Add Contact
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <ContactForm onSubmit={handleCreateContact} pending={isCreating} />
      </Grid>
      {error && <ErrorMessage message={error?.message} />}
    </Container>
  );
};

export default CreateScreen;
