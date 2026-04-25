/* GA4 - Calc-HQ Network Analytics (single injection point) */
(function(){if(!window.__GA4_LOADED){window.__GA4_LOADED=true;var id="G-W4SWZ1YRS2";var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+id;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}gtag("js",new Date());gtag("config",id);}})();

"use strict";

window.CURRENT_SITE_DOMAIN = "freelanceincomecalc.com";
window.CALC_HQ_NETWORK = [
  { domain: "bizdaychecker.com",      name: "BizDayChecker",      url: "https://bizdaychecker.com/",      live: true },
  { domain: "bankcutoffchecker.com",  name: "BankCutoffChecker",  url: "https://bankcutoffchecker.com/",  live: true },
  { domain: "salaryvsinflation.com",  name: "SalaryVsInflation",  url: "https://salaryvsinflation.com/",  live: true },
  { domain: "hourly2salarycalc.com",  name: "Hourly2SalaryCalc",  url: "https://hourly2salarycalc.com/",  live: true },
  { domain: "payrolldatechecker.com", name: "PayrollDateChecker", url: "https://payrolldatechecker.com/", live: true },
  { domain: "1099vsw2calc.com",       name: "1099vsW2Calc",       url: "https://1099vsw2calc.com/",       live: true },
  { domain: "quarterlytaxcalc.com",   name: "QuarterlyTaxCalc",   url: "https://quarterlytaxcalc.com/",   live: true },
  { domain: "totalcompcalc.com",      name: "TotalCompCalc",      url: "https://totalcompcalc.com/",      live: true },
  { domain: "overtimepaycalc.com",    name: "OvertimePayCalc",    url: "https://overtimepaycalc.com/",    live: true },
  { domain: "aftertaxsalarycalc.com", name: "AfterTaxSalaryCalc", url: "https://aftertaxsalarycalc.com/", live: true }
];

function getRelatedTools() {
  var current = String(window.CURRENT_SITE_DOMAIN || "").toLowerCase();
  var items = [];

  for (var i = 0; i < window.CALC_HQ_NETWORK.length; i++) {
    var site = window.CALC_HQ_NETWORK[i];
    if (!site || site.live !== true || !site.domain || !site.url) continue;
    if (String(site.domain).toLowerCase() === current) continue;
    items.push(site);
  }

  items.sort(function(a, b) {
    return String(a.name).localeCompare(String(b.name));
  });

  return items;
}

function renderRelatedTools(listElementId) {
  var el = document.getElementById(listElementId);
  if (!el) return;

  var items = getRelatedTools();
  var html = "";

  for (var i = 0; i < items.length; i++) {
    html += '<li><a href="' + items[i].url + '">' + items[i].name + '</a></li>';
  }

  el.innerHTML = html;
}
