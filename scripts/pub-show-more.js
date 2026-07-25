document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('pubList');
  const btn = document.getElementById('pubShowMore');
  if (!list || !btn) return;

  const items = Array.from(list.querySelectorAll('.pub-item'));
  const initialCount = 3;
  const pageSize = 10;
  let visibleCount = initialCount;

  const render = () => {
    items.forEach((item, i) => {
      item.style.display = i < visibleCount ? '' : 'none';
    });
    btn.style.display = visibleCount >= items.length ? 'none' : '';
  };

  btn.addEventListener('click', () => {
    visibleCount += pageSize;
    render();
  });

  render();
});
