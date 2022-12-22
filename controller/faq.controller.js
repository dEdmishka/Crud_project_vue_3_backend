const db = require('../db/db.js');

const faq = {};

faq.createFaq = async (req, res) => {
    const {faq_order, content} = req.body;
    // console.log(name, surname);
    // res.send('ok');
    try {
        await db.query(
            'INSERT INTO faq(faq_order, content) VALUES ($1, $2)',
            [faq_order, content]
        );
        res.status(200).json({
            message: 'Successful added faq!',
            faq: {faq_order, content}
        })
    } catch (e) {
        res.status(500).json({
            message: "ERROR", e
        });
    }
};

faq.readFaq = async (req, res)=> {
    const id = req.params.id;
    try {
        const faq = await (await db.query(
            'SELECT * FROM faq WHERE faq_id = $1',
            [id]
        )).rows[0];
        res.status(200).json({faq});
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

faq.getFaqs = async (req, res)=> {
    try {
        const faq = await db.query(
            'SELECT * FROM faq'
        );
        res.status(200).json(faq.rows);
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }

};

faq.updateFaq = async (req, res)=> {
    const id = req.params.id;
    const {faq_order, content} = req.body;
    try {
        await db.query(
            'UPDATE faq SET faq_order=$1, content=$2 WHERE faq_id=$3',
            [faq_order, content, id]
        );
        res.status(200).json({
            message: 'Successful edited faq!',
            faq: {faq_order, content}
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

faq.deleteFaq  = async (req, res)=> {
    const id = req.params.id;
    try {
        await db.query(
            'DELETE FROM faq WHERE faq_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Successful deleted faq!'
        })
    } catch (e) {
        res.status(500).json({
            message: 'ERROR', e
        });
    }
};

module.exports = faq;