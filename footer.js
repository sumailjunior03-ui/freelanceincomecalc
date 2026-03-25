"use strict";

(function () {
  function renderFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;

    var year = new Date().getFullYear();

    mount.innerHTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>FreelanceIncomeCalc</h4>
        <p>Convert freelance hourly rates to gross income across time periods. Runs locally in your browser. No data collected or stored.</p>
        <br/>
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/legal">Legal</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Related Tools</h4>
        <ul class="related-tools" id="related-tools"></ul>
      </div>
      <div class="footer-col footer-resources">
        <h4>Resources</h4>
        <a href="https://calc-hq.com" target="_blank" rel="noopener">Financial Calculator Hub</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span id="footer-year">${year}</span> FreelanceIncomeCalc.com — Gross estimates only. No tax advice.</span>
      <span>Partnerships: <a href="mailto:partnerships@calc-hq.com">partnerships@calc-hq.com</a></span>
    </div>
    <p class="footer-disclaimer">This tool provides gross income estimates for informational purposes only. It does not account for taxes, deductions, or any other financial obligations. Always verify with official sources or a qualified professional. Third-party advertisements on this site may use cookies; see our <a href="/privacy">Privacy</a>.</p>
  </div>
</footer>`;

    if (typeof renderRelatedTools === "function") {
      renderRelatedTools("related-tools");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderFooter);
  } else {
    renderFooter();
  }
})();
