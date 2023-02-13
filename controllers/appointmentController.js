// import Appointment from '../models/Appointment.js'
import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js'


export const index = async (req, res)=>{
    const appointments = await Appointment.getAllAppointments();
    const patients = await Patient.getAllPatients();

    res.render('appointments/appointments',{appointments,patients});
}

export const create = async (req,res) => {
    const patients = await Patient.getAllPatients();
    res.render('appointments/create',{patients});
}

export const store = async (req,res)=>{
    await Appointment.save(req.body);
    res.redirect('/appointments');
}
export const edit = async (req,res) => {
    // const patients = await Patient.getAllPatients();

    const appointment = await Appointment.getAppointment(req.params.id);
    res.json({appointment});
}
export const destroy = async (req,res)=>{
    await Appointment.remove(req.params.id);
    res.redirect('/appointments');
}

export const update = async (req,res)=>{
    await Appointment.update(req.params.id, req.body);
    res.redirect('/appointments');

}

export const appCheck = async (req,res)=>{

    const result = await Appointment.getOcuupiedTime(req.params.date);
    res.send([result]);
}
export const dayApp = async (req,res)=>{
    const results = await Appointment.dayApp();
    console.log(results);
    res.render('dashboard', {results});
}