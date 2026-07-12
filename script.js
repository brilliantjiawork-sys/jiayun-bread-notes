const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const archiveCards = [...document.querySelectorAll('.archive-card')];
if (archiveCards.length) {
  const params = new URLSearchParams(window.location.search);
  const selected = params.get('category') || 'all';
  const filterLinks = [...document.querySelectorAll('[data-filter]')];
  const title = document.querySelector('#archive-title');
  const description = document.querySelector('#archive-description');
  const emptyState = document.querySelector('.empty-state');
  const labels = {
    all: ['全部内容', '配方、烘焙知识、工具使用与制作记录。'],
    recipe: ['配方与制作', '吐司、披萨、软欧与欧式面包的配方和完整步骤。'],
    knowledge: ['烘焙知识', '发酵、面筋、整形与烘烤中值得弄清的问题。'],
    journal: ['制作手记', '每次制作中的问题、调整过程与复盘记录。'],
    tools: ['食材与工具', '面粉、酵母、烤箱和常用器具的实际使用记录。'],
  };
  const safeSelected = labels[selected] ? selected : 'all';
  let visible = 0;
  archiveCards.forEach((card) => {
    const show = safeSelected === 'all' || card.dataset.category === safeSelected;
    card.hidden = !show;
    if (show) visible += 1;
  });
  filterLinks.forEach((link) => link.classList.toggle('active', link.dataset.filter === safeSelected));
  [title.textContent, description.textContent] = labels[safeSelected];
  emptyState.hidden = visible !== 0;
}
