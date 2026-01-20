const mediaQuery = window.matchMedia("(max-width: 700px)");

const lang_select = document.querySelector("#lang-select-btn");
const lang_container = document.querySelector("#lang-container");
const lang_menu = document.querySelector("#lang-menu");

const lang_change = document.querySelector("#menu-text");
const flag = document.querySelector("#flag");

const burger = document.getElementById('burger');
const navList = document.querySelector('nav ul');

// Button up
const btn_up = document.querySelector("#up");

// Wyszukiwanie na stronie
const searching_lang = document.querySelector("#search_lang-btn");
const searching_head = document.querySelector("#search_head-btn");

const search_text = document.querySelector("#search_text");
const search_close = document.querySelector("#search_close_btn");
const inner_search_close = document.querySelector("#inner_search_close_btn");
const searchInput = document.querySelector("#search");
const searchResults = document.querySelector("#search_results");
const resultsContainer = document.querySelector("#results");


function handleScreenChange(e)
{
  if (e.matches)
  {
    btn_up.style.display = 'none';
    window.removeEventListener('scroll', handleScrollButton);
    window.removeEventListener('scroll', handleHeaderScroll);
  } 
  else
  {
    btn_up.style.display = 'flex';
    window.addEventListener('scroll', handleScrollButton);
    window.addEventListener('scroll', handleHeaderScroll);
  }
}



// Scrollowanie menu
let lastScrollTop = 0;
let headerPaused = false;
let lockUntilUserScrollUp = false;

const header = document.getElementById('header');


function handleHeaderScroll()
{
  if (headerPaused) return;

  const currentScroll = window.scrollY;

  // dopóki nie było REALNEGO scrollowania w górę — NIC NIE ROBIMY
  if (lockUntilUserScrollUp)
  {
    // sprawdzamy czy user naprawdę przewija w górę
    if (currentScroll < lastScrollTop)
    {
      // dopiero wtedy odblokowujemy
      lockUntilUserScrollUp = false;
    }
    else
    {
      lastScrollTop = currentScroll;
      return;
    }
  }

  if (currentScroll > lastScrollTop)
  {
    header.classList.add("hidden");
  }
  else
  {
    header.classList.remove("hidden");
  }

  lastScrollTop = currentScroll;
}



// Slajdy
const slides = document.querySelectorAll('.slide');
//Button slajd 1 
const btn1 = document.querySelector("#pierwszy");
//Button slajd 2
const btn2 = document.querySelector("#drugi");
//Button slajd 3
const btn3 = document.querySelector("#trzeci");
const dots = [btn1, btn2, btn3];
// Button slajd prev
const prev = document.querySelector("#prev");

// Button slajd next
const next = document.querySelector("#next");

let currentSlide = 0;
let slideInterval;


function showSlide(index)
{
  slides.forEach(slide => slide.classList.remove('active', 'prev'));

  slides[index].classList.add('active');

  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

  currentSlide = index;
}

function nextSlide()
{
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}
function prevSlide()
{
  const prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

function startAutoSlide()
{
  slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide()
{
  clearInterval(slideInterval);
}


btn1.addEventListener("click", () => {
showSlide(0);
stopAutoSlide();
startAutoSlide();
});

// Reakcja na enter i spacje
btn1.addEventListener("keydown", function(e) {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    showSlide(0);
    stopAutoSlide();
    startAutoSlide();
  }
});

btn2.addEventListener("click", () => {
showSlide(1);
stopAutoSlide();
startAutoSlide();
});

// Reakcja na tab i klawiaturę
btn2.addEventListener("keydown", function(e) {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    showSlide(1);
    stopAutoSlide();
    startAutoSlide();
  }
});

btn3.addEventListener("click", () => {
showSlide(2);
stopAutoSlide();
startAutoSlide();
});

// Reakcja na tab i klawiaturę
btn3.addEventListener("keydown", function(e) {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    showSlide(2);
    stopAutoSlide();
    startAutoSlide();
  }
});

prev.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.target.blur();
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

// Reakcja na tab i klawiaturę
prev.addEventListener("keydown", function(e) {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    e.stopPropagation();
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  }
});


next.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.target.blur();
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
})

// Reakcja na tab i klawiaturę
next.addEventListener("keydown", function(e) {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    e.stopPropagation();
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  }
});

showSlide(0);
startAutoSlide();



