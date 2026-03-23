/* ============================================================
   Vaccine Match — Game Logic
   Sources: History of Vaccines (historyofvaccines.org),
            CIDRAP (cidrap.umn.edu), CHOP Vaccine Education Center,
            World Health Organization (who.int)
   ============================================================ */

'use strict';

// ──────────────────────────────────────────────────────────────
// 1. MASTER DATA — All vaccine-preventable disease pairs
// ──────────────────────────────────────────────────────────────
const ALL_PAIRS = [
  {
    id: 'smallpox',
    disease: 'Smallpox',
    vaccine: 'Smallpox Vaccine\n(Vaccinia)',
    vaccineName: 'Smallpox Vaccine (Vaccinia)',
    info: {
      diseaseName: 'Smallpox',
      preVaccine: 'Approximately 29,000 cases per year in the pre-vaccine United States. Smallpox caused enormous mortality worldwide and is often estimated to have killed hundreds of millions of people, including roughly 300 million in the 20th century alone.',
      postVaccine: 'Zero cases since 1980. The last natural case in the US occurred in 1949; the last case anywhere in the world was in Somalia in 1977. The WHO officially declared smallpox eradicated in 1980 — the only human disease ever eradicated by vaccination.',
      pathogen: '<strong>Causative agent:</strong> Variola major and Variola minor viruses (Orthopoxvirus genus). The virus only naturally infects humans.<br><br><strong>Transmission:</strong> Spread by large respiratory droplets from the mouth and throat during close contact (within ~6 feet). Rarely, transmission occurred via direct contact with skin lesions or contaminated items. The virus only spread after the rash appeared — unlike chickenpox.<br><br><strong>At risk:</strong> All unvaccinated individuals. Mortality was approximately 30% in unvaccinated persons. Survivors were often left with permanent facial scarring (pockmarks).',
      vaccineInfo: '<strong>History:</strong> Edward Jenner developed the first vaccine in 1796, building on the observation that milkmaids exposed to cowpox were protected from smallpox. This pioneering work launched the science of immunology. Routine vaccination in the US ended in 1972 once the disease was eliminated domestically. The subsequent global WHO eradication campaign concluded in 1980.<br><br><strong>Current vaccine:</strong> The Jynneos vaccine (approved 2019) uses a live, attenuated vaccinia virus that cannot replicate in humans and is given in two doses 28 days apart. It is used today primarily for protection against mpox (monkeypox).<br><br><strong>Safety:</strong> Jynneos causes mild injection-site reactions (redness, pain, itching) and occasionally fever, headache, or fatigue. The older ACAM2000 vaccine carries more significant risks including myocarditis and is held in reserve in the national stockpile.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center']
    }
  },
  {
    id: 'polio',
    disease: 'Poliomyelitis\n(Polio)',
    vaccine: 'Polio Vaccine\n(IPV / OPV)',
    vaccineName: 'Polio Vaccine (IPV/OPV)',
    info: {
      diseaseName: 'Poliomyelitis (Polio)',
      preVaccine: 'Before the Salk vaccine (1955), polio caused an estimated 16,000–58,000 cases of paralysis annually in the United States. The 1952 epidemic was the worst in US history, with nearly 58,000 cases and 3,145 deaths.',
      postVaccine: 'Zero wild poliovirus cases in the United States since 1979. Globally, wild poliovirus cases have fallen by >99.9% since 1988. As of 2026, endemic wild poliovirus type 1 circulates only in Afghanistan and Pakistan, although vaccine-derived polioviruses can still be detected in other countries.',
      pathogen: '<strong>Causative agent:</strong> Poliovirus, a member of the Enterovirus genus (Picornaviridae family). Three serotypes exist (types 1, 2, 3); types 2 and 3 have been eradicated.<br><br><strong>Transmission:</strong> Fecal-oral route (contaminated water/food) and less commonly by respiratory droplets. Most infections (95%) are asymptomatic; about 1 in 200 causes irreversible paralysis.<br><br><strong>At risk:</strong> Unvaccinated children under 5 are most vulnerable. The paralytic form ("acute flaccid paralysis") can permanently disable limbs and, in cases of bulbar polio, affect breathing.',
      vaccineInfo: '<strong>History:</strong> Jonas Salk introduced the inactivated polio vaccine (IPV) in 1955 following the largest clinical trial in history — involving 1.8 million children known as "Polio Pioneers." Albert Sabin developed the oral polio vaccine (OPV) licensed in 1961. The US switched exclusively to IPV in 2000 to eliminate rare vaccine-associated paralytic polio (VAPP) linked to OPV.<br><br><strong>Current vaccine:</strong> The inactivated poliovirus vaccine (IPV) is given as a four-dose series and provides long-lasting immunity without any risk of VAPP.<br><br><strong>Safety:</strong> IPV is considered among the safest vaccines available. Side effects are minor: soreness at the injection site, and occasionally mild fever. Serious adverse events are extremely rare.',
      sources: ['https://historyofvaccines.org', 'https://www.who.int', 'https://www.chop.edu/vaccine-education-center']
    }
  },
  {
    id: 'measles',
    disease: 'Measles',
    vaccine: 'MMR Vaccine',
    vaccineName: 'MMR Vaccine (Measles-Mumps-Rubella)',
    info: {
      diseaseName: 'Measles',
      preVaccine: 'Before the measles vaccine was licensed in 1963, the US reported approximately 530,000 cases per year — though the true burden was likely 3–4 million annually since most mild cases went unreported. About 400–500 people died each year, and 1,000 developed permanent brain damage.',
      postVaccine: 'After widespread vaccination, cases fell by more than 99%. Measles was declared eliminated from the US in 2000. However, outbreaks continue among unvaccinated communities. The WHO estimates that the measles vaccine has saved the most lives of any vaccine in the Expanded Programme on Immunization, preventing an estimated 60% of deaths averted since 1974.',
      pathogen: '<strong>Causative agent:</strong> Measles morbillivirus (Paramyxoviridae family). It is one of the most contagious pathogens known, with a basic reproduction number (R₀) of 12–18.<br><br><strong>Transmission:</strong> Airborne and droplet spread. The virus can remain infectious in the air or on surfaces for up to two hours after an infected person leaves the room.<br><br><strong>At risk:</strong> Unvaccinated individuals of all ages; infants too young to be vaccinated; immunocompromised persons. Measles can cause temporary immune amnesia — destroying immune memory cells — leaving survivors vulnerable to other infections for months or years.',
      vaccineInfo: '<strong>History:</strong> John Enders and colleagues grew the measles virus in the laboratory in 1954. John Franklin Enders, Thomas C. Peebles, and Thomas Weller developed the first measles vaccine; it was licensed in the US in 1963. The combined MMR vaccine (measles, mumps, rubella) was assembled at Merck under Maurice Hilleman and licensed in 1971, combining the measles, mumps, and rubella components developed by different researchers.<br><br><strong>Safety:</strong> MMR is highly safe. Common side effects include sore arm, mild rash, and low-grade fever 7–12 days post-vaccination. Febrile seizures occur in about 1 in 3,000 doses but are benign and self-limiting. The MMR vaccine does not cause autism — this claim originated from a 1998 paper that was retracted for fraud and numerous large-scale studies have found no link.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center', 'https://www.who.int']
    }
  },
  {
    id: 'mumps',
    disease: 'Mumps',
    vaccine: 'MMR Vaccine\n(Mumps component)',
    vaccineName: 'MMR Vaccine (Mumps component)',
    info: {
      diseaseName: 'Mumps',
      preVaccine: 'Before the mumps vaccine was introduced in 1967, approximately 162,000 cases were reported annually in the United States. Mumps was a leading cause of acquired deafness and a common cause of viral meningitis in children.',
      postVaccine: 'Cases declined by more than 99% after routine vaccination. In recent years, outbreaks have occurred in highly vaccinated populations, particularly on college campuses, demonstrating that two doses of MMR are more effective than one.',
      pathogen: '<strong>Causative agent:</strong> Mumps orthorubulavirus (Paramyxoviridae family).<br><br><strong>Transmission:</strong> Respiratory droplets and direct contact with saliva of an infected person. An infected person can spread the virus from 2 days before through 5 days after symptoms appear.<br><br><strong>At risk:</strong> Unvaccinated individuals. Complications include orchitis (inflammation of the testicles, affecting up to 30% of post-pubertal males — occasionally leading to reduced fertility), viral meningitis, oophoritis, pancreatitis, and permanent hearing loss.',
      vaccineInfo: '<strong>History:</strong> The mumps vaccine was developed by Maurice Hilleman, who used a virus sample from his ill daughter Jeryl Lynn in 1963. The Jeryl Lynn strain remains the basis for mumps vaccines used in North America today. The vaccine was licensed in 1967 and incorporated into the MMR combination vaccine in 1971.<br><br><strong>Safety:</strong> The mumps component of MMR is safe. Rarely, recipients develop mild, short-lived parotid gland swelling. Febrile seizures are a known but rare reaction to the MMR vaccine overall, not specifically the mumps component.',
      sources: ['https://historyofvaccines.org', 'https://www.chop.edu/vaccine-education-center']
    }
  },
  {
    id: 'rubella',
    disease: 'Rubella\n(German Measles)',
    vaccine: 'MMR Vaccine\n(Rubella component)',
    vaccineName: 'MMR Vaccine (Rubella component)',
    info: {
      diseaseName: 'Rubella (German Measles)',
      preVaccine: 'Before the rubella vaccine (1969), the US reported approximately 47,000 cases annually. A major 1964–65 rubella pandemic infected about 12.5 million Americans and caused approximately 11,000 miscarriages, 2,100 neonatal deaths, and 20,000 cases of congenital rubella syndrome (CRS) — resulting in blindness, deafness, heart defects, and intellectual disabilities.',
      postVaccine: 'Rubella was declared eliminated from the United States in 2004. Since then, fewer than 10 cases are typically reported each year, most linked to international travel. CRS has been reduced to near-zero in the US, though it remains a major cause of preventable birth defects globally.',
      pathogen: '<strong>Causative agent:</strong> Rubella virus (Matonaviridae family).<br><br><strong>Transmission:</strong> Respiratory droplets. Rubella is moderately contagious (R₀ ≈ 5–7). In adults and children, the disease is usually mild with rash and fever. The gravest danger is to pregnant women — the virus crosses the placenta and damages the developing fetal organs during the first trimester.<br><br><strong>At risk:</strong> Unvaccinated pregnant women and their fetuses are at highest risk. Infants born with CRS are a source of ongoing transmission.',
];

// ──────────────────────────────────────────────────────────────
// 2. GAME STATE
// ──────────────────────────────────────────────────────────────
const state = {
  selectedPairs: [],
  cards: [],
  flipped: [],      // indices of currently face-up unmatched cards
  matched: new Set(), // indices of matched cards
  timerInterval: null,
  seconds: 0,
  flipCount: 0,
  isLocked: false,  // prevent clicks during animation
  matchCount: 0,
  usedPairIds: new Set(), // track which pairs have been used across rounds
};

// ──────────────────────────────────────────────────────────────
// 3. DOM REFS
// ──────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const screens = {
  start: $('screen-start'),
  game: $('screen-game'),
  summary: $('screen-summary'),
};
const modal = $('info-modal');

