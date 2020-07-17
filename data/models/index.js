import orm from "../db/connection";

const User = orm.import("./user");

export { User as UserModel };
