const userModel = require("../models/user.model.ts");
const bcrypt = require("bcrypt");
const uJwt = require("jsonwebtoken");

module.exports.signUp = async (req: any, res: any) => {
  await bcrypt
    .hash(req.body.password, 10)
    .then((hash: string) => {
      const user = new userModel({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error: any) => res.status(400).json({ error }));
    })
    .catch((error: any) => res.status(500).json({ error }));
};

module.exports.login = async (req: any, res: any) => {
  await userModel
    .findOne({ email: req.body.email })
    .then((user: User) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid: any) => {
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
        .catch((error: any) => res.status(500).json({ error }));
    })
    .catch((error: any) => res.status(500).json({ error }));
};
