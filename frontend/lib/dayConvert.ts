export const convertUserToDay = (boardData: any) => {
  const dateMap = {} as any;
  boardData.users.forEach((user: any) => {
    if (user.selectedDays) {
      user.selectedDays.forEach((selectedDay: any) => {
        if (dateMap.hasOwnProperty(selectedDay)) {
          dateMap[selectedDay].possible.push({
            userId: user._id,
            userName: user.userName,
            userColor: user.userColor,
          });
        } else {
          dateMap[selectedDay] = {
            possible: [
              {
                userId: user._id,
                userName: user.userName,
                userColor: user.userColor,
              },
            ],
            impossible: [],
          };
        }
      });
    }
  });
  boardData.users.forEach((user: any) => {
    Object.keys(dateMap).forEach((date) => {
      if (
        dateMap[date].possible.findIndex((u: any) => u.userId === user._id) ===
        -1
      ) {
        dateMap[date].impossible.push({
          userId: user._id,
          userName: user.userName,
          userColor: user.userColor,
        });
      }
    });
  });
  return dateMap;
};
