import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

function ContactForm() {
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
    console.log("Form verileri:", form);
    // Backend bağlantısı burada yapılır
  };

  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto">
        <Paper
          sx={{
            padding: 4,
            color: "#fff",
            boxShadow: "none",
            border: "none",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            textAlign="center"
            fontWeight={700}
            color="black"
          >
            Bize Ulaşın
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            mb={3}
            sx={{ color: "#000000" }}
          >
            Sorularınız, iş teklifleri veya iş birliği talepleriniz için bizimle
            iletişime geçebilirsiniz.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <TextField
                className="w-full"
                label="Adınız"
                name="name"
                variant="filled"
                onChange={handleChange}
                required
                InputProps={{ style: { backgroundColor: "#fff" } }}
              />
              <TextField
                className="w-full"
                label="E-posta"
                name="email"
                type="email"
                variant="filled"
                onChange={handleChange}
                required
                InputProps={{ style: { backgroundColor: "#fff" } }}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <TextField
                className="w-full"
                label="Telefon"
                name="phone"
                type="tel"
                variant="filled"
                onChange={handleChange}
                required
                InputProps={{ style: { backgroundColor: "#fff" } }}
              />
              <TextField
                className="w-full"
                label="Konu"
                name="subject"
                variant="filled"
                onChange={handleChange}
                required
                InputProps={{ style: { backgroundColor: "#fff" } }}
              />
            </div>
            <TextField
              label="Mesajınız"
              name="message"
              multiline
              rows={4}
              variant="filled"
              onChange={handleChange}
              required
              InputProps={{ style: { backgroundColor: "#fff" } }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#101270",
                color: "#fff",
                borderRadius: "8px",
                padding: "12px 24px",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#101240",
                },
              }}
            >
              Gönder
            </Button>
          </Box>
        </Paper>
      </div>
    </section>
  );
}

export default ContactForm;
