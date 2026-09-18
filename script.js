const windowLayer = document.querySelector('#window-layer');
const themePanel = document.querySelector('#theme-panel');
const systemMenu = document.querySelector('#system-menu');
const mascotDialog = document.querySelector('#mascot-dialog');

let zIndex = 25;

const themes = [
  { id: 'dream', name: '梦行山水', note: '温暖 · 探索', className: 'choice-dream' },
  { id: 'cartoon', name: '轻盈动画', note: '明亮 · 童心', className: 'choice-cartoon' },
  { id: 'tech', name: '深海科技', note: '清醒 · 构建', className: 'choice-tech' },
  { id: 'ancient', name: '东方旧藏', note: '留白 · 久远', className: 'choice-ancient' },
  { id: 'deep', name: '深蓝夜航', note: '安静 · 思考', className: 'choice-deep' },
];

const resumePages = Array.from({ length: 19 }, (_, index) => {
  const page = String(index + 1).padStart(2, '0');
  return `<img class="resume-page" src="assets/resume-pages/page-${page}.jpg" alt="翔叔个人简历第 ${index + 1} 页" loading="${index === 0 ? 'eager' : 'lazy'}" />`;
});

const windowData = {
  resume: {
    title: '个人简历 · 原版', path: 'RESUME / ORIGINAL PDF', content: `
      <div class="resume-pages">${resumePages.join('')}</div>
    `,
  },
  about: {
    title: '关于翔叔', path: 'ABOUT / ME', content: `
      <p class="window-kicker">THE PERSON BEHIND THE DESKTOP</p>
      <div class="about-hero">
        <div><h2>你好，我是翔叔</h2><p class="window-intro">如果只按职业介绍我，会先后出现产品经理、产品运营、销售、心理成长导师、艺术疗愈探索者、AI 产品创业者、内容创作者……这些都是真的，但都不完整。</p><p class="window-intro">我更像一个在路上的产品艺术家：观察世界，理解人，连接分散的知识，创造新的解释，再把它做成作品、产品，或者一段能陪人走一程的关系。</p></div>
        <figure class="about-image-card about-avatar-card"><img src="assets/xiangshu-avatar.jpg" alt="翔叔手持一朵花的头像" /><figcaption>不急着给自己下定义，先带着好奇心继续走。</figcaption></figure>
      </div>
      <blockquote class="quote">我不是一个已经把人生想明白的人。有时候我挺通透，有时候也会被情绪、关系和现实困住；脑子里能搭很大的体系，生活里却常常手忙脚乱。</blockquote>
      <section class="about-section"><p class="about-label">01 / 我从哪里来</p><h3>人生是由很多次第一次体验串联起来的。</h3><p>高中时，我第一次独立写小说、作词、作曲。那时候还不知道“创造者”是什么职业，只是有一些东西不写出来，就像卡在身体里。后来我第一次离开家去无锡读大学，第一次实习做手机微信开发，也第一次在二十岁左右卖房，拿到销售冠军。</p><p>这些经历看起来不在一条线上，但它们让我很早知道两件事：我喜欢把一个模糊的念头变成现实，也确实可以把东西交到别人手里。后来我在旅行、电商、内容社区、Soulmate 创意社交、短视频直播、二手电商和 AI 平台之间来回切换，其实一直在做同一件事——找一个真实的问题，看看能不能把它做得更好一点。</p></section>
      <div class="about-story-grid"><div class="about-story"><span class="about-story-no">A</span><h3>二十岁以后，我开始懂得“能力”</h3><p>卖房时我并不是一个天生自信的人。第一次走进客户家里，我也紧张，也怕被拒绝。但当目标足够具体、反馈足够及时，我可以把恐惧拆成一个个动作，最后拿到结果。现在回头看，那次经历让我明白：能力不是一个固定标签，它会被场景、价值感和行动重新唤醒。</p></div><div class="about-story"><span class="about-story-no">B</span><h3>后来，我开始问“怎样活”</h3><p>做了几年互联网产品后，我越来越在意一个功能是否真的尊重人，一个内容是否让人松动，一段关系是否让人更像自己。于是我走进心理学、艺术疗愈、东方智慧和 AI。不是突然换了一条赛道，而是终于承认：我真正想研究的，一直是人如何理解自己、如何行动、如何活得更完整。</p></div></div>
      <section class="about-section about-highlight"><div><p class="about-label">02 / 我真正关心的事</p><h3>AI 越强，人越需要成为人。</h3><p>我喜欢 AI，但我不想把自己活成效率机器。AI 会让“怎么做”越来越便宜，让“为什么做、做什么、由谁判断”越来越重要。技术可以放大人的判断、审美、经验、关系和创造，但不能替人决定什么值得被爱，什么值得被留下。</p><p>所以我会同时研究产品、商业、心理、艺术、东方智慧和真实生活。别人可能觉得跨度太大，我反而觉得它们都在指向同一个问题：我们能不能在越来越快的世界里，仍然知道自己是谁。</p></div><figure class="about-image-card about-image-small"><img src="assets/xiangshu-guitar.jpg" alt="翔叔练习吉他的手" /><figcaption>有时候先弹一会儿琴，再想明白问题。</figcaption></figure></section>
      <section class="about-section"><p class="about-label">03 / 我的三观</p><div class="principle-grid"><div class="principle-card"><strong>爱</strong><p>让人被看见、被理解、被温柔承接，而不是被工具化。</p></div><div class="principle-card"><strong>美</strong><p>让产品、内容、空间和关系都有秩序、呼吸和生命力。</p></div><div class="principle-card"><strong>智慧</strong><p>不止给一个技巧，而是帮助人重新理解问题，获得更自由的选择。</p></div></div><p>我想创造的是爱、美与智慧的 Aha Moment。它不一定宏大，可能只是一个人突然理解了自己的情绪，一段关系终于能好好说话，一个产品让人用起来觉得“被照顾到了”，或者一首歌在某个晚上刚好接住了你。</p></section>
      <section class="about-section about-house"><p class="about-label">04 / 我正在建造的东西</p><h3>解忧小屋：繁华之外的一片心灵净土。</h3><p>解忧小屋最开始不是一个完整的商业计划。它更像我在 2024 年搭出来的一间小屋：有人把烦恼放进来，有人回应；平常不打扰，有需要一直在。后来有 300 多位朋友参与过，留下 3000 多次烦恼互动，也有导师陆续加入。</p><p>这件事让我重新相信，陪伴不一定要很复杂。真正重要的是回应本身——你愿意认真看见一个人，他就不必独自对着黑暗解释自己。</p></section>
      <div class="about-closing"><p class="about-label">05 / 我想传达的东西</p><blockquote class="quote">人生不是找到一个唯一正确的答案，而是在一次次真实行动里，越来越成为自己。</blockquote><p>我不想成为高高在上的人生导师，也不想靠制造焦虑换来关注。我更愿意做一个可信赖的同行者：比你多想一步，多整理一层，但也承认自己还在路上。</p><p>如果你在做一件还没有名字的事，或者正卡在某个看不清的路口，也许我们可以先坐下来聊聊。先不用急着成为一个更厉害的人，先把眼前这一步走真实。</p><p class="about-signature">Think it → Build it → Share it<br /><span>认识自己，是一门终生实践的艺术。</span></p></div>
    `,
  },
  timeline: {
    title: '经历档案', path: 'ARCHIVE / YEARS', content: `
      <p class="window-kicker">A LIVING TIMELINE</p>
      <h2>不是一条直线，是几次转身。</h2>
      <p class="window-intro">这些阶段不是用来证明“我曾经多厉害”，而是说明我如何从创作与商业现场走向人的内在世界，又把两者重新放回同一张桌面。</p>
      <div class="archive-list">
        <div class="archive-row"><div class="archive-year">高中 — 20岁</div><div class="archive-pin"></div><div><h3>先成为一个创作者</h3><p>独立创作小说、作词、作曲；离开家、进入大学，也第一次接触手机微信开发和移动互联网。</p></div></div>
        <div class="archive-row"><div class="archive-year">2015 — 2021</div><div class="archive-pin"></div><div><h3>从内容社区走进互联网现场</h3><p>旅行、电商、内容社区、Soulmate 创意型社交、短视频直播。不断靠近真实用户，也不断学习如何把一个想法变成可运营的产品。</p></div></div>
        <div class="archive-row"><div class="archive-year">2021 — 2024</div><div class="archive-pin"></div><div><h3>交易、AI 与平台实践</h3><p>二手奢侈品、球星卡、潮玩、直播电商与爆爆客 AI 系统，持续负责交易平台搭建、系统运营、直播与私域运营。</p></div></div>
        <div class="archive-row"><div class="archive-year">2024 — 现在</div><div class="archive-pin"></div><div><h3>ASVA 人生学院与心理疗愈探索</h3><p>面向高知女性、家庭青少年与企业主，探索东方美学、传统文化、艺术治疗、心理咨询与 AI 的结合，继续搭建解忧小屋。</p></div></div>
      </div>
    `,
  },
  projects: {
    title: '项目作品', path: 'WORK / PROJECTS', content: `
      <p class="window-kicker">SELECTED WORKS</p>
      <h2>把思考做成可以使用的东西。</h2>
      <p class="window-intro">这里放的是简历里那些真正做过的事：有商业平台，也有正在成为个人长期方向的心理成长、AI 与艺术实践。</p>
      <div class="project-grid">
        <article class="project-card"><p>01 / ASVA LIFE ACADEMY</p><h3>ASVA 人生学院</h3><p>心理疗愈行业创业与 AI 探索。面向高知女性、家庭青少年与企业主，探索成长、情绪支持与人的全面发展。</p></article>
        <article class="project-card"><p>02 / SECOND-HAND TRADE</p><h3>二手与 AI 电商</h3><p>从奢侈品二奢直播、球星卡、潮玩交易，到爆爆客 AI 系统，持续参与平台搭建、系统运营、直播交易与私域运营。</p></article>
        <article class="project-card"><p>03 / CONTENT & SOCIAL</p><h3>Soulmate / 酷秀 / 捏她</h3><p>做过创意型社交、娱乐直播、短视频内容平台与二次元内容创作平台，关注孤独、表达、兴趣与关系。</p></article>
        <article class="project-card"><p>04 / SOCIAL EXPERIMENT</p><h3>概率论社交实验室</h3><p>面向年轻人的场景社交平台，试验如何让人通过兴趣、房屋与活动相遇，缓解孤独与情绪宣泄。</p></article>
        <article class="project-card"><p>05 / INNER TOOL</p><h3>解忧小屋</h3><p>一个面向自我理解与情绪整理的 AI 陪伴空间。强调低负担记录、可回看、可修正，不急着替人下结论。</p></article>
        <article class="project-card"><p>06 / ART & SOUND</p><h3>公共写作与艺术表达</h3><p>写作、音乐、绘画与个人知识系统，是我把复杂经验变成可理解、可分享、可继续生长的另一种产品。</p></article>
      </div>
    `,
  },
  video: {
    title: '视频影像', path: 'MEDIA / VIDEO', content: `
      <p class="window-kicker">MOVING IMAGES</p>
      <h2>把人放回现场。</h2>
      <p class="window-intro">视频入口会逐步补齐。先在这里保留几个栏目位置：它们更像生活切片，不是精心包装的人设。</p>
      <div class="media-grid">
        <article class="media-card"><span class="media-mark">♪</span><h3>翔叔弹练爱</h3><p>音乐、练习，以及那些还没完成的时刻。</p></article>
        <article class="media-card"><span class="media-mark">◌</span><h3>真实生活现场</h3><p>工作、散步、阅读与和人相处的片段。</p></article>
        <article class="media-card"><span class="media-mark">✦</span><h3>AI 共创实验</h3><p>看一个念头如何从草图长成可用的东西。</p></article>
        <article class="media-card"><span class="media-mark">→</span><h3>视频入口待接入</h3><p>以后可以接入 B 站、视频号或独立视频档案。</p></article>
      </div>
    `,
  },
  docs: {
    title: '文字文档', path: 'LIBRARY / DOCS', content: `
      <p class="window-kicker">PRIVATE LIBRARY / PUBLIC INDEX</p>
      <h2>一些我认真想过的事。</h2>
      <p class="window-intro">文档先以索引形式呈现。它们来自本地 DNA 说明书中的简历、项目档案与长期写作，是理解翔叔的入口。</p>
      <div class="doc-list">
        <div class="doc-row"><span class="doc-type">PDF</span><strong>翔叔 · 个人简历</strong><small>职业与项目</small></div>
        <div class="doc-row"><span class="doc-type">DNA</span><strong>翔叔个人 DNA 说明书</strong><small>核心档案</small></div>
        <div class="doc-row"><span class="doc-type">TXT</span><strong>我做了一个线上的解忧杂货店</strong><small>项目原点</small></div>
        <div class="doc-row"><span class="doc-type">LOG</span><strong>解忧小屋一周年碎碎念</strong><small>阶段记录</small></div>
        <div class="doc-row"><span class="doc-type">ESSAY</span><strong>聊一聊公开写作这件事</strong><small>表达方法</small></div>
        <div class="doc-row"><span class="doc-type">MAP</span><strong>关于我算命与人生设计</strong><small>生命地图</small></div>
      </div>
      <p class="window-note">注：当前网站是公开展示层，完整原始材料仍保留在本地档案中。</p>
    `,
  },
  map: {
    title: '生命地图', path: 'MAP / INNER WORLD', content: `
      <p class="window-kicker">A MAP THAT KEEPS CHANGING</p>
      <h2>从认识自己，到创造自己的路。</h2>
      <div class="map-scene"><div class="map-path"></div><i class="map-dot one"></i><i class="map-dot two"></i><i class="map-dot three"></i><span class="map-label a">认识自己</span><span class="map-label b">创造事业</span><span class="map-label c">活出状态</span></div>
      <p>这张地图没有终点。它记录几个持续回到我身上的问题：我真正想要什么？什么样的工作值得长期投入？怎样在效率之外，保留感受、关系与身体？</p>
    `,
  },
  contact: {
    title: '联系翔叔', path: 'CONTACT / NEXT', content: `
      <p class="window-kicker">OPEN TO A GOOD CONVERSATION</p>
      <h2>如果你也在做一件还没有名字的事。</h2>
      <p class="window-intro">可以从一个具体问题开始：产品、内容、AI、个人成长，或者只是某个你想认真想清楚的念头。</p>
      <div class="contact-sheet"><div class="info-block"><h3>适合聊什么</h3><p>个人品牌与内容系统、AI 产品原型、心理成长工具、长期主义的创造实践。</p></div><div class="info-block"><h3>联系入口</h3><p>公开联系方式正在整理中。网站先保留这个入口，避免把还没确认的地址写在这里。</p></div></div>
    `,
  },
  help: {
    title: '使用说明', path: 'SYSTEM / GUIDE', content: `
      <p class="window-kicker">WELCOME TO THE DESKTOP</p>
      <h2>像使用一台电脑一样认识翔叔。</h2>
      <div class="help-grid"><div class="help-card"><h3>打开文件夹</h3><p>点击桌面文件夹、底部 Dock 图标或顶部菜单。窗口会在桌面上打开。</p></div><div class="help-card"><h3>移动文件夹</h3><p>按住文件夹拖动。松开后会保留在新的位置；短按则打开对应内容。</p></div><div class="help-card"><h3>移动窗口</h3><p>拖动窗口顶部标题栏。左侧三颗按钮分别用于关闭、隐藏和放大。</p></div><div class="help-card"><h3>更换主题</h3><p>点击顶部“主题”或 Dock 里的主题图标，在五种桌面气质之间切换。</p></div></div>
    `,
  },
};