// ukryj całkowicie po załadowaniu strony
window.addEventListener("load", () => {
  btn_up.classList.remove("visible");
  btn_up.style.display = "none";
});


// funkcja pokazująca i chowająca przycisk
function handleScrollButton()
{
  if (window.scrollY > 100)
  {
    if (!btn_up.classList.contains("visible"))
    {
      btn_up.style.display = "flex";
      // mała pauza, by transition się uruchomił
      requestAnimationFrame(() => btn_up.classList.add("visible"));
    }
  }
  else
  {
    btn_up.classList.remove("visible");
    setTimeout(() => {
      if (!btn_up.classList.contains("visible"))
      {
        btn_up.style.display = "none";
      }
    }, 300); // dopasuj do czasu transition
  }
}

  // Po kliknięciu przewiń na górę strony
  btn_up.addEventListener("click", function()
  {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


// Reakcja na tab i klawiaturę
btn_up.addEventListener("keydown", function(e) {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
});


window.addEventListener("load", () =>
{
  // Wyłącz przywracanie scrolla
  if ("scrollRestoration" in history)
  {
    history.scrollRestoration = "manual";
  }

  handleScreenChange(mediaQuery);
  mediaQuery.addEventListener("change", handleScreenChange);
});


// Funkcja pomocnicza do ustawiania aria-expanded dla burger menu
function updateBurgerAria()
{
  const expanded = burger.classList.contains("active");
  burger.setAttribute("aria-expanded", expanded ? "true" : "false");
  navList.setAttribute("aria-expanded", expanded ? "true" : "false");
}

// Burger menu dla width < 700px 
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navList.classList.toggle('active');

  search_text.style.display = "none";
  searchResults.style.display = "none";

  updateBurgerAria();
});

// Zamknięcie przy ESC
document.addEventListener("keydown", (e) => {
  if (window.innerWidth < 700 && e.key === "Escape")
  {
    burger.classList.remove('active');
    navList.classList.remove('active');
    updateBurgerAria();
  }
});

// Zamknięcie przy scrollowaniu
window.addEventListener("scroll", () => {
  if (burger.classList.contains("active") && navList.classList.contains("active"))
  {
    burger.classList.remove('active');
    navList.classList.remove('active');
    updateBurgerAria();
  }
});

// Zamknięcie przez kliknięcie poza menu
document.addEventListener("click", (e) => {

  const isMenuOpen = burger.classList.contains("active") && navList.classList.contains("active");

  if (!isMenuOpen) return;

  if (burger.contains(e.target)) return;
  if (navList.contains(e.target)) return;
  if (lang_select.contains(e.target)) return;

  burger.classList.remove("active");
  navList.classList.remove("active");
  updateBurgerAria();
});



// Animacje dla 3 obrazków na dole strony
document.addEventListener("DOMContentLoaded", () => {
  const types = document.querySelectorAll(".type");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animacja tylko raz
      }
    });
  }, {
    threshold: 0.2 // 20% elementu musi być widoczne
  });

  types.forEach(type => {
    observer.observe(type);
  });
});


// Ukrycie headera po przejściu z linku zewnętrznego na stronę jeśli link ma id (#)
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  // Jeśli w adresie jest hash (#)
  if (window.location.hash)
  {
    header.classList.add("hidden");
  }
});


// funkcja zmieniająca widoczność tabindex dla zmiany języka przez tab
function toggleTabindex(element)
{ 
  if (!element) return;
  element.tabIndex = (element.tabIndex === 0) ? -1 : 0;
}


// Funkcje do obsługi menu języków na stronie
function toggleLangMenu()
{ 
    toggleTabindex(lang_change);
    lang_menu.classList.toggle("visible");
    lang_select.classList.toggle("rotated");
    if (window.innerWidth > 1000)
    {
      search_text.style.display = "none";
      searchResults.style.display = "none";
    }
}

// Obsługa przycisku strzałki dla spacji i Entera
lang_select.addEventListener("click", toggleLangMenu);
lang_select.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ")
    {
      e.preventDefault();
      toggleLangMenu();
    }
});

// Zamknięcie kliknięciem poza
document.addEventListener("click", (e) => {
    if (!lang_container.contains(e.target) && !lang_select.contains(e.target))
    {
      lang_menu.classList.remove("visible");
      lang_select.classList.remove("rotated");
      if (lang_change) lang_change.tabIndex = -1;
    }
});

