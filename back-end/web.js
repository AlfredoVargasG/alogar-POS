const axios = require('axios');
const cheerio = require('cheerio');
const supabase = require('./db'); // Asegúrate de configurar correctamente tu cliente Supabase
const urlPrincipal = 'https://alogar.cl';

async function fetchProducts() {
    try {
        const { data } = await axios.get(`${urlPrincipal}`);
        const $ = cheerio.load(data);
        let products = [];

        // Obtener los links de las categorías
        const { data: categories, error: fetchError } = await supabase.from('categories').select('*');
        if (fetchError) {
            console.error('Error al obtener categorías de la base de datos:', fetchError.message);
            return;
        }

        for (let category of categories) {
            const { data } = await axios.get(category.url);
            const $ = cheerio.load(data);
            let pages = 1;

            // Obtener el número de páginas
            $('.pagination__text').each((index, element) => {
                pages = Number($(element).text().trim().split(' ')[3]);
            });

            // Recorremos todas las páginas de cada categoría
            for (let i = 1; i <= pages; i++) {
                const { data } = await axios.get(`${category.url}/?page=${i}`);
                const $ = cheerio.load(data);

                $('.grid-view-item').each((index, element) => {
                    const name = $(element).find('.h4.grid-view-item__title.product-card__title').text().trim();
                    const priceElement = $(element).find('.price.price--listing');
                    const price = $(element).find('.price.price--listing').attr('class').includes('on-sale') ?
                        Number(priceElement.find('.price-item.price-item--sale').text().trim().replace('$', '').replace('.', '')) :
                        Number(priceElement.find('.price-item.price-item--regular').text().trim().replace('$', '').replace('.', ''));
                    const image = 'https:' + $(element).find('.grid-view-item__image').attr('data-src').replace('{width}', '300');

                    products.push({ name, price, image, category: category.name });
                });
            }
        }

        // Contar cuántas veces se repite cada nombre de producto y almacenar las categorías asociadas
        const productCounts = products.reduce((acc, product) => {
            if (!acc[product.name]) {
                acc[product.name] = { count: 0, categories: [] };
            }
            acc[product.name].count += 1;
            acc[product.name].categories.push(product.category);
            return acc;
        }, {});

        // Agregar las categorías a cada producto en la lista principal
        const productsWithCategories = products.map(product => {
            const countInfo = productCounts[product.name];
            const { category, ...rest } = product;  // Eliminar 'category' usando destructuración
            return {
                ...rest,  // Mantener todas las demás propiedades del producto
                categories: countInfo.categories
            };
        
        });

        // Filtrar los productos duplicados
        const uniqueProducts = productsWithCategories.filter((product, index, self) =>
            index === self.findIndex(p => (
                p.name === product.name
            ))
        );

        // Validar si los productos ya existen en la base de datos
        const { data: productsInDB, error: fetchError2 } = await supabase.from('products').select('name');
        if (fetchError2) {
            console.error('Error al obtener productos de la base de datos:', fetchError2.message);
            return;
        }

        const existingNames = productsInDB.map(product => product.name);
        const newProducts = uniqueProducts.filter(product => !existingNames.includes(product.name));

        if (newProducts.length > 0) {
            // Insertar los nuevos productos
            const { error: insertError } = await supabase.from('products').insert(newProducts);
            if (insertError) {
                console.error('Error al insertar productos:', insertError.message);
                return;
            }
            console.log('Productos insertados exitosamente:', newProducts.length);
        }else {
            console.log('No hay productos nuevos para insertar');
        }
    } catch (error) {
        console.error('Error al obtener o procesar productos:', error.message);
    }
}




async function fetchCategories() {
    try {
        // Obtener las categorías
        const { data } = await axios.get(`${urlPrincipal}`);
        const $ = cheerio.load(data);
        let categories = [];

        // Obtener las categorías
        $('.collection-grid-item__title.h3').each((index, element) => {
            const name = $(element).text().trim();
            categories.push({
                id: index + 1,
                name
            });
        });

        // Obtener las URLs de las categorías
        $('.collection-grid-item__link').each((index, element) => {
            const url = $(element).attr('href');
            categories[index].url = urlPrincipal + url;
        });

        // Validar si las categorías ya existen en la base de datos
        const { data: categoriesInDB, error: fetchError } = await supabase.from('categories').select('name');
        if (fetchError) {
            console.error('Error al obtener categorías de la base de datos:', fetchError.message);
            return;
        }

        const existingNames = categoriesInDB.map(category => category.name);
        const newCategories = categories.filter(category => !existingNames.includes(category.name));

        if (newCategories.length > 0) {
            // Insertar las nuevas categorías
            const { error: insertError } = await supabase.from('categories').insert(newCategories);
            if (insertError) {
                console.error('Error al insertar categorías:', insertError.message);
                return;
            }
            console.log('Categorías insertadas exitosamente:', newCategories.length);
        }else {
            console.log('No hay categorías nuevas para insertar');
        }


    } catch (error) {
        console.error('Error al obtener o procesar categorías:', error.message);
    }
}


module.exports = {
    fetchProducts,
    fetchCategories
};