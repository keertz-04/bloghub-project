function BlogCard({blog}){
 return <div className='card'><h2>{blog.title}</h2><p>{blog.content}</p></div>
}
export default BlogCard;