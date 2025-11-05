const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta public
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/components", express.static(path.join(__dirname, "components")));

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Roda o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
