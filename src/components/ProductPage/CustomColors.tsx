const ColorCircle = ({
  color,
  isSelected,
  onClick,
}: {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  // Determine border style based on selection
  const borderStyle = isSelected
    ? "border-4 border-secondary"
    : "border-2 border-gray-300";

  return (
    <div
      onClick={onClick}
      className={`w-8 h-8 rounded-full cursor-pointer ${borderStyle}`}
      style={{
        background: color,
        backgroundImage: color.includes("gradient") ? color : "none",
      }}
      title={color}
    />
  );
};

export default ColorCircle;
