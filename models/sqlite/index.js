import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(":memory:");
import { hashStr, compareHash } from "../../utils/util.js";

export const createUser = (
  username,
  password,
  firstname,
  lastname,
  sex,
  phone
) => {
  try {
    const query = "Insert into users values(?,?,?,?,?,?)";
    const stmt = db.prepare(query);
    stmt.run(
      [username, password, firstname, lastname, phone, sex],
      (res, err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Iner", res);
      }
    );
    stmt.finalize();
  } catch (err) {
    console.log(err);
    db.close();
  }

  // db.close();
};

export const createOwner = (
  username,
  password,
  firstname,
  lastname,
  sex,
  phone,
  brand,
  address,
  website
) => {
  db.serialize(() => {
    try {
      const query = "Insert into users values(?,?,?,?,?,?,?,?,?)";
      const stmt = db.prepare(query);
      stmt.run(
        [
          username,
          password,
          firstname,
          lastname,
          phone,
          sex,
          brand,
          address,
          website,
        ],
        (res, err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Inner", res);
        }
      );
      stmt.finalize();
    } catch (err) {
      console.log(err);
      db.close();
    }
  });

  // db.close();
};
export const query = () => {
  db.each("select * from users", (err, res) => {
    console.log(res.email, res.password);
    console.log(err);
  });
};
export const vetUser = (username, password, rows = []) => {
  db.serialize(() => {
    try {
      username = username.trim();
      // console.log(username);
      const query = "select rowid as id,email, password from users "; //where email = " +
      // username;

      db.run(query, (res, err) => {
        if (err) {
          console.log("Error", err);

          return;
        }
        console.log("Inner", res);
        rows = res;
      });

      if (rows.length > 0) {
        const user = rows[0];
        console.log(user);
        if (compareHash(hashStr(password), user.password)) return user;
      }
      // console.log("Invalid");
      return false;
    } catch (err) {
      console.log(err);
      return;
    }
  });
};
export const vetOwner = (username, password) => {
  db.serialize(() => {
    username = username.trim();
    const query =
      "select rowid as id, email, password from users where email =" + username;
    db.run(query, (res, err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res.length);
    });
    stmt.run(username);
    const res = stmt.finalize();
    if (res) {
      const user = res[0];
      console.log(user);
      if (compareHash(hashStr(password), user.password)) return user;
    }
    console.log("Invalid");
    return false;
  });
  // db.close();
};
export const Migrate = () => {
  db.serialize(() => {
    db.run(
      "CREATE TABLE users (email TEXT, password TEXT, firstname TEXT, lastname TEXT, phone TEXT, sex TEXT)"
    );
    db.run(
      "CREATE TABLE owners (email TEXT, password TEXT, firstname TEXT, lastname TEXT, phone TEXT, sex TEXT, brand TEXT, address TEXT, website TEXT)"
    );

    db.run(
      "CREATE TABLE salons (name TEXT, address TEXT, city TEXT, lastname TEXT, phone TEXT, sex TEXT)"
    );
    /*
  const stmt = db.prepare("INSERT INTO lorem VALUES (?)");

  for (let i = 0; i < 10; i++) {
    stmt.run(`Ipsum ${i}`);
  }

  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    console.log(`${row.id}: ${row.info}`);
  }); */
  });

  //  db.close();
};
