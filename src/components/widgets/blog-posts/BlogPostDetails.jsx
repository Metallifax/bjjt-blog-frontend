import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import { Container, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './BlogPostDetails.scss';
import rehypeSanitize from 'rehype-sanitize';

const BlogPostDetails = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.editor.posts);
  const post = posts[id - 1];

  return (
    <Container className='post--container'>
      <div className='post--title'>
        <div className='post--title--container'>
          <h1>{post.title}</h1>
          <h3 className='text-black'>By: {post.name} </h3>
          <p className='text-muted'>
            Posted: {moment(post.dateCreated).format('MMMM Do YYYY, h:mm a')}
          </p>
          <Image className='post--title--image' src={post.imageUrl} />
        </div>
      </div>
      <MDEditor.Markdown
        source={post.editorState}
        rehypePlugins={[[rehypeSanitize]]}
      />
    </Container>
  );
};

export default BlogPostDetails;
