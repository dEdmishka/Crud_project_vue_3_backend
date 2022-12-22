const db = require('../db/db.js');

const faculty = {};

faculty.createFaculty = async (req, res) => {
    const {name, short_name} = req.body;
    // console.log(name, surname);
    // res.send('ok');
    try {
        await db.query(
            'INSERT INTO faculty(name, short_name) VALUES ($1, $2)',
            [name, short_name]
        );
        res.status(200).json({
            message: 'Successful added faculty!',
            faculty: {name, short_name}
        })
    } catch (e) {
        res.status(500).json({
            message: "ERROR", e
        });
    }
};

faculty.readFaculty = async (req, res)=> {
    const id = req.params.id;
    try {
        const faculty = await (await db.query(
            'SELECT * FROM faculty WHERE faculty_id = $1',
            [id]
        )).rows[0];
        res.status(200).json({faculty});
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

faculty.getFaculties = async (req, res)=> {
    try {
        const faculties = await db.query(
            'SELECT * FROM faculty'
        );
        res.status(200).json(faculties.rows);
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

faculty.updateFaculty = async (req, res)=> {
    const id = req.params.id;
    const {name, short_name} = req.body;
    try {
        await db.query(
            'UPDATE faculty SET name=$1, short_name=$2 WHERE faculty_id=$3',
            [name, short_name, id]
        );
        res.status(200).json({
            message: 'Successful edited faculty!',
            faculty: {name, short_name}
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

faculty.deleteFaculty  = async (req, res)=> {
    const id = req.params.id;
    try {
        await db.query(
            'DELETE FROM faculty WHERE faculty_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Successful deleted faculty!'
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

module.exports = faculty;