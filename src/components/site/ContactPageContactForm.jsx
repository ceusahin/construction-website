import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";

const ContactPageContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form gönderildi:", form);
    // API'ye gönderme kodu buraya
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <p className="text-[#343434] text-center mb-6">
          Aklınızdaki her türlü soru, görüş veya iş birliği talepleriniz için
          bizimle iletişime geçebilirsiniz. Size en kısa sürede geri dönüş
          sağlayacağız.
        </p>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="İsim"
            name="name"
            variant="filled"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="filled"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Telefon Numarası"
            name="phone"
            type="tel"
            variant="filled"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <TextField
            label="Konu"
            name="subject"
            variant="filled"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <TextField
            label="Mesajınız"
            name="message"
            multiline
            rows={5}
            variant="filled"
            value={form.message}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Gönder
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactPageContactForm;
