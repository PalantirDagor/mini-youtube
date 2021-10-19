import Layout from '../component/Layout'
import { useState } from 'react'

export default function index() {

    const [form, setForm] = useState({
        archivo: '',
        etiqueta: '',
        nombre: ''
    })

    const [video, setVideo] = useState(null);

    const [ message, setMessage] = useState([])

    const handleChange = e => {
        const {value, name} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const uploadVideo = e => {
        if (e.target.files && e.target.files[0]) {
            const v = e.target.files[0];
            console.log(v)
            setVideo(v);
        }
    }

    const handleSudmit = e => {
        e.preventDefault()
        postData(form)
    }

    const postData = async form => {
        try {
            console.log(form)
            const arrayNombre = video.name.split('.')         
            form.nombre = arrayNombre[0]
            form.archivo = `/videos/${video.name}`
            const res = await fetch('/api/video', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()
            if(!data.success){
                for(const key in data.error.errors){
                    let error = data.error.errors[key]
                    setMessage(oldmessage => [
                        ...oldmessage,
                        {message: error.message}
                    ])
                }
            }else{
                setMessage(oldmessage => [
                    ...oldmessage,
                    {message: 'Video subido con EXITO!!'}
                ])
            }

        } catch (error) {
            console.log(error)
        }
        upload()
    }

    const upload = async () => {
        try {
            const body = new FormData();
            body.append("file", video);
            const res = await fetch("/api/uploadVideo", {
                method: "POST",
                body
            })
        } catch (error){
            console.log(error)
        }
    }

    return (
        <Layout
            title="Mini-Youtube | Subir Videos"
            description="Pagina para subir videos"
        >
            <h2>Sube tu video</h2>
            <form onSubmit={handleSudmit}>
                <p>Agregra una etiqueta para la busqueda</p>
                <input
                    type="text"
                    placeholder="Etiqueta"
                    autoComplete="off"
                    name="etiqueta"
                    value={form.etiqueta}
                    onChange={handleChange} 
                    required
                />
                <br/>
                <input
                    type="file"
                    placeholder="Video"
                    accept="video/*"
                    autoComplete="off"
                    onChange={uploadVideo}
                    required
                />
                <br/>
                <button type="submit">Agregar Video</button>
                {
                    message.map(({message}) => (
                        <p key={message}>{message}</p>
                    ))
                }
            </form>
        </Layout>        
    )
}