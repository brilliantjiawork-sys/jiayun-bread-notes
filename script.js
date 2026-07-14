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

const galleryButtons = [...document.querySelectorAll('[data-gallery-filter]')];
const galleryPanels = [...document.querySelectorAll('[data-gallery-panel]')];

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.galleryFilter;
    galleryButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    galleryPanels.forEach((panel) => {
      panel.hidden = panel.dataset.galleryPanel !== selected;
    });
  });
});

const archiveCards = [...document.querySelectorAll('.archive-card')];
if (archiveCards.length) {
  const params = new URLSearchParams(window.location.search);
  const selected = params.get('category') || 'all';
  const filterLinks = [...document.querySelectorAll('[data-filter]')];
  const title = document.querySelector('#archive-title');
  const description = document.querySelector('#archive-description');
  const emptyState = document.querySelector('.empty-state');
  const labels = {
    all: ['全部内容', '以 Pizza、吐司和自制饮品为主，记录配方、复刻过程、厨房好物与少量烘焙知识。'],
    recipe: ['配方与制作', '好吃、好做、适合家庭复现的烘焙与自制饮品记录。'],
    pizza: ['Pizza', '市售风味复刻、面团、酱料、配料与家庭烘烤。'],
    toast: ['吐司', '喜欢的吐司口感、风味与家庭制作实测。'],
    other: ['其他烘焙', '蛋挞、饼干和偶尔很想做一次的烘焙品。'],
    drinks: ['自制饮品', '水果茶、奶茶、果乳茶与家庭冰饮。'],
    favorites: ['厨房好物', '器材、原料和饮品工具的真实使用记录。'],
    knowledge: ['烘焙知识', '只整理实操中真正遇到的问题，更新会慢一些。'],
  };
  const safeSelected = labels[selected] ? selected : 'all';
  let visible = 0;
  archiveCards.forEach((card) => {
    const show = safeSelected === 'all' || card.dataset.category === safeSelected || card.dataset.group === safeSelected;
    card.hidden = !show;
    if (show) visible += 1;
  });
  filterLinks.forEach((link) => link.classList.toggle('active', link.dataset.filter === safeSelected));
  if (title && description) [title.textContent, description.textContent] = labels[safeSelected];
  if (emptyState) emptyState.hidden = visible !== 0;
}
