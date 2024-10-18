const Comic = require('../models/comic');

exports.createComic = async (req, res) => {
    try {
        const comic = new Comic(req.body);
        await comic.save();
        res.status(201).json(comic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getComics = async (req, res) => {
    const { page = 1, limit = 10, ...filters } = req.query;
    try {
        const comics = await Comic.find(filters)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Comic.countDocuments(filters);
        res.status(200).json({ total: count, page, comics });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getComicById = async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id);
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.status(200).json(comic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateComic = async (req, res) => {
    try {
        const comic = await Comic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.status(200).json(comic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteComic = async (req, res) => {
    try {
        const comic = await Comic.findByIdAndDelete(req.params.id);
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
