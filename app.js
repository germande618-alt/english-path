/* English Path — A1→C1 за 16 недель.
   Метод: интервальные повторения (SM-2, как в Anki) + активное вспоминание
   (ввод слова по памяти) + грамматика с практикой + контрольные тесты уровня. */
(() => {
'use strict';

// ---------- Данные ----------
const LEVELS = ['A1','A2','B1','B2','C1'];
const LEVEL_NAMES = {A1:'Начальный',A2:'Элементарный',B1:'Средний',B2:'Выше среднего',C1:'Продвинутый'};
// Недели плана (16 недель ≈ 4 месяца)
const LEVEL_WEEKS = {A1:[1,3],A2:[4,6],B1:[7,10],B2:[11,13],C1:[14,16]};
const PASS = 0.8; // 80% — порог прохождения тестов

const WORDS = [];
for (const lv of LEVELS) {
  (window.VOCAB_RAW[lv] || '').trim().split('\n').forEach(line => {
    const [en, ru, ex] = line.split('|').map(s => (s || '').trim());
    if (en) WORDS.push({ id: lv + ':' + en, en, ru, ex, level: lv });
  });
}
const WORD_BY_ID = Object.fromEntries(WORDS.map(w => [w.id, w]));
const GRAMMAR = (window.GRAMMAR || []).slice().sort((a, b) => LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level));
GRAMMAR.forEach(g => g.tasks.forEach((t, k) => { t.ref = g.id + '#' + k; }));
const TASK_BY_REF = {};
GRAMMAR.forEach(g => g.tasks.forEach(t => { TASK_BY_REF[t.ref] = Object.assign({ tag: 'Грамматика: ' + g.title }, t); }));
const READING = window.READING || [];
const VERBS = [];
(window.VERBS_RAW || '').trim().split('\n').forEach(line => {
  const [inf, past, pp, ru, level] = line.split('|').map(s => (s || '').trim());
  if (inf && !VERBS.some(v => v.inf === inf)) VERBS.push({ inf, past, pp, ru, level });
});
// Однословные слова для подсказок при чтении
const LOOKUP = {};
WORDS.forEach(w => { if (!/\s/.test(w.en)) LOOKUP[w.en.toLowerCase()] = w; });
(window.GLOSSARY_RAW || '').trim().split('\n').forEach(l => { const [en, ru] = l.split('|'); if (en && !LOOKUP[en]) LOOKUP[en] = { en, ru }; });

// ---------- Хранилище ----------
const KEY = 'english-path-v1';
const DAY = 86400000;
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d.getTime(); };
const dayKey = (t = Date.now()) => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

function fresh() {
  return { start: today(), newPerDay: 15, cards: {}, grammar: {}, levelTests: {}, level: 'A1',
           history: {}, streak: { last: null, count: 0 }, newToday: { day: null, n: 0 },
           mistakes: [], reading: {}, verbs: {}, listen: {}, speakDone: {}, goal: 40 };
}
let S;
try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || 'null') || {}); }
catch (e) { S = fresh(); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

function logActivity(n = 1) {
  const k = dayKey();
  S.history[k] = (S.history[k] || 0) + n;
  const t = today();
  if (S.streak.last !== t) {
    S.streak.count = (S.streak.last === t - DAY) ? S.streak.count + 1 : 1;
    S.streak.last = t;
  }
  save();
}

// ---------- Уровень и план ----------
function currentLevel() {
  for (const lv of LEVELS) if (!(S.levelTests[lv] >= PASS)) return lv;
  return 'C1';
}
function planWeek() { return Math.min(16, Math.floor((today() - S.start) / DAY / 7) + 1); }
function planDay() { return Math.floor((today() - S.start) / DAY) + 1; }
function plannedLevel() {
  const w = planWeek();
  return LEVELS.find(l => w >= LEVEL_WEEKS[l][0] && w <= LEVEL_WEEKS[l][1]) || 'C1';
}

// ---------- SRS (SM-2, упрощённый) ----------
function cardState(id) {
  const c = S.cards[id];
  if (!c) return 'new';
  return c.interval >= 21 ? 'known' : 'learning';
}
function schedule(id, grade) { // grade: 0 again, 1 hard, 2 good, 3 easy
  const c = S.cards[id] || { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: 0 };
  if (grade === 0) {
    c.lapses++; c.reps = 0; c.interval = 0; c.ease = Math.max(1.3, c.ease - 0.2);
    c.due = Date.now() + 60 * 1000; // показать снова в этой же сессии
  } else {
    if (c.reps === 0) c.interval = grade === 1 ? 1 : grade === 2 ? 1 : 3;
    else if (c.reps === 1) c.interval = grade === 1 ? 2 : grade === 2 ? 3 : 6;
    else c.interval = Math.round(c.interval * (grade === 1 ? 1.2 : grade === 2 ? c.ease : c.ease * 1.3));
    c.ease = Math.max(1.3, c.ease + (grade === 1 ? -0.15 : grade === 3 ? 0.15 : 0));
    c.reps++;
    c.due = today() + c.interval * DAY;
  }
  S.cards[id] = c; save();
  return c;
}
function previewInterval(id, grade) {
  const c = S.cards[id] || { ease: 2.5, interval: 0, reps: 0 };
  if (grade === 0) return '1 мин';
  let i;
  if (c.reps === 0) i = grade === 3 ? 3 : 1;
  else if (c.reps === 1) i = grade === 1 ? 2 : grade === 2 ? 3 : 6;
  else i = Math.round(c.interval * (grade === 1 ? 1.2 : grade === 2 ? c.ease : c.ease * 1.3));
  return i + ' д';
}
const dueIds = () => Object.keys(S.cards).filter(id => WORD_BY_ID[id] && S.cards[id].due <= Date.now() + 1)
  .sort((a, b) => S.cards[a].due - S.cards[b].due);
function newLeftToday() {
  if (S.newToday.day !== dayKey()) S.newToday = { day: dayKey(), n: 0 };
  return Math.max(0, S.newPerDay - S.newToday.n);
}
function nextNewIds(n) {
  const lv = currentLevel();
  const order = LEVELS.slice(0, LEVELS.indexOf(lv) + 1);
  const res = [];
  for (const l of order) for (const w of WORDS) if (w.level === l && !S.cards[w.id] && res.length < n) res.push(w.id);
  return res;
}

// ---------- Утилиты ----------
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[.!?,]/g, '').replace(/\s+/g, ' ').trim();
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const plural = (n, f) => { const a = Math.abs(n) % 100, b = a % 10; return n + ' ' + (a > 10 && a < 20 ? f[2] : b === 1 ? f[0] : b >= 2 && b <= 4 ? f[1] : f[2]); };
const ZAD = ['задание', 'задания', 'заданий'];
const pct = x => Math.round(x * 100) + '%';
const lvlPill = lv => `<span class="pill lvl-${lv}">${lv}</span>`;

let voice = null;
function loadVoice() {
  try {
    const vs = speechSynthesis.getVoices();
    voice = vs.find(v => /en-GB/.test(v.lang)) || vs.find(v => /^en/.test(v.lang)) || null;
  } catch (e) {}
}
try { speechSynthesis.onvoiceschanged = loadVoice; loadVoice(); } catch (e) {}
function speak(text, rate = 0.9) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB'; u.rate = rate; if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  } catch (e) {}
}
document.addEventListener('click', e => {
  if (e.target.closest('[data-rerender]')) { render(); return; }
  const b = e.target.closest('[data-say]');
  if (b) { e.preventDefault(); speak(b.dataset.say, b.dataset.rate ? +b.dataset.rate : 0.9); }
});
const sayBtn = t => `<button class="speak" data-say="${esc(t)}" title="Произнести" aria-label="Произнести">🔊</button>`;

// ---------- Роутер ----------
let keyHandler = null;
document.addEventListener('keydown', e => { if (keyHandler) keyHandler(e); });
const routes = { today: viewToday, study: viewStudy, words: viewWords, grammar: viewGrammar, topic: viewTopic,
                 tests: viewTests, test: viewTest, progress: viewProgress, practice: viewPractice, read: viewRead,
                 listen: viewListen, speak: viewSpeak, verbs: viewVerbs, mistakes: viewMistakes };
