export function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return 360 - (hourAngle + minAngle);
}

export function minutesToAngle(minutes) {
  return 360 - ((360 / 60) * minutes);
}