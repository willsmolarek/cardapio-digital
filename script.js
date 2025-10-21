// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: "Batata Frita Grande",
        descricao: "Porção generosa de batatas fritas crocantes",
        preco: 15.90,
        categoria: "acompanhamentos",
        imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        nome: "Suco Natural 500ml",
        descricao: "Laranja, limão, morango ou abacaxi",
        preco: 8.50,
        categoria: "bebidas",
        imagem: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        nome: "Pizza Margherita",
        descricao: "Molho de tomate, mussarela de bufala, tomate fresco e manjericão",
        preco: 45.90,
        categoria: "pizzas",
        imagem: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        nome: "Brownie com Sorvete",
        descricao: "Brownie de chocolate quente com sorvete de creme",
        preco: 12.90,
        categoria: "sobremesas",
        imagem: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        nome: "Hambúrguer Artesanal",
        descricao: "Pão brioche, blend 180g, queijo cheddar, bacon",
        preco: 28.90,
        categoria: "burgers",
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        nome: "Refrigerante 350ml",
        descricao: "Coca-Cola, Guaraná, Fanta ou Sprite",
        preco: 6.90,
        categoria: "bebidas",
        imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop"
    }
];

// ========== CONFIGURAÇÃO DO RESTAURANTE ==========
const configRestaurante = {
    nome: "Nosso Restaurante",
    telefone: "5542998413725",
    endereco: "Rua Exemplo, 123 - São Paulo, SP",
    horarioFuncionamento: "Seg à Sex: 11h-23h, Sáb e Dom: 12h-00h",
    mesas: 20
};

// ========== CONFIGURAÇÃO DO SISTEMA ==========
const usarMesa = true; // Define se o sistema de mesas está ativo

// Estado da aplicação
let estado = {
    usuario: null,
    carrinho: [],
    categoriaAtual: 'all',
    termoBusca: '',
    enderecos: [],
    pedidos: [],
    mesa: null,
    numeroPessoas: 1,
    scannerAtivo: false,
    darkMode: false,
    // ⭐ NOVO: Sistema de Avaliações
    avaliacoes: [],
    produtoAvaliando: null,
    filtroAvaliacoes: 'all' // all, 5, 4, 3, 2, 1
};

// Elementos do DOM
let elements = {};

// ========== INICIALIZAR ELEMENTOS DO DOM ==========
function inicializarElementos() {
    elements = {
        // Elementos principais
        productsGrid: document.getElementById('productsGrid'),
        searchInput: document.getElementById('searchInput'),
        categoryButtons: document.querySelectorAll('.category-btn'),
        cartBtn: document.getElementById('cartBtn'),
        cartCount: document.getElementById('cartCount'),
        cartSidebar: document.getElementById('cartSidebar'),
        cartItems: document.getElementById('cartItems'),
        cartTotal: document.getElementById('cartTotal'),
        emptyCart: document.getElementById('emptyCart'),
        checkoutBtn: document.getElementById('checkoutBtn'),
        whatsappBtn: document.getElementById('whatsappBtn'),
        closeCart: document.getElementById('closeCart'),
        
        // Login/Registro
        loginBtn: document.getElementById('loginBtn'),
        loginModal: document.getElementById('loginModal'),
        registerModal: document.getElementById('registerModal'),
        closeLogin: document.getElementById('closeLogin'),
        closeRegister: document.getElementById('closeRegister'),
        loginForm: document.getElementById('loginForm'),
        registerForm: document.getElementById('registerForm'),
        showRegister: document.getElementById('showRegister'),
        showLogin: document.getElementById('showLogin'),
        
        // Perfil
        profileModal: document.getElementById('profileModal'),
        closeProfile: document.getElementById('closeProfile'),
        profilePicture: document.getElementById('profilePicture'),
        profilePictureInput: document.getElementById('profilePictureInput'),
        changePhotoBtn: document.getElementById('changePhotoBtn'),
        profileName: document.getElementById('profileName'),
        profileEmail: document.getElementById('profileEmail'),
        profilePhone: document.getElementById('profilePhone'),
        addressList: document.getElementById('addressList'),
        addAddressBtn: document.getElementById('addAddressBtn'),
        orderHistory: document.getElementById('orderHistory'),
        saveProfileBtn: document.getElementById('saveProfileBtn'),
        logoutBtn: document.getElementById('logoutBtn'),
        
        // Endereço
        addressModal: document.getElementById('addressModal'),
        closeAddress: document.getElementById('closeAddress'),
        addressModalTitle: document.getElementById('addressModalTitle'),
        addressForm: document.getElementById('addressForm'),
        addressId: document.getElementById('addressId'),
        addressNickname: document.getElementById('addressNickname'),
        addressZipCode: document.getElementById('addressZipCode'),
        addressStreet: document.getElementById('addressStreet'),
        addressNumber: document.getElementById('addressNumber'),
        addressComplement: document.getElementById('addressComplement'),
        addressNeighborhood: document.getElementById('addressNeighborhood'),
        addressCity: document.getElementById('addressCity'),
        addressState: document.getElementById('addressState'),
        addressReference: document.getElementById('addressReference'),
        cancelAddressBtn: document.getElementById('cancelAddressBtn'),
        
        // Mesas
        tableModal: document.getElementById('tableModal'),
        closeTable: document.getElementById('closeTable'),
        currentTable: document.getElementById('currentTable'),
        qrVideo: document.getElementById('qrVideo'),
        qrCanvas: document.getElementById('qrCanvas'),
        scannerPlaceholder: document.getElementById('scannerPlaceholder'),
        startScannerBtn: document.getElementById('startScannerBtn'),
        stopScannerBtn: document.getElementById('stopScannerBtn'),
        tableGrid: document.getElementById('tableGrid'),
        confirmTableBtn: document.getElementById('confirmTableBtn'),
        clearTableBtn: document.getElementById('clearTableBtn'),
        floatingTableBtn: document.getElementById('floatingTableBtn'),
        tableBadge: document.getElementById('tableBadge'),
        
        // Overlay
        overlay: document.getElementById('overlay'),

        // Tocha
        torchBtn: document.getElementById('torchBtn'),

        // ⭐ NOVO: Sistema de Avaliações
        ratingsModal: document.getElementById('ratingsModal'),
        closeRatings: document.getElementById('closeRatings'),
        ratingContent: document.getElementById('ratingContent'),
        floatingRatingsBtn: document.getElementById('floatingRatingsBtn'),
        ratingsBadge: document.getElementById('ratingsBadge')
    };
}

// ========== SISTEMA DE DARK MODE ==========
function carregarDarkMode() {
    const darkModeSalvo = localStorage.getItem('darkMode');
    estado.darkMode = darkModeSalvo === 'true';
    aplicarDarkMode();
}

