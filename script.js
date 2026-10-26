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

const mascotAnswers = {
  person: '他好奇心很重，既能深入复杂的产品和商业系统，也会被音乐、艺术和一次有质量的谈话打动。他不太喜欢被单一标签定义。',
  works: '最近在做解忧小屋、ASVA 导师工作台、AI 场景诊断、思想工厂和手势画板。点开「作品」可以慢慢逛。',
  ideas: '他常常在想：当机器越来越聪明，人如何更自由、更完整地成为自己？怎样让思想进入现实，变成对别人真正有价值的作品？'
};
function showMascotWelcome() {
  if (!mascotDialog) return;
  const kicker = mascotDialog.querySelector('.dialog-kicker');
  const main = mascotDialog.querySelector('.dialog-main');
  if (kicker) kicker.textContent = '翔叔宇宙向导 / HELLO, STRANGER';
  if (main) main.textContent = '第一次来？随便问我一个关于翔叔的问题，或者听一句诗。';
  setMascot(true);
}
function showMascotAnswer(topic) {
  if (topic === 'poem') { showRandomPoem(); return; }
  if (!Object.prototype.hasOwnProperty.call(mascotAnswers, topic)) return;
  const kicker = mascotDialog?.querySelector('.dialog-kicker');
  const main = mascotDialog?.querySelector('.dialog-main');
  if (kicker) kicker.textContent = '来自宇宙向导的一点线索 ✳';
  if (main) main.textContent = mascotAnswers[topic];
  setMascot(true);
}

