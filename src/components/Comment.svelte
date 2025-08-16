<body class="min-h-screen bg-slate-100 antialiased">
  <main class="max-w-4xl mx-auto p-6">
    <section class="bg-white rounded-2xl shadow-lg p-6">
      <header class="mb-5 flex justify-between items-center">
        <h1 class="text-2xl font-semibold tracking-tight">Comments</h1>

        <!-- Admin Mode Switch -->
        <label class="flex items-center gap-2 text-sm cursor-pointer">
          <span>Admin Mode</span>
          <input type="checkbox" id="adminToggle" class="w-5 h-5 cursor-pointer">
        </label>

        <button id="clearAllBtn" class="hidden text-sm px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50">
          Clear All Comments
        </button>
      </header>

      <!-- Comment form -->
      <form id="commentForm" class="space-y-3">
        <input id="nameInput" type="text" maxlength="50" placeholder="Your name (leave blank for anonymous)"
          class="w-full rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 p-3 placeholder:text-slate-400">
        <textarea id="comment" rows="3" maxlength="500" required
          class="w-full rounded-2xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 p-4 placeholder:text-slate-400"
          placeholder="Write a comment… (max 500 characters)"></textarea>
        <div class="flex items-center justify-between">
          <span id="charCount" class="text-xs text-slate-400">0/500</span>
          <button type="submit" class="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800">Post</button>
        </div>
      </form>

      <hr class="my-6 border-slate-200" />

      <!-- Comments list -->
      <ul id="commentsList" class="space-y-4"></ul>

      <div id="emptyState" class="text-center py-8 text-slate-500">
        <p class="text-sm">No comments yet. Be the first to share your thoughts!</p>
      </div>
    </section>
  </main>

  <script>
    const STORAGE_KEY = 'comments_v4';
    const ADMIN_PASSWORD = 'jude1121'; // Change to your own password
    let isAdmin = false;

    function loadComments() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
      catch { return []; }
    }
    function saveComments(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

    function timeAgo(date) {
      const seconds = Math.floor((Date.now() - date) / 1000);
      const units = [
        { s: 31536000, name: 'y' },
        { s: 2592000, name: 'mo' },
        { s: 604800, name: 'w' },
        { s: 86400, name: 'd' },
        { s: 3600, name: 'h' },
        { s: 60, name: 'm' }
      ];
      for (const u of units) {
        const v = Math.floor(seconds / u.s);
        if (v >= 1) return `${v}${u.name}`;
      }
      return `${Math.max(seconds, 0)}s`;
    }

    function escapeHTML(str) {
      const p = document.createElement('p');
      p.textContent = str;
      return p.innerHTML;
    }

    const form = document.getElementById('commentForm');
    const nameInput = document.getElementById('nameInput');
    const textarea = document.getElementById('comment');
    const listEl = document.getElementById('commentsList');
    const emptyEl = document.getElementById('emptyState');
    const charCountEl = document.getElementById('charCount');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const adminToggle = document.getElementById('adminToggle');

    textarea.addEventListener('input', () => {
      charCountEl.textContent = `${textarea.value.length}/500`;
    });

    adminToggle.addEventListener('change', () => {
      if (adminToggle.checked && !isAdmin) {
        const pass = prompt('Enter admin password:');
        if (pass === ADMIN_PASSWORD) {
          isAdmin = true;
        } else {
          alert('Wrong password!');
          adminToggle.checked = false;
        }
      } else if (!adminToggle.checked) {
        isAdmin = false;
      }
      render();
    });

    function render() {
      const comments = loadComments().sort((a, b) => b.createdAt - a.createdAt);
      listEl.innerHTML = '';
      emptyEl.classList.toggle('hidden', comments.length > 0);

      comments.forEach(c => {
        const li = document.createElement('li');
        li.className = 'p-3 rounded-2xl border border-slate-100 hover:bg-slate-50';
        const displayName = c.name?.trim() ? escapeHTML(c.name) : 'Anonymous';

        li.innerHTML = `
          <div class="flex justify-between items-center">
            <div>
              <div class="flex items-center gap-2 text-sm text-slate-500">
                <span class="font-medium text-slate-700">${displayName}</span>
                <span aria-hidden>•</span>
                <time>${timeAgo(c.createdAt)} ago</time>
              </div>
              <p class="mt-1 text-slate-800 whitespace-pre-wrap break-words">${escapeHTML(c.text)}</p>
            </div>
            ${isAdmin ? `<button data-id="${c.id}" class="deleteBtn text-xs text-red-600 hover:underline">Delete</button>` : ''}
          </div>
        `;
        listEl.appendChild(li);
      });

      clearAllBtn.classList.toggle('hidden', !(isAdmin && comments.length > 0));

      if (isAdmin) {
        document.querySelectorAll('.deleteBtn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            let comments = loadComments();
            comments = comments.filter(c => c.id !== id);
            saveComments(comments);
            render();
          });
        });
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = textarea.value.trim();
      const name = nameInput.value.trim();
      if (!text) return;

      const comment = {
        id: crypto.randomUUID(),
        name,
        text,
        createdAt: Date.now()
      };

      const comments = loadComments();
      comments.push(comment);
      saveComments(comments);

      textarea.value = '';
      nameInput.value = '';
      charCountEl.textContent = '0/500';
      render();
    });

    clearAllBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all comments?')) {
        saveComments([]);
        render();
      }
    });

    window.addEventListener('load', () => {
      render();
    });
  </script>
</body>

<div class="pb-15"></div>