// Zamknięcie przy scrollowaniu
window.addEventListener("scroll", () => {
    lang_menu.classList.remove("visible");
    lang_select.classList.remove("rotated");
    if (lang_change) lang_change.tabIndex = -1;
});

// Zamykanie klawiszem Espace
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
    {
      lang_menu.classList.remove("visible");
      lang_select.classList.remove("rotated");
      if (lang_change) lang_change.tabIndex = -1;
    }
});


// Zmiana języka strony kliknięciem na flagę/skrót języka
function change_lang() {
  const url = new URL(window.location.href);
  const search = url.search || "";
  const hash = "";

  const plToEn = {
    "index.html": "index.html",
    "artysci.html": "artists.html",
    "galeria.html": "gallery.html",
    "wydarzenia.html": "events.html",
    "kontakt.html": "contact.html"
  };
  const enToPl = Object.fromEntries(
    Object.entries(plToEn).map(([k, v]) => [v, k])
  );

  const isFile = url.protocol === "file:";
  const isGithubPages = url.hostname.endsWith(".github.io");

  let parts = url.pathname.split("/").filter(Boolean);

  // 🔒 NA GITHUB PAGES: PIERWSZY ELEMENT = REPO
  let base = [];
  if (isGithubPages && parts.length > 0) {
    base.push(parts.shift());
  }

  // plik (jeśli brak – index.html)
  let filename = parts.at(-1)?.includes(".")
    ? parts.pop()
    : "index.html";

  // język = PIERWSZY element PO REPO
  const inEn = parts[0] === "en";
  if (inEn) parts.shift();

  if (inEn) {
    // EN → PL
    const plFile = enToPl[filename] || filename;
    if (plFile !== "index.html") parts.push(plFile);
  } else {
    // PL → EN
    parts.unshift("en");
    const enFile = plToEn[filename] || filename;
    if (enFile !== "index.html") parts.push(enFile);
  }

  const prefix = isFile ? "file:///" : "/";
  const newPath = prefix + [...base, ...parts].join("/");

  window.location.href = newPath + search + hash;
}



lang_change.addEventListener("click", change_lang);

// Reakcja na Enter i Spacje
lang_change.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    lang_change.click();
  }
});


function toggleSearchText()
{
    if (search_text.style.display === "flex")
    {
        search_text.style.display = "none";
        searchResults.style.display = "none"
    }
    else
    {
        search_text.style.display = "flex";
        searchInput.focus();
        if (navList.classList.contains("active") && burger.classList.contains("active"))
        {
          navList.classList.remove("active");
          burger.classList.remove("active");
        }
    }
}

function toggleInnerSearch()
{
    if (searchResults.style.display === "block")
    {
        searchResults.style.display = "none"
    }
}


// Zamykanie wyszukiwania przez "X"
search_close.addEventListener("click", toggleSearchText);

// Reakcja na Enter i Spacje dla "X"
search_close.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    toggleSearchText();
  }
});

// Zamykanie wyszukiwania przez "X"
inner_search_close.addEventListener("click", toggleInnerSearch);

// Reakcja na Enter i Spacje dla "X"
inner_search_close.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    toggleInnerSearch();
  }
});



// Zamykanie klawiszem Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
    {
      if (search_text.style.display == "flex" && searchResults.style.display == "block")
        {
          searchResults.style.display = "none";
        }
      else if (search_text.style.display == "flex" && searchResults.style.display == "none")
      {
        search_text.style.display = "none";
      }
    }
});

// Obsługa wyszukiwania
searching_lang.addEventListener("click", toggleSearchText);

searching_head.addEventListener("click", toggleSearchText);

// Reakcja na Enter i Spacje
searching_lang.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    toggleSearchText();
    if (lang_menu.classList.contains("visible"))
    {
      lang_menu.classList.remove("visible");
    }
  }
});

searching_head.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ")
  {
    e.preventDefault();
    toggleSearchText();
    if (lang_menu.classList.contains("visible"))
    {
      lang_menu.classList.remove("visible");
    }
  }
});


// Funkcja pomocnicza do zamiany polskich znaków na zwykłe litery
function normalizePolish(str)
{
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .replace(/ș|ş/g, "s")
    .replace(/ț|ţ/g, "t")
    .toLowerCase();
}


