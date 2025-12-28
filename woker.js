export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      return renderHomePage();
    }

    if (url.pathname === '/proxy') {
      return handleProxy(request);
    }

    return handlePathProxy(request);
  },
};

function renderHomePage() {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <title>GitHub Mirror Proxy</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root {
      --bg-from: #e0f2fe;
      --bg-to: #f8fafc;
      --card-bg: #ffffff;
      --card-gradient-from: transparent;
      --card-gradient-to: transparent;
      --accent: #3b82f6;
      --accent-soft: rgba(59,130,246,0.1);
      --border: #e2e8f0;
      --text: #1e293b;
      --muted: #64748b;
      --error: #ef4444;
      --input-bg: #f8fafc;
      --input-border: #cbd5e1;
      --input-prefix: #94a3b8;
      --placeholder: #94a3b8;
      --shadow: 0 18px 45px rgba(15,23,42,0.15);
      --overlay-opacity: 0.3;
      --overlay-blue: rgba(59,130,246,0.08);
      --overlay-green: rgba(16,185,129,0.06);
      --radius: 14px;
    }
    
    [data-theme="dark"] {
      --bg-from: #1d283a;
      --bg-to: #020617;
      --card-bg: #020617;
      --card-gradient-from: rgba(59,130,246,0.18);
      --card-gradient-to: transparent;
      --accent: #3b82f6;
      --accent-soft: rgba(59,130,246,0.15);
      --border: rgba(148,163,184,0.18);
      --text: #e5e7eb;
      --muted: #9ca3af;
      --error: #f97373;
      --input-bg: rgba(15,23,42,0.9);
      --input-border: rgba(148,163,184,0.55);
      --input-prefix: #64748b;
      --placeholder: #6b7280;
      --shadow: 0 18px 45px rgba(15,23,42,0.65);
      --overlay-opacity: 0.85;
      --overlay-blue: rgba(59,130,246,0.16);
      --overlay-green: rgba(16,185,129,0.12);
    }
    
    * { 
      box-sizing: border-box;
      transition-property: background-color, background, color, border-color, box-shadow, fill, opacity;
      transition-duration: 1.5s;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
      position: relative;
      color: var(--text);
      overflow: hidden;
    }
    
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at top, var(--bg-from) 0%, var(--bg-to) 55%, var(--bg-to) 100%);
      z-index: -1;
      transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card {
      width: min(640px, 100% - 32px);
      background: radial-gradient(circle at top left, var(--card-gradient-from), var(--card-gradient-to) 55%), var(--card-bg);
      border-radius: var(--radius);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      padding: 24px 22px 20px;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    
    .card::before {
      content: "";
      position: absolute;
      inset: -40%;
      background:
        radial-gradient(circle at 0 0, var(--overlay-blue), transparent 55%),
        radial-gradient(circle at 100% 0, var(--overlay-green), transparent 55%);
      opacity: var(--overlay-opacity);
      mix-blend-mode: soft-light;
      pointer-events: none;
      transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card-inner { position: relative; z-index: 1; }
    
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    
    .theme-toggle {
      padding: 6px;
      border-radius: 8px;
      border: 1px solid var(--input-border);
      background: rgba(148,163,184,0.1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .theme-toggle:hover {
      background: rgba(148,163,184,0.2);
      transform: scale(1.05);
    }
    
    .theme-toggle:active {
      transform: scale(0.95);
    }
    
    .theme-toggle svg {
      width: 20px;
      height: 20px;
      fill: var(--text);
      transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    #sun-icon {
      opacity: 0;
      transform: rotate(-180deg) scale(0);
      position: absolute;
    }
    
    [data-theme="dark"] #sun-icon {
      opacity: 1;
      transform: rotate(0deg) scale(1);
      position: relative;
    }
    
    #moon-icon {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
    
    [data-theme="dark"] #moon-icon {
      opacity: 0;
      transform: rotate(180deg) scale(0);
      position: absolute;
    }
    
    h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    h1 span.logo-dot {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: #22c55e;
      box-shadow: 0 0 0 5px rgba(34,197,94,0.35);
    }
    
    .subtitle {
      margin: 8px 0 18px;
      font-size: 13px;
      color: var(--muted);
    }
    
    .input-group {
      margin-bottom: 12px;
      display: flex;
      gap: 8px;
      align-items: center;
    }
    
    .input-wrapper { position: relative; flex: 1; }
    
    .input-prefix {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      color: var(--input-prefix);
      pointer-events: none;
    }
    
    input[type="text"] {
      width: 100%;
      padding: 10px 12px 10px 112px;
      border-radius: 999px;
      border: 1px solid var(--input-border);
      background: var(--input-bg);
      color: var(--text);
      font-size: 13px;
      outline: none;
    }
    
    input[type="text"]::placeholder { 
      color: var(--placeholder);
    }
    
    input[type="text"]:focus {
      border-color: rgba(59,130,246,0.95);
      box-shadow: 0 0 0 1px rgba(59,130,246,0.8), 0 0 0 8px rgba(37,99,235,0.32);
      transition-duration: 0.2s !important;
      background: #ffffff;
    }
    
    [data-theme="dark"] input[type="text"]:focus {
      background: rgba(15,23,42,1);
    }
    
    button.primary {
      padding: 9px 18px;
      border-radius: 999px;
      border: none;
      outline: none;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 12px 30px rgba(37,99,235,0.6);
      white-space: nowrap;
      transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease !important;
    }
    
    button.primary:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
      box-shadow: 0 16px 40px rgba(37,99,235,0.75);
    }
    
    button.primary:active {
      transform: translateY(0);
      box-shadow: 0 8px 20px rgba(37,99,235,0.5);
    }
    
    .hint-row {
      font-size: 11px;
      color: var(--muted);
      margin-bottom: 14px;
    }
    
    .hint-row strong {
      color: var(--text);
      font-weight: 500;
    }
    
    .footnote {
      font-size: 10px;
      color: var(--muted);
      display: flex;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      border-top: 1px dashed rgba(148,163,184,0.4);
      padding-top: 10px;
      margin-top: 6px;
    }
    
    .error {
      font-size: 11px;
      color: var(--error);
      min-height: 14px;
      margin-bottom: 4px;
    }
    
    @media (max-width: 520px) {
      .card { padding: 18px 14px 16px; }
      h1 { font-size: 20px; }
      .input-group {
        flex-direction: column;
        align-items: stretch;
      }
      button.primary {
        justify-content: center;
        width: 100%;
      }
      .input-wrapper { width: 100%; }
    }
  </style>
</head>
<body>
  <main class="card">
    <div class="card-inner">
      <div class="header-row">
        <h1>
          <span class="logo-dot"></span>
          <span>GitHub Mirror Proxy</span>
        </h1>
        <button class="theme-toggle" id="theme-toggle" aria-label="切换主题">
          <svg id="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
          </svg>
          <svg id="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/>
          </svg>
        </button>
      </div>
      
      <p class="subtitle">
        粘贴 GitHub 链接，或直接输入 User / User/Repo
      </p>

      <div class="input-group">
        <div class="input-wrapper">
          <span class="input-prefix">Github.com/</span>
          <input
            id="gh-input"
            type="text"
            autocomplete="off"
            placeholder="User / User/Repo / 完整 GitHub URL"
          />
        </div>
        <button class="primary" id="gh-open">
          <span>打开</span>
          <span>↗</span>
        </button>
      </div>

      <div class="error" id="gh-error"></div>

      <div class="hint-row">
        <span>支持 完整 URL 或 User[/Repo] 格式</span>
      </div>

      <div class="footnote">
        <span>支持 GitHub 相关域名代理，请勿用于违法用途。</span>
        <span>By ZSFan</span>
      </div>
    </div>
  </main>

  <script>
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    const input = document.getElementById('gh-input');
    const button = document.getElementById('gh-open');
    const errorBox = document.getElementById('gh-error');

    function normalizeInput(raw) {
      const v = raw.trim();
      if (!v) return null;

      if (v.startsWith('http://') || v.startsWith('https://')) {
        return v;
      }

      if (v.startsWith('github.com/') || 
          v.startsWith('raw.githubusercontent.com/') ||
          v.startsWith('api.github.com/')) {
        return 'https://' + v;
      }

      const parts = v.split('/');
      if (parts.length === 1 || parts.length === 2) {
        const isValid = parts.every(part => /^[A-Za-z0-9_.-]+$/.test(part));
        if (isValid) {
          return 'https://github.com/' + v;
        }
      }

      return null;
    }

    function openTarget() {
      errorBox.textContent = '';
      const raw = input.value;
      const normalized = normalizeInput(raw);

      if (!normalized) {
        errorBox.textContent = '请输入有效的 GitHub 用户名、仓库名或完整链接。';
        return;
      }

      const currentUrl = new URL(window.location.href);
      currentUrl.pathname = '/proxy';
      currentUrl.search = '';
      currentUrl.searchParams.set('url', normalized);
      window.location.href = currentUrl.toString();
    }

    button.addEventListener('click', function(e) {
      e.preventDefault();
      openTarget();
    });
    
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        openTarget();
      }
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

