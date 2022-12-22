const db = require('../db/db.js');

const department = {};

department.createDepartment = async (req, res) => {
    const {faculty_id, name, short_name} = req.body;
    // console.log(name, surname);
    // res.send('ok');
    try {
        await db.query(
            'INSERT INTO departments (faculty_id, name, short_name) VALUES ($1, $2, $3)',
            [faculty_id, name, short_name]
        );
        res.status(200).json({
            message: 'Successful added department!',
            department: {faculty_id, name, short_name}
        })
    } catch (e) {
        res.status(500).json({
            message: "ERROR", e
        });
    }
};

department.readDepartment = async (req, res) => {
    const id = req.params.id;
    try {
        const department = await (await db.query(
            // 'SELECT * FROM departments WHERE department_id = $1',
            'SELECT departments.faculty_id, faculty.short_name AS faculty_name, departments.department_id, departments.name AS department_name, departments.short_name FROM faculty JOIN departments ON faculty.faculty_id = departments.faculty_id WHERE department_id = $1;',
            [id]
        )).rows[0];
        res.status(200).json({department});
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};
//faculty.getFaculties = async (req, res)=> {
//     try {
//         const faculties = await db.query(
//             'SELECT * FROM faculty'
//         );
//         res.status(200).json(faculties.rows);
//     } catch (e) {
//         res.status(500).json({
//             message: 'ERROR', e
//         });
//     }
//
// };
department.getDepartments = async (req, res) => {
    try {
        const departments = await db.query(
            // 'SELECT * FROM departments'
            'SELECT faculty.short_name AS faculty_name, departments.department_id, departments.name AS department_name, departments.short_name FROM faculty JOIN departments ON faculty.faculty_id = departments.faculty_id;'
        );
        res.status(200).json(departments.rows);
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

// department.getFaculties = async (req, res)=> {
//     try {
//         const faculties = await db.query(
//             'SELECT faculty_id FROM faculty'
//         );
//         res.status(200).json(faculties.rows);
//     } catch (e) {
//         res.status(500).json({
//             message: 'ERROR', e
//         });
//     }
//
// };

//department.getDepartments = async (req, res)=> {
//     const id = req.query.id;
//     try {
//         const departments = await db.query(
//             'SELECT * FROM departments WHERE faculty_id=$1',
//             [id]
//         );
//         res.status(200).json(departments.rows);
//     } catch (e) {
//         res.status(500).json({
//             message: 'ERROR', e
//         });
//     }
//
// };

department.updateDepartment = async (req, res) => {
    const id = req.params.id;
    const {faculty_id, name, short_name} = req.body;
    try {
        await db.query(
            'UPDATE departments SET faculty_id=$1, name=$2, short_name=$3 WHERE department_id=$4',
            [faculty_id, name, short_name, id]
        );
        res.status(200).json({
            message: 'Successful edited department!',
            department: {faculty_id, name, short_name}
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

department.deleteDepartment = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query(
            'DELETE FROM departments WHERE department_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Successful deleted department!'
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};



module.exports = department;