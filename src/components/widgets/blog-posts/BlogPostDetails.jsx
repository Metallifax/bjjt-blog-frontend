import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import { Container, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './BlogPostDetails.scss';
import rehypeSanitize from 'rehype-sanitize';

import UpdatePostEditor from '../editor/UpdatePostEditor';
import LaunchCustomModal from '../modal/custom-modal/LaunchCustomModal';

const BlogPostDetails = () => {
  const { id } = useParams();
  const post = useSelector((state) => state.editor.posts).find(
    (obj) => obj.id !== id,
  );

  return (
    <Container className='post--container'>
      <div className='post--title'>
        <div className='post--title--container'>
          <h1>{post.title} </h1>
          <h3 className='text-black'>By: {post.name} </h3>
          <p className='text-muted'>
            Posted: {moment(post.dateCreated).format('MMMM Do YYYY, h:mm a')}
          </p>
          <Image className='post--title--image' src={post.imageUrl} />
        </div>
        <LaunchCustomModal text='Update'>
          <UpdatePostEditor post={post} />
        </LaunchCustomModal>
      </div>
      <MDEditor.Markdown
        source={post.editorState}
        rehypePlugins={[[rehypeSanitize]]}
      />
    </Container>
  );
};

export default BlogPostDetails;
