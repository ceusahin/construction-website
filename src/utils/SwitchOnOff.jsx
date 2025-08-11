const SwitchOnOff = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="group peer ring-0 bg-gradient-to-tr from-rose-100 via-rose-400 to-rose-500 rounded-full outline-none duration-300 after:duration-300 w-18 h-8 shadow-md peer-checked:bg-green-900 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-7 after:w-7 after:top-0.5 after:left-0.5 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-10 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0 peer-checked:bg-gradient-to-tr peer-checked:from-green-100 peer-checked:via-lime-400 peer-checked:to-lime-500"></div>
    </label>
  );
};

export default SwitchOnOff;
