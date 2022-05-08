import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../utils/State/Context";
import "./Header.scss";
import { UserHeader } from "./UserHeader";
import { WelcomeHeader } from "./WelcomeHeader";

export const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const headerLine = useRef<HTMLElement>(null);
  const { state } = useContext(AppContext);

  const checkSticky = () => {
    if (
      headerLine.current?.clientHeight &&
      window.pageYOffset > headerLine.current?.clientHeight
    ) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkSticky);
    return () => {
      window.removeEventListener("scroll", checkSticky);
    };
  });
  return (
    <header ref={headerLine} className={isSticky ? "header sticky" : "header"}>
      <h1 className="h1">Project Management App</h1>
      <div className="switch">
        <input
          id="language-toggle"
          className="check-toggle check-toggle-round-flat"
          type="checkbox"
        />
        <label htmlFor="language-toggle"></label>
        <span className="on">RU</span>
        <span className="off">EN</span>
      </div>
      {state.userToken ? <UserHeader /> : <WelcomeHeader />}
    </header>
  );
};
