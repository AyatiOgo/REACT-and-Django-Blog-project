import Badge from "@/ui_components/Badge"
import BlogWriter from "@/ui_components/BlogWriter"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { delete_post, getBlog } from "@/services/apiBlogs"
import { useNavigate, useParams } from "react-router-dom"
import { BASE_URL } from "@/api"
import Spinner from "@/ui_components/Spinner"
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Modal from "@/ui_components/Modal"
import CreatePostPage from "./CreatePostPage"
import { useState } from "react"
import { toast } from "react-toastify"


const DetailPage = ({username, isAuntheticated}) => {
  
  const { id }= useParams()

  const {data:blog, isPending } = useQuery({
    queryKey: ["blogs", id],
    queryFn: ()=> getBlog(id)
  })

  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const queryClient = new QueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id)=> delete_post(id),
    onSuccess : ()=> {
      navigate("/")
      queryClient.invalidateQueries({queryKey: ['blogs']})
      toast.success("Post deleted Succesfully")
    },
    onError: (err)=> {
      toast.error(err.message)
    }

  })

  function handleDelete(id) {
    const popUp = window.confirm("Are you sure you want to delete this post?")
    if(!popUp){
      return;
    }

    deleteMutation.mutate(id)
  }

  function handleToggle() {
    setShowModal((curr)=> !curr)
  }

  console.log(blog)

  if (isPending) {
    return <Spinner/>
  }

  return (
    <>
    <div className="padding-dx max-container py-9">
      <Badge category={blog.category}  />
      <div className="flex justify-between items-center">
        <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
          {blog.title}
        </h2>

      <span className="flex justify-between items-center gap-2">
          { isAuntheticated && username === blog.author.username ?
          <>
          <HiPencilAlt onClick={handleToggle}  className="dark:text-white text-3xl cursor-pointer" />
          <MdDelete className="dark:text-white text-3xl cursor-pointer" onClick={ ()=>  handleDelete(blog?.id)} />
          </>
          : ""
          }
        </span>
      </div>

      <BlogWriter blog={blog} />

      <div className="w-full h-[350px] my-9 overflow-hidden rounded-sm">
        <img className="w-full h-full object-cover rounded-sm" src={`${BASE_URL}${blog.featured_img}`} />
      </div>
      <p className="text-[16px] leading-2rem text-justify text-[#3B3C4A] dark:text-[#BABABF]">
        {blog.content}
      </p>
    </div>

{ 
  showModal &&
    <Modal> 
      <CreatePostPage blog={blog} setShowModal={setShowModal}  />
    </Modal>}
    </>
  )
}

export default DetailPage