function bringToFront(windowElement) {
  zIndex += 1;
  windowElement.style.zIndex = String(zIndex);
  document.querySelectorAll('.window').forEach((item) => item.classList.remove('is-focused'));
  windowElement.classList.add('is-focused');
}

function renderWindow(id) {
  const data = windowData[id];
  if (!data) return null;
  const windowElement = document.createElement('section');
  windowElement.className = `window is-focused is-centered${id === 'resume' ? ' resume-window' : ''}`;
  windowElement.dataset.window = id;
  windowElement.setAttribute('role', 'dialog');
  windowElement.setAttribute('aria-label', data.title);
  windowElement.innerHTML = `
    <header class="window-titlebar">
      <div class="window-controls" aria-label="窗口控制"><button class="window-control close" type="button" data-window-action="close" aria-label="关闭窗口"></button><button class="window-control min" type="button" data-window-action="minimize" aria-label="隐藏窗口"></button><button class="window-control max" type="button" data-window-action="maximize" aria-label="放大窗口"></button></div>
      <div class="window-title">${data.title}</div><div class="window-path">${data.path}</div>
    </header>
    <div class="window-content">${data.content}</div>
  `;
  windowLayer.appendChild(windowElement);
  bringToFront(windowElement);
  return windowElement;
}

function openWindow(id) {
  if (!windowData[id]) return;
  let windowElement = windowLayer.querySelector(`[data-window="${id}"]`);
  if (!windowElement) windowElement = renderWindow(id);
  windowElement.classList.remove('is-minimized');
  bringToFront(windowElement);
}

