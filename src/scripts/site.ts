/**
 * All client behaviour, about 2 kB. Everything here is an enhancement:
 * the page reads and works with scripting off.
 */

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- One reveal: elements rise in as they enter the viewport ---- */
function reveals() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduced) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }),
    { rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

/* ---- The bar retracts on the way down and returns on the way up ---- */
function bar() {
  const el = document.querySelector<HTMLElement>('[data-bar]');
  if (!el) return;
  let last = scrollY;
  let queued = false;
  addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        const y = scrollY;
        if (Math.abs(y - last) > 6) {
          el.classList.toggle('is-away', y > last && y > 240);
          last = y;
        }
        queued = false;
      });
    },
    { passive: true },
  );
}

/* ---- Hero guides: hairlines at the headline's real baseline, x-height and cap height ---- */
function guides() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const box = document.querySelector<HTMLElement>('[data-guides]');
  const line = document.querySelector<HTMLElement>('[data-guide-line]');
  const base = document.querySelector<HTMLElement>('[data-base]');
  if (!hero || !box || !line || !base) return;

  const measure = () => {
    const style = getComputedStyle(line);
    const size = parseFloat(style.fontSize);
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx || !size) return;
    // Measured from the loaded face, so the labels state real numbers.
    ctx.font = `${style.fontWeight} 200px ${style.fontFamily}`;
    const cap = ctx.measureText('H').actualBoundingBoxAscent / 200;
    const x = ctx.measureText('x').actualBoundingBoxAscent / 200;
    if (!cap || !x) return;

    // offsetTop ignores transforms, so entrance and scroll motion never skew the numbers.
    let baseline = base.offsetHeight;
    for (let el: HTMLElement | null = base; el && el !== hero; el = el.offsetParent as HTMLElement | null) {
      baseline += el.offsetTop;
    }
    const set = (name: string, y: number, figure?: number) => {
      const guide = box.querySelector<HTMLElement>(`[data-guide="${name}"]`);
      if (!guide) return;
      guide.style.setProperty('--y', `${Math.round(y)}px`);
      // The label is drawn by CSS from data-label, so it stays out of the reading order.
      guide.dataset.name ??= guide.dataset.label;
      if (figure) guide.dataset.label = `${guide.dataset.name} ${figure.toFixed(2)} em`;
    };
    set('base', baseline);
    set('x', baseline - x * size, x);
    set('cap', baseline - cap * size, cap);

    // Labels sit at the right edge: hide them when the headline reaches that far.
    const room = box.offsetWidth - (line.offsetLeft - box.offsetLeft + line.offsetWidth);
    box.classList.toggle('no-labels', room < 190);
    box.classList.add('is-set');
  };

  document.fonts.ready.then(measure);
  new ResizeObserver(measure).observe(hero);
}

/* ---- Projects: category filter and the preview pane ---- */
function projects() {
  const filter = document.querySelector<HTMLElement>('[data-filter]');
  const rows = [...document.querySelectorAll<HTMLElement>('[data-rows] > [data-id]')];
  const panels = [...document.querySelectorAll<HTMLElement>('[data-panel]')];
  const empty = document.querySelector<HTMLElement>('[data-empty]');
  if (!rows.length) return;

  const show = (id: string | undefined) => {
    rows.forEach((row) => row.classList.toggle('is-current', row.dataset.id === id));
    panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.panel === id));
  };

  rows.forEach((row) => {
    const activate = () => show(row.dataset.id);
    row.addEventListener('pointerenter', activate);
    row.addEventListener('focusin', activate);
  });

  filter?.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-category]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    const category = button.dataset.category;

    const apply = () => {
      filter
        .querySelectorAll('button')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      rows.forEach((row) => {
        row.hidden = category !== 'all' && row.dataset.category !== category;
        row.classList.add('is-in');
      });
      const visible = rows.filter((row) => !row.hidden);
      rows.forEach((row) => row.classList.toggle('row--lead', row === visible[0]));
      if (empty) empty.hidden = visible.length > 0;
      show(visible[0]?.dataset.id);
    };

    // Rows carry view-transition-names, so the browser slides the survivors into place.
    if (!reduced && 'startViewTransition' in document) document.startViewTransition(apply);
    else apply();
  });
}

reveals();
bar();
guides();
projects();
