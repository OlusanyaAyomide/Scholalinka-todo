"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    text: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    dueDate: { type: Date },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' },
    isCompleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});
exports.todoModel = mongoose_1.default.model("todo", todoSchema);
