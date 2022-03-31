const SanitizedHtml = ({ dirtyHtml }) => {
  return (
    <div
      style={{ fontSize: '18px' }}
      dangerouslySetInnerHTML={{ __html: dirtyHtml }}
    />
  );
};

export default SanitizedHtml;
