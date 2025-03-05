import axios from'axios'

const instance= axios.create({
    baseURL:'https://mern-crud-server-o03h186dy-mart-lepiks-projects.vercel.app'
})

export default instance