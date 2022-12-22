const db = require('../db/db.js');

const group = {};

group.createGroup = async (req, res) => {
    const {department_id, name, course} = req.body;
    // console.log(name, surname);
    // res.send('ok');
    try {
        await db.query(
            'INSERT INTO groups(department_id, name, course) VALUES ($1, $2, $3)',
            [department_id, name, course]
        );
        res.status(200).json({
            message: 'Successful added group!',
            group: {department_id, name, course}
        })
    } catch (e) {
        res.status(500).json({
            message: "ERROR", e
        });
    }
};

group.readGroup = async (req, res)=> {
    const id = req.params.id;
    try {
        const group = await (await db.query(
            // 'SELECT * FROM groups WHERE group_id = $1',
            'SELECT groups.department_id, departments.short_name AS department_name, groups.group_id, groups.course, groups.name AS group_name, departments.short_name FROM groups JOIN departments ON departments.department_id = groups.department_id WHERE group_id = $1;',
            [id]
        )).rows[0];
        res.status(200).json({group});
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

group.getGroups = async (req, res)=> {
    try {
        const groups = await db.query(
            // 'SELECT * FROM groups'
            'SELECT departments.short_name AS department_name, departments.short_name, groups.group_id, groups.course, groups.name AS group_name, groups.department_id FROM groups JOIN departments ON departments.department_id = groups.department_id;',
        );
        res.status(200).json(groups.rows);
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

group.updateGroup  = async (req, res)=> {
    const id = req.params.id;
    const {department_id, name, course} = req.body;
    try {
        await db.query(
            'UPDATE groups SET department_id=$1, name=$2, course=$3 WHERE group_id=$4',
            [department_id, name, course, id]
        );
        res.status(200).json({
            message: 'Successful edited group!',
            teacher: {department_id, name, course}
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

group.deleteGroup  = async (req, res)=> {
    const id = req.params.id;
    try {
        await db.query(
            'DELETE FROM groups WHERE group_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Successful deleted group!'
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

module.exports = group;