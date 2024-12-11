const supabase = require('../db');

const getAllCategories = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categorias' });
    }
};

module.exports = { getAllCategories };