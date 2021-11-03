exports.getGuide = async (req, res) => {
    try {
        res.render('guide');
    } catch (err) {
        res.status(400).send(err);
    }
};