function closeWindow(windowElement) {
  if (!windowElement) return;
  windowElement.classList.add('is-closing');
  windowElement.style.animation = 'window-out .18s ease both';
  window.setTimeout(() => windowElement.remove(), 220);
}

function setMascot(open) {
  if (!mascotDialog) return;
  mascotDialog.hidden = !open;
  document.querySelectorAll('[data-mascot-open]').forEach((button) => button.setAttribute('aria-expanded', String(open)));
}

function setThemePanel(open) {
  if (!themePanel) return;
  if (open && !themePanel.dataset.ready) {
    themePanel.innerHTML = `<h3>选择桌面主题</h3>${themes.map((theme) => `<button type="button" class="theme-choice ${theme.className}" data-theme="${theme.id}"><strong>${theme.name}</strong><small>${theme.note}</small></button>`).join('')}`;
    themePanel.dataset.ready = 'true';
  }
  themePanel.hidden = !open;
  if (open) updateThemeChoices();
}

function updateThemeChoices() {
  const current = document.body.className.match(/theme-(dream|cartoon|tech|ancient|deep)/)?.[1] || 'dream';
  themePanel.querySelectorAll('[data-theme]').forEach((button) => button.classList.toggle('is-active', button.dataset.theme === current));
}

function setTheme(id) {
  if (!themes.some((theme) => theme.id === id)) return;
  document.body.className = `theme-${id}`;
  try { localStorage.setItem('xiangshu-theme', id); } catch (error) { /* local preference is optional */ }
  updateThemeChoices();
}

