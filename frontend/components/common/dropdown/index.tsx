import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactComponentElement, ReactNode } from "react";

interface DropdownMainProps {
  value: any;
  onChange: any;
}

const DropdownMain = ({ value, onChange }: DropdownMainProps) => {
  return <div></div>;
};

interface DropdownTriggerProps {
  children?: JSX.Element;
}

const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  return { children };
};

interface DropdownMenuProps {
  children?: JSX.Element;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <div></div>;
};

interface DropdownItemProps {
  children?: JSX.Element;
}

const DropdownItem = ({ children }: DropdownItemProps) => {
  return <div></div>;
};

export const Dropdown = Object.assign(DropdownMain, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
});
