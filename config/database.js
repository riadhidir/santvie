import mysql from 'mysql2';
import  dotenv from 'dotenv';
dotenv.config();


 const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
}).promise();


export default pool;

// export async function getPatient(id){
//     const [rows] = await pool.query(`
//     SELECT * FROM patient WHERE code= ?`,[id]);
//     return rows[0];

// }

// export async function createPatient(patient){
//   const [result] =   await pool.query(`
//   INSERT INTO patient(l_name,f_name,phone,sex,address,birthdate,email) VALUES(?,?,?,?,?,?,?)`,[f_name, l_name, phone ,sex,address, birthdate, email]);

//     return result.insertId;
// }
// const patient = await getPatient(1);
// console.log(patient);