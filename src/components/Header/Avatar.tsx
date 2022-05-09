import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { RootState } from "../../utils/Redux/Store";
import { useSelector } from "react-redux";

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name: string | null) => {
  if (name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        border: 2,
        borderColor: "#fcd900",
        cursor: "pointer",
      },
      children: `${name[0].toUpperCase()}`,
    };
  }
};

export const LetterAvatar = (props: {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  const { userLogin } = useSelector((state: RootState) => state.userLogin);
  return <Avatar onClick={props.onClick} {...stringAvatar(userLogin)} />;
};
