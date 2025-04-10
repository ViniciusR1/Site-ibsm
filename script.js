
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
