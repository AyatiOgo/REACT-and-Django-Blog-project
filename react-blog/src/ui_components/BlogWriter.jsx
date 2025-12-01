import { BASE_URL } from "@/api"
import { FormatDate } from "@/services/formatDate"

function BlogWriter({blog}) {
    return (
 <div className="flex items-center gap=4 ">

      
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px]  rounded-full overflow-hidden">
          <img
            src={`${BASE_URL}${blog.author.profile_img}`}
            className="c rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#696A75] text-[14px]">
          {blog.author.first_name} {blog.author.last_name}
        </small>
      </span>

      <small className="text-[#696A75] text-[14px] ml-3">
        {FormatDate(blog.created_at)}
      </small>


    </div>

    )
}

export default BlogWriter
