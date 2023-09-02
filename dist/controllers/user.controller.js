"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const uJwt = require("jsonwebtoken");
// module.exports.signUp = async (req: any, res: any) => {
//   await bcrypt
//     .hash(req.body.password, 10)
//     .then((hash: string) => {
//       const user = new userModel({
//         email: req.body.email,
//         password: hash,
//       });
//       user
//         .save()
//         .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//         .catch((error: any) => res.status(400).json({ error }));
//     })
//     .catch((error: any) => res.status(500).json({ error }));
// };
module.exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel
        .findOne({ email: req.body.email })
        .then((user) => {
        if (!user) {
            return res
                .status(401)
                .json({ message: "Paire login/mot de passe incorrecte" });
        }
        bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
            if (!valid) {
                return res
                    .status(401)
                    .json({ message: "Paire login/mot de passe incorrecte" });
            }
            res.status(200).json({
                userId: user._id,
                token: uJwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                }),
            });
        })
            .catch((error) => res.status(500).json({ error }));
    })
        .catch((error) => res.status(500).json({ error }));
});
//# sourceMappingURL=user.controller.js.map