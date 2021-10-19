import mongoose from 'mongoose'

const connectionURL = 'mongodb://127.0.0.1:27017/mini-youtube'

const conectarDB = async() => {
    try {
        await mongoose.connect(connectionURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false, 
        })
        console.log('Conectado a la BD')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default conectarDB