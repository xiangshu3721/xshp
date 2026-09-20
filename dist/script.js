const windowLayer = document.querySelector('#window-layer');
const desktop = document.querySelector('#desktop');
const appShell = document.querySelector('#app');
const themePanel = document.querySelector('#theme-panel');
const systemMenu = document.querySelector('#system-menu');
const mascotDialog = document.querySelector('#mascot-dialog');

let zIndex = 25;

const themes = [
  { id: 'original', name: '原始梦行山水', note: '翔叔的桌面', src: 'assets/xiangshu-dream-path.png' },
  { id: 'castle', name: '光之城', note: '想象与远方', wallpaper: '01.jpeg', src: 'assets/manifesto/01.jpeg' },
  { id: 'forest', name: '林间之路', note: '慢下来，向内走', wallpaper: '02.jpeg', src: 'assets/manifesto/02.jpeg' },
  { id: 'valley', name: '山野之间', note: '保持好奇', wallpaper: '03.jpeg', src: 'assets/manifesto/03.jpeg' },
  { id: 'cloud', name: '云上世界', note: '允许自己出发', wallpaper: '04.jpeg', src: 'assets/manifesto/04.jpeg' },
  { id: 'lakeside', name: '湖畔读书', note: '在水边，慢慢读', src: 'assets/lakeside-reading.png' },
  { id: 'pink-cloud', name: '粉云花园', note: '轻盈地，向天空伸手', src: 'assets/pink-cloud-girl-desktop.png' },
];

const romanticPoems = [
  { text: '死生契阔，与子成说。执子之手，与子偕老。', source: '《诗经·击鼓》' },
  { text: '窈窕淑女，君子好逑。', source: '《诗经·关雎》' },
  { text: '投我以木桃，报之以琼瑶。', source: '《诗经·木瓜》' },
  { text: '山有木兮木有枝，心悦君兮君不知。', source: '《越人歌》' },
  { text: '有美人兮，见之不忘。一日不见兮，思之如狂。', source: '《凤求凰》' },
  { text: '玲珑骰子安红豆，入骨相思知不知。', source: '温庭筠《新添声杨柳枝词》' },
  { text: '身无彩凤双飞翼，心有灵犀一点通。', source: '李商隐《无题》' },
  { text: '在天愿作比翼鸟，在地愿为连理枝。', source: '白居易《长恨歌》' },
  { text: '相思相见知何日？此时此夜难为情。', source: '李白《三五七言》' },
  { text: '只愿君心似我心，定不负相思意。', source: '李之仪《卜算子》' },
  { text: '两情若是久长时，又岂在朝朝暮暮。', source: '秦观《鹊桥仙》' },
  { text: '月上柳梢头，人约黄昏后。', source: '欧阳修《生查子·元夕》' },
  { text: '落花人独立，微雨燕双飞。', source: '晏几道《临江仙》' },
  { text: '一生一代一双人，争教两处销魂。', source: '纳兰性德《画堂春》' },
  { text: '人生若只如初见，何事秋风悲画扇。', source: '纳兰性德《木兰花令》' },
  { text: '此情无计可消除，才下眉头，却上心头。', source: '李清照《一剪梅》' },
  { text: '愿我如星君如月，夜夜流光相皎洁。', source: '范成大《车遥遥篇》' },
  { text: '天不老，情难绝。心似双丝网，中有千千结。', source: '张先《千秋岁》' },
  { text: '换我心，为你心，始知相忆深。', source: '顾夐《诉衷情》' },
  { text: '思君如满月，夜夜减清辉。', source: '张九龄《赋得自君之出矣》' },
  { text: '愿得一心人，白头不相离。', source: '卓文君《白头吟》' },
  { text: '春水初生，春林初盛，春风十里，不如你。', source: '冯唐《三十六大》' },
  { text: '我住长江头，君住长江尾。日日思君不见君，共饮长江水。', source: '李之仪《卜算子》' },
  { text: '曾经沧海难为水，除却巫山不是云。', source: '元稹《离思》' },
  { text: 'How do I love thee? Let me count the ways.', translation: '我怎样爱你？让我细数那些爱的方式。', source: 'Elizabeth Barrett Browning, Sonnet 43' },
  { text: 'Shall I compare thee to a summer’s day? Thou art more lovely and more temperate.', translation: '我怎能把你比作夏日？你比夏日更可爱，也更温柔。', source: 'William Shakespeare, Sonnet 18' },
  { text: 'Love is not love which alters when it alteration finds.', translation: '真正的爱，不会因为发现变化，便随之改变。', source: 'William Shakespeare, Sonnet 116' },
  { text: "O my Luve's like a red, red rose, that's newly sprung in June.", translation: '我的爱人像六月里新开的红玫瑰，鲜艳而明亮。', source: 'Robert Burns, A Red, Red Rose' },
  { text: 'She walks in beauty, like the night of cloudless climes and starry skies.', translation: '她走来如夜色般美丽，像无云天际与繁星的光。', source: 'Lord Byron, She Walks in Beauty' },
  { text: 'Bright star, would I were stedfast as thou art—', translation: '明亮的星啊，但愿我能像你一样坚定长久。', source: 'John Keats, Bright Star' },
  { text: 'That Love is all there is is all we know of Love.', translation: '我们所知道的爱，不过是：爱就是一切。', source: 'Emily Dickinson, Poem 1765' },
];

