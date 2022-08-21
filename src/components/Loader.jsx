const Loader = () => {
  return (
    <div className="absolute w-full h-screen flex justify-center items-center bg-transparent top-0 left-0 right-0 bottom-0">
      <div className="radial-progress text-primary animate-spin" style={{ '--value': 75 }}></div>
    </div>
  );
};

export default Loader;
