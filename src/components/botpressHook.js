/**
 * Botpress Chatbot Integration Hook
 * 
 * Clean, modular integration point reserved for Anshul Verma's personal AI chatbot.
 * When the official Botpress bot script & clientId are available, 
 * simply populate the BOTPRESS_CONFIG object below or call initBotpress().
 */

export const BOTPRESS_CONFIG = {
  enabled: false, // Set to true when deployment script is ready
  botId: "",      // e.g. "your-botpress-bot-id"
  clientId: "",   // e.g. "your-botpress-client-id"
  hostUrl: "https://cdn.botpress.cloud/webchat/v1",
  messagingUrl: "https://messaging.botpress.cloud"
};

/**
 * Initializes the Botpress webchat loader or displays the architectural reserved status widget.
 */
export function initBotpressHook(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Render the architectural integration banner & interactive preview widget
  container.innerHTML = `
    <div class="botpress-integration-card">
      <div class="bp-header">
        <div class="bp-badge-row">
          <span class="bp-status-pill">
            <span class="pulse-dot"></span> INTEGRATION CHANNEL RESERVED
          </span>
          <span class="bp-tech-tag">BOTPRESS CLOUD READY</span>
        </div>
        <h3 class="bp-title">Personal AI Assistant Integration</h3>
        <p class="bp-lead">
          A dedicated conversational AI agent will be attached here using Botpress. 
          The integration channel is cleanly architected to load seamlessly without refactoring page layouts or styling.
        </p>
      </div>

      <div class="bp-body-grid">
        <div class="bp-spec-panel">
          <div class="spec-row">
            <span class="spec-label">INTENDED SCOPE</span>
            <span class="spec-val">Interactive conversational guide to Anshul's B.Tech CSE coursework, technical skills & project simulators</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">INFRASTRUCTURE</span>
            <span class="spec-val">Botpress Webchat SDK + Cloud Webhook Pipeline</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">INTEGRATION HOOK</span>
            <span class="spec-val"><code>src/components/botpressHook.js</code></span>
          </div>
          <div class="spec-row">
            <span class="spec-label">DEPLOYMENT STATUS</span>
            <span class="spec-val status-waiting">Pending Production Script Injection · Ready for Activation</span>
          </div>
        </div>

        <div class="bp-snippet-panel">
          <div class="snippet-header">
            <span>DEVELOPER INTEGRATION SNIPPET</span>
            <button type="button" class="btn-copy-code" id="btn-copy-bp-code" title="Copy snippet">Copy Snippet</button>
          </div>
          <pre class="bp-code-block"><code>// To activate genuine Botpress webchat:
// 1. In src/components/botpressHook.js, set enabled: true
// 2. Add your Botpress script in index.html:
&lt;script src="https://cdn.botpress.cloud/webchat/v1/inject.js"&gt;&lt;/script&gt;
&lt;script&gt;
  window.botpressWebChat.init({
    "botId": "&lt;ANSHUL_BOTPRESS_ID&gt;",
    "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
    "messagingUrl": "https://messaging.botpress.cloud",
    "clientId": "&lt;ANSHUL_CLIENT_ID&gt;"
  });
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </div>
  `;

  // Attach copy button logic
  const copyBtn = container.querySelector('#btn-copy-bp-code');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = `// To activate genuine Botpress webchat:
<script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
<script>
  window.botpressWebChat.init({
    "botId": "<ANSHUL_BOTPRESS_ID>",
    "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
    "messagingUrl": "https://messaging.botpress.cloud",
    "clientId": "<ANSHUL_CLIENT_ID>"
  });
</script>`;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Snippet';
        }, 2000);
      }).catch(err => {
        console.error('Copy failed', err);
      });
    });
  }

  // If genuine Botpress is enabled, dynamically inject the script
  if (BOTPRESS_CONFIG.enabled && BOTPRESS_CONFIG.botId) {
    injectRealBotpress();
  }
}

function injectRealBotpress() {
  const script = document.createElement('script');
  script.src = `${BOTPRESS_CONFIG.hostUrl}/inject.js`;
  script.async = true;
  script.onload = () => {
    if (window.botpressWebChat) {
      window.botpressWebChat.init({
        botId: BOTPRESS_CONFIG.botId,
        clientId: BOTPRESS_CONFIG.clientId,
        hostUrl: BOTPRESS_CONFIG.hostUrl,
        messagingUrl: BOTPRESS_CONFIG.messagingUrl
      });
    }
  };
  document.body.appendChild(script);
}