let lastPoemIndex = -1;

function showRandomPoem() {
  if (!mascotDialog) return;
  let poemIndex = Math.floor(Math.random() * romanticPoems.length);
  if (romanticPoems.length > 1 && poemIndex === lastPoemIndex) poemIndex = (poemIndex + 1) % romanticPoems.length;
  lastPoemIndex = poemIndex;
  const poem = romanticPoems[poemIndex];
  const dialogMain = mascotDialog.querySelector('.dialog-main');
  if (!dialogMain) return;
  dialogMain.innerHTML = `<span class="poem-text">${poem.text}</span>${poem.translation ? `<span class="poem-translation">${poem.translation}</span>` : ''}<small class="poem-source">${poem.source}</small>`;
  setMascot(true);
}

const resumePages = Array.from({ length: 19 }, (_, index) => {
  const page = String(index + 1).padStart(2, '0');
  return `<img class="resume-page" src="assets/resume-pages/page-${page}.jpg" alt="翔叔个人简历第 ${index + 1} 页" loading="${index === 0 ? 'eager' : 'lazy'}" />`;
});

const portfolioPages = Array.from({ length: 11 }, (_, index) => {
  const page = String(index + 1).padStart(2, '0');
  return `<img class="portfolio-page" src="assets/portfolio-pages/page-${page}.jpg" alt="翔叔产品经验作品集第 ${index + 1} 页" loading="${index === 0 ? 'eager' : 'lazy'}" />`;
});

