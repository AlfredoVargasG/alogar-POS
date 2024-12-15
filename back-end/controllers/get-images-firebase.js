const { getImagesUrl } = require('../firebase/firebase-storage')

const getImages = async (req, res) => {
    try {
        const images = await getImagesUrl(req.params.carpeta)
        res.json(images)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getImages };