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
        descricao: "Molho de tomate, mussarela, tomate fresco e manjericão",
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
    scannerAtivo: false
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
        overlay: document.getElementById('overlay')
    };
}

// ========== SISTEMA DE PRODUTOS ==========
function carregarProdutos() {
    renderizarProdutos();
}

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
                <button class="add-to-cart" onclick="adicionarAoCarrinho(${JSON.stringify(produto).replace(/"/g, '&quot;')}, this)">
                    <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
                </button>
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
    } else {
        estado.carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    if (botao) {
        animarAdicaoCarrinho(botao, produto);
    }
    
    salvarCarrinho();
    atualizarCarrinho();
}

function removerDoCarrinho(produtoId) {
    estado.carrinho = estado.carrinho.filter(item => item.id !== produtoId);
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
        alert('Seu carrinho está vazio!');
        return;
    }

    if (!estado.mesa) {
        const usarMesa = confirm('Nenhuma mesa selecionada. Deseja selecionar uma mesa antes de fazer o pedido?');
        if (usarMesa) {
            mostrarModalMesas();
            return;
        }
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
    mostrarMensagem('Pedido enviado via WhatsApp!', 'success');
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
    alert(`Bem-vindo, ${usuario.nome}!`);
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
    alert(`Conta criada com sucesso! Bem-vindo, ${usuario.nome}!`);
}

function fazerLogout() {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        estado.usuario = null;
        localStorage.removeItem('usuario');
        atualizarInterfaceUsuario();
        fecharPerfil();
        alert('Você saiu da sua conta!');
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
        alert('Por favor, faça login primeiro!');
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
        alert('Foto de perfil atualizada com sucesso!');
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
        alert('Endereço salvo com sucesso!');
    } else {
        alert('Erro ao salvar endereço!');
    }
}

function definirEnderecoPadrao(enderecoId) {
    estado.enderecos.forEach(endereco => {
        endereco.padrao = endereco.id === enderecoId;
    });
    
    salvarEnderecos();
    carregarEnderecos();
    alert('Endereço padrão definido com sucesso!');
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
    alert('Endereço excluído com sucesso!');
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
    alert('Perfil atualizado com sucesso!');
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
        alert('Por favor, selecione uma mesa primeiro!');
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
    mostrarMensagem('Seleção de mesa removida', 'info');
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

function mostrarMensagem(mensagem, tipo = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${tipo}`;
    messageDiv.textContent = mensagem;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            if (messageDiv.parentNode) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// ========== EVENT LISTENERS ==========
function inicializarEventListeners() {
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

// ========== INICIALIZAÇÃO ==========
function inicializar() {
    inicializarElementos();
    carregarDadosUsuario();
    carregarCarrinho();
    atualizarInterfaceUsuario();
    atualizarCarrinho();
    carregarProdutos();
    inicializarEventListeners();
    inicializarEventListenersMesas();
    atualizarInterfaceMesa();
}

// Iniciar a aplicação
document.addEventListener('DOMContentLoaded', inicializar);

// Funções globais
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