function startFolderDrag(event, item) {
  if (event.button !== undefined && event.button !== 0) return;
  const startX = event.clientX;
  const startY = event.clientY;
  const rect = item.getBoundingClientRect();
  let moved = false;
  const move = (moveEvent) => {
    const dx = moveEvent.clientX - startX;
    const dy = moveEvent.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
    if (!moved) return;
    item.classList.add('is-dragging');
    item.style.left = `${Math.max(8, rect.left + dx)}px`;
    item.style.top = `${Math.max(48, rect.top + dy)}px`;
    item.style.right = 'auto';
  };
  const end = () => {
    item.classList.remove('is-dragging');
    item.releasePointerCapture?.(event.pointerId);
    item.removeEventListener('pointermove', move);
    item.removeEventListener('pointerup', end);
    item.removeEventListener('pointercancel', end);
    if (!moved) {
      openWindow(item.dataset.windowId);
    } else {
      item.dataset.skipClick = 'true';
      window.setTimeout(() => delete item.dataset.skipClick, 120);
    }
  };
  item.setPointerCapture?.(event.pointerId);
  item.addEventListener('pointermove', move);
  item.addEventListener('pointerup', end);
  item.addEventListener('pointercancel', end);
}

function startWindowDrag(event, titlebar) {
  if (event.target.closest('button')) return;
  const windowElement = titlebar.closest('.window');
  if (!windowElement || windowElement.classList.contains('is-maximized')) return;
  const rect = windowElement.getBoundingClientRect();
  windowElement.classList.remove('is-centered');
  windowElement.style.left = `${rect.left}px`;
  windowElement.style.top = `${rect.top}px`;
  bringToFront(windowElement);
  const startX = event.clientX;
  const startY = event.clientY;
  const move = (moveEvent) => {
    windowElement.style.left = `${Math.max(8, rect.left + moveEvent.clientX - startX)}px`;
    windowElement.style.top = `${Math.max(42, rect.top + moveEvent.clientY - startY)}px`;
    windowElement.style.right = 'auto';
  };
  const end = () => {
    titlebar.releasePointerCapture?.(event.pointerId);
    titlebar.removeEventListener('pointermove', move);
    titlebar.removeEventListener('pointerup', end);
    titlebar.removeEventListener('pointercancel', end);
  };
  titlebar.setPointerCapture?.(event.pointerId);
  titlebar.addEventListener('pointermove', move);
  titlebar.addEventListener('pointerup', end);
  titlebar.addEventListener('pointercancel', end);
}

