import pool from '../config/database.js';

const Appointment = new Object();

Appointment.getAllAppointments = async ()=>{
    const [rows] = await pool.query(`
    SELECT rdv.code,code_patient, l_name, f_name, details, due, start_at  FROM rdv JOIN patient ON patient.code = rdv.code_patient;
    `);
    return rows;
}

Appointment.getAppointment = async (id)=>{
    const [rows] = await pool.query(`
    SELECT * FROM rdv WHERE code = ?;
    `,[id]);
    return rows[0];
}
Appointment.remove = async (id)=>{
    await pool.query(`
    DELETE  FROM rdv WHERE code = ?;
    `,[id]);
}

Appointment.save = async (appointment)=>{
   const [row] = await pool.query(`
    INSERT INTO rdv(code_patient,details,due,start_at) VALUES (?,?,?,?);
    `,[appointment.code_patient,appointment.details,appointment.due,appointment.start_at]);
    return row.insertId;
}


Appointment.update = async (id, appointment)=>{
    await pool.query(`
    UPDATE rdv SET
    code_patient=?, details=?, due=?, start_at=? 
    WHERE code = ?;`
    ,[appointment.code_patient,appointment.details,appointment.due,appointment.start_at,id]);
}

Appointment.getOcuupiedTime = async (date)=>{
    const [rows] = await pool.query(`
    SELECT start_at FROM rdv WHERE due = ? ;`,[date]);
    console.log(rows)
    return rows;
    

}
Appointment.dayApp = async ()=>{
    const [rows] = await pool.query(`
    SELECT count(*) as count FROM  rdv where day(due) = day(curdate());`);
   
    return rows[0];
    
} 

export default Appointment;
