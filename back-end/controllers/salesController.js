const supabase = require('../extra/db')

const processCheckout = async (req, res) => {
    const { userId } = req.body;
    try {
        const { data: items, error: fetchError } = await supabase
            .from('cart_items')
            .select('*, products(price)')
            .eq('user_id', userId);
        if (fetchError) throw fetchError;

        const total = items.reduce((sum, item) => sum + item.products.price * item.quantity, 0);

        const { error: insertError } = await supabase.from('sales').insert([{ user_id: userId, total }]);
        if (insertError) throw insertError;

        const { error: deleteError } = await supabase.from('cart_items').delete().eq('user_id', userId);
        if (deleteError) throw deleteError;

        res.json({ message: 'Compra procesada exitosamente', total });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la compra' });
    }
};

module.exports = { processCheckout };
