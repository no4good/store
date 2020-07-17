import cryptoHelper from "../../helpers/crypto.helper";

const hash = password => cryptoHelper.encryptSync(password);
const now = new Date();

export const usersSeed = [
  {
    email: "demo@demo.com",
    username: "demo",
    password: hash("demo")
  },
  {
    email: "gbottoms1@arizona.edu",
    username: "thartwright1",
    password: hash("pxlxvUyyUjE")
  },
  {
    email: "cclears2@state.gov",
    username: "bkopps2",
    password: hash("ioyLdS9Mdgj")
  },
  {
    email: "htie3@chronoengine.com",
    username: "kmitchinson3",
    password: hash("twn50kl")
  },
  {
    email: "bbirmingham4@guardian.co.uk",
    username: "fbrabon4",
    password: hash("0naQBpP9")
  }
].map(user => ({
  ...user,
  createdAt: now,
  updatedAt: now
}));
