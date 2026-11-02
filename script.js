const placeData = {
  piti: {
    number: '01 / 04', title: 'อาคารปีติมมหาการุญ', type: 'อาคารเรียน',
    description: 'หนึ่งในอาคารเรียนที่มีชื่อปรากฏในข้อมูลเผยแพร่ของโรงเรียน สามารถเพิ่มเติมภาพถ่ายจริง รายละเอียดชั้นเรียน และพื้นที่ใช้งานได้เมื่อได้รับข้อมูลยืนยัน'
  },
  mary: {
    number: '02 / 04', title: 'อาคารเซนต์เมรี่', type: 'อาคารเรียน',
    description: 'อาคารเซนต์เมรี่ตามภาพถ่ายที่ได้รับ สามารถเพิ่มเติมรายละเอียดการใช้งาน ห้องเรียน และสิ่งอำนวยความสะดวกได้ภายหลัง',
    image: 'assets/building-saint-mary.jpg', imageAlt: 'อาคารเซนต์เมรี่ โรงเรียนมหาไถ่ศึกษาเลย พร้อมนักเรียนร่วมกิจกรรมด้านหน้าอาคาร'
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