const NAV_PARENT = { study: 'today', topic: 'grammar', test: 'tests', read: 'practice', listen: 'practice', speak: 'practice', verbs: 'practice', mistakes: 'practice' };
function render() {
  keyHandler = null;
  const [r, arg] = (location.hash.replace(/^#\/?/, '') || 'today').split('/');
  try { speechSynthesis.cancel(); } catch (e) {}
  if (window.__rec) { try { window.__rec.abort(); } catch (e) {} window.__rec = null; }
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.r === r || a.dataset.r === NAV_PARENT[r]));
  (routes[r] || viewToday)(arg ? decodeURIComponent(arg) : undefined);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', render);

// ---------- Сегодня ----------
function viewToday() {
  const lv = currentLevel();
  const due = dueIds().length;
  const nw = Math.min(newLeftToday(), nextNewIds(999).length);
  const nextTopic = GRAMMAR.find(g => g.level === lv && !(S.grammar[g.id] >= PASS));
  const lvWords = WORDS.filter(w => w.level === lv);
  const lvLearned = lvWords.filter(w => S.cards[w.id]).length;
  const lvTopics = GRAMMAR.filter(g => g.level === lv);
  const lvTopicsDone = lvTopics.filter(g => S.grammar[g.id] >= PASS).length;
  const readyForTest = lvLearned === lvWords.length && lvTopicsDone === lvTopics.length;
  const doneToday = (S.history[dayKey()] || 0);
  const pl = plannedLevel();
  const behind = LEVELS.indexOf(lv) < LEVELS.indexOf(pl);
  const firstVisit = !Object.keys(S.cards).length && !Object.keys(S.levelTests).length;

  $('#app').innerHTML = `
    <div class="card hero">
      <div class="row"><div>
        <div class="muted small">День ${planDay()} · неделя ${planWeek()} из 16</div>
        <h1 style="margin:.15em 0">Уровень ${lv} — ${LEVEL_NAMES[lv]}</h1>
        <div class="muted small">${behind ? `По плану сейчас ${pl}. Чтобы догнать, ставьте ${pace()} новых слов в день.` : `Темп по плану: ~${pace()} новых слов в день.`}</div>
        <div class="goal"><div class="bar"><i style="width:${Math.min(100, doneToday / S.goal * 100)}%"></i></div><span class="small">Цель дня: ${Math.min(doneToday, S.goal)}/${S.goal} ответов</span></div>
      </div><div class="spacer"></div>
      <div class="stat" style="text-align:right"><b>🔥 ${S.streak.last >= today() - DAY ? S.streak.count : 0}</b><span style="color:inherit;opacity:.8">дней подряд</span></div></div>
    </div>
    ${firstVisit ? `<div class="card"><h3>Уже знаете английский?</h3><p class="muted">Пройдите вводный тест — он определит уровень и пропустит то, что вы уже знаете.</p><a class="btn primary" href="#/test/placement">Пройти вводный тест (5 мин)</a> <button class="btn ghost" id="skipPl">Начать с нуля</button></div>` : ''}
    <div class="card">
      <h2>План на сегодня</h2>
      <div class="step ${due === 0 ? 'done' : ''}"><div class="num">${due === 0 ? '✓' : 1}</div>
        <div class="txt"><b>Повторение</b><div class="muted small">${due ? `${due} карточек ждут повторения — сначала они, это главное для памяти` : 'Все повторения сделаны'}</div></div></div>
      <div class="step ${nw === 0 ? 'done' : ''}"><div class="num">${nw === 0 ? '✓' : 2}</div>
        <div class="txt"><b>Новые слова</b><div class="muted small">${nw ? `${nw} новых слов уровня ${lv}` : 'Лимит новых слов на сегодня выполнен'}</div></div></div>
      <div class="step ${!nextTopic ? 'done' : ''}"><div class="num">${!nextTopic ? '✓' : 3}</div>
        <div class="txt"><b>Грамматика</b><div class="muted small">${nextTopic ? esc(nextTopic.title) : 'Все темы уровня пройдены'}</div></div>
        ${nextTopic ? `<a class="btn" href="#/topic/${nextTopic.id}">Открыть</a>` : ''}</div>
      <div class="step ${practiceDoneToday() ? 'done' : ''}"><div class="num">${practiceDoneToday() ? '✓' : 4}</div>
        <div class="txt"><b>Практика: ${practiceSuggestion().title}</b><div class="muted small">${practiceSuggestion().sub}</div></div>
        <a class="btn" href="${practiceSuggestion().href}">Открыть</a></div>
      <div class="step ${S.levelTests[lv] >= PASS ? 'done' : ''}"><div class="num">${S.levelTests[lv] >= PASS ? '✓' : 5}</div>
        <div class="txt"><b>Контрольный тест ${lv}</b><div class="muted small">${readyForTest ? 'Вы готовы! Наберите 80%, чтобы открыть следующий уровень' : `Откроется, когда изучите все слова (${lvLearned}/${lvWords.length}) и темы (${lvTopicsDone}/${lvTopics.length})`}</div></div>
        <a class="btn" href="#/test/${lv}">${readyForTest ? 'Начать' : 'Попробовать'}</a></div>
      <div style="margin-top:14px">
        <a class="btn primary big" href="#/study" ${due + nw === 0 ? 'style="pointer-events:none;opacity:.45"' : ''}>${due + nw ? `Начать тренировку · ${due + nw}` : 'На сегодня всё 🎉'}</a>
      </div>
    </div>
    <div class="grid g3">
      <div class="card stat"><b>${Object.keys(S.cards).length}</b><span>слов в изучении</span></div>
      <div class="card stat"><b>${WORDS.filter(w => cardState(w.id) === 'known').length}</b><span>слов выучено прочно</span></div>
      <div class="card stat"><b>${S.mistakes.length}</b><span><a href="#/mistakes">ошибок на разбор</a></span></div>
    </div>
    <div class="card"><h3>Как это работает</h3>
      <p class="small muted"><b>Интервальные повторения.</b> Каждое слово возвращается ровно тогда, когда вы начинаете его забывать: через 1, 3, 7, 18 дней и дальше. Так запоминание в разы прочнее зубрёжки.</p>
      <p class="small muted"><b>Активное вспоминание.</b> Знакомые слова нужно будет <i>написать</i> по памяти, а не просто узнать — это сильнее всего закрепляет.</p>
      <p class="small muted"><b>Честная оценка.</b> Кнопка «Забыл» — не поражение, а сигнал системе показать слово ещё раз.</p>
    </div>`;
  const sp = $('#skipPl'); if (sp) sp.onclick = () => { S.levelTests._placementSkipped = 1; save(); location.hash = '#/study'; };
}

// ---------- Тренировка слов ----------
function viewStudy() {
  let queue = dueIds();
  const newIds = nextNewIds(newLeftToday());
  // Новые вперемешку с повторениями: сначала повторения, потом новые
  queue = queue.concat(newIds.map(id => ({ newId: id })));
  let i = 0, total = queue.length, done = 0, correct = 0;
  const requeue = [];

  function next() {
    if (i >= queue.length) {
      // Слова с «Забыл» возвращаются в конце сессии
      const back = requeue.splice(0);
      if (back.length) { queue = queue.concat(back); total += back.length; }
      else return finish();
    }
    const item = queue[i++];
    if (item && item.newId) return showNew(item.newId);
    const c = S.cards[item];
    if (c && c.reps >= 2 && Math.random() < 0.6) return showType(item);
    return showFlip(item);
  }
  function header() {
    return `<div class="progress-top"><a href="#/today" class="btn ghost small">✕</a><div class="bar"><i style="width:${total ? done / total * 100 : 0}%"></i></div><span class="small muted">${done}/${total}</span></div>`;
  }
  function rateBar(id) {
    return `<div class="rate">
      <button class="btn again" data-g="0">Забыл<small>${previewInterval(id,0)}</small></button>
      <button class="btn hard" data-g="1">Трудно<small>${previewInterval(id,1)}</small></button>
      <button class="btn good" data-g="2">Помню<small>${previewInterval(id,2)}</small></button>
      <button class="btn easy" data-g="3">Легко<small>${previewInterval(id,3)}</small></button></div>
      <p class="small muted" style="text-align:center;margin-top:10px">Клавиши: <kbd>1</kbd>–<kbd>4</kbd></p>`;
  }
  function bindRate(id) {
    const go = g => {
      schedule(id, g); logActivity(); done++;
      if (g > 0) correct++; else requeue.push(id);
      next();
    };
    document.querySelectorAll('[data-g]').forEach(b => b.onclick = () => go(+b.dataset.g));
    keyHandler = e => { if (['1','2','3','4'].includes(e.key) && document.querySelector(`[data-g="${+e.key - 1}"]`)) go(+e.key - 1); };
  }
  function showNew(id) {
    const w = WORD_BY_ID[id];
    $('#app').innerHTML = header() + `
      <div class="card flash">
        <div>${lvlPill(w.level)} <span class="pill" style="background:var(--accent)">новое слово</span></div>
        <div class="row" style="justify-content:center"><span class="w">${esc(w.en)}</span>${sayBtn(w.en)}</div>
        <div class="tr">${esc(w.ru)}</div>
        <div class="exm">${esc(w.ex)} ${sayBtn(w.ex)}</div>
      </div>
      <div class="card"><p class="small muted">Произнесите слово вслух и придумайте свой пример — так запомнится быстрее.</p>
      <button class="btn primary big" id="gotIt" style="width:100%">Запомнил → <kbd>Enter</kbd></button></div>`;
    speak(w.en);
    const go = () => {
      S.newToday.n++; S.cards[id] = { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: Date.now() }; save();
      logActivity(); done++; correct++;
      // Новое слово сразу проверяем ещё раз в этой же сессии
      requeue.push(id); next();
    };
    $('#gotIt').onclick = go;
    keyHandler = e => { if (e.key === 'Enter') go(); };
  }
  function showFlip(id) {
    const w = WORD_BY_ID[id];
    const reverse = Math.random() < 0.35; // иногда RU → EN
    $('#app').innerHTML = header() + `
      <div class="card flash" id="fc">
        <div>${lvlPill(w.level)}</div>
        ${reverse ? `<div class="tr" style="font-size:1.6rem">${esc(w.ru)}</div><div class="muted small">Вспомните слово по-английски</div>`
                  : `<div class="row" style="justify-content:center"><span class="w">${esc(w.en)}</span>${sayBtn(w.en)}</div><div class="muted small">Вспомните перевод</div>`}
        <div id="back" hidden>
          ${reverse ? `<div class="row" style="justify-content:center"><span class="w">${esc(w.en)}</span>${sayBtn(w.en)}</div>` : `<div class="tr">${esc(w.ru)}</div>`}
          <div class="exm">${esc(w.ex)}</div>
        </div>
      </div>
      <div id="ctrl"><button class="btn primary big" id="show" style="width:100%">Показать ответ <kbd>Space</kbd></button></div>`;
    if (!reverse) speak(w.en);
    const show = () => {
      $('#back').hidden = false; if (reverse) speak(w.en);
      $('#ctrl').innerHTML = rateBar(id); bindRate(id);
    };
    $('#show').onclick = show;
    keyHandler = e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); show(); } };
  }
  function showType(id) {
    const w = WORD_BY_ID[id];
    const hint = w.en.replace(/[a-z]/gi, (ch, k) => k === 0 ? ch : '•');
    $('#app').innerHTML = header() + `
      <div class="card flash">
        <div>${lvlPill(w.level)} <span class="pill" style="background:var(--B1)">напишите</span></div>
        <div class="tr" style="font-size:1.6rem">${esc(w.ru)}</div>
        <div class="exm">${esc(w.ex.replace(new RegExp('\\b' + w.en.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '\\b', 'i'), '_____'))}</div>
        <div class="muted small">Подсказка: ${esc(hint)}</div>
      </div>
      <div class="card"><input class="ans" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Слово по-английски">
      <div id="res"></div><button class="btn primary big" id="chk" style="width:100%;margin-top:10px">Проверить</button></div>`;
    const inp = $('#ans'); inp.focus();
    const check = () => {
      const ok = norm(inp.value) === norm(w.en);
      inp.classList.add(ok ? 'ok' : 'no'); inp.disabled = true;
      speak(w.en);
      $('#res').innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}">${ok ? 'Верно!' : 'Правильно: ' + esc(w.en)}</div>`;
      $('#chk').remove();
      if (ok) {
        $('#res').insertAdjacentHTML('beforeend', rateBar(id).replace(/<button class="btn again"[\s\S]*?<\/button>/, '').replace('repeat(4,1fr)','').replace('class="rate"','class="rate" style="grid-template-columns:repeat(3,1fr)"').replace('<kbd>1</kbd>–<kbd>4</kbd>','<kbd>2</kbd>–<kbd>4</kbd>'));
        bindRate(id);
      } else {
        $('#res').insertAdjacentHTML('beforeend', `<button class="btn primary" id="nx" style="width:100%;margin-top:10px">Дальше <kbd>Enter</kbd></button>`);
        const go = () => { schedule(id, 0); logActivity(); done++; requeue.push(id); next(); };
        $('#nx').onclick = go;
        setTimeout(() => keyHandler = e => { if (e.key === 'Enter') go(); }, 50);
      }
    };
    $('#chk').onclick = check;
    keyHandler = e => { if (e.key === 'Enter' && !inp.disabled) check(); };
  }
  function finish() {
    $('#app').innerHTML = `<div class="card done-box"><div class="big">🎉</div><h1>Тренировка завершена</h1>
      <p class="muted">Ответов: ${done}${done ? ' · с первого раза: ' + pct(correct / done) : ''}</p>
      <div class="row" style="justify-content:center;margin-top:12px">
        <a class="btn primary" href="#/today">К плану дня</a>
        ${(() => { const t = GRAMMAR.find(g => g.level === currentLevel() && !(S.grammar[g.id] >= PASS)); return t ? `<a class="btn" href="#/topic/${t.id}">Грамматика: ${esc(t.title)}</a>` : ''; })()}
      </div></div>`;
  }
  if (!queue.length) return finish();
  next();
}