async function handleProxy(request) {
  const url = new URL(request.url);
  const target = url.searchParams.get('url');

  if (!target) {
    return new Response('Missing "url" parameter', { status: 400 });
  }

  let targetUrl;
  try {
    targetUrl = new URL(target);
  } catch (e) {
    return new Response('Invalid target URL', { status: 400 });
  }

  return fetchThroughGithub(request, targetUrl);
}

async function handlePathProxy(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;

  let targetHost = 'github.com';
  let targetPath = pathname;

  if (pathname.match(/^\/u\/\d+/)) {
    targetHost = 'avatars.githubusercontent.com';
  }
  else if (pathname.startsWith('/_next/') || pathname.startsWith('/assets/')) {
    targetHost = 'github.githubassets.com';
  }
  else if (pathname.startsWith('/camo/')) {
    targetHost = 'camo.githubusercontent.com';
  }
  else if (pathname.startsWith('/user-attachments/')) {
    targetHost = 'private-user-images.githubusercontent.com';
  }
  else if (pathname.includes('/raw/')) {
    const rawMatch = pathname.match(/^\/([^/]+)\/([^/]+)\/raw\/(.+)$/);
    if (rawMatch) {
      targetHost = 'raw.githubusercontent.com';
      targetPath = `/${rawMatch[1]}/${rawMatch[2]}/${rawMatch[3]}`;
    }
  }

  const target = new URL('https://' + targetHost + targetPath + search);
  return fetchThroughGithub(request, target);
}

