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
/*
const dataCantata = new Date("2025-04-20T18:00:00");
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
*/

// Lembrete ao acessar a página
/*
window.addEventListener("load", () => {
  const popup = document.createElement("div");
  popup.id = "popup-lembrete";
  popup.textContent = "🎶Não Perca! Hoje a Cantata da páscoa - 20 de Abril às 18h na Igreja Batista em San Martin!";
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
*/
// slider
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

// noticias
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
  })
  .catch(error => {
    console.error('Erro ao carregar as notícias:', error);
  });

// escalas
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
  // Carregar Devocionais Diárias
  fetch("devocionais.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("devocionais-container");

    data.forEach((devocional, index) => {
      const devBox = document.createElement("div");
      devBox.classList.add("devocional");

      devBox.innerHTML = `
        <div class="header" onclick="toggleDevocional(${index})">
          <span>🗓️ ${devocional.data} - ${devocional.titulo}</span>
          <button class="toggle-btn" id="toggle-btn-${index}">-</button>
        </div>
        <div class="mensagem" id="mensagem-${index}">
          <p>${devocional.mensagem}</p>
        </div>
      `;

      container.appendChild(devBox);
    });
  });

function toggleDevocional(index) {
  const mensagem = document.getElementById(`mensagem-${index}`);
  const btn = document.getElementById(`toggle-btn-${index}`);
  
  if (mensagem.style.display === "none") {
    mensagem.style.display = "block";
    btn.textContent = "-";
  } else {
    mensagem.style.display = "none";
    btn.textContent = "+";
  }
}

  
// eventos
fetch('eventos.json')
  .then(response => response.json())
  .then(eventos => {
    const container = document.getElementById('cards-eventos');
    eventos.forEach(evento => {
      const card = document.createElement('div');
      card.className = 'card-evento';
      card.innerHTML = `
        <h3>${evento.titulo}</h3>
        <p><strong>Data:</strong> ${evento.data}</p>
        <p><strong>Hora:</strong> ${evento.hora}</p>
        <p>${evento.descricao}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os eventos:', error);
  });
  //Click aba
  function mostrarAba(id) {
    const abas = document.querySelectorAll('.aba');
    abas.forEach(aba => aba.style.display = 'none');
    
    const abaAtiva = document.getElementById(id);
    if (abaAtiva) {
      abaAtiva.style.display = 'block';
    }
  }
  // Carregar culto ao vivo
  function verificarHorarioCulto() {
    const agora = new Date();
    const dia = agora.getDay(); // 0 = domingo, 3 = quarta
    const hora = agora.getHours();
  
    let mostrarLive = false;
  
    // Domingo: 9h00 às 11h00 e 18h00 às 20h00
    if ((dia === 0 && hora >= 9 && hora < 11) || (dia === 0 && hora >= 18 && hora < 20)) {
      mostrarLive = true;
    }
  
    // Quarta-feira: 19h00 às 21h00
    if (dia === 3 && hora >= 19 && hora < 21) {
      mostrarLive = true;
    }
  
    if (mostrarLive) {
      document.getElementById("live-section").style.display = "block";
    }
  }
  
  window.addEventListener("load", verificarHorarioCulto);
  
  