// ---------- Словарь ----------
let wordsTab = null;
function viewWords() {
  wordsTab = wordsTab || currentLevel();
  const draw = (q = '') => {
    const list = WORDS.filter(w => w.level === wordsTab && (!q || norm(w.en + ' ' + w.ru).includes(norm(q))));
    const lvAll = WORDS.filter(w => w.level === wordsTab);
    const known = lvAll.filter(w => cardState(w.id) === 'known').length, learning = lvAll.filter(w => cardState(w.id) === 'learning').length;
    $('#list').innerHTML = `
      <p class="small muted"><span class="dot known"></span> выучено ${known} · <span class="dot learning"></span> изучается ${learning} · <span class="dot"></span> новые ${lvAll.length - known - learning}</p>
      <table class="words">${list.map(w => `<tr><td><span class="dot ${cardState(w.id)}"></span> ${esc(w.en)}</td><td>${esc(w.ru)}<div class="small muted">${esc(w.ex)}</div></td><td>${sayBtn(w.en)}</td></tr>`).join('')}</table>`;
  };
  $('#app').innerHTML = `<h1>Слова</h1><p class="muted">${WORDS.length} слов и выражений, отобранных по частотности для каждого уровня.</p>
    <div class="card"><div class="row" style="margin-bottom:10px"><div class="tabs" style="margin:0">${LEVELS.map(l => `<button data-l="${l}" class="${l === wordsTab ? 'on' : ''}">${l}</button>`).join('')}</div><div class="spacer"></div>
    <input class="search" id="q" placeholder="Поиск…"></div><div id="list"></div></div>`;
  document.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { wordsTab = b.dataset.l; viewWords(); });
  $('#q').oninput = e => draw(e.target.value);
  draw();
}

// ---------- Грамматика ----------
function viewGrammar() {
  const cur = currentLevel();
  $('#app').innerHTML = `<h1>Грамматика</h1><p class="muted">Короткое правило на русском → примеры с озвучкой → практика. Тема засчитывается при 80% правильных ответов.</p>` +
    LEVELS.map(lv => {
      const ts = GRAMMAR.filter(g => g.level === lv);
      const d = ts.filter(g => S.grammar[g.id] >= PASS).length;
      return `<div class="card"><div class="row"><h2 style="margin:0">${lvlPill(lv)} ${LEVEL_NAMES[lv]}</h2><div class="spacer"></div><span class="small muted">${d}/${ts.length}${lv === cur ? ' · текущий' : ''}</span></div>
        <div style="margin-top:8px">${ts.map(g => `<div class="topic" data-id="${g.id}"><span class="check ${S.grammar[g.id] >= PASS ? 'on' : ''}">${S.grammar[g.id] >= PASS ? '✓' : ''}</span><span class="tname">${esc(g.title)}</span><span class="small muted">${S.grammar[g.id] != null ? pct(S.grammar[g.id]) : ''}</span></div>`).join('')}</div></div>`;
    }).join('');
  document.querySelectorAll('.topic').forEach(t => t.onclick = () => location.hash = '#/topic/' + t.dataset.id);
}

