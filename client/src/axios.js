import axios from'axios'

const instance= axios.create({
    baseURL:'https://mern-crud-server-pi.vercel.app/'
})

export default instance