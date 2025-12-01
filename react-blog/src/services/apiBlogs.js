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
        throw new error(error.message)
    }
} 