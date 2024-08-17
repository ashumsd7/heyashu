const ProgressBar = ({ percentage=0 }) => {
  return (
    <div className="w-full  bg-gray-300 rounded-full h-4 overflow-hidden">
      <div
        className={`h-full text-center text-xs  text-orange-600 font-extrabold transition-all duration-300 ease-out rounded-full ${
          percentage >= 1 ? 'bg-green-500 text-orange-600' : 'bg-white'
        }`}
        style={{ width: `${percentage}%` }}
      >
       <span className="text-white"> {percentage}%</span>
      </div>
    </div>
  );
};
export default ProgressBar