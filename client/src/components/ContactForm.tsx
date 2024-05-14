import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { Delete, Phone, Send } from "@mui/icons-material";
import { Contact, PhoneNumber } from "../types/contact";

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
  const [tag, setTag] = useState(defaultContact?.tag ?? "");
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>(
    defaultContact?.phoneNumbers ?? []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const newPhoneNumbers = phoneNumbers.map((phoneNumber, i) => {
      if (i === index) {
        return { ...phoneNumber, [field]: e.target.value };
      }
      return phoneNumber;
    });

    setPhoneNumbers(newPhoneNumbers);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { number: "", label: "" }]);
  };

  const handleRemovePhoneNumber = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ firstName, lastName, email, tag, phoneNumbers });
  };

  console.log(phoneNumbers);

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
        <Grid item xs={9}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
            <Grid container spacing={2} key={`pn-${index}`}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={phoneNumber.number}
                  onChange={(e) => handleInputChange(e, index, "number")}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Label"
                  value={phoneNumber.label}
                  onChange={(e) => handleInputChange(e, index, "label")}
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  onClick={() => handleRemovePhoneNumber(index)}
                  sx={{ mb: 2 }}
                  startIcon={<Delete />}
                  color="error"
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
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
