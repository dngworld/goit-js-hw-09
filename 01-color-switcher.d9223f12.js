const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},e=document.body;t.startBtn.addEventListener("click",(function(e){e.target.disabled=!0,t.stopBtn.disabled=!1,n=setInterval(a,1e3)})),t.stopBtn.addEventListener("click",(function(e){e.target.disabled=!0,t.startBtn.disabled=!1,clearInterval(n)}));let n=null;function a(){e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}
//# sourceMappingURL=01-color-switcher.d9223f12.js.map