function aplicarDarkMode() {
    if (estado.darkMode) {
        document.body.classList.add('dark-mode');
        if (elements.torchBtn) {
            elements.torchBtn.classList.add('active');
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (elements.torchBtn) {
            elements.torchBtn.classList.remove('active');
        }
    }
}

function salvarDarkMode() {
    localStorage.setItem('darkMode', estado.darkMode.toString());
}

// ========== SISTEMA DE PRODUTOS ==========
function renderizarProdutos() {
    if (!elements.productsGrid) return;
    
    elements.productsGrid.innerHTML = '';
    
    const produtosFiltrados = produtos.filter(produto => {
        const correspondeCategoria = estado.categoriaAtual === 'all' || produto.categoria === estado.categoriaAtual;
        const correspondeBusca = produto.nome.toLowerCase().includes(estado.termoBusca.toLowerCase()) ||
                               produto.descricao.toLowerCase().includes(estado.termoBusca.toLowerCase());
        
        return correspondeCategoria && correspondeBusca;
    });
    
    if (produtosFiltrados.length === 0) {
        elements.productsGrid.innerHTML = '<p class="no-results">Nenhum produto encontrado</p>';
        return;
    }
    
    produtosFiltrados.forEach(produto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button class="add-to-cart" onclick="adicionarAoCarrinho(${JSON.stringify(produto).replace(/"/g, '&quot;')}, this)" style="flex: 2;">
                        <i class="fas fa-cart-plus"></i> Adicionar
                    </button>
                    <button class="btn-rate-product" onclick="mostrarModalAvaliacoes(${JSON.stringify(produto).replace(/"/g, '&quot;')})" style="flex: 1; background: var(--azul); color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer; transition: background 0.3s;">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            </div>
        `;
        elements.productsGrid.appendChild(productCard);
    });
}

// ========== SISTEMA DO CARRINHO ==========
function adicionarAoCarrinho(produto, botao) {
    const itemExistente = estado.carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
        itemExistente.quantidade++;
        notificarSucesso(`${produto.nome} - Quantidade aumentada!`, 'Carrinho Atualizado');
    } else {
        estado.carrinho.push({
            ...produto,
            quantidade: 1
        });
        notificarSucesso(`${produto.nome} adicionado ao carrinho!`, 'Produto Adicionado');
    }
    
    if (botao) {
        animarAdicaoCarrinho(botao, produto);
    }
    
    salvarCarrinho();
    atualizarCarrinho();
}

function removerDoCarrinho(produtoId) {
    const produto = estado.carrinho.find(item => item.id === produtoId);
    estado.carrinho = estado.carrinho.filter(item => item.id !== produtoId);
    
    if (produto) {
        notificarInfo(`${produto.nome} removido do carrinho`, 'Item Removido');
    }
    
    salvarCarrinho();
    atualizarCarrinho();
}

function alterarQuantidade(produtoId, novaQuantidade) {
    if (novaQuantidade <= 0) {
        removerDoCarrinho(produtoId);
        return;
    }
    
    const item = estado.carrinho.find(item => item.id === produtoId);
    if (item) {
        item.quantidade = novaQuantidade;
        salvarCarrinho();
        atualizarCarrinho();
    }
}

function calcularTotal() {
    return estado.carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function atualizarCarrinho() {
    const totalItens = estado.carrinho.reduce((total, item) => total + item.quantidade, 0);
    if (elements.cartCount) elements.cartCount.textContent = totalItens;
    
    if (!elements.cartItems) return;
    
    if (estado.carrinho.length === 0) {
        if (elements.emptyCart) {
            elements.emptyCart.style.display = 'block';
            elements.cartItems.innerHTML = '';
            elements.cartItems.appendChild(elements.emptyCart);
        }
        if (elements.checkoutBtn) elements.checkoutBtn.disabled = true;
        if (elements.whatsappBtn) elements.whatsappBtn.disabled = true;
    } else {
        if (elements.emptyCart) elements.emptyCart.style.display = 'none';
        elements.cartItems.innerHTML = '';
        
        const restaurantInfo = document.createElement('div');
        restaurantInfo.className = 'restaurant-info';
        restaurantInfo.innerHTML = `
            <h4>${configRestaurante.nome}</h4>
            <p><i class="fas fa-map-marker-alt"></i> ${configRestaurante.endereco}</p>
            <p><i class="fas fa-clock"></i> ${configRestaurante.horarioFuncionamento}</p>
        `;
        elements.cartItems.appendChild(restaurantInfo);
        
        estado.carrinho.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.imagem}" alt="${item.nome}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.nome}</div>
                    <div class="cart-item-price">R$ ${item.preco.toFixed(2)}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="alterarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
                    <span class="cart-item-quantity">${item.quantidade}</span>
                    <button class="quantity-btn" onclick="alterarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
                    <button class="remove-item" onclick="removerDoCarrinho(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            elements.cartItems.appendChild(cartItem);
        });
        
        if (elements.checkoutBtn) elements.checkoutBtn.disabled = false;
        if (elements.whatsappBtn) elements.whatsappBtn.disabled = false;
    }
    
    if (elements.cartTotal) elements.cartTotal.textContent = calcularTotal().toFixed(2);
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(estado.carrinho));
}

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        estado.carrinho = JSON.parse(carrinhoSalvo);
    }
}

function finalizarPedido() {
    if (!estado.usuario) {
        alert('Por favor, faça login para finalizar o pedido!');
        mostrarLogin();
        return;
    }
    
    if (estado.carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const total = calcularTotal();
    
    const novoPedido = {
        id: Date.now(),
        data: new Date().toISOString(),
        itens: [...estado.carrinho],
        total: total,
        status: 'pendente',
        enderecoEntrega: estado.enderecos.find(addr => addr.padrao) ? 
            `${estado.enderecos.find(addr => addr.padrao).rua}, ${estado.enderecos.find(addr => addr.padrao).numero}` : 
            'Retirada no local'
    };
    
    estado.pedidos.push(novoPedido);
    salvarPedidos();
    
    alert(`Pedido finalizado com sucesso!\nTotal: R$ ${total.toFixed(2)}\nObrigado, ${estado.usuario.nome}!`);
    
    estado.carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
    fecharCarrinho();
}

// ========== ANIMAÇÕES DO CARRINHO ==========
function criarAnimacaoCarrinho(botao, produto) {
    const rect = botao.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    const cartBtn = document.getElementById('cartBtn');
    if (!cartBtn) return;
    
    const cartRect = cartBtn.getBoundingClientRect();
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;
    
    const flyingIcon = document.createElement('div');
    flyingIcon.className = 'flying-cart';
    flyingIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
    flyingIcon.style.left = startX + 'px';
    flyingIcon.style.top = startY + 'px';
    
    // Calcular animação
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    flyingIcon.style.setProperty('--startX', startX + 'px');
    flyingIcon.style.setProperty('--startY', startY + 'px');
    flyingIcon.style.setProperty('--endX', endX + 'px');
    flyingIcon.style.setProperty('--endY', endY + 'px');
    
    flyingIcon.style.animation = `flyToCart 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards`;
    
    document.body.appendChild(flyingIcon);
    
    setTimeout(() => {
        if (flyingIcon.parentNode) {
            flyingIcon.remove();
        }
    }, 800);
}

function animarAdicaoCarrinho(botao, produto) {
    botao.classList.add('adding');
    setTimeout(() => {
        botao.classList.remove('adding');
    }, 600);
    
    criarAnimacaoCarrinho(botao, produto);
    
    const originalText = botao.innerHTML;
    botao.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
    botao.style.background = 'var(--verde)';
    
    setTimeout(() => {
        botao.innerHTML = originalText;
        botao.style.background = '';
    }, 1500);
}

// ========== SISTEMA WHATSAPP ==========
function enviarPedidoWhatsApp() {
    if (estado.carrinho.length === 0) {
        notificarErro('Seu carrinho está vazio!', 'Carrinho Vazio');
        return;
    }

    if (usarMesa && !estado.mesa) {
        notificarAviso('Nenhuma mesa selecionada', 'Selecionar Mesa');
        mostrarModalMesas();
        return;
    }

    const observacoes = document.getElementById('orderObservations') ? document.getElementById('orderObservations').value : '';
    let mensagem = `*${configRestaurante.nome}*%0A`;
    mensagem += `*Novo Pedido*%0A%0A`;
    
    // Adicionar informação da mesa se disponível
    if (estado.mesa) {
        mensagem += `*Mesa:* M${estado.mesa.toString().padStart(2, '0')}%0A`;
        mensagem += `*Pessoas:* ${estado.numeroPessoas}%0A`;
    }
    
    mensagem += `*Itens do Pedido:*%0A`;
    
    estado.carrinho.forEach(item => {
        mensagem += `• ${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}%0A`;
    });
    
    mensagem += `%0A*Total: R$ ${calcularTotal().toFixed(2)}*%0A`;
    
    if (observacoes) {
        mensagem += `%0A*Observações:* ${observacoes}%0A`;
    }
    
    // Informações do usuário se logado
    if (estado.usuario) {
        mensagem += `%0A*Cliente:* ${estado.usuario.nome}%0A`;
        mensagem += `*Telefone:* ${estado.usuario.telefone || 'Não informado'}%0A`;
    }
    
    mensagem += `%0A_Enviado via Cardápio Digital_`;
    
    const url = `https://wa.me/${configRestaurante.telefone}?text=${mensagem}`;
    window.open(url, '_blank');
    
    // Limpar carrinho após envio
    estado.carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
    fecharCarrinho();
    
    // Feedback visual
    notificarSucesso('Pedido enviado com sucesso via WhatsApp!', 'Pedido Enviado');
}

