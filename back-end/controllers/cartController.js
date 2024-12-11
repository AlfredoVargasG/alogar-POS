const supabase = require('../db');

const addToCart = async (req, res) => {
    const { productId, userId, quantity } = req.body;
    try {
        const { error } = await supabase.from('cart_items').insert([{ product_id: productId, user_id: userId, quantity }]);
        if (error) throw error;
        res.json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar al carrito' });
    }
};

module.exports = { addToCart };