// ──────────────────────────────────────────────────────────────
// 4. UTILITIES
// ──────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add('hidden'));
  screens[name].classList.remove('hidden');
}

// ──────────────────────────────────────────────────────────────
// 5. TIMER
// ──────────────────────────────────────────────────────────────
function startTimer() {
  state.seconds = 0;
  $('timer-display').textContent = '0:00';
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.seconds++;
    $('timer-display').textContent = formatTime(state.seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
}

function pauseTimer() { clearInterval(state.timerInterval); }

function resumeTimer() {
  state.timerInterval = setInterval(() => {
    state.seconds++;
    $('timer-display').textContent = formatTime(state.seconds);
  }, 1000);
}

// ──────────────────────────────────────────────────────────────
// 6. CARD BUILDING
// ──────────────────────────────────────────────────────────────
function selectPairs() {
  // Prefer pairs not yet used this session
  const unused = ALL_PAIRS.filter(p => !state.usedPairIds.has(p.id));
  const pool = unused.length >= 6 ? unused : ALL_PAIRS; // reset if we've cycled through all
  const chosen = shuffle(pool).slice(0, 6);
  chosen.forEach(p => state.usedPairIds.add(p.id));
  // Reset tracking if we used all pairs
  if (state.usedPairIds.size >= ALL_PAIRS.length) state.usedPairIds.clear();
  return chosen;
}

function buildCards(pairs) {
  // One disease card + one vaccine card per pair = 12 cards
  const cards = [];
  pairs.forEach(pair => {
    cards.push({ type: 'disease', pairId: pair.id, label: pair.disease, info: pair.info, vaccineName: pair.vaccineName });
    cards.push({ type: 'vaccine', pairId: pair.id, label: pair.vaccine, info: pair.info, diseaseName: pair.info.diseaseName });
  });
  return shuffle(cards);
}

function renderCard(card, index) {
  const btn = document.createElement('div');
  btn.className = 'flip-card';
  btn.setAttribute('role', 'button');
  btn.setAttribute('tabindex', '0');
  btn.setAttribute('data-testid', `card-${index}`);
  btn.setAttribute('aria-label', `Card ${index + 1}, face down`);
  btn.dataset.index = index;

  btn.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front" aria-hidden="true">
        <svg class="card-back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.3"/>
          <path d="M12 6v6m0 4h.01"/>
        </svg>
        <span class="card-back-label">?</span>
      </div>
      <div class="flip-card-back ${card.type === 'disease' ? 'disease-card' : 'vaccine-card'}" aria-hidden="true">
        <span class="card-type-badge">${card.type === 'disease' ? 'Disease' : 'Vaccine'}</span>
        <span class="card-name">${card.label.replace(/\n/g, '<br>')}</span>
      </div>
    </div>`;

  btn.addEventListener('click', () => handleCardClick(index));
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(index); }
  });
  return btn;
}

function renderGrid() {
  const grid = $('card-grid');
  grid.innerHTML = '';
  state.cards.forEach((card, i) => {
    const el = renderCard(card, i);
    grid.appendChild(el);
  });
}

// ──────────────────────────────────────────────────────────────
// 7. GAME LOGIC
// ──────────────────────────────────────────────────────────────
function handleCardClick(index) {
  if (state.isLocked) return;
  if (state.matched.has(index)) return;
  if (state.flipped.includes(index)) return;

  // Flip the card
  flipCard(index, true);
  state.flipped.push(index);
  state.flipCount++;
  $('flip-count').textContent = state.flipCount;

  if (state.flipped.length === 2) {
    state.isLocked = true;
    const [i1, i2] = state.flipped;
    const c1 = state.cards[i1];
    const c2 = state.cards[i2];

    if (c1.pairId === c2.pairId && c1.type !== c2.type) {
      // MATCH
      setTimeout(() => {
        state.matched.add(i1);
        state.matched.add(i2);
        markMatched(i1);
        markMatched(i2);
        state.flipped = [];
        state.matchCount++;
        $('match-count').textContent = `${state.matchCount} / 6`;
        state.isLocked = false;
        pauseTimer();
        // Show info modal
        showInfoModal(c1.info, c1.type === 'disease' ? c1 : c2, c1.type === 'vaccine' ? c1 : c2);
      }, 600);
    } else {
      // MISMATCH
      setTimeout(() => {
        triggerMismatch(i1);
        triggerMismatch(i2);
        setTimeout(() => {
          flipCard(i1, false);
          flipCard(i2, false);
          removeMismatch(i1);
          removeMismatch(i2);
          state.flipped = [];
          state.isLocked = false;
        }, 500);
      }, 3000);
    }
  }
}

function getCardEl(index) {
  return $('card-grid').children[index];
}

function flipCard(index, faceUp) {
  const el = getCardEl(index);
  if (!el) return;
  if (faceUp) {
    el.classList.add('flipped');
    el.setAttribute('aria-label', `Card ${index + 1}: ${state.cards[index].type}, ${state.cards[index].label.replace(/\n/g, ' ')}`);
  } else {
    el.classList.remove('flipped');
    el.setAttribute('aria-label', `Card ${index + 1}, face down`);
  }
}

function markMatched(index) {
  const el = getCardEl(index);
  if (!el) return;
  el.classList.add('matched');
  el.setAttribute('tabindex', '-1');
}

function triggerMismatch(index) {
  const el = getCardEl(index);
  if (!el) return;
  el.classList.add('mismatch');
}

function removeMismatch(index) {
  const el = getCardEl(index);
  if (!el) return;
  el.classList.remove('mismatch');
}

// ──────────────────────────────────────────────────────────────
// 8. INFO MODAL
// ──────────────────────────────────────────────────────────────
function showInfoModal(info, diseaseCard, vaccineCard) {
  $('modal-title').textContent = info.diseaseName;
  $('modal-disease').innerHTML = `
    <strong>Before the vaccine:</strong> ${info.preVaccine}<br><br>
    <strong>After the vaccine:</strong> ${info.postVaccine}
  `;
  $('modal-pathogen').innerHTML = info.pathogen;
  $('modal-vaccine').innerHTML = info.vaccineInfo;
  modal.classList.remove('hidden');
  $('btn-continue').focus();
}

function hideInfoModal() {
  modal.classList.add('hidden');
  resumeTimer();
  if (state.matchCount === 6) {
    stopTimer();
    setTimeout(showSummary, 300);
  }
}

// ──────────────────────────────────────────────────────────────
// 9. SUMMARY
// ──────────────────────────────────────────────────────────────
function showSummary() {
  showScreen('summary');
  $('summary-time').textContent = formatTime(state.seconds);
  $('summary-flips').textContent = state.flipCount;

  const pairsEl = $('summary-pairs');
  pairsEl.innerHTML = '';
  state.selectedPairs.forEach(pair => {
    const row = document.createElement('div');
    row.className = 'summary-pair-row';
    row.innerHTML = `
      <div class="pair-match-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div class="pair-names">
        <span class="pair-disease">${pair.disease.replace(/\n/g, ' ')}</span>
        <span class="pair-vaccine">${pair.vaccineName}</span>
      </div>`;
    pairsEl.appendChild(row);
  });
}

// ──────────────────────────────────────────────────────────────
// 10. GAME INIT / RESTART
// ──────────────────────────────────────────────────────────────
function startGame() {
  state.flipped = [];
  state.matched = new Set();
  state.flipCount = 0;
  state.matchCount = 0;
  state.isLocked = false;

  state.selectedPairs = selectPairs();
  state.cards = buildCards(state.selectedPairs);

  $('match-count').textContent = '0 / 6';
  $('flip-count').textContent = '0';

  showScreen('game');
  renderGrid();
  startTimer();
}

// ──────────────────────────────────────────────────────────────
// 11. EVENT LISTENERS
// ──────────────────────────────────────────────────────────────
$('btn-start').addEventListener('click', startGame);
$('btn-continue').addEventListener('click', hideInfoModal);
$('btn-play-again').addEventListener('click', startGame);

// Close modal on overlay click (but not card click)
modal.addEventListener('click', e => {
  if (e.target === modal) hideInfoModal();
});

// Keyboard: Escape closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) hideInfoModal();
});

// ──────────────────────────────────────────────────────────────
// 12. DARK MODE TOGGLE
// ──────────────────────────────────────────────────────────────
(function() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(d) {
    root.setAttribute('data-theme', d ? 'dark' : 'light');
    if (toggle) {
      toggle.setAttribute('aria-label', `Switch to ${d ? 'light' : 'dark'} mode`);
      toggle.innerHTML = d
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  applyTheme(dark);

  if (toggle) {
    toggle.addEventListener('click', () => {
      dark = !dark;
      applyTheme(dark);
    });
  }
})();
