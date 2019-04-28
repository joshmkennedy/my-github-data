import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("./db.json");
const db = low(adapter);
db.defaults({
  user: "",
  repos: [],
}).write();

export default db;
