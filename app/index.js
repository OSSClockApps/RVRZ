import clock from "clock";
import document from "document";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { BodyPresenceSensor } from "body-presence";


clock.granularity = "minutes";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let hrText = document.getElementById("heartRate");



//HeartRateSensor
if (HeartRateSensor) {
  const hrs = new HeartRateSensor();
  hrs.start();
}

// Disable HRS when watch is not on wrist
if (BodyPresenceSensor && hrs) {
  const body = new BodyPresenceSensor();
  body.addEventListener("reading", () => {
    if (body.present) {
      hrs.start();
    } else {
      hrs.stop();
    }
  });
  body.start();
}

// Disable HRS when screen is off
if (display && hrs) {
  display.addEventListener("change", () => {
    if (hrs != null) {
      if (display.on) {
        hrs.start();
      } else {
        hrs.stop();
      }
    }
  });
}

setInterval(() => {
  if (hrs.heartRate != null){ 
    hrText.text = hrs.heartRate;
  }else{
    hrText.text = "--";
  }
}, 1000);

function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();

  hourHand.groupTransform.rotate.angle = util.hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = util.minutesToAngle(mins);
}

clock.ontick = () => updateClock();