const resumeTimeline = [
  {
    years: '2024-现在',
    title: 'ASVA 人生学院 + AI 探索',
    summary: '从心理疗愈、艺术疗愈与东方文化出发，探索面向个人与家庭的成长服务，并把 AI 逐步放进陪伴、诊断与交付流程。',
    detail: '我负责产品定位、服务设计、内容与运营，以及 AI 工具和工作流实验。希望让技术真正进入人的成长现场，而不是停留在工具展示层。',
    image: 'assets/portfolio-pages/page-08.jpg',
    imageAlt: '觉镜 JueLens 疗愈师 AI 工作台界面与服务流程',
  },
  {
    years: '2021-2024',
    title: '二奢 AI + 直播电商',
    summary: '围绕二手奢侈品、球星卡、潮玩和直播电商，搭建交易、内容、私域与履约协同的平台。',
    detail: '从采购、仓储、商品、直播到订单和会员体系，持续处理信任、价格、供应链与转化之间的复杂关系，也参与 AI 鉴定、估价和选款等方向的探索。',
    image: 'assets/portfolio-pages/page-03.jpg',
    imageAlt: '二奢 AI 与直播电商产品界面',
  },
  {
    years: '2019-2021',
    title: '短视频直播',
    summary: '负责短视频与直播业务，围绕主播、公会、用户和平台，做内容分发、活动、关系维护与运营系统。',
    detail: '从用户侧与营收活动切入，也接触 MCN、公会、艺人风控、财务和数据等后台系统，理解实时互动、内容增长和商业化如何彼此联动。',
    image: 'assets/portfolio-pages/page-04.jpg',
    imageAlt: '短视频直播产品界面与直播业务后台',
  },
  {
    years: '2017-2019',
    title: 'Soulmate 创意社交',
    summary: '一个面向年轻人的创意社交产品，用兴趣、内容、活动和轻量互动帮助陌生人相遇。',
    detail: '我参与产品定位、用户增长、活动运营和社交机制设计，持续研究表达和连接如何发生，并用真实的用户反馈迭代产品体验。',
    image: 'assets/portfolio-pages/page-05.jpg',
    imageAlt: 'Soulmate 创意社交产品界面',
  },
  {
    years: '2015-2017',
    title: '旅行 · 电商 · 内容社区',
    summary: '从旅行内容、用户关系与小型电商服务开始，第一次完整接触互联网产品的真实现场。',
    detail: '包括旅行内容策划、社群与内容社区、商品和服务交易等实践。这段经历让我开始理解用户、内容和商业之间如何彼此牵动，也成为后来持续做产品的起点。',
    image: 'assets/travel-commerce-community.png',
    imageAlt: '旅行、电商与内容社区的场景图',
  },
];

const resumeTimelineMarkup = resumeTimeline.map((project) => `
  <article class="resume-timeline-project">
    <div class="resume-timeline-meta"><strong>${project.years}</strong><span>${project.title}</span><p>${project.summary}</p><p>${project.detail}</p></div>
    <a class="resume-timeline-image-link" href="${project.image}" target="_blank" rel="noreferrer"><img class="resume-timeline-image" src="${project.image}" alt="${project.imageAlt}" loading="lazy" /></a>
  </article>
`).join('');

