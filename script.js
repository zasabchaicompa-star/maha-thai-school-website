const placeData = {
  piti: {
    number: '01 / 04', title: 'อาคารปีติมมหาการุญ', type: 'อาคารเรียน',
    description: 'หนึ่งในอาคารเรียนที่มีชื่อปรากฏในข้อมูลเผยแพร่ของโรงเรียน สามารถเพิ่มเติมภาพถ่ายจริง รายละเอียดชั้นเรียน และพื้นที่ใช้งานได้เมื่อได้รับข้อมูลยืนยัน'
  },
  mary: {
    number: '02 / 04', title: 'อาคารเซนต์เมรี่', type: 'อาคารเรียน',
    description: 'อาคารเซนต์เมรี่ตามภาพถ่ายที่ได้รับ สามารถเพิ่มเติมรายละเอียดการใช้งาน ห้องเรียน และสิ่งอำนวยความสะดวกได้ภายหลัง',
    image: 'assets/building-saint-mary.avif', imageAlt: 'อาคารเซนต์เมรี่ โรงเรียนมหาไถ่ศึกษาเลย พร้อมนักเรียนร่วมกิจกรรมด้านหน้าอาคาร'
  },
  dominic: {
    number: '03 / 04', title: 'อาคารดอมินิก ซาวีโอ', type: 'อาคารเรียน',
    description: 'อาคารเรียนอีกหนึ่งหลังที่มีการกล่าวถึงในเว็บไซต์โรงเรียน สามารถใส่ภาพจริงและคำอธิบายเฉพาะของอาคารได้ในขั้นตอนปรับปรุง'
  },
  gate: {
    number: '04 / 04', title: 'ทางเข้าโรงเรียน', type: 'จุดต้อนรับผู้มาเยือน',
    description: 'จุดเริ่มต้นของการเยี่ยมชมโรงเรียน สำหรับแสดงภาพประตูทางเข้า เส้นทางติดต่อ และคำแนะนำสำหรับผู้ที่เดินทางมาเยี่ยมชม'
  }
};

const titleEl = document.getElementById('placeTitle');
const descriptionEl = document.getElementById('placeDescription');
const numberEl = document.getElementById('placeNumber');
const typeEl = document.getElementById('placeType');
const placePhotoFrame = document.getElementById('placePhotoFrame');
const placePhoto = document.getElementById('placePhoto');
const selectButtons = [...document.querySelectorAll('.place-select')];
const mapBuildings = [...document.querySelectorAll('.map-building')];

function selectPlace(id) {
  const place = placeData[id];
  if (!place) return;
  titleEl.textContent = place.title;
  descriptionEl.textContent = place.description;
  numberEl.textContent = place.number;
  typeEl.textContent = place.type;
  if (place.image) {
    placePhoto.src = place.image;
    placePhoto.alt = place.imageAlt || place.title;
    placePhotoFrame.hidden = false;
  } else {
    placePhotoFrame.hidden = true;
  }
  selectButtons.forEach(button => button.classList.toggle('active', button.dataset.select === id));
  mapBuildings.forEach(building => building.classList.toggle('is-selected', building.dataset.place === id));
}

selectButtons.forEach(button => button.addEventListener('click', () => selectPlace(button.dataset.select)));
mapBuildings.forEach(building => {
  building.addEventListener('click', () => selectPlace(building.dataset.place));
  building.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectPlace(building.dataset.place);
    }
  });
});

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'เปิดเมนู');
}));

document.getElementById('year').textContent = new Date().getFullYear();

// Open all school photos at their original file dimensions; the header emblem remains unchanged.
const imageViewer = document.getElementById('imageViewer');
const imageViewerMedia = document.getElementById('imageViewerMedia');
const imageViewerCaption = document.getElementById('imageViewerCaption');
const imageViewerClose = document.getElementById('imageViewerClose');
let lastImageTrigger = null;

function showImageViewer(src, altText) {
  if (!imageViewer || !imageViewerMedia || !src) return;
  lastImageTrigger = document.activeElement;
  imageViewerMedia.replaceChildren();
  const fullImage = document.createElement('img');
  fullImage.src = src;
  fullImage.alt = altText || 'ภาพถ่ายโรงเรียนมหาไถ่ศึกษาเลย';
  fullImage.decoding = 'async';
  imageViewerMedia.appendChild(fullImage);
  imageViewerCaption.textContent = altText || 'ภาพถ่ายโรงเรียนมหาไถ่ศึกษาเลย';
  imageViewer.hidden = false;
  imageViewer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('image-viewer-open');
  imageViewerClose?.focus();
}

function showMapViewer() {
  const originalMap = document.querySelector('.campus-map');
  if (!originalMap || !imageViewer) return;
  lastImageTrigger = document.activeElement;
  imageViewerMedia.replaceChildren();
  const mapCopy = originalMap.cloneNode(true);
  mapCopy.classList.add('image-viewer-map');
  mapCopy.removeAttribute('role');
  mapCopy.setAttribute('aria-label', 'แผนที่จำลอง 3 มิติของโรงเรียนมหาไถ่ศึกษาเลย');
  imageViewerMedia.appendChild(mapCopy);
  imageViewerCaption.textContent = 'แผนที่จำลอง 3 มิติ — ใช้เพื่อประกอบการเยี่ยมชม ไม่ใช่ผังสถานที่จริง';
  imageViewer.hidden = false;
  imageViewer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('image-viewer-open');
  imageViewerClose?.focus();
}

function hideImageViewer() {
  if (!imageViewer) return;
  imageViewer.hidden = true;
  imageViewer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('image-viewer-open');
  imageViewerMedia?.replaceChildren();
  if (lastImageTrigger && typeof lastImageTrigger.focus === 'function') lastImageTrigger.focus();
}

document.querySelectorAll('img:not(.brand-logo)').forEach(image => {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', image.alt ? 'เปิดดูภาพขนาดใหญ่: ' + image.alt : 'เปิดดูภาพขนาดใหญ่');
  image.title = 'กดเพื่อดูภาพขนาดใหญ่';
});

document.addEventListener('click', event => {
  if (event.target.closest('#imageViewer')) return;
  const image = event.target.closest('img:not(.brand-logo)');
  if (image) {
    showImageViewer(image.currentSrc || image.src, image.alt);
    return;
  }
  const heroImage = event.target.closest('.hero-image[data-image-open]');
  if (heroImage) {
    showImageViewer(heroImage.dataset.imageOpen, heroImage.dataset.imageAlt || heroImage.getAttribute('aria-label'));
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && imageViewer && !imageViewer.hidden) {
    hideImageViewer();
    return;
  }
  if (event.target.closest('#imageViewer')) return;
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('img:not(.brand-logo), .hero-image[data-image-open]')) {
    event.preventDefault();
    if (event.target.matches('img')) showImageViewer(event.target.currentSrc || event.target.src, event.target.alt);
    else showImageViewer(event.target.dataset.imageOpen, event.target.dataset.imageAlt || event.target.getAttribute('aria-label'));
  }
});

imageViewer?.addEventListener('click', event => {
  if (event.target === imageViewer) hideImageViewer();
});
imageViewerClose?.addEventListener('click', hideImageViewer);
document.getElementById('mapExpandButton')?.addEventListener('click', showMapViewer);
