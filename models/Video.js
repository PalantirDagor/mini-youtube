import mongoose from 'mongoose'

const VideoShema = new mongoose.Schema({
    archivo: {
        type: String,
        trim: true,
        required: [true, 'Por favor suba el archivo de video']
    },
    etiqueta: {
        type: String,
        trim: true,
        required: [true, 'Por favor ingrese la etiqueta para la busqueda']
    },
    nombre: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Por favor ingrese el nombre del video']
    },
    meGusta: {
        type: Number,
        default: 0
    },
    noMeGusta: {
        type: Number,
        default: 0
    }
})

export default mongoose.models.Video || mongoose.model('Video', VideoShema)