function viewTopic(id) {
  const g = GRAMMAR.find(x => x.id === id);
  if (!g) return viewGrammar();
  $('#app').innerHTML = `<a href="#/grammar" class="small">← Все темы</a>
    <div class="card" style="margin-top:10px">${lvlPill(g.level)}<h1 style="margin-top:8px">${esc(g.title)}</h1>
    <div class="rule">${g.rule}</div>
    <h3>Примеры</h3><ul class="ex">${g.ex.map(e => `<li>${sayBtn(e)} <span>${esc(e)}</span></li>`).join('')}</ul></div>
    <div class="card"><h2>Практика</h2><div id="quiz"></div></div>`;
  runQuiz(shuffle(g.tasks), $('#quiz'), score => {
    const best = Math.max(S.grammar[g.id] || 0, score);
    S.grammar[g.id] = best; save();
    const nxt = GRAMMAR.find(x => x.level === g.level && !(S.grammar[x.id] >= PASS));
    return `<div class="row" style="justify-content:center">
      <button class="btn" data-rerender>Ещё раз</button>
      ${nxt ? `<a class="btn primary" href="#/topic/${nxt.id}">Следующая тема</a>` : `<a class="btn primary" href="#/today">К плану дня</a>`}</div>`;
  });
}

// Универсальный тест: tasks = [{t:'mc'|'gap', q, o, a, tag?}]
function runQuiz(tasks, root, onDone, opts = {}) {
  let i = 0, right = 0;
  const results = [];
  const step = () => {
    if (i >= tasks.length) {
      const s = tasks.length ? right / tasks.length : 0;
      const extra = onDone(s, right, results);
      root.innerHTML = `<div class="done-box"><div class="big">${s >= PASS ? '✅' : '📘'}</div><h2>${right} из ${tasks.length} · ${pct(s)}</h2>
        <p class="muted">${s >= PASS ? (opts.passText || 'Отлично, тема засчитана!') : (opts.failText || 'Нужно 80%. Перечитайте правило и попробуйте снова — повтор полезен.')}</p>${extra || ''}</div>`;
      keyHandler = null; return;
    }
    const t = tasks[i];
    const head = `<div class="progress-top"><div class="bar"><i style="width:${i / tasks.length * 100}%"></i></div><span class="small muted">${i + 1}/${tasks.length}</span></div>
      ${t.tag ? `<div class="small muted">${t.tag}</div>` : ''}<p style="font-size:1.15rem;font-weight:500">${esc(t.q || 'Составьте предложение из слов').replace('___', '<b>_____</b>')}</p>`;
    if (t.t === 'mc') {
      root.innerHTML = head + `<div class="opts">${t.o.map((o, k) => `<button class="opt" data-k="${k}"><span class="muted">${k + 1}.</span> ${esc(o)}</button>`).join('')}</div><div id="qfb"></div>`;
      const answer = k => {
        const ok = k === t.a; if (ok) right++;
        root.querySelectorAll('.opt').forEach((b, j) => { b.disabled = true; if (j === t.a) b.classList.add('ok'); else if (j === k) b.classList.add('no'); });
        nextBtn(ok, ok ? '' : 'Правильно: ' + t.o[t.a]);
      };
      root.querySelectorAll('.opt').forEach(b => b.onclick = () => answer(+b.dataset.k));
      keyHandler = e => { const k = +e.key - 1; if (k >= 0 && k < t.o.length && !root.querySelector('.opt').disabled) answer(k); };
    } else if (t.t === 'order') {
      const target = norm(t.a);
      let words = shuffle(t.w.split(' '));
      for (let tries = 0; tries < 8 && words.length > 1 && norm(words.join(' ')) === target; tries++) words = shuffle(words);
      const picked = [];
      root.innerHTML = head + `<p class="small muted">Нажимайте на слова по порядку</p>
        <div class="built" id="built"></div><div class="chips" id="chips">${words.map((w, k) => `<button class="chip" data-k="${k}">${esc(w)}</button>`).join('')}</div>
        <div id="qfb"></div><div class="row" style="margin-top:10px"><button class="btn" id="undo">← Убрать</button><div class="spacer"></div><button class="btn primary" id="gc">Проверить</button></div>`;
      const drawBuilt = () => {
        root.querySelector('#built').innerHTML = picked.length ? picked.map(k => `<span class="chip on">${esc(words[k])}</span>`).join('') : '<span class="muted small">…</span>';
        root.querySelectorAll('#chips .chip').forEach(c => c.disabled = picked.includes(+c.dataset.k));
      };
      root.querySelectorAll('#chips .chip').forEach(c => c.onclick = () => { if (!c.disabled && !done) { picked.push(+c.dataset.k); drawBuilt(); } });
      let done = false;
      root.querySelector('#undo').onclick = () => { if (!done) { picked.pop(); drawBuilt(); } };
      const check = () => {
        if (done) return; done = true;
        const ok = norm(picked.map(k => words[k]).join(' ')) === target; if (ok) right++;
        root.querySelector('#built').classList.add(ok ? 'ok' : 'no');
        root.querySelector('#gc').remove(); root.querySelector('#undo').remove();
        speak(t.a);
        nextBtn(ok, ok ? '' : 'Правильно: ' + t.a);
      };
      root.querySelector('#gc').onclick = check;
      keyHandler = e => { if (e.key === 'Enter') check(); if (e.key === 'Backspace') { picked.pop(); drawBuilt(); } };
      drawBuilt();
    } else {
      root.innerHTML = head + `<input class="ans" id="gi" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ваш ответ"><div id="qfb"></div><button class="btn primary" id="gc" style="margin-top:10px;width:100%">Проверить</button>`;
      const inp = root.querySelector('#gi'); inp.focus();
      const check = () => {
        const ok = t.a.some(a => norm(a) === norm(inp.value)); if (ok) right++;
        inp.disabled = true; inp.classList.add(ok ? 'ok' : 'no'); root.querySelector('#gc').remove();
        nextBtn(ok, ok ? '' : 'Правильно: ' + t.a[0]);
      };
      root.querySelector('#gc').onclick = check;
      keyHandler = e => { if (e.key === 'Enter' && !inp.disabled) check(); };
    }
  };
  const nextBtn = (ok, msg) => {
    results[i] = ok; logActivity();
    const ref = tasks[i].ref;
    if (ref) {
      const has = S.mistakes.indexOf(ref);
      if (!ok && has < 0) S.mistakes.push(ref);
      if (ok && has >= 0 && opts.review) S.mistakes.splice(has, 1);
      save();
    }
    const fb = root.querySelector('#qfb');
    fb.innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}">${ok ? 'Верно!' : esc(msg)}</div><button class="btn primary" id="qn" style="margin-top:10px;width:100%">Дальше <kbd>Enter</kbd></button>`;
    const go = () => { i++; step(); };
    root.querySelector('#qn').onclick = go;
    setTimeout(() => keyHandler = e => { if (e.key === 'Enter') go(); }, 50);
  };
  step();
}

