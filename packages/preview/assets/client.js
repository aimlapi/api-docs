// Browser side of the local preview: tabs, copy buttons, the sidebar, the outline, search, theme and live reload.
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Tabs: GitBook keeps tabs with the same title in step across a page, so picking "Python" once picks it everywhere.
  function selectTab(button, sync = true) {
    const tabs = button.closest('.tabs');
    $$(':scope > .tabs-bar > .tab', tabs).forEach((tab) => {
      const on = tab === button;
      tab.setAttribute('aria-selected', String(on));
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) {
        panel.hidden = !on;
      }
    });
    if (sync) {
      const title = button.textContent.trim();
      $$('.tabs > .tabs-bar > .tab')
        .filter((tab) => tab !== button && tab.textContent.trim() === title && tab.closest('.tabs') !== tabs)
        .forEach((tab) => selectTab(tab, false));
    }
  }
  document.addEventListener('click', (event) => {
    const tab = event.target.closest('.tabs-bar > .tab');
    if (tab) {
      selectTab(tab);
    }
  });

  // Copy buttons on code blocks.
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('.code-copy');
    if (!button) {
      return;
    }
    const text = $$('.line', button.parentElement).map((line) => line.textContent).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      button.classList.add('copied');
      setTimeout(() => button.classList.remove('copied'), 1200);
    } catch {
      // Clipboard access can be refused; there is nothing else to do.
    }
  });

  // Expandable code blocks.
  $$('.code-wrap[data-expandable]').forEach((wrap) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-expand';
    button.textContent = 'Expand';
    button.addEventListener('click', () => {
      wrap.classList.toggle('expanded');
      button.textContent = wrap.classList.contains('expanded') ? 'Collapse' : 'Expand';
    });
    wrap.append(button);
  });

  // Sidebar: chevrons open and close sections; the current page is scrolled into view.
  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('.nav-toggle');
    if (toggle) {
      const item = toggle.closest('.nav-item');
      item.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(item.classList.contains('open')));
    }
    if (event.target.closest('.menu-button')) {
      document.body.classList.toggle('sidebar-open');
    } else if (document.body.classList.contains('sidebar-open') && !event.target.closest('.sidebar')) {
      document.body.classList.remove('sidebar-open');
    }
  });
  function revealActive() {
    const active = $('.nav-link.active');
    const panel = $('.sidebar-panel');
    if (!active || !panel) {
      return;
    }
    const offset = active.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop;
    const visible = offset >= panel.scrollTop + 40 && offset <= panel.scrollTop + panel.clientHeight - 80;
    if (!visible) {
      panel.scrollTop = Math.max(0, offset - panel.clientHeight / 3);
    }
  }
  revealActive();
  window.addEventListener('load', revealActive);

  // Outline: highlight the section being read.
  const outlineLinks = $$('.outline a');
  if (outlineLinks.length) {
    const headings = outlineLinks.map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
    const update = () => {
      let current = headings[0];
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top < window.innerHeight * 0.3) {
          current = heading;
        }
      }
      // At the very bottom the last sections can never reach the top: show the last one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = headings[headings.length - 1];
      }
      outlineLinks.forEach((link) => link.classList.toggle('active', current && link.hash === `#${current.id}`));
    };
    document.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Search over page titles and their place in the table of contents.
  const input = $('.search input');
  const results = $('.search-results');
  let pages = null;
  let selected = 0;
  async function loadPages() {
    if (!pages) {
      pages = await fetch('/~preview/search.json').then((r) => r.json());
    }
    return pages;
  }
  function render(list) {
    selected = 0;
    results.hidden = false;
    if (!list.length) {
      results.innerHTML = '<div class="search-empty">No page matches.</div>';
      return;
    }
    results.innerHTML = '';
    list.forEach((page, i) => {
      const a = document.createElement('a');
      a.href = page.u;
      a.className = i === 0 ? 'selected' : '';
      a.textContent = page.t;
      const where = document.createElement('span');
      where.className = 'search-path';
      where.textContent = page.p;
      a.append(where);
      results.append(a);
    });
  }
  async function search() {
    const words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) {
      results.hidden = true;
      return;
    }
    const scored = (await loadPages())
      .map((page) => {
        const title = page.t.toLowerCase();
        const all = `${title} ${page.p.toLowerCase()} ${page.u}`;
        if (!words.every((w) => all.includes(w))) {
          return null;
        }
        const score = words.reduce((s, w) => s + (title.startsWith(w) ? 4 : title.includes(w) ? 2 : 0), 0);
        return { page, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.page.t.length - b.page.t.length)
      .slice(0, 12);
    render(scored.map((s) => s.page));
  }
  if (input) {
    input.addEventListener('input', search);
    input.addEventListener('focus', () => {
      loadPages();
      if (input.value) {
        search();
      }
    });
    input.addEventListener('keydown', (event) => {
      const links = $$('a', results);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (links.length) {
          selected = (selected + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
          links.forEach((link, i) => link.classList.toggle('selected', i === selected));
        }
      } else if (event.key === 'Enter' && links[selected]) {
        location.href = links[selected].href;
      } else if (event.key === 'Escape') {
        results.hidden = true;
        input.blur();
      }
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.search')) {
        results.hidden = true;
      }
    });
    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  // Theme: light, dark, or follow the system.
  const root = document.documentElement;
  function applyTheme(choice) {
    const dark = choice === 'dark' || (choice === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.themeChoice = choice;
    $$('.theme-switch button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeChoice === choice)));
  }
  applyTheme(root.dataset.themeChoice || 'system');
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.theme-switch button');
    if (button) {
      try {
        localStorage.setItem('docs-preview-theme', button.dataset.themeChoice);
      } catch {
        // Storage can be blocked; the choice then lasts for this page only.
      }
      applyTheme(button.dataset.themeChoice);
    }
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => applyTheme(root.dataset.themeChoice || 'system'));

  // Live reload: the server says when a file in the checkout changed.
  if (window.EventSource) {
    const events = new EventSource('/~preview/events');
    events.addEventListener('reload', () => {
      sessionStorage.setItem('docs-preview-scroll', JSON.stringify({ path: location.pathname, y: window.scrollY }));
      location.reload();
    });
  }
  try {
    const saved = JSON.parse(sessionStorage.getItem('docs-preview-scroll') || 'null');
    sessionStorage.removeItem('docs-preview-scroll');
    if (saved && saved.path === location.pathname) {
      window.scrollTo(0, saved.y);
    }
  } catch {
    // Nothing saved.
  }
})();