// ========== CONTROLES DE INTERFACE ==========
function abrirCarrinho() {
    if (elements.cartSidebar) elements.cartSidebar.classList.add('active');
    if (elements.overlay) elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharCarrinho() {
    if (elements.cartSidebar) elements.cartSidebar.classList.remove('active');
    if (elements.overlay) elements.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ========== SISTEMA DE LOGIN ==========
function mostrarLogin() {
    if (elements.loginModal) elements.loginModal.classList.add('active');
    if (elements.overlay) elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function esconderLogin() {
    if (elements.loginModal) elements.loginModal.classList.remove('active');
    if (elements.registerModal) elements.registerModal.classList.remove('active');
    if (elements.overlay) elements.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function mostrarRegistro() {
    if (elements.loginModal) elements.loginModal.classList.remove('active');
    if (elements.registerModal) elements.registerModal.classList.add('active');
}

function fazerLogin(email, senha) {
    const usuario = {
        id: 1,
        nome: "Cliente Teste",
        email: email,
        telefone: "(11) 99999-9999",
        fotoPerfil: null
    };
    
    estado.usuario = usuario;
    salvarUsuario();
    atualizarInterfaceUsuario();
    esconderLogin();
    
    notificarSucesso(`Bem-vindo, ${usuario.nome}!`, 'Login Realizado');
}

function fazerRegistro(dados) {
    const usuario = {
        id: Date.now(),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        fotoPerfil: null
    };
    
    estado.usuario = usuario;
    salvarUsuario();
    atualizarInterfaceUsuario();
    esconderLogin();
    notificarSucesso(`Conta criada com sucesso! Bem-vindo, ${usuario.nome}!`, 'Cadastro Realizado');
}

function fazerLogout() {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        estado.usuario = null;
        localStorage.removeItem('usuario');
        atualizarInterfaceUsuario();
        fecharPerfil();
        notificarInfo('Você saiu da sua conta!', 'Logout');
        esconderLogin();
        fecharCarrinho();
    }
}

function atualizarInterfaceUsuario() {
    if (!elements.loginBtn) return;
    
    if (estado.usuario) {
        elements.loginBtn.innerHTML = `<i class="fas fa-user"></i> ${estado.usuario.nome.split(' ')[0]}`;
        elements.loginBtn.onclick = mostrarPerfil;
    } else {
        elements.loginBtn.innerHTML = '<i class="fas fa-user"></i> Entrar';
        elements.loginBtn.onclick = mostrarLogin;
    }
}

// ========== SISTEMA DE PERFIL ==========
function mostrarPerfil() {
    if (!estado.usuario) {
        notificarAviso('Por favor, faça login primeiro!', 'Login Necessário');
        mostrarLogin();
        return;
    }
    
    carregarPerfilUsuario();
    if (elements.profileModal) elements.profileModal.classList.add('active');
    if (elements.overlay) elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharPerfil() {
    if (elements.profileModal) elements.profileModal.classList.remove('active');
    if (elements.overlay) elements.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function carregarPerfilUsuario() {
    if (!estado.usuario) return;

    if (elements.profileName) elements.profileName.value = estado.usuario.nome || '';
    if (elements.profileEmail) elements.profileEmail.value = estado.usuario.email || '';
    if (elements.profilePhone) elements.profilePhone.value = estado.usuario.telefone || '';
    
    if (elements.profilePicture) {
        if (estado.usuario.fotoPerfil) {
            elements.profilePicture.src = estado.usuario.fotoPerfil;
        } else {
            elements.profilePicture.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNEOEQ4RDgiIHJ4PSI2MCIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjIwIiBmaWxsPSIjOTk5Ii8+PHJlY3QgeD0iMzUiIHk9IjcyIiB3aWR0aD0iNTAiIGhlaWdodD0iMzAiIGZpbGw9IiM5OTkiIHJ4PSIxNSIvPjwvc3ZnPg==';
        }
    }
    
    carregarEnderecos();
    carregarHistoricoPedidos();
}

// ========== FOTO DE PERFIL ==========
function alterarFotoPerfil() {
    if (elements.profilePictureInput) elements.profilePictureInput.click();
}

function processarUploadFoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione uma imagem válida!');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        estado.usuario.fotoPerfil = e.target.result;
        if (elements.profilePicture) elements.profilePicture.src = e.target.result;
        salvarUsuario();
        atualizarInterfaceUsuario();
        notificarSucesso('Foto de perfil atualizada com sucesso!', 'Foto Atualizada');
    };
    reader.readAsDataURL(file);
}

// ========== SISTEMA DE ENDEREÇOS ==========
function carregarEnderecos() {
    if (!elements.addressList) return;
    
    elements.addressList.innerHTML = '';

    if (estado.enderecos.length === 0) {
        elements.addressList.innerHTML = '<p class="no-orders">Nenhum endereço cadastrado</p>';
        return;
    }

    estado.enderecos.forEach(endereco => {
        const addressItem = document.createElement('div');
        addressItem.className = `address-item ${endereco.padrao ? 'active' : ''}`;
        addressItem.innerHTML = `
            <div class="address-info">
                <h4>${endereco.apelido} ${endereco.padrao ? '<span class="badge-default">Padrão</span>' : ''}</h4>
                <p>${endereco.rua}, ${endereco.numero} ${endereco.complemento ? `- ${endereco.complemento}` : ''}</p>
                <p>${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}</p>
                <p>CEP: ${endereco.cep}</p>
                ${endereco.referencia ? `<p>Referência: ${endereco.referencia}</p>` : ''}
            </div>
            <div class="address-actions">
                ${!endereco.padrao ? `
                    <button class="btn-set-default" onclick="definirEnderecoPadrao(${endereco.id})" title="Definir como padrão">
                        <i class="fas fa-star"></i>
                    </button>
                ` : ''}
                <button class="btn-edit-address" onclick="editarEndereco(${endereco.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete-address" onclick="excluirEndereco(${endereco.id})" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        elements.addressList.appendChild(addressItem);
    });
}

function buscarCEP() {
    const cep = elements.addressZipCode.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        alert('CEP deve ter 8 dígitos!');
        return;
    }

    elements.addressStreet.value = 'Buscando...';
    elements.addressNeighborhood.value = 'Buscando...';
    elements.addressCity.value = 'Buscando...';
    elements.addressState.value = '';

    elements.addressStreet.classList.add('loading-cep');
    elements.addressNeighborhood.classList.add('loading-cep');
    elements.addressCity.classList.add('loading-cep');

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            elements.addressStreet.classList.remove('loading-cep');
            elements.addressNeighborhood.classList.remove('loading-cep');
            elements.addressCity.classList.remove('loading-cep');
            
            if (!data.erro) {
                elements.addressStreet.value = data.logradouro || '';
                elements.addressNeighborhood.value = data.bairro || '';
                elements.addressCity.value = data.localidade || '';
                elements.addressState.value = data.uf || '';
                if (elements.addressNumber) elements.addressNumber.focus();
            } else {
                alert('CEP não encontrado! Preencha os dados manualmente.');
                elements.addressStreet.value = '';
                elements.addressNeighborhood.value = '';
                elements.addressCity.value = '';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Erro ao buscar CEP. Preencha os dados manualmente.');
            elements.addressStreet.value = '';
            elements.addressNeighborhood.value = '';
            elements.addressCity.value = '';
            
            elements.addressStreet.classList.remove('loading-cep');
            elements.addressNeighborhood.classList.remove('loading-cep');
            elements.addressCity.classList.remove('loading-cep');
        });
}

function abrirModalEndereco(enderecoId = null) {
    if (enderecoId) {
        const endereco = estado.enderecos.find(addr => addr.id === enderecoId);
        if (endereco) {
            elements.addressModalTitle.textContent = 'Editar Endereço';
            elements.addressId.value = endereco.id;
            elements.addressNickname.value = endereco.apelido;
            elements.addressZipCode.value = endereco.cep;
            elements.addressStreet.value = endereco.rua;
            elements.addressNumber.value = endereco.numero;
            elements.addressComplement.value = endereco.complemento || '';
            elements.addressNeighborhood.value = endereco.bairro;
            elements.addressCity.value = endereco.cidade;
            elements.addressState.value = endereco.estado;
            elements.addressReference.value = endereco.referencia || '';
        }
    } else {
        elements.addressModalTitle.textContent = 'Adicionar Endereço';
        elements.addressId.value = '';
        elements.addressForm.reset();
    }
    
    elements.addressModal.classList.add('active');
    elements.overlay.classList.add('active');
}

function fecharModalEndereco() {
    elements.addressModal.classList.remove('active');
    elements.overlay.classList.remove('active');
}

function salvarEndereco(event) {
    event.preventDefault();

    if (!elements.addressNickname.value.trim()) {
        alert('Por favor, informe um apelido para o endereço!');
        elements.addressNickname.focus();
        return;
    }

    if (!elements.addressZipCode.value.trim()) {
        alert('Por favor, informe o CEP!');
        elements.addressZipCode.focus();
        return;
    }

    if (!elements.addressStreet.value.trim()) {
        alert('Por favor, informe a rua!');
        elements.addressStreet.focus();
        return;
    }

    if (!elements.addressNumber.value.trim()) {
        alert('Por favor, informe o número!');
        elements.addressNumber.focus();
        return;
    }

    if (!elements.addressNeighborhood.value.trim()) {
        alert('Por favor, informe o bairro!');
        elements.addressNeighborhood.focus();
        return;
    }

    if (!elements.addressCity.value.trim()) {
        alert('Por favor, informe a cidade!');
        elements.addressCity.focus();
        return;
    }

    if (!elements.addressState.value) {
        alert('Por favor, selecione o estado!');
        elements.addressState.focus();
        return;
    }

    const enderecoData = {
        id: elements.addressId.value ? parseInt(elements.addressId.value) : Date.now(),
        apelido: elements.addressNickname.value.trim(),
        cep: elements.addressZipCode.value.trim(),
        rua: elements.addressStreet.value.trim(),
        numero: elements.addressNumber.value.trim(),
        complemento: elements.addressComplement.value.trim(),
        bairro: elements.addressNeighborhood.value.trim(),
        cidade: elements.addressCity.value.trim(),
        estado: elements.addressState.value,
        referencia: elements.addressReference.value.trim(),
        padrao: estado.enderecos.length === 0
    };

    let enderecoSalvo = false;

    if (elements.addressId.value) {
        const index = estado.enderecos.findIndex(addr => addr.id == elements.addressId.value);
        if (index !== -1) {
            enderecoData.padrao = estado.enderecos[index].padrao;
            estado.enderecos[index] = enderecoData;
            enderecoSalvo = true;
        }
    } else {
        estado.enderecos.push(enderecoData);
        enderecoSalvo = true;
    }

    if (enderecoSalvo) {
        salvarEnderecos();
        carregarEnderecos();
        fecharModalEndereco();
        notificarSucesso('Endereço salvo com sucesso!', 'Endereço Salvo');
    } else {
        notificarErro('Erro ao salvar endereço!', 'Erro');
    }
}

function definirEnderecoPadrao(enderecoId) {
    estado.enderecos.forEach(endereco => {
        endereco.padrao = endereco.id === enderecoId;
    });
    
    salvarEnderecos();
    carregarEnderecos();
    notificarSucesso('Endereço padrão definido com sucesso!', 'Endereço Padrão');
}

function editarEndereco(enderecoId) {
    abrirModalEndereco(enderecoId);
}

function excluirEndereco(enderecoId) {
    if (!confirm('Tem certeza que deseja excluir este endereço?')) return;

    estado.enderecos = estado.enderecos.filter(addr => addr.id !== enderecoId);
    
    if (estado.enderecos.length > 0 && !estado.enderecos.some(addr => addr.padrao)) {
        estado.enderecos[0].padrao = true;
    }
    
    salvarEnderecos();
    carregarEnderecos();
    notificarInfo('Endereço excluído com sucesso!', 'Endereço Excluído');
}

// ========== HISTÓRICO DE PEDIDOS ==========
function carregarHistoricoPedidos() {
    if (!elements.orderHistory) return;
    
    elements.orderHistory.innerHTML = '';

    if (estado.pedidos.length === 0) {
        elements.orderHistory.innerHTML = '<p class="no-orders">Nenhum pedido realizado ainda</p>';
        return;
    }

    const pedidosOrdenados = estado.pedidos.sort((a, b) => new Date(b.data) - new Date(a.data));

    pedidosOrdenados.forEach(pedido => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        const statusClass = {
            'entregue': 'status-delivered',
            'pendente': 'status-pending',
            'cancelado': 'status-canceled'
        }[pedido.status] || 'status-pending';

        orderItem.innerHTML = `
            <div class="order-header">
                <span class="order-number">Pedido #${pedido.id}</span>
                <span class="order-status ${statusClass}">${pedido.status}</span>
            </div>
            <div class="order-details">
                <p><strong>Data:</strong> ${new Date(pedido.data).toLocaleDateString('pt-BR')}</p>
                <p><strong>Itens:</strong> ${pedido.itens.length} produto(s)</p>
                <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
                ${pedido.enderecoEntrega ? `<p><strong>Entrega:</strong> ${pedido.enderecoEntrega}</p>` : ''}
            </div>
        `;
        elements.orderHistory.appendChild(orderItem);
    });
}

// ========== SALVAR DADOS ==========
function salvarUsuario() {
    if (estado.usuario) {
        localStorage.setItem('usuario', JSON.stringify(estado.usuario));
    }
}

function salvarEnderecos() {
    localStorage.setItem('enderecos', JSON.stringify(estado.enderecos));
}

function salvarPedidos() {
    localStorage.setItem('pedidos', JSON.stringify(estado.pedidos));
}

function carregarDadosUsuario() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
        estado.usuario = JSON.parse(usuarioSalvo);
    }
    
    const enderecosSalvos = localStorage.getItem('enderecos');
    if (enderecosSalvos) {
        estado.enderecos = JSON.parse(enderecosSalvos);
    }
    
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (pedidosSalvos) {
        estado.pedidos = JSON.parse(pedidosSalvos);
    }
}

// ========== SALVAR PERFIL ==========
function salvarPerfil() {
    if (!estado.usuario) return;

    if (!elements.profileName.value.trim()) {
        alert('Por favor, informe seu nome!');
        elements.profileName.focus();
        return;
    }

    if (!elements.profileEmail.value.trim()) {
        alert('Por favor, informe seu email!');
        elements.profileEmail.focus();
        return;
    }

    estado.usuario.nome = elements.profileName.value.trim();
    estado.usuario.email = elements.profileEmail.value.trim();
    estado.usuario.telefone = elements.profilePhone.value.trim();

    salvarUsuario();
    atualizarInterfaceUsuario();
    notificarSucesso('Perfil atualizado com sucesso!', 'Perfil Atualizado');
}

// ========== SISTEMA DE MESAS E QR CODE ==========
function mostrarModalMesas() {
    carregarGradeMesas();
    if (elements.tableModal) elements.tableModal.classList.add('active');
    if (elements.overlay) elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharModalMesas() {
    if (elements.tableModal) elements.tableModal.classList.remove('active');
    if (elements.overlay) elements.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    pararScanner();
}

function carregarGradeMesas() {
    if (!elements.tableGrid) return;
    
    elements.tableGrid.innerHTML = '';

    for (let i = 1; i <= configRestaurante.mesas; i++) {
        const tableItem = document.createElement('div');
        tableItem.className = `table-item ${estado.mesa === i ? 'selected' : 'available'}`;
        tableItem.textContent = `M${i.toString().padStart(2, '0')}`;
        tableItem.onclick = () => selecionarMesa(i);
        
        elements.tableGrid.appendChild(tableItem);
    }

    if (elements.currentTable) {
        elements.currentTable.textContent = estado.mesa ? `M${estado.mesa.toString().padStart(2, '0')}` : 'Nenhuma';
    }
    
    if (elements.tableBadge) {
        elements.tableBadge.textContent = estado.mesa ? estado.mesa : '0';
    }
}

function selecionarMesa(numeroMesa) {
    estado.mesa = numeroMesa;
    carregarGradeMesas();
    selecionarNumeroPessoas(2);
}

function selecionarNumeroPessoas(numero) {
    estado.numeroPessoas = numero;
    
    document.querySelectorAll('.people-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (parseInt(btn.dataset.people) === numero) {
            btn.classList.add('selected');
        }
    });
}

function confirmarMesa() {
    if (!estado.mesa) {
        notificarAviso('Por favor, selecione uma mesa primeiro!', 'Mesa Não Selecionada');
        return;
    }

    fecharModalMesas();
    mostrarConfirmacaoMesa(estado.mesa);
    atualizarInterfaceMesa();
}

function mostrarConfirmacaoMesa(numeroMesa) {
    const confirmation = document.createElement('div');
    confirmation.className = 'table-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-check-circle"></i>
            <h3>Mesa ${numeroMesa.toString().padStart(2, '0')} Selecionada!</h3>
            <p>Seu pedido será enviado para esta mesa</p>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        confirmation.classList.remove('show');
        setTimeout(() => {
            if (confirmation.parentNode) {
                document.body.removeChild(confirmation);
            }
        }, 300);
    }, 3000);
}

function limparMesa() {
    estado.mesa = null;
    estado.numeroPessoas = 1;
    carregarGradeMesas();
    atualizarInterfaceMesa();
    notificarInfo('Seleção de mesa removida', 'Mesa Limpa');
}

function atualizarInterfaceMesa() {
    if (!elements.tableBadge || !elements.floatingTableBtn) return;
    
    if (estado.mesa) {
        elements.tableBadge.textContent = estado.mesa;
        elements.tableBadge.style.display = 'flex';
        elements.floatingTableBtn.style.background = 'var(--verde)';
        elements.floatingTableBtn.innerHTML = `<i class="fas fa-chair"></i><span class="table-badge" id="tableBadge">${estado.mesa}</span>`;
    } else {
        elements.tableBadge.style.display = 'none';
        elements.floatingTableBtn.style.background = 'var(--roxo-principal)';
        elements.floatingTableBtn.innerHTML = `<i class="fas fa-chair"></i><span class="table-badge" id="tableBadge">0</span>`;
    }
}

// ========== SISTEMA DE QR CODE ==========
async function iniciarScanner() {
    try {
        if (!('BarcodeDetector' in window)) {
            alert('Seu navegador não suporta leitura de QR Code. Use Chrome ou Edge versão 83 ou superior.');
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: "environment",
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });

        elements.qrVideo.srcObject = stream;
        elements.qrVideo.style.display = 'block';
        elements.scannerPlaceholder.style.display = 'none';
        elements.startScannerBtn.style.display = 'none';
        elements.stopScannerBtn.style.display = 'inline-flex';

        await elements.qrVideo.play();
        estado.scannerAtivo = true;
        elements.scannerPlaceholder.classList.add('scanner-active');

        const canvas = elements.qrCanvas;
        const context = canvas.getContext('2d');
        
        elements.qrVideo.onloadedmetadata = () => {
            canvas.width = elements.qrVideo.videoWidth;
            canvas.height = elements.qrVideo.videoHeight;
        };

        const barcodeDetector = new BarcodeDetector({ 
            formats: ['qr_code', 'code_128', 'ean_13'] 
        });
        
        function detectarQRCode() {
            if (!estado.scannerAtivo) return;

            if (elements.qrVideo.readyState === elements.qrVideo.HAVE_ENOUGH_DATA) {
                context.drawImage(elements.qrVideo, 0, 0, canvas.width, canvas.height);
                
                barcodeDetector.detect(canvas)
                    .then(barcodes => {
                        if (barcodes.length > 0) {
                            const qrData = barcodes[0].rawValue;
                            processarQRCode(qrData);
                        }
                    })
                    .catch(err => {
                        console.error('Erro na detecção:', err);
                    });
            }

            if (estado.scannerAtivo) {
                requestAnimationFrame(detectarQRCode);
            }
        }

        detectarQRCode();

    } catch (error) {
        console.error('Erro ao acessar câmera:', error);
        
        if (error.name === 'NotAllowedError') {
            alert('Permissão de câmera negada. Por favor, permita o acesso à câmera para escanear QR Codes.');
        } else if (error.name === 'NotFoundError') {
            alert('Nenhuma câmera encontrada. Verifique se seu dispositivo possui uma câmera traseira.');
        } else {
            alert('Não foi possível acessar a câmera. Verifique as permissões e tente novamente.');
        }
    }
}

function pararScanner() {
    if (estado.scannerAtivo) {
        estado.scannerAtivo = false;
        
        const stream = elements.qrVideo.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        
        elements.qrVideo.style.display = 'none';
        elements.scannerPlaceholder.style.display = 'flex';
        elements.startScannerBtn.style.display = 'inline-flex';
        elements.stopScannerBtn.style.display = 'none';
        elements.scannerPlaceholder.classList.remove('scanner-active');
    }
}

function processarQRCode(qrData) {
    try {
        console.log('QR Code detectado:', qrData);
        
        let numeroMesa;
        
        if (qrData.includes('mesa:')) {
            numeroMesa = parseInt(qrData.split(':')[1]);
        } else if (qrData.includes('table:')) {
            numeroMesa = parseInt(qrData.split(':')[1]);
        } else if (qrData.startsWith('M')) {
            numeroMesa = parseInt(qrData.substring(1));
        } else {
            numeroMesa = parseInt(qrData);
        }

        if (numeroMesa && !isNaN(numeroMesa) && numeroMesa >= 1 && numeroMesa <= configRestaurante.mesas) {
            estado.mesa = numeroMesa;
            carregarGradeMesas();
            pararScanner();
            
            reproduzirSomSucesso();
            
            setTimeout(() => {
                mostrarConfirmacaoMesa(numeroMesa);
                setTimeout(() => {
                    confirmarMesa();
                }, 1000);
            }, 500);
        } else {
            reproduzirSomErro();
            alert('QR Code inválido! Por favor, escaneie um código válido do restaurante.\nCódigo lido: ' + qrData);
        }
    } catch (error) {
        console.error('Erro ao processar QR Code:', error);
        reproduzirSomErro();
        alert('QR Code inválido! Por favor, escaneie novamente.');
    }
}

function reproduzirSomSucesso() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Audio não suportado');
    }
}

function reproduzirSomErro() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio não suportado');
    }
}

// ========== SISTEMA DE AVALIAÇÕES ==========

// Carregar avaliações do localStorage
function carregarAvaliacoes() {
    const avaliacoesSalvas = localStorage.getItem('avaliacoes');
    if (avaliacoesSalvas) {
        estado.avaliacoes = JSON.parse(avaliacoesSalvas);
    }
    atualizarBadgeAvaliacoes();
}

// Salvar avaliações no localStorage
function salvarAvaliacoes() {
    localStorage.setItem('avaliacoes', JSON.stringify(estado.avaliacoes));
    atualizarBadgeAvaliacoes();
}

// Atualizar badge com número de avaliações
function atualizarBadgeAvaliacoes() {
    if (elements.ratingsBadge) {
        const totalAvaliacoes = estado.avaliacoes.length;
        elements.ratingsBadge.textContent = totalAvaliacoes > 99 ? '99+' : totalAvaliacoes.toString();
        elements.ratingsBadge.style.display = totalAvaliacoes > 0 ? 'flex' : 'none';
    }
}

// Mostrar modal de avaliações
function mostrarModalAvaliacoes(produto = null) {
    estado.produtoAvaliando = produto;
    carregarConteudoAvaliacoes();
    
    if (elements.ratingsModal) elements.ratingsModal.classList.add('active');
    if (elements.overlay) elements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar modal de avaliações
function fecharModalAvaliacoes() {
    if (elements.ratingsModal) elements.ratingsModal.classList.remove('active');
    if (elements.overlay) elements.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    estado.produtoAvaliando = null;
}

// Carregar conteúdo do modal de avaliações
function carregarConteudoAvaliacoes() {
    if (!elements.ratingContent) return;
    
    const produto = estado.produtoAvaliando;
    const usuarioComprouProduto = verificarSeUsuarioComprou(produto?.id);
    const usuarioJaAvaliou = estado.avaliacoes.some(av => 
        av.produtoId === produto?.id && av.usuarioId === estado.usuario?.id
    );
    
    elements.ratingContent.innerHTML = `
        ${produto ? criarSecaoProdutoAtual(produto) : ''}
        ${criarSecaoNovaAvaliacao(produto, usuarioComprouProduto, usuarioJaAvaliou)}
        ${criarListaAvaliacoes(produto)}
    `;
    
    // Inicializar event listeners das estrelas
    inicializarEventListenersAvaliacoes();
}

// Verificar se usuário comprou o produto
function verificarSeUsuarioComprou(produtoId) {
    if (!estado.usuario || !produtoId) return false;
    
    // Verifica nos pedidos do usuário se ele comprou este produto
    return estado.pedidos.some(pedido => 
        pedido.itens.some(item => item.id === produtoId)
    );
}

// Criar seção do produto sendo avaliado
function criarSecaoProdutoAtual(produto) {
    const avaliacoesProduto = estado.avaliacoes.filter(av => av.produtoId === produto.id);
    const media = avaliacoesProduto.length > 0 ? 
        avaliacoesProduto.reduce((sum, av) => sum + av.estrelas, 0) / avaliacoesProduto.length : 0;
    
    return `
        <div class="current-product-rating">
            <h4>${produto.nome}</h4>
            <p>Avaliação média: ${media.toFixed(1)} ⭐ (${avaliacoesProduto.length} avaliações)</p>
        </div>
    `;
}

// Criar seção de nova avaliação
function criarSecaoNovaAvaliacao(produto, usuarioComprou, usuarioJaAvaliou) {
    if (!estado.usuario) {
        return `
            <div class="new-rating-section">
                <p style="text-align: center; margin: 0; color: var(--vermelho);">
                    <i class="fas fa-exclamation-triangle"></i> Faça login para avaliar produtos
                </p>
            </div>
        `;
    }
    
    if (!produto) {
        return `
            <div class="new-rating-section">
                <p style="text-align: center; margin: 0;">
                    Selecione um produto para avaliar
                </p>
            </div>
        `;
    }
    
    if (!usuarioComprou) {
        return `
            <div class="new-rating-section">
                <p style="text-align: center; margin: 0; color: var(--vermelho);">
                    <i class="fas fa-shopping-bag"></i> Compre este produto para poder avaliá-lo
                </p>
                <button class="add-to-cart" onclick="adicionarAoCarrinho(${JSON.stringify(produto).replace(/"/g, '&quot;')}, this); fecharModalAvaliacoes()" style="width: 100%; margin-top: 10px;">
                    <i class="fas fa-cart-plus"></i> Comprar Agora
                </button>
            </div>
        `;
    }
    
    if (usuarioJaAvaliou) {
        return `
            <div class="new-rating-section">
                <p style="text-align: center; margin: 0; color: var(--verde);">
                    <i class="fas fa-check-circle"></i> Você já avaliou este produto!
                </p>
            </div>
        `;
    }
    
    return `
        <div class="new-rating-section">
            <h4 style="text-align: center; margin-bottom: 15px; color: var(--roxo-principal);">
                <i class="fas fa-edit"></i> Avaliar ${produto.nome}
            </h4>
            
            <div class="rating-stars-input" id="ratingStarsInput">
                <span class="star-input" data-rating="1">★</span>
                <span class="star-input" data-rating="2">★</span>
                <span class="star-input" data-rating="3">★</span>
                <span class="star-input" data-rating="4">★</span>
                <span class="star-input" data-rating="5">★</span>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 0.9rem; color: #666;">
                <span id="selectedRatingText">Selecione quantas estrelas</span>
            </div>
            
            <textarea 
                class="rating-comment" 
                id="ratingComment" 
                placeholder="Conte sua experiência com este produto... (opcional)"
                rows="3"
            ></textarea>
            
            <button class="btn-submit-rating" id="submitRatingBtn" disabled>
                <i class="fas fa-paper-plane"></i> Enviar Avaliação
            </button>
        </div>
    `;
}

// Criar lista de avaliações
function criarListaAvaliacoes(produto = null) {
    const avaliacoes = produto ? 
        estado.avaliacoes.filter(av => av.produtoId === produto.id) : 
        estado.avaliacoes;
    
    if (avaliacoes.length === 0) {
        return `
            <div class="no-ratings">
                <i class="fas fa-star"></i>
                <p>${produto ? 'Nenhuma avaliação para este produto ainda' : 'Nenhuma avaliação no sistema ainda'}</p>
                <p style="font-size: 0.9rem; color: #888;">Seja o primeiro a avaliar!</p>
            </div>
        `;
    }
    
    return `
        <div class="ratings-list">
            <h4 style="margin-bottom: 15px; color: var(--roxo-principal);">
                <i class="fas fa-list"></i> ${produto ? 'Avaliações deste produto' : 'Todas as avaliações'} (${avaliacoes.length})
            </h4>
            <div class="ratings-items">
                ${avaliacoes
                    .sort((a, b) => new Date(b.data) - new Date(a.data))
                    .map(avaliacao => criarItemAvaliacao(avaliacao))
                    .join('')}
            </div>
        </div>
    `;
}

// Criar item de avaliação individual
function criarItemAvaliacao(avaliacao) {
    const produto = produtos.find(p => p.id === avaliacao.produtoId);
    const dataFormatada = new Date(avaliacao.data).toLocaleDateString('pt-BR');
    
    return `
        <div class="rating-item">
            <div class="rating-item-header">
                <div class="user-info">
                    <div class="user-avatar">
                        ${avaliacao.usuarioNome ? avaliacao.usuarioNome.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div class="user-details">
                        <h4>${avaliacao.usuarioNome || 'Usuário'}</h4>
                        ${produto ? `<p style="font-size: 0.8rem; color: #666; margin: 0;">${produto.nome}</p>` : ''}
                        <div class="rating-date">${dataFormatada}</div>
                    </div>
                </div>
                <div class="rating-stars">
                    ${criarEstrelasVisuais(avaliacao.estrelas)}
                </div>
            </div>
            
            ${avaliacao.comentario ? `
                <p class="rating-comment-text">${avaliacao.comentario}</p>
            ` : ''}
        </div>
    `;
}

// Criar estrelas visuais
function criarEstrelasVisuais(quantidade) {
    let estrelas = '';
    for (let i = 1; i <= 5; i++) {
        estrelas += `<span class="rating-star ${i <= quantidade ? 'filled' : ''}">★</span>`;
    }
    return estrelas;
}

// Inicializar event listeners das avaliações
function inicializarEventListenersAvaliacoes() {
    let estrelasSelecionadas = 0;
    
    // Estrelas de avaliação
    document.querySelectorAll('.star-input').forEach(star => {
        star.addEventListener('click', () => {
            estrelasSelecionadas = parseInt(star.dataset.rating);
            
            // Atualiza visual das estrelas
            document.querySelectorAll('.star-input').forEach(s => {
                const rating = parseInt(s.dataset.rating);
                s.classList.toggle('active', rating <= estrelasSelecionadas);
                s.style.color = rating <= estrelasSelecionadas ? '#FFD700' : '#ddd';
            });
            
            // Atualiza texto
            const ratingText = document.getElementById('selectedRatingText');
            if (ratingText) {
                const textos = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente'];
                ratingText.textContent = `${estrelasSelecionadas} estrelas - ${textos[estrelasSelecionadas - 1]}`;
                ratingText.style.color = '#333';
                ratingText.style.fontWeight = 'bold';
            }
            
            // Habilita botão de envio
            const submitBtn = document.getElementById('submitRatingBtn');
            if (submitBtn) submitBtn.disabled = false;
        });
        
        // Efeito hover
        star.addEventListener('mouseover', () => {
            const hoverRating = parseInt(star.dataset.rating);
            document.querySelectorAll('.star-input').forEach(s => {
                const rating = parseInt(s.dataset.rating);
                s.style.color = rating <= hoverRating ? '#FFD700' : '#ddd';
            });
        });
        
        star.addEventListener('mouseout', () => {
            document.querySelectorAll('.star-input').forEach(s => {
                const rating = parseInt(s.dataset.rating);
                s.style.color = rating <= estrelasSelecionadas ? '#FFD700' : '#ddd';
            });
        });
    });
    
    // Botão de enviar avaliação
    const submitBtn = document.getElementById('submitRatingBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (estrelasSelecionadas > 0) {
                submeterAvaliacao(estrelasSelecionadas);
            }
        });
    }
}

// Submeter nova avaliação
function submeterAvaliacao(estrelas) {
    if (!estado.usuario || !estado.produtoAvaliando) return;
    
    const comentario = document.getElementById('ratingComment')?.value.trim() || '';
    
    const novaAvaliacao = {
        id: Date.now(),
        produtoId: estado.produtoAvaliando.id,
        produtoNome: estado.produtoAvaliando.nome,
        usuarioId: estado.usuario.id,
        usuarioNome: estado.usuario.nome,
        estrelas: estrelas,
        comentario: comentario,
        data: new Date().toISOString(),
        curtidas: []
    };
    
    estado.avaliacoes.push(novaAvaliacao);
    salvarAvaliacoes();
    
    notificarSucesso(`Avaliação de ${estrelas} estrelas enviada com sucesso!`, 'Obrigado pelo Feedback');
    fecharModalAvaliacoes();
}

// ========== SISTEMA DE TOCHA/DARK MODE ==========
function alternarDarkMode() {
    estado.darkMode = !estado.darkMode;
    aplicarDarkMode();
    salvarDarkMode();
    
    // Som de raspagem
    reproduzirSomTocha();
    
    // Animação de "estalo" ao acender
    if (estado.darkMode) {
        const torchFlame = document.querySelector('.torch-flame');
        if (torchFlame) {
            torchFlame.style.animation = 'torchIgnite 0.3s ease-out, torchFlicker 0.8s infinite alternate 0.3s';
        }
        notificarSucesso('Tocha acesa!', '🔥 Modo Noturno');
        
        // Criar partículas após um delay
        setTimeout(criarParticulasFogo, 100);
    } else {
        // Remover partículas ao apagar
        const particles = document.querySelector('.torch-fire-particles');
        if (particles) {
            particles.remove();
        }
        notificarInfo('Tocha apagada', '🌞 Modo Diurno');
    }
}

function reproduzirSomTocha() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (estado.darkMode) {
            // SOM DE ACENDER - RASPAGEM + ESTALO
            const raspagem = audioContext.createOscillator();
            const estalo = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            // Configurar raspagem (som baixo de atrito)
            raspagem.type = 'sawtooth';
            raspagem.frequency.setValueAtTime(80, audioContext.currentTime);
            raspagem.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.3);
            
            // Configurar estalo (som agudo da chama)
            estalo.type = 'square';
            estalo.frequency.setValueAtTime(800, audioContext.currentTime);
            estalo.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            estalo.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.4);
            
            // Configurar filtro para som mais "metálico"
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1000, audioContext.currentTime);
            
            // Configurar volume
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            
            // Conectar tudo
            raspagem.connect(filter);
            estalo.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Iniciar sons
            raspagem.start(audioContext.currentTime);
            estalo.start(audioContext.currentTime + 0.15);
            
            // Parar sons
            raspagem.stop(audioContext.currentTime + 0.8);
            estalo.stop(audioContext.currentTime + 0.8);
            
        } else {
            // SOM DE APAGAR - SOPRO + CHAMUSCO
            const sopro = audioContext.createOscillator();
            const chamusco = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            // Som de sopro
            sopro.type = 'sine';
            sopro.frequency.setValueAtTime(150, audioContext.currentTime);
            sopro.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.5);
            
            // Som de chamusco (curto e agudo)
            chamusco.type = 'square';
            chamusco.frequency.setValueAtTime(600, audioContext.currentTime);
            chamusco.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
            
            // Filtro para som de vento
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(200, audioContext.currentTime);
            
            // Configurar volume
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
            
            // Conectar
            sopro.connect(filter);
            chamusco.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Iniciar e parar
            sopro.start(audioContext.currentTime);
            chamusco.start(audioContext.currentTime);
            sopro.stop(audioContext.currentTime + 0.6);
            chamusco.stop(audioContext.currentTime + 0.2);
        }
    } catch (error) {
        console.log('Áudio não suportado - mas as animações vão funcionar!');
    }
}

function criarParticulasFogo() {
    const torchBtn = document.getElementById('torchBtn');
    if (!torchBtn || !estado.darkMode) return;
    
    // Remove partículas antigas
    const oldParticles = document.querySelector('.torch-fire-particles');
    if (oldParticles) oldParticles.remove();
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'torch-fire-particles';
    
    // Cria 8 partículas
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'torch-particle';
        particle.style.left = Math.random() * 30 + 'px';
        particle.style.animationDelay = (Math.random() * 1.5) + 's';
        particlesContainer.appendChild(particle);
    }
    
    torchBtn.appendChild(particlesContainer);
}

// ========== EVENT LISTENERS ==========
function inicializarEventListeners() {
    // Tocha
    if (elements.torchBtn) {
        elements.torchBtn.addEventListener('click', alternarDarkMode);
    }

    // Categorias
    if (elements.categoryButtons) {
        elements.categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                elements.categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                estado.categoriaAtual = button.dataset.category;
                renderizarProdutos();
            });
        });
    }

    // Busca
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            estado.termoBusca = e.target.value;
            renderizarProdutos();
        });
    }

    // Carrinho
    if (elements.cartBtn) elements.cartBtn.addEventListener('click', abrirCarrinho);
    if (elements.closeCart) elements.closeCart.addEventListener('click', fecharCarrinho);
    if (elements.checkoutBtn) elements.checkoutBtn.addEventListener('click', finalizarPedido);
    
    // WhatsApp
    if (elements.whatsappBtn) {
        elements.whatsappBtn.addEventListener('click', enviarPedidoWhatsApp);
    }

    // Login
    if (elements.loginBtn) elements.loginBtn.addEventListener('click', mostrarPerfil);
    if (elements.closeLogin) elements.closeLogin.addEventListener('click', esconderLogin);
    if (elements.closeRegister) elements.closeRegister.addEventListener('click', esconderLogin);
    
    if (elements.showRegister) {
        elements.showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarRegistro();
        });
    }
    
    if (elements.showLogin) {
        elements.showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            esconderLogin();
            mostrarLogin();
        });
    }

    // Formulários
    if (elements.loginForm) {
        elements.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const senha = document.getElementById('loginPassword').value;
            fazerLogin(email, senha);
        });
    }

    if (elements.registerForm) {
        elements.registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dados = {
                nome: document.getElementById('registerName').value,
                email: document.getElementById('registerEmail').value,
                senha: document.getElementById('registerPassword').value,
                telefone: document.getElementById('registerPhone').value
            };
            fazerRegistro(dados);
        });
    }

    // Perfil
    if (elements.closeProfile) elements.closeProfile.addEventListener('click', fecharPerfil);
    if (elements.changePhotoBtn) elements.changePhotoBtn.addEventListener('click', alterarFotoPerfil);
    if (elements.profilePictureInput) elements.profilePictureInput.addEventListener('change', processarUploadFoto);
    if (elements.addAddressBtn) elements.addAddressBtn.addEventListener('click', () => abrirModalEndereco());
    if (elements.saveProfileBtn) elements.saveProfileBtn.addEventListener('click', salvarPerfil);
    if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', fazerLogout);

    // Endereços
    if (elements.closeAddress) elements.closeAddress.addEventListener('click', fecharModalEndereco);
    if (elements.addressForm) elements.addressForm.addEventListener('submit', salvarEndereco);
    if (elements.cancelAddressBtn) elements.cancelAddressBtn.addEventListener('click', fecharModalEndereco);
    if (elements.addressZipCode) elements.addressZipCode.addEventListener('blur', buscarCEP);

    // Overlay
    if (elements.overlay) {
        elements.overlay.addEventListener('click', () => {
            esconderLogin();
            fecharCarrinho();
            fecharPerfil();
            fecharModalEndereco();
            fecharModalMesas();
            fecharModalAvaliacoes();
        });
    }

    // Tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            esconderLogin();
            fecharCarrinho();
            fecharPerfil();
            fecharModalEndereco();
            fecharModalMesas();
            fecharModalAvaliacoes();
        }
    });
}

function inicializarEventListenersMesas() {
    // Botão flutuante de mesas
    if (elements.floatingTableBtn) {
        elements.floatingTableBtn.addEventListener('click', mostrarModalMesas);
    }
    
    // Fechar modal de mesas
    if (elements.closeTable) {
        elements.closeTable.addEventListener('click', fecharModalMesas);
    }
    
    // Scanner de QR Code
    if (elements.startScannerBtn) {
        elements.startScannerBtn.addEventListener('click', iniciarScanner);
    }
    if (elements.stopScannerBtn) {
        elements.stopScannerBtn.addEventListener('click', pararScanner);
    }
    
    // Seleção de pessoas
    document.querySelectorAll('.people-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const numeroPessoas = parseInt(e.target.dataset.people);
            selecionarNumeroPessoas(numeroPessoas);
        });
    });
    
    // Ações da mesa
    if (elements.confirmTableBtn) {
        elements.confirmTableBtn.addEventListener('click', confirmarMesa);
    }
    if (elements.clearTableBtn) {
        elements.clearTableBtn.addEventListener('click', limparMesa);
    }
    
    // Placeholder do scanner também inicia o scanner
    if (elements.scannerPlaceholder) {
        elements.scannerPlaceholder.addEventListener('click', iniciarScanner);
    }
}

// ========== SISTEMA DE NOTIFICAÇÕES ==========
function criarContainerNotificacoes() {
    if (document.getElementById('notificationContainer')) return;
    
    const container = document.createElement('div');
    container.id = 'notificationContainer';
    container.className = 'notification-container';
    document.body.appendChild(container);
}

function mostrarNotificacao(titulo, mensagem, tipo = 'info', duracao = 4000) {
    criarContainerNotificacoes();
    
    const container = document.getElementById('notificationContainer');
    
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    
    let icon = 'ℹ️';
    switch(tipo) {
        case 'success': icon = '✓'; break;
        case 'error': icon = '✕'; break;
        case 'warning': icon = '⚠'; break;
        case 'info': icon = 'ℹ'; break;
    }
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${titulo}</div>
            <div class="notification-message">${mensagem}</div>
        </div>
        <button class="notification-close" onclick="fecharNotificacao(this.parentElement)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        notification.classList.add('pulse');
        
        setTimeout(() => {
            notification.classList.remove('pulse');
        }, 300);
    }, 100);
    
    if (duracao > 0) {
        setTimeout(() => {
            fecharNotificacao(notification);
        }, duracao);
    }
    
    return notification;
}

function fecharNotificacao(notification) {
    if (!notification) return;
    
    notification.classList.remove('show');
    notification.classList.add('hiding');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

function notificarSucesso(mensagem, titulo = 'Sucesso!') {
    return mostrarNotificacao(titulo, mensagem, 'success', 3000);
}

function notificarErro(mensagem, titulo = 'Erro!') {
    return mostrarNotificacao(titulo, mensagem, 'error', 5000);
}

function notificarAviso(mensagem, titulo = 'Atenção!') {
    return mostrarNotificacao(titulo, mensagem, 'warning', 4000);
}

function notificarInfo(mensagem, titulo = 'Informação') {
    return mostrarNotificacao(titulo, mensagem, 'info', 3000);
}

// ========== FUNÇÕES AUXILIARES ==========
function inicializarClickLogo() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', voltarTelaInicial);
        logo.style.cursor = 'pointer';
        logo.title = 'Clique para voltar ao início';
    }
}

function voltarTelaInicial() {
    console.log('📱 Voltando ao cardápio principal...');
    
    // 1. Resetar filtros
    estado.categoriaAtual = 'all';
    estado.termoBusca = '';
    
    // 2. Resetar interface
    if (elements.categoryButtons) {
        elements.categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === 'all') {
                btn.classList.add('active');
            }
        });
    }
    
    if (elements.searchInput) {
        elements.searchInput.value = '';
    }
    
    // 3. Fechar tudo
    fecharTodosModais();
    
    // 4. Mostrar todos os produtos
    renderizarProdutos();
    
    // 5. Ir para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function fecharTodosModais() {
    // Fechar modais
    if (elements.loginModal) elements.loginModal.classList.remove('active');
    if (elements.registerModal) elements.registerModal.classList.remove('active');
    if (elements.profileModal) elements.profileModal.classList.remove('active');
    if (elements.addressModal) elements.addressModal.classList.remove('active');
    if (elements.tableModal) elements.tableModal.classList.remove('active');
    if (elements.ratingsModal) elements.ratingsModal.classList.remove('active');
    
    // Fechar carrinho
    if (elements.cartSidebar) elements.cartSidebar.classList.remove('active');
    
    // Fechar overlay
    if (elements.overlay) elements.overlay.classList.remove('active');
    
    // Parar scanner
    pararScanner();
    
    // Restaurar scroll
    document.body.style.overflow = 'auto';
}

// ========== INICIALIZAÇÃO ==========
function inicializar() {
    inicializarElementos();
    carregarDadosUsuario();
    carregarCarrinho();
    carregarDarkMode();
    carregarAvaliacoes();
    atualizarInterfaceUsuario();
    atualizarCarrinho();
    renderizarProdutos();
    inicializarEventListeners();
    inicializarEventListenersMesas();
    inicializarEventListenersAvaliacoesGlobais();
    atualizarInterfaceMesa();
    inicializarClickLogo();
    criarContainerNotificacoes();
    
    // Criar partículas se estiver em dark mode
    if (estado.darkMode) {
        setTimeout(criarParticulasFogo, 1000);
    }
}

// Iniciar a aplicação
document.addEventListener('DOMContentLoaded', inicializar);

// ========== FUNÇÕES GLOBAIS ==========
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
window.alterarQuantidade = alterarQuantidade;
window.finalizarPedido = finalizarPedido;
window.enviarPedidoWhatsApp = enviarPedidoWhatsApp;
window.mostrarPerfil = mostrarPerfil;
window.definirEnderecoPadrao = definirEnderecoPadrao;
window.editarEndereco = editarEndereco;
window.excluirEndereco = excluirEndereco;
window.mostrarModalMesas = mostrarModalMesas;
window.iniciarScanner = iniciarScanner;
window.pararScanner = pararScanner;
window.voltarTelaInicial = voltarTelaInicial;
window.fecharTodosModais = fecharTodosModais;
window.mostrarNotificacao = mostrarNotificacao;
window.notificarSucesso = notificarSucesso;
window.notificarErro = notificarErro;
window.notificarAviso = notificarAviso;
window.notificarInfo = notificarInfo;
window.fecharNotificacao = fecharNotificacao;
window.alternarDarkMode = alternarDarkMode;

// ⭐ NOVAS FUNÇÕES DE AVALIAÇÕES
window.mostrarModalAvaliacoes = mostrarModalAvaliacoes;
window.curtirAvaliacao = curtirAvaliacao;
window.denunciarAvaliacao = denunciarAvaliacao;
window.enviarAvaliacaoTeste = enviarAvaliacaoTeste;

// Event listeners globais do sistema de avaliações
function inicializarEventListenersAvaliacoesGlobais() {
    // Botão flutuante de avaliações
    if (elements.floatingRatingsBtn) {
        elements.floatingRatingsBtn.addEventListener('click', () => mostrarModalAvaliacoes());
    }
    
    // Fechar modal de avaliações
    if (elements.closeRatings) {
        elements.closeRatings.addEventListener('click', fecharModalAvaliacoes);
    }
}