import { Dispatch, SetStateAction } from "react";
import SvgButton from "../button/svgButton";
import { Dropdown } from "../dropdown";

interface peopleInterface {
  name: string;
  color: string;
}

interface peopleSelectProps {
  selectedPerson: number;
  onPersonChange: Dispatch<SetStateAction<number>>;
  people: Array<peopleInterface>;
}

const PeopleSelect = ({
  selectedPerson,
  onPersonChange,
  people,
}: peopleSelectProps) => {
  return (
    <Dropdown value={selectedPerson} onChange={onPersonChange}>
      <Dropdown.Trigger children={<SvgButton />} />
      <Dropdown.Menu>
        {people.map((person) => {
          return <Dropdown.Item>{person.name}</Dropdown.Item>;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default PeopleSelect;