// ---------- Тесты ----------
function vocabTask(w, pool) {
  const toRu = Math.random() < 0.5;
  const others = pick(pool.filter(x => x.id !== w.id), 3);
  const opts = shuffle([w, ...others]);
  return { t: 'mc', tag: 'Слова', q: toRu ? `Перевод слова «${w.en}»:` : `Как по-английски «${w.ru}»?`,
           o: opts.map(x => toRu ? x.ru : x.en), a: opts.indexOf(w) };
}
function levelTasks(lv, nVocab, nGram) {
  const pool = WORDS.filter(w => w.level === lv);
  const v = pick(pool, nVocab).map(w => vocabTask(w, pool));
  const g = pick(GRAMMAR.filter(x => x.level === lv).flatMap(x => x.tasks.map(t => Object.assign({ tag: 'Грамматика: ' + x.title }, t))), nGram);
  return shuffle(v.concat(g));
}
function viewTests() {
  const cur = currentLevel();
  $('#app').innerHTML = `<h1>Тесты</h1><p class="muted">Контрольный тест открывает следующий уровень при результате от 80%. Проходить можно сколько угодно раз — каждая попытка тоже тренировка.</p>
    <div class="card"><div class="row"><div><h3 style="margin:0">Вводный тест</h3><div class="small muted">Определит ваш стартовый уровень и засчитает пройденные уровни</div></div><div class="spacer"></div><a class="btn" href="#/test/placement">Начать</a></div></div>
    <div class="card"><div class="row"><div><h3 style="margin:0">Быстрая проверка</h3><div class="small muted">10 вопросов по всему, что вы уже изучаете — для закрепления</div></div><div class="spacer"></div><a class="btn" href="#/test/mix">Начать</a></div></div>
    ${LEVELS.map(lv => {
      const s = S.levelTests[lv]; const passed = s >= PASS;
      const locked = LEVELS.indexOf(lv) > LEVELS.indexOf(cur);
      return `<div class="card"><div class="row">${lvlPill(lv)}<div><h3 style="margin:0">Контрольный тест ${lv}</h3><div class="small muted">${passed ? 'Пройден · ' + pct(s) : s != null ? 'Лучший результат: ' + pct(s) : locked ? 'Сначала пройдите предыдущий уровень (или вводный тест)' : '20 вопросов: слова + грамматика'}</div></div><div class="spacer"></div>
      <a class="btn ${passed ? '' : 'primary'}" href="#/test/${lv}" ${locked ? 'style="pointer-events:none;opacity:.45"' : ''}>${passed ? 'Ещё раз' : 'Начать'}</a></div></div>`;
    }).join('')}
    <div class="card"><h3>Настройки и резервная копия</h3>
      <div class="row" style="margin-bottom:10px"><label>Новых слов в день: <input type="number" id="npd" min="5" max="60" value="${S.newPerDay}" style="width:80px"></label>
      <label>Цель дня (ответов): <input type="number" id="goal" min="10" max="300" value="${S.goal}" style="width:80px"></label>
      <label>Тема: <select id="theme"><option value="">Как в системе</option><option value="light">Светлая</option><option value="dark">Тёмная</option></select></label></div>
      <div class="row"><button class="btn" id="exp">Скачать прогресс</button><label class="btn">Загрузить прогресс<input type="file" id="imp" accept=".json" hidden></label><div class="spacer"></div><button class="btn ghost" id="reset" style="color:var(--bad)">Сбросить всё</button></div>
      <p class="small muted" style="margin-top:8px">Чтобы уложиться в 16 недель, сейчас нужно ~${pace()} новых слов в день. Прогресс хранится в этом браузере. Скачивайте копию, чтобы перенести его на другое устройство.</p></div>`;
  $('#npd').onchange = e => { S.newPerDay = Math.max(5, Math.min(60, +e.target.value || 15)); save(); };
  $('#goal').onchange = e => { S.goal = Math.max(10, Math.min(300, +e.target.value || 40)); save(); };
  const th = $('#theme'); th.value = S.theme || '';
  th.onchange = () => { S.theme = th.value; save(); applyTheme(); };
  $('#exp').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }));
    a.download = 'english-path-progress-' + dayKey() + '.json'; a.click();
  };
  $('#imp').onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then(t => { try { S = Object.assign(fresh(), JSON.parse(t)); save(); render(); } catch (err) { e.target.closest('.card').insertAdjacentHTML('beforeend', '<p class="fb no">Не удалось прочитать файл — выберите JSON, скачанный из этого приложения.</p>'); } });
  };
  $('#reset').onclick = e => {
    const b = e.currentTarget;
    if (b.dataset.armed) { S = fresh(); save(); render(); return; }
    b.dataset.armed = 1; b.textContent = 'Нажмите ещё раз — прогресс удалится';
    setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.textContent = 'Сбросить всё'; } }, 4000);
  };
}

function viewTest(kind) {
  const root = () => $('#quiz');
  if (kind === 'placement') {
    $('#app').innerHTML = `<a href="#/tests" class="small">← Тесты</a><div class="card" style="margin-top:10px"><h1>Вводный тест</h1><p class="muted">По 6 вопросов на уровень, от простого к сложному. Не угадывайте — честный результат сэкономит время.</p><div id="quiz"></div></div>`;
    const tasks = [], marks = [];
    LEVELS.forEach(lv => { levelTasks(lv, 3, 3).forEach(t => { tasks.push(Object.assign(t, { tag: lv + ' · ' + (t.tag || '') })); marks.push(lv); }); });
    runQuiz(tasks, root(), (s, r, res) => {
      let reached = null;
      for (const lv of LEVELS) {
        const idx = marks.map((m, k) => m === lv ? k : -1).filter(k => k >= 0);
        const sc = idx.filter(k => res[k]).length / idx.length;
        if (sc >= 0.83) { reached = lv; S.levelTests[lv] = Math.max(S.levelTests[lv] || 0, sc); markLevelKnown(lv); } else break;
      }
      save();
      const now = currentLevel();
      return `<p>Ваш стартовый уровень: <b>${now}</b>${reached ? ` (уровни до ${reached} включительно засчитаны)` : ''}.</p><a class="btn primary" href="#/today">К плану</a>`;
    }, { passText: 'Тест завершён.', failText: 'Тест завершён.' });
    return;
  }
  if (kind === 'mix') {
    const ids = Object.keys(S.cards).filter(id => WORD_BY_ID[id]);
    $('#app').innerHTML = `<a href="#/tests" class="small">← Тесты</a><div class="card" style="margin-top:10px"><h1>Быстрая проверка</h1><div id="quiz"></div></div>`;
    const lv = currentLevel();
    const pool = WORDS.filter(w => LEVELS.indexOf(w.level) <= LEVELS.indexOf(lv));
    const words = ids.length >= 4 ? pick(ids, 6).map(id => WORD_BY_ID[id]) : pick(pool, 6);
    const v = words.map(w => vocabTask(w, pool));
    const gTopics = GRAMMAR.filter(g => LEVELS.indexOf(g.level) <= LEVELS.indexOf(lv));
    const g = pick(gTopics.flatMap(x => x.tasks.map(t => Object.assign({ tag: 'Грамматика: ' + x.title }, t))), 4);
    runQuiz(shuffle(v.concat(g)), root(), () => `<a class="btn primary" href="#/today">К плану</a>`, { passText: 'Отлично! Знания держатся.', failText: 'Есть что повторить — загляните в грамматику и пройдите тренировку слов.' });
    return;
  }
  if (!LEVELS.includes(kind)) return viewTests();
  $('#app').innerHTML = `<a href="#/tests" class="small">← Тесты</a><div class="card" style="margin-top:10px">${lvlPill(kind)}<h1 style="margin-top:8px">Контрольный тест ${kind}</h1><p class="muted">20 вопросов. Для перехода на следующий уровень нужно 80%.</p><div id="quiz"></div></div>`;
  runQuiz(levelTasks(kind, 10, 10), root(), s => {
    S.levelTests[kind] = Math.max(S.levelTests[kind] || 0, s); save();
    const nx = LEVELS[LEVELS.indexOf(kind) + 1];
    return s >= PASS ? `<p>${nx ? `Открыт уровень <b>${nx}</b>! 🎉` : 'Вы прошли весь курс до C1! 🏆'}</p><a class="btn primary" href="#/today">К плану</a>`
                     : `<a class="btn primary" href="#/today">Вернуться к тренировкам</a>`;
  }, { passText: 'Уровень пройден!', failText: 'Пока меньше 80%. Повторите слова и темы этого уровня — и попробуйте снова.' });
}
// Слова пройденного по вводному тесту уровня ставим как «знакомые» (с коротким интервалом проверки)
function markLevelKnown(lv) {
  WORDS.filter(w => w.level === lv && !S.cards[w.id]).forEach((w, k) => {
    S.cards[w.id] = { ease: 2.5, interval: 7, reps: 2, lapses: 0, due: today() + (3 + (k % 14)) * DAY };
  });
  GRAMMAR.filter(g => g.level === lv).forEach(g => { if (!(S.grammar[g.id] >= PASS)) S.grammar[g.id] = PASS; });
}

