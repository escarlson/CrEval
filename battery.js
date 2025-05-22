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
        battery.charging ? document.getElementById("battery-discharging-time").classList.add("d-none") : document.getElementById("battery-discharging-time").classList.remove("d-none");
        battery.charging ? document.getElementById("battery-charging-time").classList.remove("d-none") : document.getElementById("battery-charging-time").classList.add("d-none");
        document.getElementById("battery-level").classList.remove("d-none");
        updateLevelInfo();
      }
    
      battery.addEventListener("levelchange", () => {
        updateLevelInfo();
      });
      function updateLevelInfo() {
        const progressBar = document.querySelector('#battery-level > .progress-bar');
        var battery_level = (`Battery level: ${battery.level * 100}%`);
        console.log(battery_level);
        progressBar.style.width = `${battery.level * 100}%`;
        progressBar.innerHTML = `${battery.level * 100}%`;
        battery.charging ? progressBar.classList.add("progress-bar-striped", "progress-bar-animated") : progressBar.classList.remove("progress-bar-striped", "progress-bar-animated");
        progressBar.parentElement.setAttribute("aria-valuenow", `${battery.level * 100}`);
      }
    
      battery.addEventListener("chargingtimechange", () => {
        updateChargingInfo();
      });
      function updateChargingInfo() {
        let seconds = battery.chargingTime;
        let h = Math.floor(seconds / 3600);
        let m = Math.floor((seconds % 3600) / 60);
        let s = Math.floor(seconds % 60);
        let battery_charging_time;
        if (isFinite(seconds) && !Number.isNaN(seconds)) {
          battery_charging_time = `Battery charging time: ${h}h ${m}m ${s}s`;
        } else {
          battery_charging_time = "Battery charging time: Calculating...";
        }
        console.log(`Battery charging time: ${battery.chargingTime} seconds`);
        document.getElementById("battery-charging-time").innerHTML = battery_charging_time;
      }
    
      battery.addEventListener("dischargingtimechange", () => {
        updateDischargingInfo();
      });
      function updateDischargingInfo() {
        let seconds = battery.dischargingTime;
        let h = Math.floor(seconds / 3600);
        let m = Math.floor((seconds % 3600) / 60);
        let s = Math.floor(seconds % 60);
        let battery_discharging_time;
        if (isFinite(seconds) && !Number.isNaN(seconds)) {
          battery_discharging_time = `Battery discharging time: ${h}h ${m}m ${s}s`;
        } else {
          battery_discharging_time = "Battery discharging time: Calculating...";
        }
        console.log(`Battery discharging time: ${battery.dischargingTime} seconds`);
        document.getElementById("battery-discharging-time").innerHTML = battery_discharging_time;
      }
    }).catch((error) => {
      console.error("Failed to get battery information:", error);
      document.getElementById("battery-charging-status").innerHTML = "<p><i>Sorry, unable to retrieve battery information.<br>Perhaps this isn't a Chromebook after all?</i></p>";
    });
  } else{
    console.log("Battery info not supported in this broswer");
    document.getElementById("battery-charging-status").innerHTML = "<p><i>Sorry, your browser doesn't support battery information.<br>Perhaps this isn't a Chromebook after all?</i></p>";
    document.getElementById("battery-level").classList.add("d-none");
  }