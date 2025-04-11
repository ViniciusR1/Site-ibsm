// Trocar abas ao clicar no menu
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.aba').forEach(sec => sec.classList.remove('ativa'));
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('ativo'));
    const id = this.getAttribute('href').substring(1);
    document.getElementById(id).classList.add('ativa');
    this.classList.add('ativo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Contador da Cantata de Páscoa
const dataCantata = new Date("2025-04-20T19:00:00");
function atualizarContador() {
  const agora = new Date();
  const diff = dataCantata - agora;
  if (diff <= 0) {
    document.getElementById("cronometro-cantata").innerHTML = "A Cantata de Páscoa já começou!";
    return;
  }
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);
  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}
setInterval(atualizarContador, 1000);
atualizarContador();

// Lembrete ao acessar a página
window.addEventListener("load", () => {
  const popup = document.createElement("div");
  popup.id = "popup-lembrete";
  popup.textContent = "🎶 Não perca! Cantata de Páscoa - 20 de Abril às 18h na Igreja Batista em San Martin!";
  document.body.appendChild(popup);
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 9000);
});
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.aba').forEach(sec => sec.classList.remove('ativa'));
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('ativo'));
    const id = this.getAttribute('href').substring(1);
    document.getElementById(id).classList.add('ativa');
    this.classList.add('ativo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

let slideIndex = 0;
const imagens = document.querySelectorAll(".slider img");
function mostrarSlide() {
  imagens.forEach((img, i) => {
    img.style.opacity = (i === slideIndex) ? "1" : "0";
  });
  slideIndex = (slideIndex + 1) % imagens.length;
}
setInterval(mostrarSlide, 4000);
mostrarSlide();

fetch('noticias.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('noticias-lista');
    data.forEach(noticia => {
      const div = document.createElement('div');
      div.classList.add('noticia');
      div.innerHTML = `
        <h3>${noticia.titulo}</h3>
        <p>${noticia.texto}</p>
        <small>Publicado em ${noticia.data}</small>
      `;
      container.appendChild(div);
    });
  });

  fetch('escala.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#tabela-escala tbody');
    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.data}</td>
        <td>${item.turno}</td>
        <td>${item.dirigente}</td>
        <td>${item.pregador}</td>
      `;
      tbody.appendChild(tr);
    });
  });
