// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import conectarDB from "../../lib/dbConnect"
import Video from '../../models/Video'

export default async function handler(req, res) {

  await conectarDB()

  const {
    method,
    query: { id },
    query: { data },
  } = req

  switch(method){
    case 'POST':
      try {
        const video = new Video(req.body)
        console.log(video)
        await video.save()

        return res.json({success: true, video})
      } catch (error) {
        res.status(401).json({success: false, error})
      }
    
    case 'PUT':
      try{
        const video = await Video.findByIdAndUpdate(
            id,
            req.body,
            {
              new: true,
              runValidators: true
            }
          )

          if (!video) {
            return res.status(404).json({ success: false });
          }

          return res.json({ success: true, data: video });
      } catch(error){
        res.status(401).json({success: false, error})
      }

      case 'GET':
      try{
        const listaVideos = await Video.find(
            { 
              etiqueta: data
            }
          )
          
          if (listaVideos.length === 0) {
            const video =  await Video.find(
              { 
                nombre: data
              }
            )
            
            if(video.length === 0){
              return res.status(404).json({ success: false });
            }

            return res.json({ success: true, data: video });
          }

          return res.json({ success: true, data: listaVideos });
      } catch(error){
        res.status(401).json({success: false, error})
      }

    default:
      return res.status(500).json({success: false, error})
  }
}
