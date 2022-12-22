const db = require('../db/db.js');

const teacher = {};

teacher.createTeacher = async (req, res) => {
    const {name, surname, email, phone} = req.body;
    // console.log(name, surname);
    // res.send('ok');
    try {
        await db.query(
            'INSERT INTO teachers(name, surname, email, phone) VALUES ($1, $2, $3, $4)',
            [name, surname, email, phone]
        );
        res.status(200).json({
            message: 'Successful added teacher!',
            teacher: {name, surname, email, phone}
        })
    } catch (e) {
        res.status(500).json({
            message: "ERROR", e
        });
    }
};

teacher.readTeacher = async (req, res)=> {
    const id = req.params.id;
    try {
        const teacher = await (await db.query(
            'SELECT * FROM teachers WHERE teacher_id = $1',
            [id]
        )).rows[0];
        res.status(200).json({teacher});
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

teacher.getTeachers = async (req, res)=> {
    try {
        const teachers = await db.query(
            'SELECT * FROM teachers'
        );
        res.status(200).json(teachers.rows);
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

teacher.updateTeacher  = async (req, res)=> {
    const id = req.params.id;
    const {name, surname, email, phone} = req.body;
    try {
        await db.query(
            'UPDATE teachers SET name=$1, surname=$2, email=$3, phone=$4 WHERE teacher_id=$5',
            [name, surname, email, phone, id]
        );
        res.status(200).json({
            message: 'Successful edited teacher!',
            teacher: {name, surname, email, phone}
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

teacher.deleteTeacher  = async (req, res)=> {
    const id = req.params.id;
    try {
        await db.query(
            'DELETE FROM teachers WHERE teacher_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Successful deleted teacher!'
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

module.exports = teacher;