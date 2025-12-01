import BlogCard from "./BlogCard"
import Spinner from "./Spinner"

function BlogContainer({blogs, isPending}) {

  if(isPending){
    return <Spinner/>
  }

    return (
 <section className="padding-x py-6  max-container">
    <h2 className="font-semibold text-xl mb-6 dark:text-white text-center">
      🍔Latest Posts
    </h2>

    <div className="flex items-center gap-6 justify-center flex-wrap">
      {blogs?.map((blog)=> <BlogCard blog={blog} key={blog.id}/> )}
    </div>
  </section>
    )
}

export default BlogContainer
