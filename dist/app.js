"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const client_route_1 = __importDefault(require("./client/client.route"));
const abonos_route_1 = __importDefault(require("./abonos/abonos.route"));
const compras_route_1 = __importDefault(require("./compras/compras.route"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "https://factsrv.onrender.com",
    credentials: true,
}));
app.use("/api", auth_route_1.default, client_route_1.default, abonos_route_1.default, compras_route_1.default);
exports.default = app;
