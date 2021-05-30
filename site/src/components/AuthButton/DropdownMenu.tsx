import React from "react";
import {Dropdown} from "react-bootstrap";
import {useAuthDropdownMenuLogic} from "./logic";

const DropdownMenu = () => {
  const { redirectToProfile, logout } = useAuthDropdownMenuLogic()

  return (
    <div>
      {/*<Button variant='contained' color='secondary' onClick={signOutSubmit}>Выйти</Button>*/}
      <Dropdown>
        <Dropdown.Toggle>
          Профиль
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={redirectToProfile}>Профиль</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Выйти</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default DropdownMenu