const db = require('../db/db.js');

const discipline = {};

discipline.createDiscipline = async (req, res) => {
    const {name} = req.body;
    // console.log(name, surname);
    // res.send('ok');
    try {
        await db.query(
            'INSERT INTO disciplines(name) VALUES ($1)',
            [name]
        );
        res.status(200).json({
            message: 'Successful added discipline!',
            discipline: {name}
        })
    } catch (e) {
        res.status(500).json({
            message: "ERROR", e
        });
    }
};

discipline.readDiscipline = async (req, res)=> {
    const id = req.params.id;
    try {
        const discipline = await (await db.query(
            'SELECT * FROM disciplines WHERE discipline_id = $1',
            [id]
        )).rows[0];
        res.status(200).json({discipline});
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

discipline.getDisciplines = async (req, res)=> {
    try {
        const disciplines = await db.query(
            'SELECT * FROM disciplines'
        );
        res.status(200).json(disciplines.rows);
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

discipline.updateDiscipline = async (req, res)=> {
    const id = req.params.id;
    const {name} = req.body;
    try {
        await db.query(
            'UPDATE disciplines SET name=$1 WHERE discipline_id=$2',
            [name, id]
        );
        res.status(200).json({
            message: 'Successful edited discipline!',
            discipline: {name}
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

discipline.deleteDiscipline  = async (req, res)=> {
    const id = req.params.id;
    try {
        await db.query(
            'DELETE FROM disciplines WHERE discipline_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Successful deleted discipline!'
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

module.exports = discipline;