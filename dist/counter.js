"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var binaryRoute = path_1.default.join(__dirname, 'counter-256.bin');
var binaryFile = fs_1.default.createWriteStream(binaryRoute);
var counter = function (module) {
    var i = 0;
    for (i = 0; i < module; i++) {
        binaryFile.write(i + " ");
    }
};
counter(256);
