(function () {
  'use strict';

  /* Modal próprio (evita "Esta página diz" do alert) */
  var modalOverlay = document.getElementById('modal-overlay');
  var modalTitle = document.getElementById('modal-title');
  var modalText = document.getElementById('modal-text');
  var modalOk = document.getElementById('modal-ok');
  function showModal(titulo, mensagem) {
    if (!modalOverlay || !modalTitle || !modalText) return;
    modalTitle.textContent = titulo;
    modalText.textContent = mensagem;
    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }
  if (modalOk) modalOk.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelectorAll('.nav-links a');

  /* Menu mobile */
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }
  if (links.length) {
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav && nav.classList.contains('nav-open')) {
          nav.classList.remove('nav-open');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* Modo colorido: ativa fundo arco-íris e salva preferência */
  var checkboxColorido = document.getElementById('modo-colorido');
  if (checkboxColorido) {
    if (localStorage.getItem('modoColorido') === 'true') {
      checkboxColorido.checked = true;
      document.body.classList.add('modo-colorido');
    }
    checkboxColorido.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('modo-colorido');
        localStorage.setItem('modoColorido', 'true');
      } else {
        document.body.classList.remove('modo-colorido');
        localStorage.setItem('modoColorido', 'false');
      }
    });
  }

  /* Form rastreio: simula busca */
  var formRastreio = document.getElementById('form-rastreio');
  if (formRastreio) {
    formRastreio.addEventListener('submit', function (e) {
      e.preventDefault();
      var codigo = document.getElementById('codigo-rastreio');
      if (codigo && codigo.value.trim()) {
        codigo.value = codigo.value.trim();
        showModal('Estamos analisando sua entrega!', 'Lembre-se: este é um projeto de demonstração (portfólio). Não é um sistema real de rastreamento.');
      } else {
        showModal('Atenção', 'Digite seu código de rastreamento.');
      }
    });
  }

  /* Abrir/fechar painel do chat: ícone flutuante ou links "Suporte" / "Falar com suporte" */
  var chatFloatBtn = document.getElementById('chat-float-btn');
  var chatPanel = document.getElementById('chat-panel');
  var chatPanelClose = document.getElementById('chat-panel-close');
  if (chatFloatBtn && chatPanel) {
    function openChat() {
      chatPanel.classList.add('is-open');
      chatPanel.setAttribute('aria-hidden', 'false');
    }
    function closeChat() {
      chatPanel.classList.remove('is-open');
      chatPanel.setAttribute('aria-hidden', 'true');
    }
    chatFloatBtn.addEventListener('click', function () {
      if (chatPanel.classList.contains('is-open')) closeChat();
      else openChat();
    });
    if (chatPanelClose) {
      chatPanelClose.addEventListener('click', closeChat);
    }
    /* Quem clica em "Suporte" no menu ou "Falar com suporte" ou "Chat de suporte" no rodapé abre o chat */
    document.querySelectorAll('.abrir-chat').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        if (chatPanel.classList.contains('is-open')) closeChat();
        else openChat();
      });
    });
  }

  /* Chat: adiciona mensagem do usuário na tela */
  var chatForm = document.getElementById('chat-form');
  var chatMessages = document.getElementById('chat-messages');
  var chatInput = document.querySelector('.chat-input');
  if (chatForm && chatMessages && chatInput) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var texto = chatInput.value.trim();
      if (!texto) return;
      var msg = document.createElement('div');
      msg.className = 'chat-msg chat-msg-user';
      msg.innerHTML = '<div class="chat-bubble"><p>' + escapeHtml(texto) + '</p></div><span class="chat-avatar">👋</span>';
      chatMessages.appendChild(msg);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
      /* Resposta automática simulada */
      setTimeout(function () {
        var resp = document.createElement('div');
        resp.className = 'chat-msg chat-msg-support';
        resp.innerHTML = '<span class="chat-avatar">💜</span><div class="chat-bubble"><strong>Suporte LGBT+</strong><p>Anotado! Em um sistema real, nossa equipe responderia em breve. Obrigado pelo contato!</p></div>';
        chatMessages.appendChild(resp);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 800);
    });
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  /* Reclamações: envia (simulado) e mostra confirmação */
  var formReclamacao = document.getElementById('form-reclamacao');
  if (formReclamacao) {
    formReclamacao.addEventListener('submit', function (e) {
      e.preventDefault();
      var assunto = document.getElementById('reclamacao-assunto');
      var texto = document.getElementById('reclamacao-texto');
      if (assunto && texto && assunto.value.trim() && texto.value.trim()) {
        showModal('Obrigado!', 'Sua reclamação foi registrada. Este é um espaço seguro e inclusivo — em breve nossa equipe entrará em contato.');
        formReclamacao.reset();
      }
    });
  }
})();
