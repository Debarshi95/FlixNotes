import Typography from 'components/common/Typography/Typography';

const NotFound = () => {
  return (
    <div className="text-center h-screen w-full d-flex content-center items-center">
      <Typography variant="h5" className="text-gray" size="md">
        404 | Page not found
      </Typography>
    </div>
  );
};

export default NotFound;
