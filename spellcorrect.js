function waitForMainLoad() {
	hasHcaptcha = document.querySelector('script[src^="https://hcaptcha.com/1/api.js"]') || document.querySelector('script[src^="https://js.hcaptcha.com/1/api.js"]');
	if (window !== window.parent && document.URL.startsWith("https://newassets.hcaptcha.com/captcha/v1/")  && document.URL.includes("/static/hcaptcha.html#frame=challenge")) {
		window.addEventListener('message', (event) => {
			if (event.data.type === "spellCheck") {
				var captchaText = document.querySelectorAll('.prompt-text');
				captchaText[0].textContent = captchaText[0].textContent.replaceAll("soccer", "football")
			}
		});
		return
	}
	hasHcaptcha = document.querySelector('script[src^="https://hcaptcha.com/1/api.js"]') || document.querySelector('script[src^="https://js.hcaptcha.com/1/api.js"]');
	if (hasHcaptcha) {
		hasHcaptcha = document.querySelector('script[src^="https://hcaptcha.com/1/api.js"]') || document.querySelector('script[src^="https://js.hcaptcha.com/1/api.js"]');
		var hcaptchaIframes = document.querySelectorAll('iframe[src^="https://newassets.hcaptcha.com/captcha/v1/"]');
		if (retries >= 5){
			clearInterval(waitForMainLoadInterval);
			return;
		}
		else if (hcaptchaIframes.length !== 2) {
			retries ++;
			return;
		} else if (hcaptchaIframes.length === 2) {
			clearInterval(waitForMainLoadInterval);
		}
		new MutationObserver(function(mutations) {
			if (mutations[0].target.style.visibility === "visible") {
				hcaptchaIframes[1].contentWindow.postMessage({ type: 'spellCheck'}, 'https://newassets.hcaptcha.com');

			}
		}).observe(hcaptchaIframes[1].parentNode.parentNode, {attributes: true});
	}
}

var retries = 0;
var waitForMainLoadInterval = setInterval(waitForMainLoad, 1000);