// ---------- Прогресс ----------
function viewProgress() {
  const w = planWeek(), cur = currentLevel();
  const days = Array.from({ length: 28 }, (_, k) => { const t = today() - (27 - k) * DAY; return S.history[dayKey(t)] || 0; });
  const mx = Math.max(1, ...days);
  const forecast = Array.from({ length: 7 }, (_, k) => Object.values(S.cards).filter(c => c.due >= today() + k * DAY && c.due < today() + (k + 1) * DAY || (k === 0 && c.due < today())).length);
  $('#app').innerHTML = `<h1>Прогресс</h1>
    <div class="grid g4">
      <div class="card stat"><b>${cur}</b><span>текущий уровень</span></div>
      <div class="card stat"><b>${WORDS.filter(x => cardState(x.id) === 'known').length}</b><span>слов выучено</span></div>
      <div class="card stat"><b>${GRAMMAR.filter(g => S.grammar[g.id] >= PASS).length}/${GRAMMAR.length}</b><span>тем грамматики</span></div>
      <div class="card stat"><b>${S.streak.last >= today() - DAY ? S.streak.count : 0}</b><span>дней подряд</span></div>
    </div>
    <div class="card"><h2>План на 16 недель</h2><p class="small muted">Старт: ${new Date(S.start).toLocaleDateString('ru-RU')}. Сейчас неделя ${w}.</p>
      <div class="weeks">${Array.from({ length: 16 }, (_, k) => { const n = k + 1; const lv = LEVELS.find(l => n >= LEVEL_WEEKS[l][0] && n <= LEVEL_WEEKS[l][1]);
        return `<div class="wk ${n === w ? 'cur' : n < w ? 'past' : ''}" style="border-top:3px solid var(--${lv})"><b>${n}</b>${lv}</div>`; }).join('')}</div></div>
    <div class="card"><h2>Уровни</h2>${LEVELS.map(lv => {
      const ws = WORDS.filter(x => x.level === lv), st = ws.filter(x => S.cards[x.id]).length;
      const ts = GRAMMAR.filter(g => g.level === lv), td = ts.filter(g => S.grammar[g.id] >= PASS).length;
      const p = (st / ws.length + td / ts.length) / 2;
      return `<div style="margin:12px 0"><div class="row small">${lvlPill(lv)} <span>слова ${st}/${ws.length} · грамматика ${td}/${ts.length}</span><div class="spacer"></div><span>${S.levelTests[lv] >= PASS ? '✅ тест ' + pct(S.levelTests[lv]) : ''}</span></div>
        <div class="bar" style="margin-top:6px"><i style="width:${p * 100}%;background:var(--${lv})"></i></div></div>`;
    }).join('')}</div>
    <div class="grid g2">
      <div class="card"><h3>Активность за 4 недели</h3><div class="chart">${days.map(d => `<div class="${d ? '' : 'zero'}" style="height:${d / mx * 100}%" title="${d}"></div>`).join('')}</div></div>
      <div class="card"><h3>Повторения на неделю вперёд</h3><div class="chart">${forecast.map(d => `<div class="${d ? '' : 'zero'}" style="height:${d / Math.max(1, ...forecast) * 100}%" title="${d}"></div>`).join('')}</div>
        <div class="row small muted" style="justify-content:space-between;margin-top:4px"><span>сегодня</span><span>+6 дн</span></div></div>
    </div>
    <div class="grid g3">
      <div class="card stat"><b>${Object.keys(S.reading).filter(k => S.reading[k] >= PASS).length}/${READING.length}</b><span>текстов прочитано</span></div>
      <div class="card stat"><b>${Object.values(S.verbs).filter(b => b >= 3).length}/${VERBS.length}</b><span>неправильных глаголов</span></div>
      <div class="card stat"><b>${Object.values(S.history).reduce((a, b) => a + b, 0)}</b><span>ответов всего</span></div>
    </div>
    <div class="card"><h3>Реалистично о сроках</h3><p class="small muted">4 месяца до C1 — очень интенсивный темп: нужно 1,5–2 часа каждый день. Приложение даёт базу — слова, грамматику и проверку. Чтобы реально выйти на B2–C1, добавляйте каждый день 20–30 минут живого английского: сериалы с английскими субтитрами, подкасты, чтение и разговорную практику.</p></div>`;
}

// ---------- Темп и практика дня ----------
const PLAN_DAYS = 112;
function pace() {
  const left = WORDS.filter(w => !S.cards[w.id]).length;
  const days = Math.max(7, PLAN_DAYS - planDay() + 1);
  return Math.max(5, Math.ceil(left / days));
}
function markPractice() { S.practiceDay = dayKey(); save(); }
function practiceDoneToday() { return S.practiceDay === dayKey(); }
function practiceSuggestion() {
  const lv = currentLevel();
  if (S.mistakes.length >= 5) return { title: 'работа над ошибками', sub: `${plural(S.mistakes.length, ZAD)}, где вы ошиблись`, href: '#/mistakes' };
  const text = READING.find(r => LEVELS.indexOf(r.level) <= LEVELS.indexOf(lv) && !(S.reading[r.id] >= PASS));
  const rot = planDay() % 3;
  if (text && rot === 0) return { title: 'чтение', sub: `«${text.title}» (${text.level})`, href: '#/read/' + text.id };
  if (rot === 1) return { title: 'аудирование', sub: 'Диктант: услышать и записать 8 фраз', href: '#/listen' };
  if (rot === 2) return { title: 'неправильные глаголы', sub: '10 глаголов: две формы по памяти', href: '#/verbs' };
  return { title: 'говорение', sub: 'Повторите фразы вслух — браузер проверит', href: '#/speak' };
}
const levelUpTo = lv => w => LEVELS.indexOf(w.level) <= LEVELS.indexOf(lv);