const diacriticsMap = {
  'a': 'aąàáâãäå',
  'c': 'cćç',
  'e': 'eęèéêë',
  'i': 'iìíîï',
  'l': 'lł',
  'n': 'nńñ',
  'o': 'oóòôõö',
  's': 'sśșş',
  'u': 'uùúûü',
  'y': 'yÿ',
  'z': 'zżź',
  'r': 'r',
  't': 'tțţ',
  'b': 'b',
  'd': 'd',
  'g': 'g',
  'h': 'h',
  'j': 'j',
  'k': 'k',
  'm': 'm',
  'p': 'p',
  'q': 'q',
  'v': 'v',
  'w': 'w',
  'x': 'x'
};

function escapeRegexChar(ch)
{
  return ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHTML(str)
{
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let currentFocusIndex = -1;
let lastTabPressed = false; // do synchronizacji tabowania

function updateSearchResults()
{
  const pageLang = document.documentElement.lang || "en";
  const noResultsText = pageLang === "pl" ? "Brak wyników." : "No results.";

  let rawQuery = searchInput.value
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!rawQuery)
  {
    searchResults.style.display = "none";
    resultsContainer.innerHTML = "";
    return;
  }

  searchResults.style.display = "block";
  resultsContainer.innerHTML = "";

  // Limit wyników zależny od wysokości ekranu
  const isSmallHeight = window.innerHeight < 760;
  const MAX_RESULTS = isSmallHeight ? 8 : 10;

  const queryParts = rawQuery.split(" ").filter(Boolean);
  const items = document.querySelectorAll(".search-item");

  let matched = [];

  items.forEach(item =>
  {
    const plain = item.id.replace(/_/g, " "); 
    const normalizedId = normalizePolish(plain.toLowerCase());

    const normalizedQueryParts = queryParts.map(q => normalizePolish(q));
    const allMatch = normalizedQueryParts.every(q => normalizedId.includes(q));
    if (!allMatch) return;

    matched.push({ element: item, plain });
  });

  // Jeśli nie ma wyników — wyświetlamy komunikat
  if (matched.length === 0)
  {
    resultsContainer.textContent = noResultsText;
    return;
  }

  // SORTOWANIE ALFABETYCZNE
  matched.sort((a, b) => a.plain.localeCompare(b.plain, 'pl', { sensitivity: 'base' }));

  // Ograniczamy liczbę wyników
  matched = matched.slice(0, MAX_RESULTS);

  // Teraz generujemy podświetlony HTML dla posortowanych elementów
  matched.forEach(entry =>
  {
    const plain = entry.plain;
    const mask = new Array(plain.length).fill(false);

    // Podświetlanie
    queryParts.forEach(q_raw =>
    {
      if (!q_raw) return;

      const buildVariantClass = ch =>
      {
        const chBase = normalizePolish(ch);
        if (!diacriticsMap[chBase]) return escapeRegexChar(ch);
        return diacriticsMap[chBase].split('').map(c => escapeRegexChar(c)).join('');
      };

      let loosePattern = "";
      for (let i = 0; i < q_raw.length; i++)
      {
        const ch = q_raw[i];
        loosePattern += `[${buildVariantClass(normalizePolish(ch))}]`;
      }

      const re = new RegExp(loosePattern, 'i');
      const m = plain.match(re);

      if (m)
      {
        const start = m.index;
        const len = m[0].length;

        for (let k = start; k < start + len; k++)
        {
          if (k >= 0 && k < mask.length) mask[k] = true;
        }
      }
    });

    // Budowanie HTML z <mark>
    let highlighted = "";
    for (let i = 0; i < plain.length; i++)
    {
      const ch = escapeHTML(plain[i]);
      if (mask[i] && !mask[i-1]) highlighted += "<mark>";
      highlighted += ch;
      if (mask[i] && !mask[i+1]) highlighted += "</mark>";
    }

    const link = document.createElement("a");
    link.href = "#" + entry.element.id;
    link.innerHTML = highlighted;
    link.className = "search-result-link";
    link.style.display = "block";
    resultsContainer.appendChild(link);

    currentFocusIndex = -1;
    lastTabPressed = false;
  });
}

searchInput.addEventListener("input", updateSearchResults);
searchInput.addEventListener("focus", updateSearchResults);
searchInput.addEventListener("click", updateSearchResults);


// Zamknięcie kliknięciem poza
document.addEventListener("click", (e) => {
    if (!search_text.contains(e.target) && !resultsContainer.contains(e.target) &&
    !searching_lang.contains(e.target) && !searching_head.contains(e.target))
    {
      searchResults.style.display = "none";
    }
});

// Synchronizacja linków w wynikach wyszukiwania z obługą tab
function syncIndexWithTab(links, activeElement)
{
  const idx = links.indexOf(activeElement);
  if (idx !== -1)
  {
    currentFocusIndex = idx;
  }
}

// Działanie tab dla listy linków ze strzałkami w wynikach wyszukiwania
document.addEventListener("keydown", function(e) {
  const links = Array.from(resultsContainer.querySelectorAll(".search-result-link"));
  if (links.length === 0) return;

  if (e.key === "Tab")
  {
    lastTabPressed = true;
    // chwilowo NIE blokujemy taba – standardowa nawigacja klawiatury
    setTimeout(() => {
      const activeEl = document.activeElement;
      syncIndexWithTab(links, activeEl);
    }, 0);
  }
});


// Synchronizacja wyników wyszukiwania z tab
resultsContainer.addEventListener("click", function(e) {
  const links = Array.from(resultsContainer.querySelectorAll(".search-result-link"));
  const target = e.target.closest(".search-result-link");
  if (!target) return;

  syncIndexWithTab(links, target);
});


// Obsługa tabowania wyników wyszukiwania
function updateActiveResult(links)
{
  links.forEach(link => link.classList.remove("active"));

  const active = links[currentFocusIndex];
  if (active)
  {
    active.classList.add("active");
    active.focus();
  }
}

// Obsługa klawiatury
document.addEventListener("keydown", function(e) {

  // jeśli wyniki są ukryte nie blokuj strzałek
  if (searchResults.style.display === "none") return;

  const links = Array.from(resultsContainer.querySelectorAll(".search-result-link"));
  if (links.length === 0) return;

  // strzałka w dół
  if (e.key === "ArrowDown")
  {
    e.preventDefault();
    currentFocusIndex = (currentFocusIndex + 1) % links.length;
    updateActiveResult(links);
    return;
  }

  // strzałka w górę
  if (e.key === "ArrowUp")
  {
    e.preventDefault();
    currentFocusIndex = (currentFocusIndex - 1 + links.length) % links.length;
    updateActiveResult(links);
    return;
  }

  // enter/spacja – uaktywnienie wybranego linku
  if ((e.key === "Enter" || e.key === " ") && currentFocusIndex >= 0)
  {
    e.preventDefault();

    const link = links[currentFocusIndex];

    link.blur();
    link.click();
    searchResults.style.display = "none";
    return;
  }
});



function scrollToElementAndPauseHeader(target)
{
  if (!target) return;

  headerPaused = true;          // wyłączamy reakcję headera
  lockUntilUserScrollUp = true; // header ma być ukryty aż do SKROLLOWANIA W GÓRĘ
  header.classList.add("hidden");

  // Smooth scroll
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  // Czekamy aż przestanie się przewijać
  let prevY = window.scrollY;
  let stableFrames = 0;

  function check()
  {
    const y = window.scrollY;

    if (Math.abs(y - prevY) < 0.5)
    {
      stableFrames++;
    }
    else
    {
      stableFrames = 0;
    }

    prevY = y;

    if (stableFrames >= 4)
    {
      // przewijanie zakończone — ALE header nadal ma pozostać ukryty
      headerPaused = false;
      lastScrollTop = window.scrollY;
      return;
    }

    requestAnimationFrame(check);
  }

  requestAnimationFrame(check);
}



// Chowanie headera i przewinięcie do elementu docelowego
resultsContainer.addEventListener("click", function(e) {
  const link = e.target.closest(".search-result-link");
  if (!link) return;

  e.preventDefault();

  link.blur();

  const target = document.getElementById(link.getAttribute("href").substring(1));
  if (!target) return;

  scrollToElementAndPauseHeader(target);

  searchResults.style.display = "none";
  searchInput.value = "";
});


// Działanie linków przez spacje
document.addEventListener("keydown", function(e) {
  if (e.key === " " && document.activeElement.tagName === "A") {
    e.preventDefault();
    document.activeElement.click();
  }
});


// Blokada zamykania wyszukiwarki przez enter
search_text.addEventListener('keydown', function(e) {
    if (e.key === 'Enter')
    {
      e.preventDefault(); // blokuje domyślne działanie Enter
    }
});