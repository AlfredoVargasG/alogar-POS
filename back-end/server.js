const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const salesRouter = require('./routes/sales');
const cartRouter = require('./routes/cart');
const categoriesRouter = require('./routes/categories');
const { fetchProducts, fetchCategories } = require('./web');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());

// Permitir todas las solicitudes de cualquier origen (para desarrollo)
app.use(cors());


// Función para obtener productos y luego categorías
async function initializeData() {
    try {
        await fetchCategories();
        await fetchProducts();
    } catch (error) {
        console.error('Error al inicializar los datos:', error.message);
    }
}

// Inicializar datos
initializeData();

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter)
app.use('/api/sales', salesRouter);
app.use('/api/cart', cartRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});