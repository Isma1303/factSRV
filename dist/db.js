"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const db = (0, knex_1.default)(knexfile_1.default);
async function testConnection() {
    try {
        await db.raw("select 1+1 as result");
        console.log("✅ DB connected successfully");
    }
    catch (error) {
        console.error("❌ DB connection failed:", error);
    }
}
testConnection();
exports.default = db;
