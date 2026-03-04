"use strict";

/* ── DEFAULTS ── */
var DEFAULTS = {
  hourlyRate:    50,
  hoursPerWeek:  40,
  weeksPerYear:  48
};

/* ── UTILITIES ── */
function $(id) { return document.getElementById(id); }

function parseNum(str, fallback) {
  if (str === undefined || str === null) return fallback;
  var n = parseFloat(String(str).replace(/[$,\s]/g, ""));
  return isNaN(n) ? fallback : n;
}

function fmtUSD(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function fmtRate(n) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* ── CALC ENGINE ── */
function calcFromHourly(hourlyRate, hoursPerWeek, weeksPerYear) {
  var weeklyGross    = hourlyRate * hoursPerWeek;
  var annualGross    = weeklyGross * weeksPerYear;
  var monthlyGross   = annualGross / 12;
  var quarterlyGross = annualGross / 4;
  return {
    hourlyRate:     hourlyRate,
    hoursPerWeek:   hoursPerWeek,
    weeksPerYear:   weeksPerYear,
    annualGross:    annualGross,
    monthlyGross:   monthlyGross,
    weeklyGross:    weeklyGross,
    quarterlyGross: quarterlyGross
  };
}

function calcFromAnnual(annualGross, hoursPerWeek, weeksPerYear) {
  var totalHours = hoursPerWeek * weeksPerYear;
  var hourlyRate = totalHours > 0 ? annualGross / totalHours : 0;
  return calcFromHourly(hourlyRate, hoursPerWeek, weeksPerYear);
}

/* ── VALIDATION ── */
function clearErrors() {
  document.querySelectorAll(".field-error").forEach(function (el) { el.textContent = ""; });
  document.querySelectorAll(".err").forEach(function (el) { el.classList.remove("err"); });
  var eb = $("error-banner");
  if (eb) { eb.textContent = ""; eb.style.display = "none"; }
}

function fieldErr(inputId, errId, msg) {
  var inp = $(inputId);
  var err = $(errId);
  if (inp) inp.classList.add("err");
  if (err) err.textContent = msg;
}

function showBanner(msg) {
  var eb = $("error-banner");
  if (eb) { eb.textContent = msg; eb.style.display = "block"; }
}

/* ── RENDER RESULTS ── */
function renderResults(r) {
  var sec = $("results");
  if (!sec) return;
  sec.style.display = "block";

  function set(id, val) {
    var el = $(id);
    if (el) el.textContent = val;
  }

  set("out-hourly",    fmtRate(r.hourlyRate));
  set("out-annual",    fmtUSD(r.annualGross));
  set("out-monthly",   fmtUSD(r.monthlyGross));
  set("out-weekly",    fmtUSD(r.weeklyGross));
  set("out-quarterly", fmtUSD(r.quarterlyGross));
  set("out-hours",     r.hoursPerWeek + " hrs/wk × " + r.weeksPerYear + " wks");

  setTimeout(function () {
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

/* ── COPY RESULT ── */
function buildSummaryText(r) {
  return [
    "Freelance Income Estimate",
    "Hourly Rate:         " + fmtRate(r.hourlyRate),
    "Hours/Week:          " + r.hoursPerWeek,
    "Weeks/Year:          " + r.weeksPerYear,
    "Annual Gross:        " + fmtUSD(r.annualGross),
    "Monthly Gross:       " + fmtUSD(r.monthlyGross),
    "Weekly Gross:        " + fmtUSD(r.weeklyGross),
    "Est. Quarterly:      " + fmtUSD(r.quarterlyGross),
    "---",
    "Gross estimates only. No taxes or deductions applied.",
    "FreelanceIncomeCalc.com"
  ].join("\n");
}

function attachCopy(r) {
  var btn = $("copy-btn");
  if (!btn) return;
  btn.onclick = function () {
    var text = buildSummaryText(r);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "Copied!";
        setTimeout(function () { btn.textContent = "Copy Result"; }, 2000);
      });
    } else {
      // Fallback
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      btn.textContent = "Copied!";
      setTimeout(function () { btn.textContent = "Copy Result"; }, 2000);
    }
  };
}

/* ── FORM SUBMIT ── */
function handleSubmit(e) {
  e.preventDefault();
  clearErrors();

  var mode      = document.querySelector('input[name="calc-mode"]:checked');
  var modeVal   = mode ? mode.value : "hourly";
  var hpw       = parseNum($("hours-per-week") ? $("hours-per-week").value : "", NaN);
  var wpy       = parseNum($("weeks-per-year") ? $("weeks-per-year").value : "", NaN);
  var valid     = true;

  if (isNaN(hpw) || hpw <= 0 || hpw > 168) {
    fieldErr("hours-per-week", "hours-per-week-err", "Enter hours between 1 and 168.");
    valid = false;
  }
  if (isNaN(wpy) || wpy <= 0 || wpy > 52) {
    fieldErr("weeks-per-year", "weeks-per-year-err", "Enter weeks between 1 and 52.");
    valid = false;
  }

  var result;

  if (modeVal === "hourly") {
    var hr = parseNum($("hourly-rate") ? $("hourly-rate").value : "", NaN);
    if (isNaN(hr) || hr <= 0) {
      fieldErr("hourly-rate", "hourly-rate-err", "Enter a positive hourly rate.");
      valid = false;
    }
    if (!valid) return;
    result = calcFromHourly(hr, hpw, wpy);
  } else {
    var ag = parseNum($("annual-gross") ? $("annual-gross").value : "", NaN);
    if (isNaN(ag) || ag <= 0) {
      fieldErr("annual-gross", "annual-gross-err", "Enter a positive annual gross.");
      valid = false;
    }
    if (!valid) return;
    result = calcFromAnnual(ag, hpw, wpy);
  }

  renderResults(result);
  attachCopy(result);
}

function handleReset() {
  clearErrors();
  var sec = $("results");
  if (sec) sec.style.display = "none";
}

/* ── MODE TOGGLE ── */
function initModeToggle() {
  var radios = document.querySelectorAll('input[name="calc-mode"]');
  radios.forEach(function (r) {
    r.addEventListener("change", function () {
      var hourlyRow = $("row-hourly");
      var annualRow = $("row-annual");
      if (this.value === "hourly") {
        if (hourlyRow) hourlyRow.style.display = "";
        if (annualRow) annualRow.style.display = "none";
      } else {
        if (hourlyRow) hourlyRow.style.display = "none";
        if (annualRow) annualRow.style.display = "";
      }
    });
  });
}

/* ── DOLLAR FORMAT ON BLUR ── */
function attachFormatters() {
  document.querySelectorAll(".dfmt").forEach(function (input) {
    input.addEventListener("blur", function () {
      var v = parseNum(this.value, NaN);
      if (!isNaN(v) && this.value.trim() !== "") {
        this.value = Math.round(v).toLocaleString("en-US");
      }
    });
    input.addEventListener("focus", function () {
      var v = parseNum(this.value, NaN);
      if (!isNaN(v) && this.value.trim() !== "") {
        this.value = Math.round(v);
      }
    });
  });
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", function () {
  attachFormatters();
  initModeToggle();

  // Populate defaults
  var hr  = $("hourly-rate");    if (hr)  hr.value  = DEFAULTS.hourlyRate;
  var hpw = $("hours-per-week"); if (hpw) hpw.value = DEFAULTS.hoursPerWeek;
  var wpy = $("weeks-per-year"); if (wpy) wpy.value = DEFAULTS.weeksPerYear;

  var form = $("calc-form");
  if (form) form.addEventListener("submit", handleSubmit);

  var resetBtn = $("reset-btn");
  if (resetBtn) resetBtn.addEventListener("click", handleReset);

  // Init network links
  if (typeof renderNetworkLinks === "function") {
    renderNetworkLinks("footer-network-links");
  }
});
