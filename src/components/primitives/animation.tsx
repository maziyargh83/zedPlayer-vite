import { motion } from "framer-motion";

const Spinner = ({
  size = 14,
  thickness = 1,
  color = "#007bff",
}: {
  size?: number;
  thickness?: number;
  color?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", display: "block" }}
    >
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={(size - thickness) / 2}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeDasharray={Math.PI * (size - thickness)}
        strokeDashoffset={Math.PI * (size - thickness) * 0.25}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          ease: "linear",
          repeat: Infinity,
          duration: 1,
        }}
      />
    </svg>
  );
};
const Skeleton = ({
  width = 14,
  height = 14,
  borderRadius = 4,
}: {
  width?: number;
  height?: number;
  borderRadius?: number;
}) => {
  return (
    <motion.div
      style={{
        width: width,
        height: height,
        backgroundColor: "#f0f0f0",
        borderRadius: borderRadius,
      }}
      initial={{ opacity: 0.5, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.2,
      }}
    />
  );
};

export default {
  Spinner,
  Skeleton,
};
