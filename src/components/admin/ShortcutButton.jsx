const ShortcutButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-red-200 hover:bg-[#c62121] hover:text-white cursor-pointer text-black rounded-2xl p-4 shadow"
    >
      <span className="text-3xl">{icon}</span>
      <span className="mt-2 font-semibold">{label}</span>
    </button>
  );
};

export default ShortcutButton;
