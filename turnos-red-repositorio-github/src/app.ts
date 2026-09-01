import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "node:http";
import { Server } from "socket.io";
import turnoRoutes from "./routes/turno.routes.js";
import medicoRoutes from "./routes/medico.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.status(200).json({ status: 200, message: "TurnosRed OK" }));
app.use("/turnos", turnoRoutes);
app.use("/medicos", medicoRoutes);

app.use((_req, _res, next) => next({
  status: 404,
  message: "Ruta no encontrada",
  code: "NOT_FOUND",
  details: []
}));

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log(`[Socket.IO] cliente conectado: ${socket.id}`);
  socket.on("disconnect", () => console.log(`[Socket.IO] cliente desconectado: ${socket.id}`));
});

const PORT = Number(process.env.PORT ?? 3000);
server.listen(PORT, () => console.log(`TurnosRed escuchando en http://localhost:${PORT}`));
