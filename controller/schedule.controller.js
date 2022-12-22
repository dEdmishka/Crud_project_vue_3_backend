const db = require('../db/db.js');

const schedule = {};

schedule.createSchedule = async (req, res) => {
    const {name, teacher_id, discipline_id, group_id, time, classroom} = req.body;
    // console.log(name, surname);
    // res.send('ok');
    try {
        await db.query(
            'INSERT INTO schedule(name, teacher_id, discipline_id, group_id, time, classroom) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, teacher_id, discipline_id, group_id, time, classroom]
        );
        res.status(200).json({
            message: 'Successful added schedule!',
            schedule: {name, teacher_id, discipline_id, group_id, time, classroom}
        })
    } catch (e) {
        res.status(500).json({
            message: "ERROR", e
        });
    }
};

schedule.readSchedule = async (req, res)=> {
    const id = req.params.id;
    try {
        const schedule = await (await db.query(
            'SELECT schedule.group_id, schedule.teacher_id, schedule.discipline_id, schedule.name AS schedule_name, schedule.schedule_id, groups.name AS group_name, teachers.name AS teacher_name, disciplines.name AS discipline_name, schedule.time, schedule.classroom FROM schedule INNER JOIN teachers ON schedule.teacher_id = teachers.teacher_id INNER JOIN groups ON schedule.group_id = groups.group_id INNER JOIN disciplines ON schedule.discipline_id = disciplines.discipline_id WHERE schedule_id = $1',
            [id]
        )).rows[0];
        res.status(200).json({schedule});
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

schedule.getSchedules = async (req, res)=> {
    // res.send('ok');
    // const {t_id, d_id, g_id} = req.query;
    // console.log(f_id, d_id, g_id).
    try {
        const schedules = await db.query(
            'SELECT schedule.group_id, schedule.teacher_id, schedule.discipline_id, schedule.name AS schedule_name, schedule.schedule_id, groups.name AS group_name, teachers.name AS teacher_name, disciplines.name AS discipline_name, schedule.time, schedule.classroom FROM schedule INNER JOIN teachers ON schedule.teacher_id = teachers.teacher_id INNER JOIN groups ON schedule.group_id = groups.group_id INNER JOIN disciplines ON schedule.discipline_id = disciplines.discipline_id;'
        );
        res.status(200).json(schedules.rows);
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

schedule.updateSchedule  = async (req, res)=> {
    const id = req.params.id;
    const {name, teacher_id, discipline_id, group_id, time, classroom} = req.body;
    try {
        await db.query(
            'UPDATE schedule SET name=$1, teacher_id=$2, discipline_id=$3, group_id=$4, time=$5, classroom=$6 WHERE schedule_id=$7',
            [name, teacher_id, discipline_id, group_id, time, classroom, id]
        );
        res.status(200).json({
            message: 'Successful edited schedule!',
            schedule: {name, teacher_id, discipline_id, group_id, time, classroom}
        });
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

schedule.deleteSchedule  = async (req, res)=> {
    const id = req.params.id;
    try {
        await db.query(
            'DELETE FROM schedule WHERE schedule_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Successful deleted schedule!'
        });
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

module.exports = schedule;