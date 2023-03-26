import { Button, ButtonProps } from "@mantine/core";
import { HiArrowLeft } from "react-icons/hi";
import { Link, To } from "react-router-dom";

interface BackButtonProps {
  to: To;
}

export const BackButton: React.FC<BackButtonProps & ButtonProps> = ({
  to,
  ...buttonProps
}) => {
  return (
    <Link to={to}>
      <Button
        c="black"
        size="md"
        p={0}
        variant="subtle"
        leftIcon={<HiArrowLeft />}
        {...buttonProps}
      >
        Back
      </Button>
    </Link>
  );
};