const windowData = {
  resume: {
    title: '个人简历 · 原版', path: 'RESUME / ORIGINAL PDF', content: `
      <button class="document-close" type="button" data-window-action="close" aria-label="关闭简历">×</button>
      <div class="resume-pages">${resumePages.join('')}</div>
    `,
  },
  about: {
    title: '关于翔叔', path: 'ABOUT / ME', content: `
      <div class="about-longform">
        <div class="about-hero">
          <div class="about-hero-copy"><p class="window-kicker">THE PERSON BEHIND THE DESKTOP</p><h2>你好，我是翔叔</h2><p class="window-intro">如果只看我的履历，你可能会觉得，这是一个有点“不安分”的人。</p><p class="window-intro">我做过旅行、电商、内容社区，做过年轻人的创意社交，做过短视频直播，也做过二手奢侈品、潮玩和复杂的交易系统；后来，我又一头扎进了心理成长、艺术疗愈、东方文化，现在则把很大一部分时间放在 AI 上。</p><p class="window-intro">产品、运营、商业、心理、艺术、AI。</p><p class="window-intro">看起来跨度很大。</p><p class="window-intro">但这些年回头看，我越来越发现，我好像一直没有真正换过方向。</p><p class="about-lead">我一直在研究同一件事——人。</p></div>
          <figure class="about-image-card about-avatar-card"><img src="assets/xiangshu-avatar.jpg" alt="翔叔在竹林边手持一朵花" /><figcaption>配图 01｜翔叔真人照</figcaption></figure>
        </div>
        <div class="about-question-grid"><p>人为什么会喜欢一个产品？</p><p>为什么两个陌生人会建立连接？</p><p>为什么有人愿意信任你、为你付费，又为什么一个明明很有能力的人，会在人生的某个阶段突然卡住？</p><p>我们为什么会爱上一个人，又为什么会在关系里失去自己？</p><p>为什么有些人事业看起来很成功，却越来越不像自己？</p><p>当 AI 开始替我们写作、思考、设计、决策以后——<strong>人真正不可替代的，到底是什么？</strong></p></div>

        <section class="about-section about-chapter"><p class="about-label">01</p><h3>我曾经很相信：只要把事情做好，人生自然会越来越好</h3><p>我大学毕业之后，很长一段时间都待在互联网行业。</p><p>从产品、运营，到增长、商业化，再到复杂业务系统，我参与过很多完全不同的项目。</p><p>做社交产品的时候，我研究的是人与人为什么会产生连接。</p><p>做直播的时候，我开始理解主播、公会、用户、平台之间复杂的利益和情感关系。</p><p>做电商和二手交易的时候，我又必须去理解信任、价格、供应链、消费心理和商业效率。</p><p>后来负责越来越复杂的系统，我开始习惯一件事：</p><p class="about-lead">当所有人都在讨论功能的时候，我会先问——真正的问题到底是什么？</p><p>有时候问题根本不在产品。</p><p>有时候是流程，有时候是利益关系，有时候是人的情绪，有时候甚至是大家对于“问题是什么”的理解本身就错了。</p><p>这也是产品经理这份工作留给我最大的东西。</p><p>它让我逐渐养成一种本能：</p><p class="about-lead">看到混乱的时候，我总想找到背后的结构。</p><p>看到一个人的困境，我也会忍不住去想：</p><p class="about-lead">发生在他身上的事情，背后究竟是一套怎样的系统？</p></section>
        <section class="resume-timeline" aria-label="十年职业项目时间轴"><div class="resume-timeline-heading"><div><p class="about-label">项目时间轴</p><h3>从最近的项目开始，向左看见来时的路</h3><p>项目按最新到最早从左到右排列。每个项目只保留一张主界面图，点击可打开清晰原图。</p></div><div class="resume-timeline-controls"><button type="button" data-gallery-scroll="prev" aria-label="查看左侧项目">←</button><button type="button" data-gallery-scroll="next" aria-label="查看右侧项目">→</button></div></div><div class="resume-timeline-track" data-gallery-track>${resumeTimelineMarkup}</div><p class="resume-timeline-caption">配图 02｜十年职业路径<br /><span>AI 探索 → 交易平台 → 直播 → 创意社交 → 旅行、电商与内容社区</span><strong>「看起来我换了很多行业，其实一直在学习如何理解人。」</strong></p></section>

        <section class="about-section about-chapter"><p class="about-label">02</p><h3>后来我发现，理解一个人的难度，远远超过理解一个产品</h3><p>我一直对心理学、人性、哲学、艺术和东方智慧有很强的兴趣。</p><p>它们最初不是我的职业。</p><p>只是因为有太多关于自己、关于关系、关于人生的问题，我想不明白。</p><p>于是我读心理学，接触艺术疗愈，研究人格、成长、关系，也慢慢走进《道德经》《心经》《易经》以及东方文化。</p><p>后来我开始真正参与心理成长与疗愈行业。</p><p>当我开始坐下来，认真听一个人讲自己的故事时，我越来越确定：</p><p class="about-lead">人不是一个等待被修好的问题。</p><p>很多时候，一个人真正需要的不是别人告诉他“你应该怎么办”。</p><p>而是有人愿意陪他，把那些混乱的东西慢慢摊开。</p><p>哪些是事实？哪些是恐惧？哪些是从父母、关系和社会里继承来的声音？哪些才真正属于自己？</p><p>有时候，一个人的改变并不来自一个多么高深的答案。</p><p>可能只是某一刻，他突然发现：</p><p class="about-lead">“原来我可以这样理解自己。”</p><p>或者：</p><p class="about-lead">“原来我还有另外一种选择。”</p><p>我特别喜欢这样的瞬间。</p><p>我把它叫做 <strong>Aha Moment</strong>。</p><p>一个人突然松了一点。看懂了一点。重新拿回了一点选择权。</p><p>如果一定要说我这些年真正想创造什么，大概就是：</p><p class="about-lead">创造爱、美与智慧的 Aha Moment。</p></section>
        <figure class="about-image-card about-aha-figure"><img src="assets/reference-luminous-castle.jpg" alt="蓝色天空下的一束光与远方的城堡" /><figcaption>配图 03｜Aha Moment<br /><span>真正的改变，很多时候只是重新看见一种可能。</span></figcaption></figure>

        <section class="about-section about-chapter"><p class="about-label">03</p><h3>AI 出现以后，我重新理解了“技术”这件事</h3><p>过去我做互联网产品时，技术更多是一种解决问题的工具。</p><p>提高效率、降低成本、扩大规模。</p><p>但这一轮 AI 出现之后，我越来越觉得，它可能会重新定义很多东西。</p><p>我开始自己研究 Agent、Workflow、知识库、AI 产品，也不断做一些真实的实验：</p><p>AI 深度陪伴、成长诊断、疗愈师 AI 工作台、个人知识系统、内容系统、销售与服务交付系统……</p><p>但我对 AI 真正感兴趣的，从来不只是：</p><p class="about-lead">“它还能帮我省多少时间？”</p><blockquote class="quote">当机器越来越聪明，人应该把什么交给机器，又应该把什么重新拿回自己？</blockquote><p>如果 AI 可以帮你写文章，那么什么才是真正属于你的表达？</p><p>如果 AI 可以给你一百个答案，你是否还知道自己真正想问什么？</p><p>如果 AI 可以替你分析一个人，我们是否会反而失去真正看见一个人的能力？</p><p>如果未来知识、分析甚至创造的成本越来越低，那么人的觉察、选择、审美、体验、关系以及生命本身，会不会反而变得越来越珍贵？</p><p>所以我并不想成为一个单纯教大家“使用 AI 工具”的人。</p><p class="about-lead">我真正关心的是：怎样让技术扩展人，而不是取代人。</p><p>技术可以越来越强。</p><p>但人不能因此越来越远离自己。</p></section>
        <figure class="about-image-card about-work-figure"><img src="assets/xiangshu-fieldboard.png" alt="人在电脑前与 AI 球体共同工作的场景" /><figcaption>配图 04｜人与 AI<br /><span>Technology × Humanity<br />技术越强，人越要知道自己是谁。</span></figcaption></figure>

        <section class="about-section about-chapter"><p class="about-label">04</p><h3>所以现在，我把自己放在一个很少有人能准确归类的位置</h3><p>如果你一定要问我：“翔叔，你到底是做什么的？”</p><p>我现在可能不会再给自己一个特别标准的职业标签。</p><p>我当然做产品。</p><p>我也懂运营、商业和销售。</p><p>我长期研究心理成长、艺术疗愈和东方智慧。</p><p>现在也在做 AI 产品和 AI 个体创业。</p><p>但任何一个标签单独拿出来，都无法完整描述我。</p><p>我更愿意把自己理解成一个：</p><p class="about-lead">产品艺术家、思想实验者和构建者。</p><p>我喜欢把那些原本离得很远的东西放在一起。</p><p>AI 和心理学。商业和生命成长。东方智慧和现代产品。艺术和技术。理性和感性。</p><p>然后问一句：</p><p class="about-lead">它们之间，会不会存在一种新的可能？</p><p>接着，把这个可能做出来。</p><p>这也是我一直很喜欢的一句话：</p><p class="about-lead">Think it → Build it → Share it</p><p>去思考。去创造。然后把它带到这个世界上。</p></section>

        <section class="about-section about-chapter"><p class="about-label">05</p><h3>我越来越想研究的，是一个更大的问题</h3><p>今天我们正在进入一个变化越来越快的时代。</p><p>信息越来越多。工具越来越强。AI 越来越聪明。</p><p>但与此同时，我发现很多人的生活反而越来越混乱。</p><p>不知道自己真正喜欢什么。</p><p>不知道应该选择什么样的伴侣。</p><p>不知道要不要离开现在的工作。</p><p>不知道该创业还是上班。</p><p>不知道为什么已经懂了那么多道理，人生还是没有发生真正的变化。</p><p>于是，我慢慢把自己未来很多年的探索，收束成了一个问题：</p><blockquote class="quote">人在复杂多变的 AI 时代，如何更好地认识自己、进入深度关系、创造美好事业，并活出属于自己的生命状态？</blockquote><div class="about-topics"><div><strong>认识自己</strong><p>不是找到一个 MBTI、星座或者人格标签，然后宣布“我就是这样”。</p><p>而是越来越知道：</p><p>什么真正适合我？我的天赋在哪里？我的局限在哪里？什么是别人期待的我，什么才是我真正想成为的自己？</p></div><div><strong>进入关系</strong><p>我们怎样既不失去自己，又能真正靠近另外一个人？</p><p>怎样爱，也允许自己被爱？</p><p>怎样建立一种既有自由，又有深度的关系？</p></div><div><strong>创造事业</strong><p>事业不应该只是一个赚钱机器。</p><p>我越来越觉得：</p><p>事业是一个人的生命力进入现实世界的一种方式。</p><p>好的事业，应该能够让天赋、兴趣、社会价值、商业价值和你真正想过的生活，慢慢靠近彼此。</p></div><div><strong>生命状态</strong><p>如果一个事业赚了很多钱，却让自己每天都活得麻木、焦虑、枯竭，我不知道这算不算真正意义上的成功。</p><p>我更喜欢一种“小而美”的东西。</p><p>Less, but better.</p><p>不一定最大。</p><p>但是真的。</p><p>有审美。</p><p>有人味。</p><p>可持续。</p><p>也允许一个人活成自己。</p></div><div class="about-topic-center">人</div><div class="about-topic-orbit">AI · 心理 · 艺术 · 东方智慧 · 产品 · 商业</div></div></section>
        <figure class="about-image-card about-final-figure"><img src="assets/reference-dream-garden.jpg" alt="通往远方的东方园林小路" /><figcaption>配图 05｜四个长期母题<br /><span>认识自己 → 深度关系 → 美好事业 → 生命状态</span></figcaption></figure>

        <section class="about-section about-chapter"><p class="about-label">06</p><h3>我不想成为一个什么都懂的人生导师</h3><p>这一点对我其实很重要。</p><p>我并不觉得自己已经把人生想明白了。</p><p>很多我写的东西，本身就是我正在经历、正在实践、正在修正的问题。</p><p>我也会迷茫。会犹豫。会对很多事情没有答案。</p><p>甚至常常今天刚建立一个判断，过一阵子又发现：</p><p class="about-lead">“好像还可以再往深一点看。”</p><p>所以，比起告诉别人：“人生应该怎样活。”</p><p>我更愿意做另外一件事：</p><p class="about-lead">把问题看得更清楚一点。</p><p>然后一起寻找新的可能。</p><p>我不太喜欢制造焦虑，也不喜欢把人简单地贴成某一种标签。</p><p>我相信每个人都有自己的生命节奏。</p><p>工具可以帮助我们理解自己。理论可以给我们地图。AI 也可以成为一面很强大的镜子。</p><p>但最后真正走路的人，依然只能是自己。</p></section>
        <section class="about-section about-chapter"><p class="about-label">07</p><h3>如果未来很多事情都可以被 AI 完成，我希望自己仍然保留三种能力</h3><div class="about-three"><div><strong>思考。</strong><p>不是重复别人已经说过的话，而是始终愿意问一句：事情真的只能这样吗？</p></div><div><strong>创造。</strong><p>把脑海里的某个想法，真的变成一个产品、一篇文章、一段音乐、一幅画、一种服务或者一种新的生活方式。</p></div><div><strong>表达。</strong><p>让那些我相信的东西，可以被另外一个人看见、理解，甚至因此产生一点改变。</p></div></div><p>这是我到现在为止，对自己最稳定的信任。</p><p>无论时代怎么变化。无论职业叫什么。无论下一站在哪里。</p><p>我想，我大概还是会继续做同一件事情：</p><p class="about-lead">理解人。<br />理解世界。<br />然后创造一点以前不存在的东西。</p><p>如果它刚好也能让某个人更理解自己一点，更自由一点，更有勇气活成自己一点——那就更好了。</p></section>
        <figure class="about-closing-figure"><img src="assets/xiangshu-avatar.jpg" alt="翔叔的生活照" /><figcaption>配图 06｜结尾人物照</figcaption></figure>
        <section class="about-closing"><p class="about-lead">Think it. Build it. Share it.</p><p>思考 · 创造 · 表达</p><div class="about-profile"><p class="about-label">关于我</p><h3>翔叔</h3><p>产品艺术家<br />以万物为师，行知合一<br />探索 AI x 身心成长最佳实践</p><p>长期关注：<strong>AI × 人 · 自我认识 · 深度关系 · 美好事业 · 生命状态</strong></p><blockquote class="quote">技术可以越来越强，但人不能因此越来越远离自己。<br /><br />也希望自己最终能够创造：爱、美与智慧的 Aha Moment。</blockquote></div></section>
      </div>
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
    title: '作品集 · 产品经验', path: 'WORK / PRODUCT PORTFOLIO', content: `
      <button class="document-close" type="button" data-window-action="close" aria-label="关闭作品集">×</button>
      <div class="portfolio-pages">${portfolioPages.join('')}</div>
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
      <div class="help-grid"><div class="help-card"><h3>打开内容</h3><p>使用底部 Dock 里的关于、简历和作品入口打开内容。</p></div><div class="help-card"><h3>移动翔叔管家</h3><p>按住翔叔管家拖动到桌面的任意位置。松开后会保留新的位置；轻点则打开对话。</p></div><div class="help-card"><h3>移动窗口</h3><p>拖动窗口顶部标题栏。左侧三颗按钮分别用于关闭、隐藏和放大。</p></div><div class="help-card"><h3>更换背景</h3><p>点击顶部“主题”或 Dock 里的主题图标，在四张艺术图之间切换背景。</p></div></div>
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
  const isDocument = id === 'resume' || id === 'projects';
  windowElement.className = `window is-focused is-centered${id === 'about' ? ' about-window' : ''}${isDocument ? ' document-window' : ''}`;
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
  const readingMode = id === 'resume' || id === 'projects';
  desktop?.classList.toggle('is-document-open', readingMode);
  appShell?.classList.toggle('is-document-open', readingMode);
  bringToFront(windowElement);
}

function closeWindow(windowElement) {
  if (!windowElement) return;
  if (windowElement.classList.contains('document-window')) {
    desktop?.classList.remove('is-document-open');
    appShell?.classList.remove('is-document-open');
  }
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
    themePanel.innerHTML = `<h3>选择背景艺术图</h3>${themes.map((theme) => `<button type="button" class="theme-choice" data-theme="${theme.id}" style="--choice-bg-image: url('${theme.src}')"><strong>${theme.name}</strong><small>${theme.note}</small></button>`).join('')}`;
    themePanel.dataset.ready = 'true';
  }
  themePanel.hidden = !open;
  if (open) updateThemeChoices();
}