// Сравнение фраз по словам (LCS) → оценка и разметка
function compareWords(target, said) {
  const T = norm(target).split(' ').filter(Boolean), A = norm(said).split(' ').filter(Boolean);
  const dp = Array.from({ length: T.length + 1 }, () => new Array(A.length + 1).fill(0));
  for (let i = T.length - 1; i >= 0; i--) for (let j = A.length - 1; j >= 0; j--)
    dp[i][j] = T[i] === A[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Array(T.length).fill(false);
  let i = 0, j = 0;
  while (i < T.length && j < A.length) {
    if (T[i] === A[j]) { hit[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  const score = T.length ? dp[0][0] / Math.max(T.length, A.length) : 0;
  const words = target.split(/\s+/);
  const html = words.map((w, k) => `<span class="${hit[k] ? 'hit' : 'miss'}">${esc(w)}</span>`).join(' ');
  return { score, html };
}
function phrasePool(n) {
  const lv = currentLevel();
  const learned = Object.keys(S.cards).map(id => WORD_BY_ID[id]).filter(Boolean);
  let pool = learned.length >= n ? learned : WORDS.filter(w => w.level === lv);
  pool = pool.filter(w => w.ex && w.ex.split(' ').length >= 3);
  return pick(pool, n).map(w => w.ex);
}

// ---------- Практика (хаб) ----------
function viewPractice() {
  const lv = currentLevel();
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  $('#app').innerHTML = `<h1>Практика</h1><p class="muted">Слова и грамматика оживают, когда вы их слышите, читаете и произносите. Делайте хотя бы одно упражнение в день.</p>
    <div class="grid g2">
      <a class="card tile" href="#/listen"><span class="ico">🎧</span><h3>Аудирование</h3><p class="small muted">Диктант: слушаете фразу и записываете. Тренирует слух и орфографию.</p></a>
      <a class="card tile" href="#/speak"><span class="ico">🎙️</span><h3>Говорение</h3><p class="small muted">${SR ? 'Повторяете фразу вслух, браузер распознаёт речь и проверяет.' : 'Слушаете и повторяете (shadowing). Распознавание речи работает в Chrome, Edge и Safari.'}</p></a>
      <a class="card tile" href="#/verbs"><span class="ico">🔁</span><h3>Неправильные глаголы</h3><p class="small muted">${VERBS.length} глаголов, повторение по «коробкам» Лейтнера. Выучено: ${Object.values(S.verbs).filter(b => b >= 3).length}.</p></a>
      <a class="card tile" href="#/mistakes"><span class="ico">🩹</span><h3>Работа над ошибками</h3><p class="small muted">${S.mistakes.length ? `${plural(S.mistakes.length, ZAD)} на повторение. Верный ответ убирает задание из списка.` : 'Ошибок нет. Задания, где вы ошибётесь, появятся здесь.'}</p></a>
    </div>
    <div class="card"><h2>Чтение</h2><p class="small muted">Нажмите на любое слово в тексте, чтобы увидеть перевод. Тексты можно прослушать.</p>
      ${LEVELS.map(l => READING.filter(r => r.level === l).map(r => {
        const sc = S.reading[r.id]; const locked = LEVELS.indexOf(l) > LEVELS.indexOf(lv) + 1;
        return `<a class="topic ${locked ? 'dim' : ''}" href="#/read/${r.id}"><span class="check ${sc >= PASS ? 'on' : ''}">${sc >= PASS ? '✓' : ''}</span>${lvlPill(l)}<span class="tname">${esc(r.title)}</span><span class="small muted">${sc != null ? pct(sc) : r.text.split(' ').length + ' слов'}</span></a>`;
      }).join('')).join('')}
    </div>`;
}

// ---------- Чтение ----------
function lookupWord(raw) {
  const w = raw.toLowerCase().replace(/[’']s$/, '').replace(/é/g, 'e');
  const cands = [w, w.replace(/s$/, ''), w.replace(/es$/, ''), w.replace(/ies$/, 'y'), w.replace(/ed$/, ''), w.replace(/ed$/, 'e'), w.replace(/d$/, ''), w.replace(/ing$/, ''), w.replace(/ing$/, 'e'), w.replace(/ly$/, ''), w.replace(/er$/, ''), w.replace(/est$/, '')];
  for (const c of cands) if (LOOKUP[c]) return LOOKUP[c];
  const v = VERBS.find(v => v.past.split('/').includes(w) || v.pp.split('/').includes(w));
  if (v) return { en: v.inf, ru: v.ru + ' (' + v.inf + ' – ' + v.past + ' – ' + v.pp + ')' };
  return null;
}
function viewRead(id) {
  const r = READING.find(x => x.id === id);
  if (!r) return viewPractice();
  const html = r.text.split(/(\s+)/).map(tok => {
    if (/^\s+$/.test(tok)) return tok;
    return tok.replace(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]*/g, m => `<span class="wd" data-w="${esc(m)}">${esc(m)}</span>`);
  }).join('');
  let rate = 0.9;
  $('#app').innerHTML = `<a href="#/practice" class="small">← Практика</a>
    <div class="card reading" style="margin-top:10px">${lvlPill(r.level)}<h1 style="margin-top:8px">${esc(r.title)}</h1>
      <div class="row" style="margin-bottom:12px"><button class="btn" id="play">▶ Слушать</button><button class="btn ghost" id="slow">Скорость: обычная</button><button class="btn ghost" id="stop">■ Стоп</button></div>
      <div class="text" id="txt">${html}</div>
      <div class="pop" id="pop" hidden></div>
      <p class="small muted">Совет: сначала прочитайте сами, потом прослушайте и прочитайте ещё раз вслух вместе с диктором.</p>
    </div>
    <div class="card"><h2>Вопросы на понимание</h2><div id="quiz"></div></div>`;
  $('#play').onclick = () => speak(r.text, rate);
  $('#stop').onclick = () => { try { speechSynthesis.cancel(); } catch (e) {} };
  $('#slow').onclick = e => { rate = rate === 0.9 ? 0.7 : 0.9; e.currentTarget.textContent = 'Скорость: ' + (rate === 0.9 ? 'обычная' : 'медленная'); };
  const pop = $('#pop');
  $('#txt').onclick = e => {
    const el = e.target.closest('.wd'); if (!el) return;
    const w = el.dataset.w, hit = lookupWord(w);
    speak(w);
    pop.innerHTML = `<b>${esc(hit ? hit.en : w)}</b> ${hit ? '— ' + esc(hit.ru) : '<span class="muted">имя собственное или редкое слово</span>'}`;
    pop.hidden = false;
    const rc = el.getBoundingClientRect(), pr = pop.parentElement.getBoundingClientRect();
    pop.style.top = (rc.bottom - pr.top + 6) + 'px';
    pop.style.left = Math.max(8, Math.min(rc.left - pr.left, pr.width - 260)) + 'px';
  };
  document.addEventListener('click', function hide(e) { if (!e.target.closest('.wd') && !e.target.closest('#pop')) { if (pop.isConnected) pop.hidden = true; else document.removeEventListener('click', hide); } });
  runQuiz(r.q.map(q => Object.assign({ t: 'mc' }, q)), $('#quiz'), sc => {
    S.reading[r.id] = Math.max(S.reading[r.id] || 0, sc); markPractice();
    const nx = READING.find(x => !(S.reading[x.id] >= PASS) && x.id !== r.id);
    return `<div class="row" style="justify-content:center">${nx ? `<a class="btn" href="#/read/${nx.id}">Следующий текст</a>` : ''}<a class="btn primary" href="#/today">К плану дня</a></div>`;
  }, { passText: 'Текст понят! Перечитайте его вслух ещё раз — это отличная тренировка.', failText: 'Перечитайте текст, нажимая на незнакомые слова, и попробуйте снова.' });
}

// ---------- Аудирование (диктант) ----------
function viewListen() {
  const items = phrasePool(8);
  let i = 0, total = 0;
  const step = () => {
    if (i >= items.length) {
      const avg = total / items.length;
      markPractice();
      $('#app').innerHTML = `<div class="card done-box"><div class="big">🎧</div><h1>Диктант завершён</h1><p class="muted">Точность: ${pct(avg)}</p>
        <div class="row" style="justify-content:center"><button class="btn" data-rerender>Ещё 8 фраз</button><a class="btn primary" href="#/today">К плану дня</a></div></div>`;
      return;
    }
    const t = items[i];
    $('#app').innerHTML = `<a href="#/practice" class="small">← Практика</a>
      <div class="card" style="margin-top:10px"><div class="progress-top"><div class="bar"><i style="width:${i / items.length * 100}%"></i></div><span class="small muted">${i + 1}/${items.length}</span></div>
      <h2>Послушайте и запишите</h2>
      <div class="row" style="justify-content:center;margin:18px 0"><button class="speak big-speak" data-say="${esc(t)}" aria-label="Прослушать">🔊</button><button class="speak big-speak" data-say="${esc(t)}" data-rate="0.6" aria-label="Медленно">🐢</button></div>
      <input class="ans" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Что вы услышали?">
      <div id="res"></div><button class="btn primary" id="chk" style="width:100%;margin-top:10px">Проверить <kbd>Enter</kbd></button></div>`;
    setTimeout(() => speak(t), 250);
    const inp = $('#ans'); inp.focus();
    let checked = false;
    const check = () => {
      if (checked) return; checked = true;
      const c = compareWords(t, inp.value); total += c.score; logActivity();
      inp.disabled = true; inp.classList.add(c.score >= 0.9 ? 'ok' : 'no');
      $('#res').innerHTML = `<div class="diff">${c.html}</div><div class="fb ${c.score >= 0.9 ? 'ok' : 'no'}">${c.score >= 0.99 ? 'Идеально!' : 'Совпадение: ' + pct(c.score)}</div>`;
      $('#chk').textContent = 'Дальше'; $('#chk').onclick = () => { i++; step(); };
      setTimeout(() => keyHandler = e => { if (e.key === 'Enter') { i++; step(); } }, 50);
    };
    $('#chk').onclick = check;
    keyHandler = e => { if (e.key === 'Enter' && !checked) check(); };
  };
  step();
}

// ---------- Говорение ----------
function viewSpeak() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const items = phrasePool(6);
  let i = 0, total = 0;
  const step = () => {
    if (i >= items.length) {
      markPractice();
      $('#app').innerHTML = `<div class="card done-box"><div class="big">🎙️</div><h1>Отлично поговорили!</h1>${SR ? `<p class="muted">Средняя точность: ${pct(total / items.length)}</p>` : ''}
        <div class="row" style="justify-content:center"><button class="btn" data-rerender>Ещё фразы</button><a class="btn primary" href="#/today">К плану дня</a></div></div>`;
      return;
    }
    const t = items[i];
    $('#app').innerHTML = `<a href="#/practice" class="small">← Практика</a>
      <div class="card" style="margin-top:10px"><div class="progress-top"><div class="bar"><i style="width:${i / items.length * 100}%"></i></div><span class="small muted">${i + 1}/${items.length}</span></div>
      <p class="small muted">1) Прослушайте. 2) ${SR ? 'Нажмите на микрофон и произнесите фразу.' : 'Повторите вслух, копируя интонацию.'}</p>
      <div class="say-text">${esc(t)}</div>
      <div class="row" style="justify-content:center;margin:16px 0">${sayBtn(t)}<button class="speak" data-say="${esc(t)}" data-rate="0.6" aria-label="Медленно">🐢</button></div>
      ${SR ? `<button class="btn primary big mic" id="mic" style="width:100%">🎙️ Говорить</button>` : `<p class="small muted">В этом браузере нет распознавания речи — оцените себя сами.</p>`}
      <div id="res"></div>
      <div class="row" style="margin-top:10px"><div class="spacer"></div><button class="btn" id="nx">${SR ? 'Пропустить' : 'Дальше'}</button></div></div>`;
    $('#nx').onclick = () => { i++; logActivity(); step(); };
    if (!SR) return;
    $('#mic').onclick = () => {
      const rec = new SR(); window.__rec = rec;
      rec.lang = 'en-GB'; rec.interimResults = false; rec.maxAlternatives = 3;
      $('#mic').textContent = '… слушаю'; $('#mic').disabled = true;
      rec.onresult = e => {
        const alts = Array.from(e.results[0]).map(a => a.transcript);
        const best = alts.map(a => ({ a, c: compareWords(t, a) })).sort((x, y) => y.c.score - x.c.score)[0];
        total += best.c.score; logActivity();
        $('#res').innerHTML = `<div class="diff">${best.c.html}</div><p class="small muted">Распознано: «${esc(best.a)}»</p><div class="fb ${best.c.score >= 0.8 ? 'ok' : 'no'}">${best.c.score >= 0.8 ? 'Хорошо! ' : 'Попробуйте ещё раз. '}${pct(best.c.score)}</div>`;
        $('#nx').textContent = 'Дальше';
      };
      rec.onerror = e => { $('#res').innerHTML = `<p class="fb no">${e.error === 'not-allowed' ? 'Разрешите доступ к микрофону в настройках браузера.' : 'Не удалось распознать речь. Попробуйте ещё раз.'}</p>`; };
      rec.onend = () => { const m = $('#mic'); if (m) { m.disabled = false; m.textContent = '🎙️ Говорить ещё раз'; } };
      try { rec.start(); } catch (e) {}
    };
  };
  step();
}

// ---------- Неправильные глаголы ----------
function viewVerbs(mode) {
  const lv = currentLevel();
  const pool = VERBS.filter(levelUpTo(LEVELS[Math.min(4, LEVELS.indexOf(lv) + 1)]));
  if (mode === 'table') {
    $('#app').innerHTML = `<a href="#/verbs" class="small">← Тренировка глаголов</a><h1 style="margin-top:10px">Таблица неправильных глаголов</h1>
      <div class="card"><div class="tablewrap"><table class="words verbs"><tr><th></th><th>Infinitive</th><th>Past</th><th>Participle</th><th>Перевод</th></tr>
      ${VERBS.map(v => `<tr><td><span class="dot ${S.verbs[v.inf] >= 3 ? 'known' : S.verbs[v.inf] ? 'learning' : ''}"></span></td><td>${esc(v.inf)}</td><td>${esc(v.past)}</td><td>${esc(v.pp)}</td><td class="muted">${esc(v.ru)} ${lvlPill(v.level)}</td><td>${sayBtn(v.inf + ', ' + v.past.replace('/', ', ') + ', ' + v.pp.replace('/', ', '))}</td></tr>`).join('')}
      </table></div></div>`;
    return;
  }
  const items = shuffle(pool).sort((a, b) => (S.verbs[a.inf] || 0) - (S.verbs[b.inf] || 0)).slice(0, 10);
  let i = 0, right = 0;
  const step = () => {
    if (i >= items.length) {
      markPractice();
      $('#app').innerHTML = `<div class="card done-box"><div class="big">🔁</div><h1>${right} из ${items.length}</h1><p class="muted">Глаголы с ошибками вернутся в следующей тренировке.</p>
        <div class="row" style="justify-content:center"><button class="btn" data-rerender>Ещё 10</button><a class="btn" href="#/verbs/table">Таблица</a><a class="btn primary" href="#/today">К плану дня</a></div></div>`;
      return;
    }
    const v = items[i];
    $('#app').innerHTML = `<div class="row"><a href="#/practice" class="small">← Практика</a><div class="spacer"></div><a href="#/verbs/table" class="small">Таблица всех глаголов</a></div>
      <div class="card" style="margin-top:10px"><div class="progress-top"><div class="bar"><i style="width:${i / items.length * 100}%"></i></div><span class="small muted">${i + 1}/${items.length}</span></div>
      <div class="flash" style="min-height:0;padding:16px 0">${lvlPill(v.level)}<div class="row" style="justify-content:center"><span class="w">${esc(v.inf)}</span>${sayBtn(v.inf)}</div><div class="tr">${esc(v.ru)}</div></div>
      <div class="grid g2" style="margin-bottom:0"><label class="small muted">Past Simple<input class="ans" id="p1" autocomplete="off" autocapitalize="off" spellcheck="false"></label>
      <label class="small muted">Past Participle (V3)<input class="ans" id="p2" autocomplete="off" autocapitalize="off" spellcheck="false"></label></div>
      <div id="res"></div><button class="btn primary" id="chk" style="width:100%;margin-top:12px">Проверить <kbd>Enter</kbd></button></div>`;
    $('#p1').focus();
    let checked = false;
    const okForm = (val, forms) => forms.split('/').some(f => norm(f) === norm(val));
    const check = () => {
      if (checked) return; checked = true;
      const a = okForm($('#p1').value, v.past), b = okForm($('#p2').value, v.pp);
      $('#p1').classList.add(a ? 'ok' : 'no'); $('#p2').classList.add(b ? 'ok' : 'no');
      $('#p1').disabled = $('#p2').disabled = true;
      const ok = a && b; if (ok) right++;
      S.verbs[v.inf] = ok ? Math.min(5, (S.verbs[v.inf] || 0) + 1) : 0; save(); logActivity();
      speak(v.inf + ', ' + v.past.split('/')[0] + ', ' + v.pp.split('/')[0]);
      $('#res').innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}">${ok ? 'Верно!' : `Правильно: ${esc(v.inf)} – ${esc(v.past)} – ${esc(v.pp)}`}</div>`;
      $('#chk').textContent = 'Дальше'; $('#chk').onclick = () => { i++; step(); };
      setTimeout(() => keyHandler = e => { if (e.key === 'Enter') { i++; step(); } }, 50);
    };
    $('#chk').onclick = check;
    $('#p1').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); $('#p2').focus(); } };
    keyHandler = e => { if (e.key === 'Enter' && !checked && document.activeElement !== $('#p1')) check(); };
  };
  step();
}

