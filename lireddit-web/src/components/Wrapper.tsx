import { Box } from "@chakra-ui/core";
interface WrapperProps {
  variant?: "small" | "regular";
}
export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      w="100%"
      maxW={variant === "regular" ? "800px" : "400px"}
    >
      {children}
    </Box>
  );
};
