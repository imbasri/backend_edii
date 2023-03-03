const postgreDb = require("../config/postgre");

const bcrypt = require("bcrypt");

// get
const getDataUser = (userid) => {
   return new Promise((resolve, reject) => {
      if (userid === "all") {
         const queryall = "select * from tbl_user";
         postgreDb.query(queryall, (err, res) => {
            if (err) {
               console.log(err);
               return reject({ status: 500, msg: "Internal Server Error" });
            }
            return resolve({ status: 200, msg: "Data Found", data: res.rows });
         });
      } else {
         const queryid = "select * from tbl_user where userid = $1";
         postgreDb.query(queryid, [userid], (err, res) => {
            if (err) {
               console.log(err);
               return reject({ status: 500, msg: "Internal Server Error" });
            }
            if (!res.rows[0]) {
               return reject({ status: 404, msg: "Data not found" });
            }
            return resolve({ status: 200, msg: "Data Found", data: res.rows });
         });
      }
   });
};

// create / post
const postDataUser = (body) => {
   return new Promise((resolve, reject) => {
      const { namalengkap, username, password, status } = body;
      const query =
         "insert into tbl_user (namalengkap, username, password, status) values($1,$2,$3,$4) returning namalengkap, username, status";
      bcrypt.hash(password, 10, (err, hashedPassword) => {
         if (err) {
            console.log(err);
            return reject({ status: 500, msg: "Internal Server Error" });
         }
         postgreDb.query(
            query,
            [namalengkap, username, hashedPassword, status],
            (err, result) => {
               if (err) {
                  console.log(err);
                  return reject({ status: 500, msg: "Internal Server Error" });
               }
               return resolve({
                  status: 201,
                  msg: "Create User Successfuly",
                  data: result.rows[0],
               });
            }
         );
      });
   });
};

// delete
const delDataUser = (userid) => {
   return new Promise((resolve, reject) => {
      const query = "delete from tbl_user where userid = $1 returning userid";
      postgreDb.query(query, [userid], (err, res) => {
         if (err) {
            console.log(err);
            return reject({ status: 500, msg: "Internal Server Error" });
         }
         return resolve({
            status: 200,
            msg: "Delete Successfuly",
            data: res.rows,
         });
      });
   });
};

const userRepo = {
   getDataUser,
   postDataUser,
   delDataUser,
};

module.exports = userRepo;
