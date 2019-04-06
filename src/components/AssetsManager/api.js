import axios from 'axios'

export async function getPolyData(value) {
    const API_KEY = 'AIzaSyBcgXxcdwL2JoPLHKLP3yVpHPqGmzEYRUw';
    const url = `https://poly.googleapis.com/v1/assets?keywords=${value}&format=OBJ&key=${API_KEY}`;
    const res = await axios.get(url)
    return res.data
  }