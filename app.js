const express = require('express');

const PORT = process.env.PORT || 3000;

const studentRouter = require('./routes/student.router.js');
const teacherRouter = require('./routes/teacher.router.js');
const groupRouter = require('./routes/groups.router.js');
const disciplineRouter = require('./routes/disciplines.router.js');
const departmentRouter = require('./routes/departments.router.js');
const facultyRouter = require('./routes/faculty.router.js');
const scheduleRouter = require('./routes/schedule.router.js');
const faqRouter = require('./routes/faq.router.js');
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(cors());
app.use(morgan('tiny'));

app.use('/', studentRouter);
app.use('/', teacherRouter);
app.use('/', groupRouter);
app.use('/', disciplineRouter);
app.use('/', departmentRouter);
app.use('/', facultyRouter);
app.use('/', scheduleRouter);
app.use('/', faqRouter);

app.get('/', (req, res) => {
    res.send('Hello world!!!')
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})