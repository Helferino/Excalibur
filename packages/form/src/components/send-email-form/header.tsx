import { CardHeader, Link } from "@mui/material";
import { Fragment } from "react";
import Image from "next/image";

export function Header() {
  return (
    <CardHeader
      title="Send Email"
      subheader={
        <Fragment>
          <span>Frontend assignment for Excalibur by </span>
          <Link href="https://github.com/Helferino" target="_blank">
            Jakub Urban
          </Link>
        </Fragment>
      }
      avatar={
        <Image src="/logo.png" alt="Excalibur Logo" width={48} height={48} />
      }
    />
  );
}
