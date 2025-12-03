import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register_user } from "@/services/apiBlogs"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


function SignUpPage() {

  const {register, handleSubmit,  formState: { errors }, watch, reset } = useForm()
  const password = watch("password")

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

  function onSubmit(data) {
    mutation.mutate(data)
  }

    return (
            <form
      className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
    rounded-lg bg-[rgb(255,255,255)] shadow-xl dark:text-white dark:bg-[#141624]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">SignUp Form</h3>
        <p>Create your account to get started!</p>
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

      <div className="flex flex-col" >
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
      </div>

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

      <div className="flex flex-col" >
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
      </div>

      <div className="flex flex-col">
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
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">

            <small className="text-[16px]">Signup</small>
        </button>
        <p className="text-[14px]">
          Already have an account? Sign in
          {/* Already have an account? <Link to="/signin">Sign In</Link> */}
        </p>
      </div>
    </form>

    )
}

export default SignUpPage
