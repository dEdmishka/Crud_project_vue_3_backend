const db = require('../db/db.js');

const student = {};

student.createStudent = async (req, res) => {
    const {group_id, name, email, phone} = req.body;
    // console.log(name);
    // res.send('ok');
    try {
        await db.query(
            'INSERT INTO students(group_id, name, email, phone) VALUES ($1, $2, $3, $4)',
            [group_id, name, email, phone]
        );
        res.status(200).json({
            message: 'Successful added student!',
            student: {group_id, name, email, phone}
        })
    } catch (e) {
        res.status(500).json({
            message: "ERROR", e
        });
    }
};

student.readStudent = async (req, res)=> {
    const id = req.params.id;
    try {
        const student = await (await db.query(
            // 'SELECT * FROM students WHERE student_id = $1',
            'SELECT students.group_id, students.name AS student_name, students.student_id, groups.name AS group_name, groups.course AS group_course, students.email, students.phone FROM groups JOIN students ON groups.group_id = students.group_id WHERE student_id = $1;',
            [id]
        )).rows[0];
        res.status(200).json({student});
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

student.getStudents = async (req, res)=> {
    try {
        const students = await db.query(
            // 'SELECT * FROM students WHERE group_id=$1',
            'SELECT students.name AS student_name, students.student_id, groups.name AS group_name, groups.course AS group_course, students.email, students.phone FROM groups JOIN students ON groups.group_id = students.group_id;'
        );
        res.status(200).json(students.rows);
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

student.updateStudent  = async (req, res)=> {
    const id = req.params.id;
    const {group_id, name, email, phone} = req.body;
    console.log(req.body);
    try {
        await db.query(
            'UPDATE students SET group_id=$1, name=$2, email=$3, phone=$4 WHERE student_id=$5',
            [group_id, name, email, phone, id]
        );
        res.status(200).json({
            message: 'Successful edited student!',
            teacher: {group_id, name, email, phone}
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

student.deleteStudent  = async (req, res)=> {
    const id = req.params.id;
    try {
        await db.query(
            'DELETE FROM students WHERE student_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Successful deleted student!'
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

module.exports = student;