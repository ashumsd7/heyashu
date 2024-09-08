const Switch = ({ isOn, handleToggle , onColor='bg-green-700' }) => {
  return (
    <div
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
        isOn ? onColor : ''
      }`}
      onClick={()=>{
        handleToggle()
      }}
    >
      <div
        className={` w-4 h-4 rounded-full shadow-md bg-gray-600 transform duration-300 ease-in-out ${
          isOn ? 'translate-x-6 bg-white' : ''
        }`}
      ></div>
    </div>
  );
};
export default  Switch