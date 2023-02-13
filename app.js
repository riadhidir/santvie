import  express   from 'express';
import * as patientController from './controllers/patientController.js';
import * as appointmentController from './controllers/appointmentController.js';

// express app
const app = express();


// register vue engine
app.set('view engine' ,'ejs');
// listen for requires
app.listen(3000, ()=>{console.log('http://localhost:3000')});
// middleware & static files
 
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/dashboard', appointmentController.dayApp);

app.get('/patients/count/sex',patientController.countSex);



// app.get('/patients',  patientController.index);
    
// appointments
app.get("/sandbox",(req,res)=>{
    res.render('patients/patients');
});

app.get('/appointments/free/:date',appointmentController.appCheck);
app.get('/appointments', appointmentController.index);
app.get('/appointments/create', appointmentController.create);
app.get('/appointments/:id/edit',appointmentController.edit);
app.post('/appointments/:id/delete',appointmentController.destroy);

app.post('/appointments',appointmentController.store);
app.post('/appointments/:id',appointmentController.update);


// patient

app.get('/patients/create',patientController.create);//works
app.get('/patients/search',patientController.search);//works
app.get('/patients(/:id)?',patientController.index);//works
app.post('/patients/:id/delete',patientController.destroy); //works

// app.get('/patients/:id/edit', patientController.edit);
app.post('/patients/:id',patientController.update);//works

app.post('/patients',patientController.store); //works


// app.get('/index', patientController.index);