import { getUserInfo } from "@/services/apiBlogs";
import BlogContainer from "@/ui_components/BlogContainer";
import Hero from "@/ui_components/Hero";
import Spinner from "@/ui_components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


function ProfilePage() {
  const {username} = useParams()
  const {data, isPending} = useQuery({
    queryKey : ['user', username],
    queryFn : ()=> getUserInfo(username)
  })
  const blogs = data?.author_posts
  console.log(username)
  console.log(data)

  if (isPending){
    return <Spinner/>
  }

    return (
    <>
      <Hero data={data} />
      <BlogContainer blogs={blogs} />
    </>
    )
}

export default ProfilePage
