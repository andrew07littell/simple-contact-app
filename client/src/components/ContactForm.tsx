import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { Delete, Phone, Send } from "@mui/icons-material";
import { Contact } from "../types/contact";

interface ContactFormProps {
  defaultContact?: Contact;
  onSubmit: (formData: Contact) => void;
  pending: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  defaultContact,
  onSubmit,
  pending,
}) => {
  const [firstName, setFirstName] = useState(defaultContact?.firstName ?? "");
  const [lastName, setLastName] = useState(defaultContact?.lastName ?? "");
  const [email, setEmail] = useState(defaultContact?.email ?? "");
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(
    defaultContact?.phoneNumbers ?? []
  );

  const handlePhoneNumberChange = (index: number, value: string) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handleRemovePhoneNumber = (index: number) => {
    const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ firstName, lastName, email, phoneNumbers });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleAddPhoneNumber}
            startIcon={<Phone />}
            sx={{ mb: 1 }}
          >
            Add Phone Number
          </Button>
          {phoneNumbers.map((phoneNumber, index) => (
            <div key={index}>
              <TextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
              />
              <Button
                onClick={() => handleRemovePhoneNumber(index)}
                sx={{ mt: 1, mb: 1 }}
                startIcon={<Delete />}
                color="error"
              >
                Remove
              </Button>
            </div>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Send />}
            disabled={pending}
          >
            {defaultContact ? "Update Contact" : "Create Contact"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
