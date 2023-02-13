import pool from '../config/database.js';


//   class Patient {
//     constructor(patient) {
//         this.f_name = patient.f_name;
//         this.l_name = patient.l_name;
//         this.phone = patient.phone;
//         this.sex = patient.sex;
//         this.address = patient.address;
//         this.birthdate = patient.birthdate;
//         this.email = patient.email;
//         this.blood_type= patient.blood_type;
//     }

//     async save() {
//         const [result] = await pool.query(`
//         INSERT INTO patient(l_name,f_name,phone,sex,blood_type,address,birthdate,email) 
//         VALUES(?,?,?,?,?,?,?,?)`, [this.f_name, this.l_name, this.phone, this.sex, this.blood_type,this.address, this.birthdate, this.email]);
//         return result.insertId;
//     }


//     static async getAllPatients() {
//         const [rows] = await pool.query(`
//         SELECT f_name,l_name,birthdate,code FROM patient ;`);
//         return rows;
//     }

//     static async getPatient(id) {
//         const [rows] = await pool.query(`
//         SELECT * FROM patient WHERE code= ?`, [id]);
//         return rows[0];
//     }

//     static async update(id){
//         await pool.query(`
//         UPDATE patient SET
//         l_name=?,f_name=?,phone=?,sex=?,blood_type=?,address=?,birthdate=?,email=?
//         WHERE code = ?;
//         `,[this.l_name,this.f_name,this.phone,this.sex,this.blood_type,this.address,this.birthdate,this.email, id]);

//     }
//     static async remove(id) {
//         const [rows] = await pool.query(`
//         DELETE FROM patient WHERE code= ?`, [id]);
//     }

   
// }


 

// console.log(await Patient.getPatient(1));


const Patient = new Object();

Patient.getPatient = async (id)=>{   
    const [rows] = await pool.query(`
    SELECT * FROM patient WHERE code= ?`,[id]);
    return rows[0];
}

Patient.getAllPatients = async ()=>{
    const [rows] = await pool.query(`
    SELECT f_name,l_name,birthdate,code FROM patient ;`);
    return rows;
}

Patient.save = async (patient)=>{
    const [result] = await pool.query(`
    INSERT INTO patient(l_name,f_name,phone,sex,blood_type,address,birthdate,email) 
    VALUES(?,?,?,?,?,?,?,?)`, [patient.f_name, patient.l_name, patient.phone, patient.sex, patient.blood_type,patient.address, patient.birthdate, patient.email]);
    return result.insertId;
}
Patient.remove = async (id) =>{
 await pool.query(`
    DELETE FROM patient WHERE code= ?`, [id]);
}
Patient.update = async (id,patient)=>{
        await pool.query(`
        UPDATE patient SET
        l_name=?,f_name=?,phone=?,sex=?,blood_type=?,address=?,birthdate=?,email=?
        WHERE code = ?;
        `,[patient.l_name,patient.f_name,patient.phone,patient.sex,patient.blood_type,patient.address,patient.birthdate,patient.email, id]);

    }

Patient.search = async (query)=>{
    const [rows] = await pool.query(`
    SELECT f_name,l_name,birthdate,code FROM patient 
    WHERE (f_name LIKE ?) OR (l_name LIKE ?) ;
    `,[("%"+query+"%"),("%"+query+"%")]);
    return rows;
}
Patient.countSex = async ()=>{
    const [rows] = await pool.query(`
    select count(*) as sex FROM patient
    group by sex;
    `);
    return rows;
};
Patient.agePool = async ()=>{
    const [rows] = await pool.query(`
    `)
}


// Patient.createPatient = async (f_name, l_name, phone ,sex,address, birthdate, email) =>{
//     const [result] =   await pool.query(`
//     INSERT INTO patient(l_name,f_name,phone,sex,address,birthdate,email)
//     VALUES(?,?,?,?,?,?,?)`,[f_name, l_name, phone ,sex,address, birthdate, email]);
//      return result.insertId;
// }

// Patient.getPatient = async (id)=>{
//     const [rows] = await pool.query(`
//     SELECT * FROM patient WHERE code= ?`,[id]);
//     return rows[0];
// }


export default Patient;


//  async function getPatient(id){
//     const [rows] = await pool.query(`
//     SELECT * FROM patient WHERE code= ?`,[id]);
//     return rows[0];

// }
// const result = await getPatient(1);
// console.log(result);
