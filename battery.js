if (typeof navigator.getBattery === 'function'){
  navigator.getBattery().then((battery) => {
      function updateAllBatteryInfo() {
        updateChargeInfo();
        updateLevelInfo();
        updateChargingInfo();
        updateDischargingInfo();
      }
      
      updateAllBatteryInfo();
        
      battery.addEventListener("chargingchange", () => {
        updateChargeInfo();
      });
      function updateChargeInfo() {
        var battery_charging_status = (`Battery charging? ${battery.charging ? "Yes" : "No"}`);
        console.log(battery_charging_status);
        document.getElementById("battery-charging-status").innerHTML = battery_charging_status;
      }
    
      battery.addEventListener("levelchange", () => {
        updateLevelInfo();
      });
      function updateLevelInfo() {
        var battery_level = (`Battery level: ${battery.level * 100}%`);
        console.log(battery_level);
        document.getElementById("battery-level").innerHTML = battery_level;
      }
    
      battery.addEventListener("chargingtimechange", () => {
        updateChargingInfo();
      });
      function updateChargingInfo() {
        var battery_charging_time = (`Battery charging time: ${battery.chargingTime} seconds`);
        console.log(`Battery charging time: ${battery.chargingTime} seconds`);
        document.getElementById("battery-charging-time").innerHTML = battery_charging_time;
      }
    
      battery.addEventListener("dischargingtimechange", () => {
        updateDischargingInfo();
      });
      function updateDischargingInfo() {
        var battery_discharging_time = (`Battery discharging time: ${battery.dischargingTime} seconds`);
        console.log(battery_discharging_time);
        document.getElementById("battery-discharging-time").innerHTML = battery_discharging_time;
      }
    });
  } else{
    console.log("Battery info not supported in this broswer");
    document.getElementById("battery-discharging-time").innerHTML = "<p><i>Sorry, your browser doesn't support battery information.<br>Perhaps this isn't a Chromebook after all?</i></p>";
  }