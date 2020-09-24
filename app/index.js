import clock from "clock";
import document from "document";
import * as util from "../common/utils";
import { me } from "appbit";

clock.granularity = "minutes";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");

function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();

  hourHand.groupTransform.rotate.angle = util.hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = util.minutesToAngle(mins);
}

clock.ontick = () => updateClock();
