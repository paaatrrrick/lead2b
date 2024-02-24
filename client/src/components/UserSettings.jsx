import { useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { fireBaseAuth } from "@/helpers/firebase";

export default function UserSettings() {
  const componentRef = useRef(null);

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await signOut(fireBaseAuth);
      console.log("Logout successful");
      // Add any additional logic or redirection after successful logout
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle the error, show a message to the user, or perform any necessary actions
    }
  };

  return (
    <div
      ref={componentRef}
      className="flex justify-center rounded-md items-center h-full w-full absolute z-10 left-0 top-[-55px]"
    >
      <Popover className="justify-start flex p-2 px-4 items-center text-white text-md cursor-pointer bg-red-500 w-full h-full rounded-md duration-450">
        <Popover.Button
          as={Link}
          href=""
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            handleLogout();
          }}
          className="flex justify-start gap-2 text-md items-center w-full"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p>Log out</p>
        </Popover.Button>
      </Popover>
    </div>
  );
}
