import React from "react";

import { Info } from "lucide-react";
import Modal from "../Modal";

function Header() {
  const [showInfo, setShowInfo] = React.useState(false);

  console.log(showInfo);

  return (
    <header>
      <h1 className="tracking-widest">Black Connections</h1>

      <Modal title="Information" trigger={<Info className="mr-4" />}>
        About us! Lorem Ipsum
      </Modal>
    </header>
  );
}

export default Header;
