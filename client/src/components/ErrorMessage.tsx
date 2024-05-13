import * as React from "react";
import Alert from "@mui/material/Alert";

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
}: ErrorMessageProps) => (
  <Alert severity="error" sx={{ mt: 2 }}>
    {message ?? "Unknown Error"}
  </Alert>
);

export default ErrorMessage;
