import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

//validation of password and email
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function updateForm() {
  const theme = createTheme();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState({
    applicantName: "",
    username: "",
    applicantEmail: "",
    password: "",
    confirmPassword: "",
    applicantContact: "",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState("");

  //validate inputs
  const validate = () => {
    let temp = {};
    temp.applicantName = user.applicantName ? "" : "This field is required.";
    temp.username = user.username ? "" : "This field is required.";
    temp.password = PWD_REGEX.test(user.password)
      ? ""
      : "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
    temp.applicantEmail = EMAIL_REGEX.test(user.applicantEmail)
      ? ""
      : "Email is not valid.";
    temp.confirmPassword =
      user.confirmPassword === user.password ? "" : "Passwords do not match";
    temp.applicantContact =
      user.applicantContact.length === 10
        ? ""
        : "Contact number must be 10 digits";

    setError({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/applicants/register`, user)
      .then((res) => {
        console.log(res);
        setSuccess(true);
        // go to login page
        window.location.href = "/login";
      })
      .catch((err) => {
        // console.log(err);
        // setError({ ...error, fetchError: true, fetchErrorMsg: err.response.data.message });
        validate();
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="applicantName"
                  required
                  fullWidth
                  id="applicantName"
                  label="Full Name"
                  value={user.applicantName}
                  onChange={(e) =>
                    setUser({ ...user, applicantName: e.target.value })
                  }
                  autoFocus
                  {...(error.applicantName && {
                    error: true,
                    helperText: error.applicantName,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  autoFocus
                  {...(error.username && {
                    error: true,
                    helperText: error.username,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="applicantEmail"
                  label="Email Address"
                  name="applicantEmail"
                  autoComplete="applicantEmail"
                  value={user.applicantEmail}
                  onChange={(e) =>
                    setUser({ ...user, applicantEmail: e.target.value })
                  }
                  {...(error.applicantEmail && {
                    error: true,
                    helperText: error.applicantEmail,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  {...(error.password && {
                    error: true,
                    helperText: error.password,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  {...(error.confirmPassword && {
                    error: true,
                    helperText: error.confirmPassword,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="applicantContact"
                  label="Contact Number"
                  name="applicantContact"
                  autoComplete="applicantContact"
                  value={user.applicantContact}
                  onChange={(e) =>
                    setUser({ ...user, applicantContact: e.target.value })
                  }
                  {...(error.applicantContact && {
                    error: true,
                    helperText: error.applicantContact,
                  })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default updateForm;