function showRandomPoem() {
  if (!mascotDialog) return;
  let poemIndex = Math.floor(Math.random() * romanticPoems.length);
  if (romanticPoems.length > 1 && poemIndex === lastPoemIndex) poemIndex = (poemIndex + 1) % romanticPoems.length;
  lastPoemIndex = poemIndex;
  const poem = romanticPoems[poemIndex];
  const dialogMain = mascotDialog.querySelector('.dialog-main');
  if (!dialogMain) return;
  const kicker = mascotDialog.querySelector('.dialog-kicker');
  if (kicker) kicker.textContent = '随机诗句 / JUST FOR YOU';
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

const aiWorks = [{"title":"ASVA 导师工作台","art":"ASVA OS","category":"business","tag":"导师协作 · 客户管理","summary":"面向成长机构的客户与导师协作工作台，集中管理客户档案、预约分配、服务记录和跟进任务，并用 AI 辅助理解客户、整理服务反馈、查询日常业务数据。","num":"01"},{"title":"解忧小屋","art":"解忧小屋","category":"people","tag":"身心成长 · AI 导诊","summary":"面向情绪、事业、亲密关系与家庭等生活困扰，用 AI 对话倾听心声、澄清问题和提供初步支持，遇到需要深入帮助的情况再衔接真人导师，让人看清眼前的困扰和下一步。","num":"02"},{"title":"翔叔 · AI 思想工厂","art":"思想工厂","category":"creation","tag":"研究 · 内容创作","summary":"把个人知识、灵感、用户需求和市场情报汇入统一工作台，借助 AI 挖掘选题、展开研究、创作文章与播客，再将每一次输出沉淀为可持续积累的思想与作品。","num":"03"},{"title":"AI 场景诊断","art":"AI 场景诊断","category":"business","tag":"AI 机会 · 落地实践","summary":"通过问题梳理与场景扫描，识别生活、工作和业务中最值得使用 AI 的环节，评估机会的价值与实现难度，并用诊断报告、优先级建议和行动地图帮助找到第一步。","num":"04"},{"title":"寻根之旅·原生家庭考古","art":"寻根之旅","category":"people","tag":"原生家庭 · 自我理解","summary":"围绕父母档案、成长经历与家庭互动开展一次原生家庭探索，结合相关测评和 AI 辅助洞察梳理代际关系与习得模式，尝试理解早年经历如何影响今天的感受与选择。","num":"05"},{"title":"SEFS·看见感受的形状","art":"SEFS","category":"people","tag":"主观体验 · 自我测评","summary":"通过 24 道题，从体验广度、体验容纳、体验归属和体验自主四个维度勾勒个人主观感受的状态，并以可阅读的结果报告帮助人认识自己的体验方式，而非作出临床诊断。","num":"06"},{"title":"镜像神通卡","art":"镜像神通卡","category":"people","tag":"抽牌互动 · 内在觉察","summary":"把抽牌与镜像式自我觉察结合，让用户从随机遇见的卡牌主题出发重新观看当下的困惑和内在反应，借由开放式提问梳理感受、关系与尚未看见的可能。","num":"07"},{"title":"怼怼","art":"怼怼","category":"people","tag":"情绪释放 · 关系模拟","summary":"以可控的 AI 对话模拟争执、互怼与缓和的情境，让人试着表达怒气、练习冲突中的回应和降温方式，在情绪释放之后重新理解沟通、边界与关系修复。","num":"08"},{"title":"修行日课","art":"修行日课","category":"people","tag":"每日修行 · 习惯记录","summary":"将天气预报觉察、断舍离、忏悔与自定义修行功课整理成每日打卡清单，支持记录当日压力和能量、查看历史与近期趋势，让零散的修习更容易持续和回顾。","num":"09"},{"title":"问己","art":"问己","category":"people","tag":"AI 镜像对话 · 自我探索","summary":"一个不急着提供标准答案的 AI 镜像对话伙伴，从用户亲自提出的困惑出发，通过倾听、澄清与适时提问，陪人走过“我看见、我明白、我选择”的自我理解过程。","num":"10"},{"title":"AI 观相","art":"AI 观相","category":"creation","tag":"视觉 AI · 传统文化","summary":"上传正脸照片后，先由视觉模型提取可观察的面部特征，再依据传统相学文化规则形成结构化解读，区分客观观察与文化推断，供趣味探索和自我反思参考。","num":"11"},{"title":"觉镜","art":"觉镜","category":"business","tag":"成长导师 · 个案复盘","summary":"面向心理成长导师和疗愈服务者的辅助工作台，围绕个案记录、会谈重点、成长目标与阶段变化，运用 AI 帮助整理咨询前后的信息、复盘服务过程并形成后续跟进思路。","num":"12"},{"title":"有点情绪","art":"有点情绪","category":"people","tag":"情绪记录 · 自我觉察","summary":"让用户随时用文字或语音倒出情绪碎碎念，围绕发生的事、身体感受、情绪与真实需要进行梳理，逐步形成可回看的情绪记录，帮助认识自己反复出现的触发和反应。","num":"13"},{"title":"屁大点事","art":"屁大点事","category":"people","tag":"轻松吐槽 · 情绪整理","summary":"像对一个会听你吐槽的损友倒苦水一样，把烦心小事交给应用归类为日常琐事、旧事、别人的事、未来担忧或冲突，再得到一句看法与一个轻量行动，少些内耗。","num":"14"},{"title":"主体边界卡","art":"主体边界卡","category":"people","tag":"人际边界 · 主体性","summary":"围绕关系里的选择、责任、情绪和个人空间设计情境式觉察卡，帮助区分哪些事情由自己负责、哪些属于他人，在日常互动中练习表达意愿与守护个人边界。","num":"15"},{"title":"言衣","art":"言衣","category":"creation","tag":"语言交互 · 创意穿搭","summary":"只要说出或输入想要的穿衣风格、场合与颜色，系统就从虚拟衣橱选择单品叠加到模特身上，还能接着要求换颜色、加外套、调整搭配并保存满意的造型。","num":"16"},{"title":"灵境","art":"灵境","category":"creation","tag":"体感互动 · 数字艺术","summary":"一个由手势、表情和身体动作驱动的互动艺术空间，可以在摄像头前创造霓虹图形、作画、敲木鱼、颂钵、泡茶、插花或玩体感小游戏，也能切换触屏交互。","num":"17"},{"title":"AirCanvas 空中画板","art":"AirCanvas","category":"creation","tag":"手势识别 · 空中绘画","summary":"对着摄像头捏合拇指与食指就能在空中画画，松开即停笔；还支持画笔与颜色切换、撤销重做、保存作品，并兼容鼠标或触屏绘画，让创作摆脱传统画板。","num":"18"}];
const aiCards = aiWorks.map((p) => `
<article class="ai-card ai-card-selected" data-ai-category="${p.category}">
  <div class="ai-cover ai-cover-${p.category}">
    <small>${p.num} / ${p.tag}</small>
    <strong>${p.art}</strong>
    <span>XIANGSHU · CREATIVE WORKS</span>
  </div>
  <div class="ai-card-body">
    <h3>${p.title}</h3>
    <p class="ai-card-description">${p.summary}</p>
  </div>
</article>`).join('');

const windowData = {
  resume: {
    title: '个人简历 · 原版', path: 'RESUME / ORIGINAL PDF', content: `
      <button class="document-close" type="button" data-window-action="close" aria-label="关闭简历">×</button>
      <div class="resume-pages">${resumePages.join('')}</div>
    `,
  },
  about: {
    title: '关于翔叔', path: 'ABOUT / ME', content: "\n<div class=\"about-v3\" id=\"about-v3\">\n  <header class=\"about-v3-hero\" id=\"about-intro\">\n    <p class=\"window-kicker\">01 / THE PERSON · 个人简介</p>\n    <div class=\"about-v3-hero-grid\">\n      <div class=\"about-v3-hero-copy\">\n        <h2>你好，<br />我是<span>翔叔。</span></h2>\n        <p class=\"about-v3-intro-lead\">一个有点品味的成长手艺人，<br />一个创新型的成长规划导师！</p>\n      </div>\n      <figure class=\"about-v3-photo\"><img src=\"assets/xiangshu-avatar.jpg\" alt=\"翔叔手持花朵的生活照片\" loading=\"lazy\" /><figcaption>XIANGSHU · A LIFE IN PROGRESS</figcaption></figure>\n    </div>\n    <div class=\"about-v3-profile-body\">\n      <div class=\"about-v3-profile-story\">\n        <p>曾在互联网里创造产品，<br />后走进心理与艺术的殿堂，<br />如今又迷上 AI 的无限可能。</p>\n        <p class=\"about-v3-mantra\">以万物为师</p>\n        <p>像艺术家一样创造体验，<br />像作家一样讲述生命。</p>\n        <p>研究心理，也琢磨玄学；<br />热爱艺术，也痴迷东方智慧。<br />理性与感性，双向奔赴。</p>\n      </div>\n      <blockquote class=\"about-v3-profile-invitation\">\n        <p><strong>比起交换名片，<br />我更期待交换一个有趣的灵魂。</strong></p>\n        <footer>或许，我们能一起创造点什么。</footer>\n      </blockquote>\n    </div>\n  </header>\n\n  <nav class=\"about-v3-nav\" aria-label=\"关于我的内容导航\">\n    <button type=\"button\" data-about-jump=\"about-growth\"><span>02</span> 成长经历</button>\n    <button type=\"button\" data-about-jump=\"about-skills\"><span>03</span> 个人技能</button>\n    <button type=\"button\" data-about-jump=\"about-interests\"><span>04</span> 个人爱好</button>\n    <button type=\"button\" data-about-jump=\"about-declaration\"><span>05</span> 世界宣言</button>\n  </nav>\n\n  <section class=\"about-v3-section\" id=\"about-growth\" aria-labelledby=\"about-growth-title\">\n    <div class=\"about-v3-heading\">\n      <p class=\"about-v3-eyebrow\">02 / THE FIRST TIMES</p>\n      <h2 id=\"about-growth-title\">人生，是由很多<br /><em>第一次体验</em>串联而成。</h2>\n      <p class=\"about-v3-heading-note\">那些第一次离开、第一次冒险、第一次独立创造，慢慢把我带到今天。</p>\n    </div>\n    <ol class=\"about-v3-timeline\">\n      <li class=\"about-v3-milestone\">\n        <span class=\"about-v3-time\">高中时期</span>\n        <div class=\"about-v3-milestone-body\"><h3>第一次独立创作</h3><p>第一次独立创作小说、作词、作曲，斩获“黑马”头衔。</p></div>\n      </li>\n      <li class=\"about-v3-milestone\">\n        <span class=\"about-v3-time\">18 岁那年</span>\n        <div class=\"about-v3-milestone-body\"><h3>第一次走向更大的世界</h3><p>第一次背井离乡，离开家，迈进大学的殿堂，探索更大的世界！</p></div>\n      </li>\n      <li class=\"about-v3-milestone\">\n        <span class=\"about-v3-time\">20 岁那年</span>\n        <div class=\"about-v3-milestone-body\"><h3>第一次挑战恐惧，也遇见互联网</h3><p>第一次卖房，克服内心恐惧，成为销冠！创造全新记录，多年未被打破。</p><p>第一次实习，参与手机微信开发，首次体会到移动互联网的魅力。</p></div>\n      </li>\n      <li class=\"about-v3-milestone\">\n        <span class=\"about-v3-time\">24 岁那年</span>\n        <div class=\"about-v3-milestone-body\"><h3>第一次经历职业迷茫</h3><p>奔波于毕业和工作之间，第一次职业迷茫。有点坎坷的经历，成为我人生道路的转折点，也培养了我独立思考的性格。</p></div>\n      </li>\n      <li class=\"about-v3-milestone about-v3-milestone-now\">\n        <span class=\"about-v3-time\">如今</span>\n        <div class=\"about-v3-milestone-body\"><h3>继续觉察、突破，追逐热爱</h3><p>毕业 10 年，感谢人生经历带给我更多的可能性。前行之路还须不断觉察突破，追逐热爱。</p><p class=\"about-v3-timeline-tagline\">Think it → Build it → Share it</p></div>\n      </li>\n    </ol>\n  </section>\n\n  <section class=\"about-v3-section\" id=\"about-skills\" aria-labelledby=\"about-skills-title\">\n    <div class=\"about-v3-heading\">\n      <p class=\"about-v3-eyebrow\">03 / PRACTICE & STUDY</p>\n      <h2 id=\"about-skills-title\">个人技能<span class=\"about-v3-period\">。</span></h2>\n      <p class=\"about-v3-heading-note\">跨越人、审美与东方思想的学习、研究和实践领域。</p>\n    </div>\n    <div class=\"about-v3-skill-grid\">\n      <article class=\"about-v3-skill-card\">\n        <span class=\"about-v3-skill-count\">01 / 人与成长</span>\n        <h3>心理 · 教练 · 艺术</h3>\n        <div class=\"about-v3-chips\"><span>心理咨询</span><span>教练技术</span><span>镜像技术</span><span>表达性艺术治疗</span><span>美学</span></div>\n      </article>\n      <article class=\"about-v3-skill-card\">\n        <span class=\"about-v3-skill-count\">02 / 传统文化</span>\n        <h3>东方术数</h3>\n        <div class=\"about-v3-chips\"><span>八字</span><span>占卜</span><span>风水</span></div>\n      </article>\n      <article class=\"about-v3-skill-card\">\n        <span class=\"about-v3-skill-count\">03 / 思想与修习</span>\n        <h3>哲学 · 东方智慧</h3>\n        <div class=\"about-v3-chips\"><span>哲学</span><span>阳明心学</span><span>禅宗</span><span>道家</span></div>\n      </article>\n    </div>\n    <p class=\"about-v3-clarification\">以上包含持续学习、研究与实践的领域，不代表已取得相应医疗、心理治疗或其他专业执业资质；传统术数属于文化探索，不作为科学诊断依据。</p>\n  </section>\n\n  <section class=\"about-v3-section\" id=\"about-interests\" aria-labelledby=\"about-interests-title\">\n    <div class=\"about-v3-heading\">\n      <p class=\"about-v3-eyebrow\">04 / THINGS I LOVE</p>\n      <h2 id=\"about-interests-title\">个人爱好<span class=\"about-v3-period\">。</span></h2>\n      <p class=\"about-v3-heading-note\">我愿意长时间走进去的五个世界，也是我不断产生好奇心的地方。</p>\n    </div>\n    <div class=\"about-v3-interests\" aria-label=\"我的五个爱好\">\n      <span>艺术</span><span>东方美学</span><span>心理学</span><span>玄学</span><span>AI</span>\n    </div>\n  </section>\n\n  <section class=\"about-v3-section about-v3-manifesto\" id=\"about-declaration\" aria-labelledby=\"about-declaration-title\">\n    <div class=\"about-v3-heading\">\n      <p class=\"about-v3-eyebrow\">05 / ONE MORE THING</p>\n      <h2 id=\"about-declaration-title\">我的世界宣言<span class=\"about-v3-period\">。</span></h2>\n    </div>\n    <div class=\"about-v3-question\">\n      <span class=\"about-v3-quote-mark\" aria-hidden=\"true\">“</span>\n      <p>我曾问自己一个问题：如果抛开所有过往的阅历、经验、人脉、资金等，我还剩什么不变的人生底气？</p>\n      <p class=\"about-v3-answer-intro\">我当下的答案是：</p>\n      <strong class=\"about-v3-answer\">思考、创造与表达<span>。</span></strong>\n    </div>\n    <div class=\"about-v3-three\">\n      <article><span class=\"about-v3-three-no\">01 / THINK IT</span><h3>思考</h3><p>Think different.</p></article>\n      <article><span class=\"about-v3-three-no\">02 / BUILD IT</span><h3>创造</h3><p>一个事物，这个世界上本来没有，直到你给了它一个生命，注入灵魂！</p></article>\n      <article><span class=\"about-v3-three-no\">03 / SHARE IT</span><h3>表达</h3><p>把自己的内心世界（想法、感悟、体验等）变成真实可感的事物，去传播，去影响更多人～</p></article>\n    </div>\n    <div class=\"about-v3-ending\">\n      <p>THINK IT <span>→</span> BUILD IT <span>→</span> SHARE IT</p>\n      <small>思考 · 创造 · 表达</small>\n    </div>\n  </section>\n</div>\n",
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
    title: '创造作品', path: 'AI LAB / PRODUCT ARCHIVE', content: `
      <div class="exhibition-page">
        <div class="exhibition-hero exhibition-hero-simple"><h2>把想法，<em>变成可能。</em></h2></div>
        <div class="exhibition-section-title"><p class="window-kicker">01 / CREATIVE PROJECTS</p><h3>最近的创造 · 18 件作品</h3></div>
        <div class="ai-filters" role="group" aria-label="筛选作品"><button type="button" data-ai-filter="all" aria-pressed="true">全部</button><button type="button" data-ai-filter="people" aria-pressed="false">AI × 人</button><button type="button" data-ai-filter="business" aria-pressed="false">AI × 商业</button><button type="button" data-ai-filter="creation" aria-pressed="false">AI × 创造</button></div>
        <div class="ai-gallery">${aiCards}</div>
        <div class="exhibition-section-title legacy-title"><p class="window-kicker">02 / PAST PRODUCT EXPERIENCE</p><h3>在真实的商业世界里。</h3><p>从社交与短视频直播，到二奢交易与复杂供应链产品。项目不是孤立的页面，而是我理解人、用户、组织和商业的过程。</p></div>
        <div class="legacy-gallery"><article><img src="assets/portfolio-pages/page-05.jpg" alt="Soulmate 创意社交历史项目界面" loading="lazy"><span>2017–2019</span><h4>Soulmate · 创意社交</h4><p>用户连接、社交机制、活动与运营。</p></article><article><img src="assets/portfolio-pages/page-04.jpg" alt="短视频直播产品界面及后台" loading="lazy"><span>2019–2021</span><h4>短视频 · 直播商业化</h4><p>内容、主播、公会、活动与商业增长。</p></article><article><img src="assets/portfolio-pages/page-03.jpg" alt="二奢与直播电商项目界面" loading="lazy"><span>2021–2024</span><h4>二奢 · 直播电商系统</h4><p>商品、仓储、订单、交易与私域协作。</p></article></div>
      </div>`,
  },
  portfolioArchive: {
    title: '历史产品 · 原版图集', path: 'PORTFOLIO / ARCHIVE', content: `
      <button class="document-close" type="button" data-window-action="close" aria-label="关闭图集">×</button>
      <div class="portfolio-pages">${portfolioPages.join('')}</div>
    `,
  },
  writing: {
    title: '表达', path: 'EXPRESSION / INNER WORLD & LIFE AS ART', content: `
      <div class="expression-page">
        <header class="expression-intro">
          <p class="window-kicker">EXPRESSION / THINK · BUILD · SHARE</p>
          <h2>思考，<em>创造与表达。</em></h2>
          <p>那些关于如何活着的思考，以及我想用一生去创造的作品。</p>
          <nav class="expression-nav" aria-label="表达内容目录">
            <button type="button" data-expression-anchor="expression-works">人生艺术化 · 10 件作品</button>
            <button type="button" data-expression-anchor="expression-universe">理解生命 · 九大关系</button>
          </nav>
        </header>
        <section id="expression-works" class="expression-section">
          <div class="life-art-page">
        <header class="life-art-hero">
          <p class="window-kicker">LIFE AS ART / A WORK IN PROGRESS</p>
          <h2>翔叔的<br /><em>人生艺术化。</em></h2>
          <div class="life-art-headline">
            <span class="life-art-headcount">10 <small>件作品</small></span>
            <p>不仅创造产品，<br />也把自己的生命当作一件作品。</p>
          </div>
        </header>
        <div class="life-art-list" aria-label="翔叔人生艺术化的十件作品">
          <article class="life-art-card">
            <span class="life-art-index">01</span>
            <span class="life-art-kind">LIFE</span>
            <h3>生命作品</h3>
            <p>成为一个越来越完整、自由、有主体性的人。</p>
          </article>
          <article class="life-art-card">
            <span class="life-art-index">02</span>
            <span class="life-art-kind">WISDOM</span>
            <h3>思想作品</h3>
            <p>建立自己的生命智慧体系。</p>
          </article>
          <article class="life-art-card">
            <span class="life-art-index">03</span>
            <span class="life-art-kind">WORDS</span>
            <h3>文字作品</h3>
            <p>留下书、文章、思想记录。</p>
          </article>
          <article class="life-art-card">
            <span class="life-art-index">04</span>
            <span class="life-art-kind">PRODUCT</span>
            <h3>产品作品</h3>
            <p>创造真正注入自己精神的产品。</p>
          </article>
          <article class="life-art-card">
            <span class="life-art-index">05</span>
            <span class="life-art-kind">ART</span>
            <h3>艺术作品</h3>
            <p>音乐、绘画、空间、视觉、花道，任何纯粹表达生命的创作。</p>
          </article>
          <article class="life-art-card">
            <span class="life-art-index">06</span>
            <span class="life-art-kind">EDUCATION</span>
            <h3>教育作品</h3>
            <p>探索 AI 时代新的成长与教育方式。</p>
          </article>
          <article class="life-art-card">
            <span class="life-art-index">07</span>
            <span class="life-art-kind">LOVE</span>
            <h3>爱情作品</h3>
            <p>真正爱过，并经历一段深度关系。</p>
          </article>
          <article class="life-art-card">
            <span class="life-art-index">08</span>
            <span class="life-art-kind">FAMILY</span>
            <h3>父子作品</h3>
            <p>陪孩子成长，也允许他成为他自己。</p>
          </article>
          <article class="life-art-card">
            <span class="life-art-index">09</span>
            <span class="life-art-kind">FRIENDSHIP</span>
            <h3>友谊作品</h3>
            <p>拥有三五真正懂彼此的人。</p>
          </article>
          <article class="life-art-card">
            <span class="life-art-index">10</span>
            <span class="life-art-kind">WORLD</span>
            <h3>世界作品</h3>
            <p>旅居、行走、见天地见众生，不断拓展生命边界。</p>
          </article>
        </div>
        <footer class="life-art-end">
          <p>见天地 · 见众生 · 见自己</p>
          <span>THINK IT · BUILD IT · SHARE IT</span>
        </footer>
          </div>
        </section>
        <section class="expression-section expression-universe" id="expression-universe">
          <div class="universe-intro">
            <p class="window-kicker">INNER WORLD / NINE RELATIONSHIPS</p>
            <h2>从认识自己，到理解世界。</h2>
            <p>我一直在探索的，是人与自己、亲密关系、家庭、事业、自然乃至意义的关系。九大关系不是一套标准答案，而是一幅仍在生长的生命地图。</p>
            <nav class="universe-toc" aria-label="跳转到九大关系">
              ${Array.from({length:9},(_,i)=>`<button type="button" data-universe-anchor="relation-${i+1}" aria-label="查看第 ${i+1} 个关系">${String(i+1).padStart(2,'0')}</button>`).join('')}
            </nav>
          </div>
          ${document.querySelector('#universe-content')?.innerHTML || ''}
          <p class="expression-universe-closing">内在有自己，关系有连接，现实有能力，精神有归处。</p>
        </section>
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
      <h2>世界很大，<br /><em>我们不妨聊聊。</em></h2>
      <p class="window-intro">如果你也在探索 AI 与人、产品创新、心理成长、艺术或商业的交叉地带，或者只是有一个想认真讨论的问题，很愿意从一场好奇的对话开始。</p>
      <section class="contact-wechat-card" aria-label="翔叔微信联系方式">
        <div class="contact-wechat-info">
          <div class="contact-wechat-identity">
            <img src="assets/xiangshu-avatar.jpg" alt="翔叔的微信头像" loading="lazy" />
            <div><span class="contact-wechat-kicker">WECHAT · 微信昵称</span><h3>翔叔</h3><p class="contact-wechat-id">微信号：<span>xiangshu-pm</span></p></div>
          </div>
          <p class="contact-wechat-invite">很高兴在这里遇见你。<br />扫码添加微信，我们聊聊。</p>
          <button class="contact-wechat-link contact-wechat-copy" type="button" data-copy-wechat="xiangshu-pm"><span class="contact-wechat-copy-label">复制微信号</span><span aria-hidden="true" class="contact-wechat-copy-icon">⧉</span></button>
          <p class="contact-wechat-copy-status" role="status" aria-live="polite" aria-atomic="true"></p>
        </div>
        <figure class="contact-wechat-qr">
          <div class="contact-wechat-qr-paper"><img src="assets/wechat-contact-qr.svg" alt="翔叔微信名片二维码，使用微信扫一扫添加好友" loading="lazy" decoding="async" /></div>
          <figcaption>微信扫一扫 · 添加好友</figcaption>
        </figure>
      </section>
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
  const isDocument = id === 'resume' || id === 'portfolioArchive';
  windowElement.className = `window is-focused is-centered${id === 'about' ? ' about-window' : ''}${id === 'projects' ? ' works-window' : ''}${id === 'writing' ? ' thoughts-window universe-window expression-window' : ''}${isDocument ? ' document-window' : ''}`;
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
  const readingMode = id === 'resume' || id === 'portfolioArchive';
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

// Copy feedback is only shown after the clipboard operation actually succeeds.
async function copyWechatId(button) {
  const id = button.dataset.copyWechat;
  if (id !== 'xiangshu-pm') return;
  const card = button.closest('.contact-wechat-card');
  const status = card?.querySelector('.contact-wechat-copy-status');
  const label = button.querySelector('.contact-wechat-copy-label');
  if (!label || !status) return;

  button.disabled = true;
  status.textContent = '';
  let copied = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(id);
      copied = true;
    }
  } catch (error) {
    // Some browsers disallow Clipboard API; try a user-gesture-compatible fallback.
  }

  if (!copied) {
    const field = document.createElement('textarea');
    field.value = id;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.top = '0';
    field.style.left = '-9999px';
    document.body.appendChild(field);
    try {
      field.focus();
      field.select();
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    } finally {
      field.remove();
      button.focus({ preventScroll: true });
    }
  }

  if (copied) {
    label.textContent = '✓ 复制成功';
    status.textContent = '微信号 xiangshu-pm 已复制，可以打开微信粘贴添加好友。';
  } else {
    label.textContent = '复制微信号';
    status.textContent = '浏览器未允许自动复制，请长按上方微信号手动复制。';
  }
  button.disabled = false;
  if (copied) {
    window.setTimeout(() => {
      if (button.isConnected) label.textContent = '复制微信号';
    }, 2400);
  }
}

document.addEventListener('click', (event) => {
  const copyWechatButton = event.target.closest('[data-copy-wechat]');
  if (copyWechatButton) {
    void copyWechatId(copyWechatButton);
    return;
  }

  const aboutJump = event.target.closest('[data-about-jump]');
  if (aboutJump) {
    const windowEl = aboutJump.closest('.window');
    const scrollArea = windowEl?.querySelector('.window-content');
    const target = windowEl?.querySelector('#' + aboutJump.dataset.aboutJump);
    if (scrollArea && target) {
      scrollArea.scrollTo({top: scrollArea.scrollTop + target.getBoundingClientRect().top - scrollArea.getBoundingClientRect().top - 18, behavior: 'smooth'});
    }
    return;
  }

  const filterButton = event.target.closest('[data-ai-filter]');
  if (filterButton) {
    const exhibition = filterButton.closest('.exhibition-page');
    const choice = filterButton.dataset.aiFilter;
    if (!exhibition) return;
    exhibition.querySelectorAll('[data-ai-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === filterButton)));
    exhibition.querySelectorAll('.ai-card').forEach((card) => {card.hidden = choice !== 'all' && card.dataset.aiCategory !== choice;});
    return;
  }
  const expressionAnchor = event.target.closest('[data-expression-anchor]');
  if (expressionAnchor) {
    const host = expressionAnchor.closest('.window');
    const target = host?.querySelector('#' + expressionAnchor.dataset.expressionAnchor);
    const scroller = host?.querySelector('.window-content');
    if (target && scroller) scroller.scrollTo({ top: scroller.scrollTop + target.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 16, behavior: 'smooth' });
    return;
  }
  const universeAnchor = event.target.closest('[data-universe-anchor]');
  if (universeAnchor) {
    const host = universeAnchor.closest('.window');
    const target = host?.querySelector('#' + universeAnchor.dataset.universeAnchor);
    const scroller = host?.querySelector('.window-content');
    if (target && scroller) scroller.scrollTo({ top: scroller.scrollTop + target.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 12, behavior: 'smooth' });
    return;
  }
  const mascotTopic = event.target.closest('[data-mascot-topic]');
  if (mascotTopic) { showMascotAnswer(mascotTopic.dataset.mascotTopic); return; }
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
    showMascotWelcome();
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
  if (themePanel && !themePanel.hidden) setThemePanel(false);
  if (mascotDialog && !mascotDialog.hidden) setMascot(false);
  if (systemMenu) systemMenu.hidden = true;
  const openWindows = Array.from(windowLayer.querySelectorAll('.window:not(.is-closing):not(.is-minimized)'));
  const topmost = openWindows.sort((a, b) => Number(b.style.zIndex || 0) - Number(a.style.zIndex || 0))[0];
  if (topmost) closeWindow(topmost);
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
