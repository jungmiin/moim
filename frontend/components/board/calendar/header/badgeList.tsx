import { useState, useEffect, Dispatch, SetStateAction, useMemo } from "react";
import { common } from "@/styles/common";
import Badge from "@/components/common/badge";

interface peopleInterface {
  name: string;
  color: string;
  isSelected: boolean;
}

interface badgeListPropsInterface {
  people: Array<peopleInterface>;
  setSelectedPeople: Dispatch<SetStateAction<number>>;
  selectedPeople: number;
}

const BadgeList = ({
  people,
  setSelectedPeople,
  selectedPeople,
}: badgeListPropsInterface) => {
  const renderBadges = useMemo(() => {
    return people.map((person, i) => (
      <Badge
        key={i}
        id={i}
        name={person.name}
        color={person.color}
        removable={false}
        isSelected={person.isSelected}
        onSelect={(id: number) => {
          selectedPeople === id ? setSelectedPeople(-1) : setSelectedPeople(id);
        }}
      />
    ));
  }, [people, selectedPeople, setSelectedPeople]);

  return <>{renderBadges}</>;
};

export default BadgeList;
