const getPosition = (rect: DOMRect) => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const scrollY = window.scrollY;
  const top =
    height / 2 > rect.y + rect.height / 2
      ? (rect.top + scrollY + rect.height + 10).toString() + "px"
      : "auto";
  const left =
    width / 2 > rect.x + rect.width / 2
      ? (rect.left + 10).toString() + "px"
      : "auto";
  const bottom =
    height / 2 <= rect.y + rect.height / 2
      ? (height - rect.bottom - scrollY + rect.height + 10).toString() + "px"
      : "auto";
  const right =
    width / 2 <= rect.x + rect.width / 2
      ? (width - rect.right + 10).toString() + "px"
      : "auto";

  return { top, left, bottom, right };
};

export default getPosition;