document.querySelectorAll('.desktop-item').forEach((item) => item.addEventListener('pointerdown', (event) => startFolderDrag(event, item)));

document.addEventListener('pointerdown', (event) => {
  const windowElement = event.target.closest('.window');
  if (windowElement) bringToFront(windowElement);
  const titlebar = event.target.closest('.window-titlebar');
  if (titlebar) startWindowDrag(event, titlebar);
});

document.addEventListener('click', (event) => {
  const openTarget = event.target.closest('[data-open-window]');
  if (openTarget) {
    openWindow(openTarget.dataset.openWindow);
    if (systemMenu) systemMenu.hidden = true;
    return;
  }

  const windowAction = event.target.closest('[data-window-action]');
  if (windowAction) {
    const windowElement = windowAction.closest('.window');
    const action = windowAction.dataset.windowAction;
    if (action === 'close') closeWindow(windowElement);
    if (action === 'minimize') windowElement.classList.toggle('is-minimized');
    if (action === 'maximize') {
      const maximizing = !windowElement.classList.contains('is-maximized');
      windowElement.classList.toggle('is-maximized', maximizing);
      windowElement.classList.toggle('is-centered', !maximizing);
    }
    return;
  }

  const folderTarget = event.target.closest('[data-window-id]');
  if (folderTarget) {
    if (folderTarget.dataset.skipClick === 'true') {
      delete folderTarget.dataset.skipClick;
      return;
    }
    openWindow(folderTarget.dataset.windowId);
    return;
  }

  const themeToggle = event.target.closest('[data-theme-toggle]');
  if (themeToggle) {
    setThemePanel(themePanel.hidden);
    if (systemMenu) systemMenu.hidden = true;
    return;
  }

  const themeChoice = event.target.closest('[data-theme]');
  if (themeChoice) {
    setTheme(themeChoice.dataset.theme);
    return;
  }

  const mascotOpen = event.target.closest('[data-mascot-open]');
  if (mascotOpen) {
    setMascot(mascotDialog.hidden);
    return;
  }

  if (event.target.closest('[data-mascot-close]')) {
    setMascot(false);
    return;
  }

  const menuToggle = event.target.closest('[data-menu-toggle]');
  if (menuToggle) {
    const open = systemMenu.hidden;
    systemMenu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    return;
  }

  if (!event.target.closest('#system-menu') && !event.target.closest('[data-menu-toggle]') && systemMenu) systemMenu.hidden = true;
  if (!event.target.closest('#theme-panel') && !event.target.closest('[data-theme-toggle]')) setThemePanel(false);
});

try {
  const savedTheme = localStorage.getItem('xiangshu-theme');
  if (savedTheme) setTheme(savedTheme);
} catch (error) { /* local preference is optional */ }

document.querySelector('[data-clock]')?.replaceChildren(new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long', weekday: 'long' }).format(new Date()));
