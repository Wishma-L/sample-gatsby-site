// import { Link, RouteComponentProps, Router } from '@reach/router';
// import React from 'react';
// import BlogCard from '../blogs/blog-card';
// import TagPage from './tag-page';

// interface TaggedBlogListProps extends RouteComponentProps {
//   blogList: BlogTagType[]
// }

// const TaggedBlogList = ({ blogList }: TaggedBlogListProps) => {

//   return (
//     <>
//       {/* //TODO: This will used for Tags filtering*/}
//       {/* <Router basepath="/tags">
//         <TagPage path="/my-account" />
//       </Router> */}

//       <h2 className='text-center'>The Blog List</h2>

//       <div className='grid grid-cols-3 gap-3 p-10'>
//         {
//           blogList.map((blog: Blog) => {
//             return <BlogCard key={blog.identity} card={blog} />
//           })
//         }
//       </div>
//       <p>Blog list is end</p>
//     </>
//   )
// };

// export default TaggedBlogList
