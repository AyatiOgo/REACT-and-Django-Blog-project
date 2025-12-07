import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
  } from "@/components/ui/select"
import { useForm } from "react-hook-form";
import InputError from "@/ui_components/InputError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_post, update_blog } from "@/services/apiBlogs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { IoMdClose } from "react-icons/io";


function CreatePostPage({blog, isAuntheticated, setShowModal }) {

  const {register, handleSubmit, formState : {errors} , setValue } = useForm({defaultValues: blog ? blog : {} })

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const blogID = blog?.id

  const updateMutation = useMutation({
  mutationFn : ({data, id})=> update_blog(data, id),
  onSuccess: ()=> {
    toast.success("Post Update Succesfully")
    queryClient.invalidateQueries({queryKey:['blogs']})
    setShowModal(false)
    console.log(" Post Update Succesfully ")
  },
  onError: (err)=> {
     toast.error(err.message);
      console.log("Error updating blog", err);
    }
    })

  const mutation = useMutation({
    mutationFn: (data)=> create_post(data),
    onSuccess: ()=> {
      toast.success("New Post Added Succesfully")
      queryClient.invalidateQueries({queryKey:['blogs']})
      navigate('/')
    },
    onError: (errors)=> {
      toast.error(errors.message)
    }
  })


  function onSubmit(data) {

  const formData = new FormData()
    formData.append("title", data.title)
    formData.append("content", data.content)
    formData.append("category", data.category)
    if (data.featured_img && data.featured_img[0]) {
      if (data.featured_img[0] != "/") {
        formData.append("featured_img", data.featured_img[0]);
      }
    }

    if(blog) {
      updateMutation.mutate({data:formData, id: blogID})
    }
    else{
        mutation.mutate(formData)
    }

    }

    if(isAuntheticated == false) {
      navigate("signin")
    }

    return (
<form 
    onSubmit={handleSubmit(onSubmit)}
    className={`${blog && "h-[90%] overflow-auto relative"}   md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}>
     { blog  && <IoMdClose className="absolute top-5 right-5 text-3xl cursor-pointer" onClick={()=> setShowModal(false)} /> }
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">{blog? "Update Post" : " Create Post"}</h3>
        
        <p>{ blog ? "Update Blog Post" : "Create a new post and share your ideas."}</p>
        
      </div>

      <div className="flex flex-col">
        <Label htmlFor="title" className="dark:text-[97989F]">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required : "This Field is Required",
            minLength : {
              value: 3,
              message: "Tile Must be over 3 characters"
            }
          }  )}
          placeholder="Give your post a title"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px]"
        />
        {errors?.title?.message && <InputError> {errors?.title?.message}  </InputError> }
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          {...register("content", {
            required : "Content Field is Required",
            minLength : {
              value: 3,
              message: "Content Must be over 3 characters"
            }
          }  )}
          placeholder="Write your blog post"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[400px] text-justify"
        />
        {errors?.content?.message &&  <InputError> {errors?.content?.message}  </InputError> }
      </div>

      <div className="w-full">
  <Label htmlFor="category">Category</Label>
    
            <Select 
            {...register("category", {required: "Category is Required"}  )} 
            onValueChange ={(value)=> setValue("category", value) }  
            defaultValue={blog ? blog.category : ""}
            >
              <SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

           {errors?.category?.message &&  <InputError> {errors?.category?.message}  </InputError> }
</div>

      <div className="w-full">
        <Label htmlFor="featured_img">Featured Image</Label>
        <Input
          type="file"
          id="picture"
           {...register("featured_img", {
            required : blog ? false : "featured_img Field is Required",
          }  )}       
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full"
        />
         {errors?.featured_img?.message &&  <InputError> {errors?.featured_img?.message}  </InputError> }
      </div>
      <div className="w-full flex items-center justify-center flex-col my-4">

        {
          blog ? 
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
          {updateMutation.isPending ? <SmallSpinner/> : " Update post " }
          </button> 
          : 
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
          {mutation.isPending ? <SmallSpinner/> : " Create post " }
          </button>
        }
      </div>
    </form>
    )
}

export default CreatePostPage