// ---------- Работа над ошибками ----------
function viewMistakes() {
  const tasks = S.mistakes.map(ref => TASK_BY_REF[ref]).filter(Boolean);
  if (!tasks.length) {
    $('#app').innerHTML = `<div class="card done-box"><div class="big">✨</div><h1>Ошибок нет</h1><p class="muted">Здесь будут задания по грамматике, где вы ошиблись. Верный ответ убирает задание из списка.</p><a class="btn primary" href="#/today">К плану дня</a></div>`;
    return;
  }
  $('#app').innerHTML = `<a href="#/practice" class="small">← Практика</a><div class="card" style="margin-top:10px"><h1>Работа над ошибками</h1><p class="muted">${plural(tasks.length, ZAD)}. Каждый верный ответ убирает задание из списка.</p><div id="quiz"></div></div>`;
  runQuiz(shuffle(tasks).slice(0, 15), $('#quiz'), () => { markPractice();
    return `<div class="row" style="justify-content:center">${S.mistakes.length ? `<button class="btn" data-rerender>Продолжить (${S.mistakes.length})</button>` : ''}<a class="btn primary" href="#/today">К плану дня</a></div>`; },
    { review: true, passText: 'Отлично, ошибки исправлены!', failText: 'Оставшиеся задания вернутся в следующий раз.' });
}

function applyTheme() {
  if (S.theme) document.documentElement.setAttribute('data-theme', S.theme);
  else document.documentElement.removeAttribute('data-theme');
}
applyTheme();
render();
// Офлайн-режим и установка на телефон (PWA) — работает на http(s), не из файла
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !/claude/.test(location.hostname)) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
})();
