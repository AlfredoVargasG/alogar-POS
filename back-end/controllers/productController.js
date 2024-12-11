const supabase = require('../db');

const getAllProducts = async (req, res) => {
    try {
        // Obtener los parámetros de paginación de la consulta
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Consulta con paginación
        const { data, error, count } = await supabase
            .from('products')
            .select('*', { count: 'exact' })
            .range(offset, offset + limit - 1);

        if (error) throw error;

        // Calcular el número total de páginas
        const totalPages = Math.ceil(count / limit);

        // Enviar los productos y la paginación
        res.json({ products: data, totalPages });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

module.exports = { getAllProducts };