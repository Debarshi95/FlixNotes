const Image = ({ url, alt, height, width }) => {
  return (
    <div style={{ width, height }}>
      <img
        src={url}
        alt={alt || ''}
        className="w-full h-full"
        style={{ objectFit: 'fill', objectPosition: 'center' }}
      />
    </div>
  );
};

Image.defaultProps = {
  height: '100%',
  width: '100%',
};

export default Image;
