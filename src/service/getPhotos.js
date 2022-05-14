import { API_KEY, API_URL } from '../data'

const getUrl = (rover, page, sol, earth, camera) => {
    const date = sol ? `sol=${sol}&` : `earth_date=${earth}&`;
    const cameraType = camera === 'All' || '' ? '' : `camera=${camera.toLowerCase()}&`

    return (API_URL+`${rover}/photos?${date}${cameraType}page=${page}&api_key=${API_KEY}`)
}

export default function getPhotos({ rover='curiosity', page = 1, sol, earth = '2015-6-3', camera = 'All' } ={}) { 
    const URL = getUrl(rover, page, sol, earth, camera)

    return fetch(URL)
    .then(res => res.json())
    .then(response => {
      const {photos:data=[]} = response
      const photos = data.map(image => {  
          const {img_src:url, id, rover} = image;
          const title = `photo-id: ${id} - rover-id: ${rover.id}`

          return { url, title, id}
        })

      return photos
    })
}
