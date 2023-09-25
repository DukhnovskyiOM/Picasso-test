import { Link, useLocation } from "react-router-dom";

const PostPage = () => {
  const location = useLocation();
  const { post } = location.state;

  return (
    <div className="container">
      <div className="wrapper">
        <Link className="wrapper_button" to="/">
          Назад
        </Link>
        <span className="wrapper_title">{post.title}</span>
        <span className="wrapper_body">{post.body}</span>
      </div>
    </div>
  );
};

export default PostPage;
