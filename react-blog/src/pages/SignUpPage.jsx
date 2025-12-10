import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { register_user, updateUserProfile } from "@/services/apiBlogs"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


function SignUpPage({userInfo, updateForm, setToggle}) {

  const {register, handleSubmit,  formState: { errors }, watch, reset } = useForm({defaultValues: userInfo ? userInfo : {} })
  const password = watch("password")

  const queryClient = new QueryClient()

const mutation = useMutation({
    mutationFn: (data) => register_user(data),
    onSuccess: () => {
      toast.success("You have successfully created an account!!!");
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });


  const updateMutation = useMutation({
    mutationFn : (data) => updateUserProfile(data),
    onSuccess : () => {
      toast.success("Profile Updated Succesfully")
      queryClient.invalidateQueries({queryKey:['user']})
      setToggle(false)
    }
  })


  function onSubmit(data) {

    if(updateForm){
      const formData = new FormData

      formData.append("username", data)
      formData.append("first_name", data)
      formData.append("last_name", data)
      formData.append("job_title", data)
      formData.append("bio", data)
      if (data.profile_img && data.profile_img[0]) {
      if (data.profile_img[0] != "/") {
        formData.append("profile_img", data.profile_img[0]);
      }
    }

    updateMutation.mutate(formData)
    console.log(data)
    }

    else{
       mutation.mutate(data)
    }

  }

    return (
            <form
      className={`${updateForm && "h-[90%] overflow-auto" } md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
    rounded-lg bg-[rgb(255,255,255)] shadow-xl dark:text-white dark:bg-[#141624]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">{ updateForm ? "Update Profile" : "SignUp Form"}</h3>
        <p>{ updateForm ? "Tell us more aout yourself" :  "Create your account to get started!"}</p>
      </div>
      <div className="flex flex-col" >
        <Label htmlFor="username" className="dark:text-[97989F]">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          placeholder="Enter username"

          {...register ( "username", 
            {
              required: "username is required",
               minLength : {
                value : 3,
                message : "Username must be longer than 3"

          }}, )}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />

      {errors?.username?.message && <small className="text-red-700">{errors.username.message}</small> }  
      </div>

      { updateForm || <div className="flex flex-col" >
        <Label htmlFor="email" className="dark:text-[97989F]">
          Email
        </Label>
        <Input
          type="text"
          id="email"
          placeholder="Enter Email"

          {...register ( "email", 
            {
              required: "email is required",
               minLength : {
                value : 3,
                message : "email must be longer than 3"

          }}, )}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />

      {errors?.email?.message && <small className="text-red-700">{errors.email.message}</small> }  
      </div>}

      <div className="flex flex-col">
        <Label htmlFor="first_name">First Name</Label>
        <Input
          type="text"
          id="first_name"
          placeholder="Enter first name"
           {...register ( "first_name", 
            {
              required: "first_name is required",
               minLength : {
                value : 3,
                message : "first_name must be longer than 3"

          }}, )}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
         {errors?.first_name?.message && <small className="text-red-700">{errors.first_name.message}</small> }  
      </div>

      <div className="flex flex-col" >
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          type="text"
          id="last_name"
          placeholder="Enter last name"
           {...register ( "last_name", 
            {
              required: "last_name is required",
               minLength : {
                value : 3,
                message : "last_name must be longer than 3"

          }}, )}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.last_name?.message && <small className="text-red-700">{errors.last_name.message}</small> }  
      </div>

{   updateForm &&   <div className="flex flex-col" >
        <Label htmlFor="job_title">Job Title</Label>
        <Input
          type="text"
          id="job_title"
          placeholder="Enter job title"
           {...register ( "job_title", 
            {
              required: "job title is required",
               minLength : {
                value : 3,
                message : "job title must be longer than 3"

          }}, )}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.job_title?.message && <small className="text-red-700">{errors.job_title.message}</small> }  
      </div>}

{   updateForm &&   <div className="flex flex-col" >
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          type="text"
          id="bio"
          placeholder="Enter job title"
           {...register ( "bio", 
            {
              required: "bio is required",
               minLength : {
                value : 3,
                message : "bio must be longer than 3"

          }}, )}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.bio?.message && <small className="text-red-700">{errors.bio.message}</small> }  
      </div>}

      {  updateForm &&   <div className="flex flex-col" >
        <Label htmlFor="profile_img">Profile Image</Label>
        <Input
          type="file"
          id="pic"
          placeholder="Update profile image"
           {...register ( "profile_img", 
            {
              required: false,
               
            }, )}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
      </div>}

    { updateForm ||  <div className="flex flex-col" >
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register ( "password", 
            {
              required: "password is required",
               minLength : {
                value : 8,
                message : "password must be at least 8 characters "

          }}, )}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
         {errors?.password?.message && <small className="text-red-700">{errors.password.message}</small> }  
      </div>}

     { updateForm || <div className="flex flex-col">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          {...register ( "confirmPassword", 
            {
              required: "confirmPassword is required",
              minLength : {
                value : 8,
                message : "confirmPassword must be at least 8 characters "
                },
              validate : (value) => value === password || "Passwords Does not match"
        },
        )}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.confirmPassword?.message && (
          <small className="text-red-700">
            {errors.confirmPassword.message}
          </small>
        )}
      </div>}

      <div className="w-full flex items-center justify-center flex-col my-4">
       { updateForm ? 
       <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            <small className="text-[16px]">Update Form</small>
        </button> :
       <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            <small className="text-[16px]">Signup</small>
        </button>
        
      }
        <p className="text-[14px]">
          Already have an account? Sign in
          {/* Already have an account? <Link to="/signin">Sign In</Link> */}
        </p>
      </div>
    </form>

    )
}

export default SignUpPage
