import { useSelector } from 'react-redux';

const Home = () => {
  const posts = useSelector((state) => state.editor.posts);

  const getPosts = () => {
    return posts.map((post) => {
      const textArr = post.getCurrentContent().getPlainText().split(' ', 25);

      return (
        // eslint-disable-next-line react/jsx-key
        <li>
          {textArr.length === 25
            ? textArr.join(' ').concat('...')
            : textArr.join(' ')}
        </li>
      );
    });
  };

  return (
    <>
      <h1>Home!</h1>
      <ul>{getPosts()}</ul>
    </>
  );
};

export default Home;
