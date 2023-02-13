import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js'

// get all patients
export const index = async (req, res) => {
    const patients = await Patient.getAllPatients();
    const id = req.params.id ? req.params.id : patients[0].code;
    const f_patient = await Patient.getPatient(id);
    res.render('patients/patients', { patients, f_patient });
}
// get patient creation page
export const create = async (req, res) => {
    const patients = await Patient.getAllPatients();

    res.render('patients/create',{patients});
}
export const edit = async (req, res) => {
    const patient = await Patient.getPatient(req.params.id);
    res.render('edit',{patient});
}
// add new patient
export const store = (req, res) => {
     Patient.save(req.body);
    res.redirect('/patients');
}

export const update = (req, res) => {
     Patient.update(req.params.id,req.body);
    res.redirect('/patients');
}

//delete patient
export const destroy = (req, res) => {
    Patient.remove(req.params.id);
    res.redirect('/patients');
}
export const search = async (req,res)=>{
    
    const patients = await Patient.search(req.query.request);

    const id = req.params.id ? req.params.id : patients[0].code;
    const f_patient = await Patient.getPatient(id);
    res.render('patients/patients', { patients, f_patient });
 
}

export const countSex = async(req,res)=>{
const data = await Patient.countSex();

res.json(data);
res.end();
}