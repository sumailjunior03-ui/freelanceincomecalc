"use strict";

(function () {
  // Collapse ad containers when they have no content so no dead space renders.
  function collapseEmptySlots() {
    var slots = document.querySelectorAll(".ad-slot");
    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      // If the ins element inside has zero height, collapse the wrapper.
      var ins = slot.querySelector("ins.adsbygoogle");
      if (!ins) {
        slot.style.display = "none";
        continue;
      }
      // Monitor after AdSense has had time to fill.
      (function (s, insEl) {
        setTimeout(function () {
          var h = insEl.offsetHeight || 0;
          var status = insEl.getAttribute("data-ad-status");
          if (h === 0 || status === "unfilled") {
            s.style.display = "none";
          }
        }, 2000);
      })(slot, ins);
    }
  }

  // Render sponsor slot only when active.
  function renderSponsor() {
    var slots = document.querySelectorAll(".sponsor-slot");
    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      if (
        typeof FIC_CONFIG !== "undefined" &&
        FIC_CONFIG.sponsor &&
        FIC_CONFIG.sponsor.active &&
        FIC_CONFIG.sponsor.text &&
        FIC_CONFIG.sponsor.url
      ) {
        slot.innerHTML =
          '<span class="sponsor-label">' + FIC_CONFIG.sponsor.label + '</span>' +
          '<a href="' + FIC_CONFIG.sponsor.url + '" target="_blank" rel="noopener noreferrer sponsored">' +
          FIC_CONFIG.sponsor.text + "</a>";
        slot.style.display = "";
      } else {
        slot.style.display = "none";
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    collapseEmptySlots();
    renderSponsor();
  });
})();
