"use strict";

var FIC_NETWORK = [
  { label: "Calc-HQ",                  url: "https://calc-hq.com" },
  { label: "BizDayChecker.com",        url: "https://bizdaychecker.com" },
  { label: "BankCutoffChecker.com",    url: "https://bankcutoffchecker.com" },
  { label: "SalaryVsInflation.com",    url: "https://salaryvsinflation.com" },
  { label: "hourly2salarycalc.com",    url: "https://hourly2salarycalc.com" },
  { label: "TokenToDollarMargin.com",  url: "https://tokentodollarmargin.com" },
  { label: "PayrollDateChecker.com",   url: "https://payrolldatechecker.com" },
  { label: "1099vsw2calc.com",         url: "https://1099vsw2calc.com" },
  { label: "FreelanceIncomeCalc.com",  url: "https://freelanceincomecalc.com" }
];

function renderNetworkLinks(containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var currentDomain = window.location.hostname.replace("www.", "");
  var html = "";
  for (var i = 0; i < FIC_NETWORK.length; i++) {
    var item = FIC_NETWORK[i];
    try {
      var itemDomain = new URL(item.url).hostname.replace("www.", "");
      if (itemDomain === currentDomain) continue;
    } catch (e) {}
    html += '<li><a href="' + item.url + '" target="_blank" rel="noopener noreferrer">' + item.label + '</a></li>';
  }
  el.innerHTML = html;
}
