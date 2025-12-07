import api from "@/api";

export async function getBlogs(page) {
  try {
    const response = await api.get(`blogs?page=${page}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getBlog(id) {
    try {
    const response = await api.get(`blogs/${id}/`)
    return response.data
}  
    catch (error) {
        throw new Error(error.message)
    }
} 

export async function register_user(data) {
    try {
        const response = await api.post('register_user/', data)
        return response.data

    } catch (err) {
        console.log(err)

        if (err.status == 400){
            throw new Error("Username Already Exists")
        }
        throw new Error(err.message)
    }
}
export async function signin(data) {
    try {
        const response = await api.post('token/', data)
        return response.data

    } catch (err) {
        console.log(err)

        if (err.status == 400){
            throw new Error("Invalid Credentials")
        }
        throw new Error(err.message)
    }
}
export async function get_Username() {
    try {
        const response = await api.get('get_username')
        return response.data

    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

export async function create_post(data) {
    try {
        const response = await api.post("create_blog/", data)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}