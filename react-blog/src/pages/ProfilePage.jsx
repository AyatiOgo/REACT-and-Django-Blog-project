import { getUserInfo } from "@/services/apiBlogs";
import BlogContainer from "@/ui_components/BlogContainer";
import Hero from "@/ui_components/Hero";
import Modal from "@/ui_components/Modal";
import Spinner from "@/ui_components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import { useState } from "react";


function ProfilePage({authUSerName}) {
  const {username} = useParams()
  const {data, isPending} = useQuery({
    queryKey : ['user', username],
    queryFn : ()=> getUserInfo(username)
  })
  const blogs = data?.author_posts

  const [toggle, setToggle] = useState(false)

  function handleToggle() {
    setToggle((curr)=> !curr)
  }

  console.log(username)
  console.log(data)

  if (isPending){
    return <Spinner/>
  }

    return (
    <>
      <Hero data={data} authUSerName={authUSerName} handleToggle={handleToggle} />
      <BlogContainer blogs={blogs} />

     {
     toggle &&
     <Modal>
        <SignUpPage userInfo={data} updateForm={true} setToggle={setToggle} />
      </Modal>}

    </>
    )
}

export default ProfilePage