function updateThemeChoices() {
  const current = desktop?.dataset.wallpaperTheme || themes[0].id;
  themePanel?.querySelectorAll('[data-theme]').forEach((button) => button.classList.toggle('is-active', button.dataset.theme === current));
}

function setTheme(id) {
  const theme = themes.find((item) => item.id === id);
  if (!theme || !desktop) return;
  desktop.style.setProperty('--active-wallpaper', `url("${theme.src}")`);
  desktop.dataset.wallpaperTheme = theme.id;
  try { localStorage.setItem('xiangshu-art-theme-v2', id); } catch (error) { /* local preference is optional */ }
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

function startMascotDrag(event, mascot) {
  if (event.button !== undefined && event.button !== 0) return;
  const rect = mascot.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;
  let moved = false;
  const move = (moveEvent) => {
    const dx = moveEvent.clientX - event.clientX;
    const dy = moveEvent.clientY - event.clientY;
    if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
    if (!moved) return;
    const maxLeft = Math.max(8, document.documentElement.clientWidth - rect.width - 8);
    const maxTop = Math.max(8, window.innerHeight - rect.height - 8);
    const left = Math.min(maxLeft, Math.max(8, moveEvent.clientX - offsetX));
    const top = Math.min(maxTop, Math.max(8, moveEvent.clientY - offsetY));
    mascot.classList.add('is-dragging');
    mascot.style.left = `${left}px`;
    mascot.style.top = `${top}px`;
    mascot.style.right = 'auto';
    mascot.style.bottom = 'auto';
  };
  const end = () => {
    mascot.classList.remove('is-dragging');
    mascot.releasePointerCapture?.(event.pointerId);
    mascot.removeEventListener('pointermove', move);
    mascot.removeEventListener('pointerup', end);
    mascot.removeEventListener('pointercancel', end);
    if (moved) {
      mascot.dataset.skipClick = 'true';
      window.setTimeout(() => delete mascot.dataset.skipClick, 160);
    }
  };
  mascot.setPointerCapture?.(event.pointerId);
  mascot.addEventListener('pointermove', move);
  mascot.addEventListener('pointerup', end);
  mascot.addEventListener('pointercancel', end);
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
document.querySelector('.mascot-desk')?.addEventListener('pointerdown', (event) => startMascotDrag(event, event.currentTarget));

document.addEventListener('pointerdown', (event) => {
  const windowElement = event.target.closest('.window');
  if (windowElement) bringToFront(windowElement);
  const titlebar = event.target.closest('.window-titlebar');
  if (titlebar) startWindowDrag(event, titlebar);
});

document.addEventListener('click', (event) => {
  const galleryControl = event.target.closest('[data-gallery-scroll]');
  if (galleryControl) {
    const track = galleryControl.closest('.resume-timeline')?.querySelector('[data-gallery-track]');
    if (!track) return;
    const direction = galleryControl.dataset.galleryScroll === 'prev' ? -1 : 1;
    track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.9, 280), behavior: 'smooth' });
    return;
  }

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
    if (mascotOpen.dataset.skipClick === 'true') {
      delete mascotOpen.dataset.skipClick;
      return;
    }
    showRandomPoem();
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

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const documentWindow = windowLayer.querySelector('.document-window');
  if (documentWindow) closeWindow(documentWindow);
});

try {
  const savedTheme = localStorage.getItem('xiangshu-art-theme-v2');
  if (savedTheme) setTheme(savedTheme);
} catch (error) { /* local preference is optional */ }

function updateClock() {
  const clock = document.querySelector('[data-clock]');
  if (!clock) return;
  const parts = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long',
    hour: '2-digit', minute: '2-digit', hour12: false, hourCycle: 'h23',
  }).formatToParts(new Date()).reduce((result, part) => ({ ...result, [part.type]: part.value }), {});
  clock.textContent = `${parts.year}年${parts.month}月${parts.day}日 ${parts.weekday} ${parts.hour}:${parts.minute}`;
}

updateClock();
window.setInterval(updateClock, 1000);
