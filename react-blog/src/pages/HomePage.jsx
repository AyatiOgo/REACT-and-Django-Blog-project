import { getBlogs } from "@/services/apiBlogs";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import PagePagination from "@/ui_components/PagePagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


function HomePage() {

  const [page, setPage] = useState(1);
  const numOfBlogsPerPage = 3;

  const {data, isPending} = useQuery({
    queryKey : ["blogs"], 
    queryFn : ()=> getBlogs(page)

  })

const numOfPages = Math.ceil(data?.count / numOfBlogsPerPage);
const blogs = data?.results || [];

function handleSetPage(val) {
    setPage(val);
  }

function increasePageValue() {
    setPage((curr) => curr + 1);
  }

function decreasePageValue() {
    setPage((curr) => curr - 1);
  }

    return (
    <>
      <Header />
      <BlogContainer blogs={blogs} isPending={isPending} />
      <PagePagination
       increasePageValue={increasePageValue}
        decreasePageValue={decreasePageValue}
        page={page}
        numOfPages={numOfPages}
        handleSetPage={handleSetPage}
      />
    </>
    )
}

export default HomePage
