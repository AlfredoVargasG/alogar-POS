const { ref, listAll, getDownloadURL } = require("firebase/storage");
const { storage } = require('./firebaseConfig')

const getImagesUrl = async (folderPath) => {
  try {
    // Crear referencia al directorio
    const folderRef = ref(storage, folderPath);

    // Listar todos los archivos dentro del directorio
    const listResult = await listAll(folderRef);

    // Obtener las URLs de cada archivo
    let urls = await Promise.all(
      listResult.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return url;
      })
    );

    urls = urls.map((url, index) => {
      return {
        url: url,
        id: index
      };
    })

    return urls;
  } catch (error) {
    console.error('Error getting image URLs:', error);
    throw error;
  }
};

module.exports = { getImagesUrl};

