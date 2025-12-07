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
import { create_post } from "@/services/apiBlogs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "@/ui_components/SmallSpinner";


function CreatePostPage() {

  const {register, handleSubmit, formState : {errors} , setValue , reset} = useForm()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

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
  if (data.featured_img) {
      formData.append("featured_img", data.featured_img[0]);
    }
    mutation.mutate(formData)
  }


    return (
<form 
    onSubmit={handleSubmit(onSubmit)}
    className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]">
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">Create Post</h3>
        
        <p>Create a new post and share your ideas.</p>
        
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
    
            <Select {...register("category", {required: "Category is Required"})} onValueChange ={(value)=> setValue("category", value) } >
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
            required : "featured_img Field is Required",
          }  )}       
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full"
        />
         {errors?.featured_img?.message &&  <InputError> {errors?.featured_img?.message}  </InputError> }
      </div>
      <div className="w-full flex items-center justify-center flex-col my-4">

      <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
      {mutation.isPending ? <SmallSpinner/> : " Create post " }
      </button>

      </div>
    </form>
    )
}

export default CreatePostPage
