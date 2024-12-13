const supabase = require('../db');

const getAllProducts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const { data, error } = await supabase
            .from('products')
            .select()
            .contains('categories', [category])

        if (error) res.status(500).json({ error: 'Error al obtener productos', message: error.message });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

module.exports = { getAllProducts, getProductsByCategory };