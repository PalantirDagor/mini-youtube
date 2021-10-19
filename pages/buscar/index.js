import Layout from '../../component/Layout'
import conectarDB from '../../lib/dbConnect'
import Video from '../../models/Video'
import Link from 'next/dist/client/link'
import { useState } from 'react'

export default function buscar({videos}) {

    const [buscarVideos, setBuscarVideos] = useState([])
    const handleBuscarVideos = e => {
        getVideos(document.getElementById('busqueda').value)
    }

    const getVideos = async (palabraBuscar) => {
        try {
            const res = await fetch(`/api/video?data=${palabraBuscar}`, {
                method: 'GET'
            })
            const buscarRes = await res.json()
            if(buscarRes.data !== undefined){
                setBuscarVideos(buscarRes.data)
            }else{
                document.getElementById("mensaje").innerHTML = "Busqueda sin resultados, intente con otra palabra"                
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout
            title="Mini-Youtube | Busqueda"
            description="Pagina para la busqueda de contenido"
        >
            <h3>Búscar videos:</h3>
            <p>
               <input 
                    type="search" 
                    name="busquedavideo"
                    id="busqueda" 
                    placeholder="Ingrese nombre o etiqueta"
                />
                <input 
                    type="submit" 
                    value="Buscar"
                    onClick={handleBuscarVideos}
                />
	        </p>
            <h2>Resultados de tu Busqueda</h2>
            <br/>
            {buscarVideos.length === 0 ? <div id="mensaje"></div> : buscarVideos.map((video) => (
                <div key={video._id}>
                    <h3>
                        <Link href={`/reproduccion/${video._id}`}>
                            <a>
                                Nombre: {video.nombre} | Etiqueta: {video.etiqueta}
                            </a>
                        </Link>
                    </h3>
                                     
                </div>
            ))}
        </Layout>        
    )
}

export async function getServerSideProps(){
    try {
        await conectarDB()
        const res = await Video.find({})
        const videos = res.map(doc => {
            const video = doc.toObject()
            video._id = `${video._id}`
            return video
        })
        return {props: {videos}}
    } catch (error) {
        console.log(error)
    }
}