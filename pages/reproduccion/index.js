import Layout from '../../component/Layout'
import Image from 'next/image'
import conectarDB from '../../lib/dbConnect'
import Video from '../../models/Video'
import { useState } from 'react'

export default function reproduccion({videos}) {

    const [hiddenLike, setHiddenLike] = useState(true);
    const [hiddenNoLike, setHiddenNoLike] = useState(true);
    const video = videos.length === 1 ? videos[0] : []
    const urlVideo = video.archivo
    let contLikes = video.meGusta
    let contDislikes = video.noMeGusta
    let likes = false
    let disLikes = false
    
    const handleChangeLike = e => {
        setHiddenLike(!hiddenLike)
        setHiddenNoLike(true)
        if(!hiddenLike){
            video.meGusta = video.meGusta - 1
            putLike(video._id)
        } else{
            video.meGusta = video.meGusta + 1
            likes = true
            if(disLikes){
                video.noMeGusta = video.noMeGusta - 1
            }                
            putLike(video._id)
        } 
    }

    const handleChangeNoLike = e => {
        setHiddenNoLike(!hiddenNoLike)
        setHiddenLike(true)
        console.log(disLikes)
        if(!hiddenNoLike){
            video.noMeGusta = video.noMeGusta - 1
            putLike(video._id)
        } else{
            video.noMeGusta = video.noMeGusta + 1
            disLikes = true
            if(likes){
                video.meGusta = video.meGusta - 1
            }
            putLike(video._id)
        }   
    }

    const putLike = async (id) => {
        try {
            console.log(id)
            const res = await fetch(`/api/video?id=${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(video)
            })

            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Layout
            title="Mini-Youtube | Reproduccion"
            description="Pagina para repoducir los videos"
        >
            <h2>Reproduce el video</h2>
            <br/>
            <video
                widht={320}
                height={240}
                controls
            >
                <source src={urlVideo === undefined ? '' : urlVideo } type="video/mp4"></source>
            </video>
            <br/>
            <Image
                id="meGusta"
                src={
                    hiddenLike
                      ? '/img/meGusta.png'
                      : '/img/MeGustaSelec.png'
                  }
                height={35}
                width={35}
                alt="Me gusta"
                onClick={handleChangeLike}
            >
            </Image>
            <span>{contLikes === undefined ? 0 : contLikes}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Image
                id="noMeGusta"
                src={
                    hiddenNoLike
                      ? '/img/noMeGusta.png'
                      : '/img/noMeGustaSelec.png'
                  }
                height={35}
                width={35}
                alt="No me gusta"
                onClick={handleChangeNoLike}
            >
            </Image>
            <span>{contDislikes === undefined ? 0 : contDislikes}</span>
            <h3>Nombre: {video.length === 1 ? video.nombre: 'No hay videos subidos!'}</h3>
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