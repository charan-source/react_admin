import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = 0.75, size = 50, borderWidth = 10 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  // Calculate inner circle size based on borderWidth
  const innerCircleSize = size / 2 - borderWidth; // Ensures a filled center

  return (
    <Box
      sx={{
        background: `radial-gradient(circle at center, ${colors.primary[400]} ${innerCircleSize}px, transparent ${innerCircleSize + 1}px),
          conic-gradient(${colors.blueAccent[500]} 0deg ${angle}deg, ${colors.primary[200]} ${angle}deg 360deg)`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;