async function fetchThroughGithub(request, targetUrl) {
  const allowedHosts = new Set([
    'github.com',
    'api.github.com',
    'raw.githubusercontent.com',
    'user-images.githubusercontent.com',
    'camo.githubusercontent.com',
    'cloud.githubusercontent.com',
    'avatars.githubusercontent.com',
    'private-user-images.githubusercontent.com',
    'github-production-user-asset-6210df.s3.amazonaws.com',
    'github-production-release-asset-2e65be.s3.amazonaws.com',
    'objects.githubusercontent.com',
    'github.githubassets.com',
    'githubassets.com',
    'githubusercontent.com',
    'github.io',
    'githubstatus.com',
    'githubuniverse.com',
    'github.blog',
  ]);

  const hostname = targetUrl.hostname;

  let isAllowed = false;
  if (allowedHosts.has(hostname)) {
    isAllowed = true;
  } else {
    for (const domain of allowedHosts) {
      if (hostname.endsWith('.' + domain)) {
        isAllowed = true;
        break;
      }
    }
  }

  if (!isAllowed) {
    return new Response('Host not allowed: ' + hostname, { status: 403 });
  }

  const newHeaders = new Headers(request.headers);
  newHeaders.delete('Host');
  newHeaders.delete('cf-connecting-ip');
  newHeaders.delete('cf-ipcountry');
  newHeaders.delete('cf-ray');
  newHeaders.delete('x-forwarded-for');
  newHeaders.delete('x-forwarded-proto');

  const init = {
    method: request.method,
    headers: newHeaders,
    redirect: 'follow',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body;
  }

  try {
    const resp = await fetch(targetUrl.toString(), init);
    const respHeaders = new Headers(resp.headers);
    
    respHeaders.delete('content-security-policy');
    respHeaders.delete('content-security-policy-report-only');
    respHeaders.delete('x-frame-options');
    
    const contentType = respHeaders.get('content-type') || '';
    
    const shouldRewrite = contentType.includes('text/html') || 
                          contentType.includes('application/javascript') ||
                          contentType.includes('text/javascript') ||
                          contentType.includes('application/json');
    
    if (shouldRewrite) {
      let content = await resp.text();
      
      const currentOrigin = new URL(request.url).origin;
      
      content = content.replace(/https:\/\/raw\.githubusercontent\.com/g, currentOrigin);
      content = content.replace(/http:\/\/raw\.githubusercontent\.com/g, currentOrigin);
      content = content.replace(/"https:\/\/raw\.githubusercontent\.com/g, `"${currentOrigin}`);
      content = content.replace(/'https:\/\/raw\.githubusercontent\.com/g, `'${currentOrigin}`);
      
      content = content.replace(/https:\/\/github\.githubassets\.com/g, currentOrigin);
      content = content.replace(/http:\/\/github\.githubassets\.com/g, currentOrigin);
      content = content.replace(/"https:\/\/github\.githubassets\.com/g, `"${currentOrigin}`);
      content = content.replace(/'https:\/\/github\.githubassets\.com/g, `'${currentOrigin}`);
      
      content = content.replace(/https:\/\/avatars\.githubusercontent\.com/g, currentOrigin);
      content = content.replace(/http:\/\/avatars\.githubusercontent\.com/g, currentOrigin);
      content = content.replace(/"https:\/\/avatars\.githubusercontent\.com/g, `"${currentOrigin}`);
      content = content.replace(/'https:\/\/avatars\.githubusercontent\.com/g, `'${currentOrigin}`);
      
      content = content.replace(/https:\/\/camo\.githubusercontent\.com/g, currentOrigin);
      content = content.replace(/http:\/\/camo\.githubusercontent\.com/g, currentOrigin);
      content = content.replace(/"https:\/\/camo\.githubusercontent\.com/g, `"${currentOrigin}`);
      content = content.replace(/'https:\/\/camo\.githubusercontent\.com/g, `'${currentOrigin}`);
      
      content = content.replace(/https:\/\/private-user-images\.githubusercontent\.com/g, currentOrigin);
      content = content.replace(/http:\/\/private-user-images\.githubusercontent\.com/g, currentOrigin);
      
      content = content.replace(/https:\/\/github\.com/g, currentOrigin);
      content = content.replace(/http:\/\/github\.com/g, currentOrigin);
      content = content.replace(/"https:\/\/github\.com/g, `"${currentOrigin}`);
      content = content.replace(/'https:\/\/github\.com/g, `'${currentOrigin}`);
      
      const currentHost = new URL(request.url).host;
      content = content.replace(/\/\/raw\.githubusercontent\.com/g, `//${currentHost}`);
      content = content.replace(/\/\/github\.githubassets\.com/g, `//${currentHost}`);
      content = content.replace(/\/\/avatars\.githubusercontent\.com/g, `//${currentHost}`);
      content = content.replace(/\/\/camo\.githubusercontent\.com/g, `//${currentHost}`);
      content = content.replace(/\/\/github\.com/g, `//${currentHost}`);
      
      return new Response(content, {
        status: resp.status,
        statusText: resp.statusText,
        headers: respHeaders,
      });
    }
    
    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers: respHeaders,
    });
  } catch (e) {
    return new Response('Upstream fetch error: ' + e.message, { status: 502 });
  }
}
