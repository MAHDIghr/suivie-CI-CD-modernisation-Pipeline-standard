(() => {
  "use strict";
  const percentages = [90, 40, 35, 20, 0];
  const average = Math.round(percentages.reduce((sum, value) => sum + value, 0) / percentages.length);
  const value = document.getElementById("overall-value");
  const donutValue = document.getElementById("donut-value");
  const donut = document.getElementById("overall-donut");
  if (value) value.textContent = String(average);
  if (donutValue) donutValue.textContent = average + "%";
  if (donut) {
    donut.style.background = "conic-gradient(#1769aa 0 " + average + "%, #e2eaf2 " + average + "% 100%)";
    donut.setAttribute("aria-label", "Avancement moyen indicatif de " + average + " %");
  }
  const exportButton = document.getElementById("export-pdf");
  if (exportButton) exportButton.addEventListener("click", () => window.print());
})();