class Veiculo {
    constructor(modelo, cor) {
        this.modelo = modelo;
        this.cor = cor;
        this.combustivel = 100;
    }

    pintar(novaCor) {
        this.cor = novaCor;
        this.atualizarDetalhes();
    }

    exibirInformacoes() {
        return `Modelo: ${this.modelo}, Cor: ${this.cor}, Combustível: ${this.combustivel}`;
    }
}

class Carro extends Veiculo {
    constructor(modelo, cor) {
        super(modelo, cor);
        this.ligado = false;
        this.velocidade = 0;
        this.velocidadeMaxima = 200;
    }

    ligar() {
        if (this.combustivel > 0) {
            this.ligado = true;
            this.atualizarStatus();
            this.atualizarVelocidadeDisplay();
            this.atualizarPonteiroVelocidade();
            console.log("Carro ligado!");
        } else {
            alert("Sem combustível! Abasteça o carro.");
        }
    }

    desligar() {
        if (!this.ligado) {
            alert("O carro já está desligado!");
            return;
        }
        this.ligado = false;
        this.velocidade = 0;
        this.atualizarStatus();
        this.atualizarVelocidadeDisplay();
        this.atualizarPonteiroVelocidade();
        console.log("Carro desligado.");
    }

    acelerar() {
        if (!this.ligado) {
            alert("Ligue o carro primeiro!");
            return;
        }

        if (this.velocidade >= this.velocidadeMaxima) {
            alert("O carro já está na velocidade máxima!");
            return;
        }
        
        if (this.ligado && this.combustivel > 0) {
            this.velocidade += 10;
            this.combustivel -= 5;
            this.atualizarVelocidadeDisplay();
            this.atualizarPonteiroVelocidade();
            this.ativarAnimacaoAceleracao('carro'); //ativa animação de aceleração
            console.log("Acelerando! Combustível restante: " + this.combustivel);
            if (this.combustivel <= 0) {
                this.desligar();
                console.log("Sem combustível! O carro desligou.");
            }
        } else if (!this.ligado) {
            console.log("Ligue o carro primeiro!");
        } else {
            alert("Sem combustível! Abasteça o carro.");
        }
    }

    frear() {
        if (!this.ligado) {
            alert("Ligue o carro primeiro!");
            return;
        }
        
        if (this.velocidade === 0) {
            alert("O carro já está parado!");
            return;
        }

        if (this.ligado && this.velocidade > 0) {
            this.velocidade -= 10;
            this.atualizarVelocidadeDisplay();
            this.atualizarPonteiroVelocidade();
            this.ativarAnimacaoFreagem('carro'); //ativa animação de freagem
        }
    }

    atualizarStatus() {
        const statusElement = document.getElementById(`carro-status`);
        const ligarBtn = document.getElementById(`ligar-btn`);
        const desligarBtn = document.getElementById(`desligar-btn`);

        if (statusElement) {
            statusElement.textContent = this.ligado ? 'Ligado' : 'Desligado';
            statusElement.style.color = this.ligado ? 'green' : 'red';
        }

        if (ligarBtn && desligarBtn) {
            ligarBtn.disabled = this.ligado;
            desligarBtn.disabled = !this.ligado;
        }
    }

    atualizarVelocidadeDisplay() {
        const velocidadeElement = document.getElementById(`velocidade-valor`);
        if (velocidadeElement) {
            velocidadeElement.textContent = this.velocidade + " km/h";
        }
    }

    atualizarPonteiroVelocidade() {
        const ponteiro = document.getElementById(`ponteiro-velocidade`);
        const porcentagem = Math.min((this.velocidade / this.velocidadeMaxima) * 100, 100); // Garante que a porcentagem não exceda 100%
        ponteiro.style.width = `${porcentagem}%`;
    }

    atualizarDetalhes() {
        const modeloElement = document.getElementById(`modelo`);
        const corElement = document.getElementById(`cor`);

        if (modeloElement) modeloElement.textContent = this.modelo;
        if (corElement) corElement.textContent = this.cor;
    }

    exibirInformacoes() {
        return `${super.exibirInformacoes()}, Ligado: ${this.ligado ? 'Sim' : 'Não'}, Velocidade: ${this.velocidade} km/h`;
    }

    ativarAnimacaoAceleracao(tipo) {
        const animacaoAceleracao = document.getElementById(`animacao-aceleracao-${tipo}`);
        if (animacaoAceleracao) {
            animacaoAceleracao.classList.add('ativa');
            setTimeout(() => {
                animacaoAceleracao.classList.remove('ativa');
            }, 300); // Remove a classe 'ativa' após 300ms
        }
    }

    ativarAnimacaoFreagem(tipo) {
        const animacaoFreagem = document.getElementById(`animacao-freagem-${tipo}`);
        if (animacaoFreagem) {
            animacaoFreagem.classList.add('ativa');
            setTimeout(() => {
                animacaoFreagem.classList.remove('ativa');
            }, 300); // Remove a classe 'ativa' após 300ms
        }
    }
}

class CarroEsportivo extends Carro {
    constructor(modelo, cor) {
        super(modelo, cor);
        this.turboAtivado = false;
        this.velocidadeMaxima = 300;
    }

    ativarTurbo() {
        if (!this.ligado) {
            alert("Ligue o carro primeiro!");
            return;
        }
        
        if (this.turboAtivado) {
            alert("O turbo já está ativado!");
            return;
        }

        if (this.ligado && this.combustivel > 0) {
            this.turboAtivado = true;
            this.acelerar();
            console.log('Turbo ativado!');
        } else {
            alert('Ligue o carro primeiro ou abasteça!');
        }
    }

    desativarTurbo() {
         if (!this.turboAtivado) {
            alert("O turbo já está desativado!");
            return;
        }
        this.turboAtivado = false;
        console.log('Turbo desativado!');
    }

    acelerar() {
        if (!this.ligado) {
            alert("Ligue o carro primeiro!");
            return;
        }
        
        if (this.velocidade >= this.velocidadeMaxima) {
            alert("O carro já está na velocidade máxima!");
            return;
        }

        if (this.ligado && this.combustivel > 0) {
            const aumento = this.turboAtivado ? 50 : 10;
            this.velocidade += aumento;
            this.combustivel -= this.turboAtivado ? 15 : 10;
            this.atualizarVelocidadeDisplay();
            this.atualizarPonteiroVelocidade();
            this.ativarAnimacaoAceleracao('carroEsportivo');
            console.log(`Acelerando (Turbo: ${this.turboAtivado})! Combustível restante: ${this.combustivel}`);
            if (this.combustivel <= 0) {
                this.desligar();
                console.log("Sem combustível! O carro desligou.");
            }
        } else if (!this.ligado) {
            console.log("Ligue o carro primeiro!");
        } else {
            alert("Sem combustível! Abasteça o carro.");
        }
    }

    frear() {
         if (!this.ligado) {
            alert("Ligue o carro primeiro!");
            return;
        }
        
        if (this.velocidade === 0) {
            alert("O carro já está parado!");
            return;
        }

        if (this.ligado && this.velocidade > 0) {
            this.velocidade -= 10;
            this.atualizarVelocidadeDisplay();
            this.atualizarPonteiroVelocidade();
            this.ativarAnimacaoFreagem('carroEsportivo');
        }
    }

    atualizarStatus() {
        const statusElement = document.getElementById(`carroEsportivo-status`);
        const ligarBtn = document.getElementById(`ligar-carroEsportivo-btn`);
        const desligarBtn = document.getElementById(`desligar-carroEsportivo-btn`);

        if (statusElement) {
            statusElement.textContent = this.ligado ? 'Ligado' : 'Desligado';
            statusElement.style.color = this.ligado ? 'green' : 'red';
        }

        if (ligarBtn && desligarBtn) {
            ligarBtn.disabled = this.ligado;
            desligarBtn.disabled = !this.ligado;
        }
    }

    atualizarVelocidadeDisplay() {
        const velocidadeElement = document.getElementById(`carroEsportivo-velocidade-valor`);
        if (velocidadeElement) {
            velocidadeElement.textContent = this.velocidade + " km/h";
        }
    }

    atualizarPonteiroVelocidade() {
        const ponteiro = document.getElementById(`ponteiro-carroEsportivo-velocidade`);
        const porcentagem = Math.min((this.velocidade / this.velocidadeMaxima) * 100, 100);
        ponteiro.style.width = `${porcentagem}%`;
    }

    atualizarDetalhes() {
        const modeloElement = document.getElementById(`carroEsportivo-modelo`);
        const corElement = document.getElementById(`carroEsportivo-cor`);

        if (modeloElement) modeloElement.textContent = this.modelo;
        if (corElement) corElement.textContent = this.cor;
    }

    exibirInformacoes() {
        return `${super.exibirInformacoes()}, Turbo: ${this.turboAtivado ? 'Ativado' : 'Desativado'}`;
    }

    ativarAnimacaoAceleracao(tipo) {
        const animacaoAceleracao = document.getElementById(`animacao-aceleracao-${tipo}`);
        if (animacaoAceleracao) {
            animacaoAceleracao.classList.add('ativa');
            setTimeout(() => {
                animacaoAceleracao.classList.remove('ativa');
            }, 300); // Remove a classe 'ativa' após 300ms
        }
    }

    ativarAnimacaoFreagem(tipo) {
        const animacaoFreagem = document.getElementById(`animacao-freagem-${tipo}`);
        if (animacaoFreagem) {
            animacaoFreagem.classList.add('ativa');
            setTimeout(() => {
                animacaoFreagem.classList.remove('ativa');
            }, 300); // Remove a classe 'ativa' após 300ms
        }
    }
}

class Caminhao extends Carro {
    constructor(modelo, cor, capacidadeCarga) {
        super(modelo, cor);
        this.capacidadeCarga = capacidadeCarga;
        this.cargaAtual = 0;
        this.velocidadeMaxima = 120;
    }

    carregar(peso) {
        if (!this.ligado) {
            alert("Ligue o caminhão primeiro!");
            return;
        }

        if (this.cargaAtual + peso > this.capacidadeCarga) {
            alert("Carga excede a capacidade máxima do caminhão!");
            return;
        }

        if (this.cargaAtual + peso <= this.capacidadeCarga) {
            this.cargaAtual += peso;
            this.atualizarDetalhes();
            console.log(`Caminhão carregado. Carga atual: ${this.cargaAtual}`);
        } else {
            alert('Carga excede a capacidade!');
        }
    }

    descarregar(peso) {
        if (!this.ligado) {
            alert("Ligue o caminhão primeiro!");
            return;
        }
        
         if (this.cargaAtual - peso < 0) {
            alert("Peso para descarregar excede a carga atual!");
            return;
        }

        if (this.cargaAtual + peso <= this.capacidadeCarga) {
            this.cargaAtual -= peso;
            this.atualizarDetalhes();
            console.log(`Caminhão descarregado. Carga atual: ${this.cargaAtual}`);
        } else {
            alert('Carga excede a capacidade!');
        }
    }

    atualizarStatus() {
        const statusElement = document.getElementById(`caminhao-status`);
        const ligarBtn = document.getElementById(`ligar-caminhao-btn`);
        const desligarBtn = document.getElementById(`desligar-caminhao-btn`);

        if (statusElement) {
            statusElement.textContent = this.ligado ? 'Ligado' : 'Desligado';
            statusElement.style.color = this.ligado ? 'green' : 'red';
        }

        if (ligarBtn && desligarBtn) {
            ligarBtn.disabled = this.ligado;
            desligarBtn.disabled = !this.ligado;
        }
    }

    atualizarVelocidadeDisplay() {
        const velocidadeElement = document.getElementById(`caminhao-velocidade-valor`);
        if (velocidadeElement) {
            velocidadeElement.textContent = this.velocidade + " km/h";
        }
    }

    atualizarPonteiroVelocidade() {
        const ponteiro = document.getElementById(`ponteiro-caminhao-velocidade`);
        const porcentagem = Math.min((this.velocidade / this.velocidadeMaxima) * 100, 100);
        ponteiro.style.width = `${porcentagem}%`;
    }

    atualizarDetalhes() {
        const modeloElement = document.getElementById(`caminhao-modelo`);
        const corElement = document.getElementById(`caminhao-cor`);
        const cargaElement = document.getElementById(`caminhao-carga`);

        if (modeloElement) modeloElement.textContent = this.modelo;
        if (corElement) corElement.textContent = this.cor;
        if (cargaElement) cargaElement.textContent = `${this.cargaAtual}/${this.capacidadeCarga}`;
    }

    exibirInformacoes() {
        return `${super.exibirInformacoes()}, Carga: ${this.cargaAtual}/${this.capacidadeCarga}`;
    }

    ativarAnimacaoAceleracao(tipo) {
        const animacaoAceleracao = document.getElementById(`animacao-aceleracao-${tipo}`);
        if (animacaoAceleracao) {
            animacaoAceleracao.classList.add('ativa');
            setTimeout(() => {
                animacaoAceleracao.classList.remove('ativa');
            }, 300); // Remove a classe 'ativa' após 300ms
        }
    }

    ativarAnimacaoFreagem(tipo) {
        const animacaoFreagem = document.getElementById(`animacao-freagem-${tipo}`);
        if (animacaoFreagem) {
            animacaoFreagem.classList.add('ativa');
            setTimeout(() => {
                animacaoFreagem.classList.remove('ativa');
            }, 300); // Remove a classe 'ativa' após 300ms
        }
    }
}

class Moto extends Carro {
    constructor(modelo, cor) {
        super(modelo, cor);
        this.ligada = false;
        this.velocidade = 0;
        this.velocidadeMaxima = 250;
    }

    ligar() {
        if (this.combustivel > 0) {
            this.ligada = true;
            this.atualizarStatus();
            this.atualizarVelocidadeDisplay();
            this.atualizarPonteiroVelocidade();
            console.log("Moto ligada!");
        } else {
            alert("Sem combustível! Abasteça a moto.");
        }
    }

    desligar() {
        if (!this.ligada) {
            alert("A moto já está desligada!");
            return;
        }
        this.ligada = false;
        this.velocidade = 0;
        this.atualizarStatus();
        this.atualizarVelocidadeDisplay();
        this.atualizarPonteiroVelocidade();
        console.log("Moto desligada.");
    }

    acelerar() {
        if (!this.ligada) {
            alert("Ligue a moto primeiro!");
            return;
        }
        
        if (this.velocidade >= this.velocidadeMaxima) {
            alert("A moto já está na velocidade máxima!");
            return;
        }

        if (this.ligada && this.combustivel > 0) {
            this.velocidade += 20;
            this.combustivel -= 2;
            this.atualizarVelocidadeDisplay();
            this.atualizarPonteiroVelocidade();
            this.ativarAnimacaoAceleracao('moto');
            console.log("Acelerando a moto! Combustível restante: " + this.combustivel);
            if (this.combustivel <= 0) {
                this.desligar();
                console.log("Sem combustível! A moto desligou.");
            }
        } else if (!this.ligada) {
            console.log("Ligue a moto primeiro!");
        } else {
            alert("Sem combustível! Abasteça a moto.");
        }
    }

    frear() {
        if (!this.ligada) {
            alert("Ligue a moto primeiro!");
            return;
        }
        
         if (this.velocidade === 0) {
            alert("A moto já está parada!");
            return;
        }

        if (this.ligada && this.velocidade > 0) {
            this.velocidade -= 20;
            this.atualizarVelocidadeDisplay();
            this.atualizarPonteiroVelocidade();
            this.ativarAnimacaoFreagem('moto');
        }
    }

    atualizarStatus() {
        const statusElement = document.getElementById(`moto-status`);
        const ligarBtn = document.getElementById(`ligar-moto-btn`);
        const desligarBtn = document.getElementById(`desligar-moto-btn`);

        if (statusElement) {
            statusElement.textContent = this.ligada ? 'Ligada' : 'Desligada';
            statusElement.style.color = this.ligada ? 'green' : 'red';
        }

        if (ligarBtn && desligarBtn) {
            ligarBtn.disabled = this.ligada;
            desligarBtn.disabled = !this.ligada;
        }
    }

    atualizarVelocidadeDisplay() {
        const velocidadeElement = document.getElementById(`moto-velocidade-valor`);
        if (velocidadeElement) {
            velocidadeElement.textContent = this.velocidade + " km/h";
        }
    }

    atualizarPonteiroVelocidade() {
        const ponteiro = document.getElementById(`ponteiro-moto-velocidade`);
        const porcentagem = Math.min((this.velocidade / this.velocidadeMaxima) * 100, 100); // Garante que a porcentagem não exceda 100%
        ponteiro.style.width = `${porcentagem}%`;
    }

    atualizarDetalhes() {
        const modeloElement = document.getElementById(`moto-modelo`);
        const corElement = document.getElementById(`moto-cor`);

        if (modeloElement) modeloElement.textContent = this.modelo;
        if (corElement) corElement.textContent = this.cor;
    }

    exibirInformacoes() {
        return `${super.exibirInformacoes()}, Ligada: ${this.ligada ? 'Sim' : 'Não'}, Velocidade: ${this.velocidade} km/h`;
    }

    ativarAnimacaoAceleracao(tipo) {
        const animacaoAceleracao = document.getElementById(`animacao-aceleracao-${tipo}`);
        if (animacaoAceleracao) {
            animacaoAceleracao.classList.add('ativa');
            setTimeout(() => {
                animacaoAceleracao.classList.remove('ativa');
            }, 300); // Remove a classe 'ativa' após 300ms
        }
    }

    ativarAnimacaoFreagem(tipo) {
        const animacaoFreagem = document.getElementById(`animacao-freagem-${tipo}`);
        if (animacaoFreagem) {
            animacaoFreagem.classList.add('ativa');
            setTimeout(() => {
                animacaoFreagem.classList.remove('ativa');
            }, 300); // Remove a classe 'ativa' após 300ms
        }
    }
}

class Garagem {
    constructor() {
        this.veiculos = {};
        this.criarCarro()
        this.criarMoto()
        this.carroEsportivo = null;
        this.caminhao = null;
    }

    criarCarro() {
        const modelo = document.getElementById('modeloCarro').value;
        const cor = document.getElementById('corCarro').value;
        this.veiculos['meuCarro'] = new Carro(modelo, cor);
        const meuCarro = this.veiculos['meuCarro'];
        meuCarro.atualizarDetalhes();
        meuCarro.atualizarStatus();
        meuCarro.atualizarVelocidadeDisplay();
        meuCarro.atualizarPonteiroVelocidade();

    }

    criarCarroEsportivo() {
        const modelo = document.getElementById('modeloEsportivo').value;
        const cor = document.getElementById('corEsportivo').value;
        this.carroEsportivo = new CarroEsportivo(modelo, cor);
        this.veiculos['carroEsportivo'] = this.carroEsportivo;
        this.veiculos['carroEsportivo'].atualizarDetalhes();
        this.veiculos['carroEsportivo'].atualizarStatus();
        this.veiculos['carroEsportivo'].atualizarVelocidadeDisplay();
        this.veiculos['carroEsportivo'].atualizarPonteiroVelocidade();
        this.atualizarInfo('carroEsportivo');
    }

    criarCaminhao() {
        const modelo = document.getElementById('modeloCaminhao').value;
        const cor = document.getElementById('corCaminhao').value;
        const capacidadeCarga = parseInt(document.getElementById('capacidadeCarga').value);
        this.caminhao = new Caminhao(modelo, cor, capacidadeCarga);
        this.veiculos['caminhao'] = this.caminhao;
        this.veiculos['caminhao'].atualizarDetalhes();
        this.veiculos['caminhao'].atualizarStatus();
        this.veiculos['caminhao'].atualizarVelocidadeDisplay();
        this.veiculos['caminhao'].atualizarPonteiroVelocidade();
        this.atualizarInfo('caminhao');
    }

    criarMoto() {
        const modelo = document.getElementById('modeloMoto').value;
        const cor = document.getElementById('corMoto').value;
        this.veiculos['moto'] = new Moto(modelo, cor);
        const moto = this.veiculos['moto'];
        moto.atualizarDetalhes();
        moto.atualizarStatus();
        moto.atualizarVelocidadeDisplay();
        moto.atualizarPonteiroVelocidade();
    }

    adicionarVeiculo(nome, veiculo) {
        this.veiculos[nome] = veiculo;
    }

    interagirComVeiculo(nomeVeiculo, acao) {
        const veiculo = this.veiculos[nomeVeiculo];

        if (!veiculo) {
            console.log("Veículo não encontrado.");
            return;
        }

        switch (acao) {
            case 'ligar':
                if (veiculo.ligar) veiculo.ligar();
                break;
            case 'desligar':
                if (veiculo.desligar) veiculo.desligar();
                break;
            case 'acelerar':
                if (veiculo.acelerar) veiculo.acelerar();
                break;
            case 'frear':
                if (veiculo.frear) veiculo.frear();
                break;
            case 'ativarTurbo':
                if (veiculo.ativarTurbo) veiculo.ativarTurbo();
                break;
            case 'desativarTurbo':
                if (veiculo.desativarTurbo) veiculo.desativarTurbo();
                break;
            case 'carregar':
                const pesoCarregar = parseInt(document.getElementById('pesoCarga').value);
                if (veiculo.carregar) veiculo.carregar(pesoCarregar);
                break;
            case 'descarregar':
                const pesoDescarregar = parseInt(document.getElementById('pesoDescarga').value);
                if (veiculo.descarregar) veiculo.descarregar(pesoDescarregar);
                break;
            default:
                console.log("Ação inválida.");
                break;
        }

        this.atualizarInfo(nomeVeiculo);
    }

    pintarVeiculo(nomeVeiculo) {
        const veiculo = this.veiculos[nomeVeiculo];
        if (!veiculo) {
            console.log("Veículo não encontrado.");
            return;
        }
        let corPintura;

        if (nomeVeiculo === 'meuCarro') {
            corPintura = document.getElementById('corPintura').value;
        } else if (nomeVeiculo === 'carroEsportivo') {
            corPintura = document.getElementById('corPinturaEsportivo').value;
        } else if (nomeVeiculo === 'caminhao') {
            corPintura = document.getElementById('corPinturaCaminhao').value;
        } else if (nomeVeiculo === 'moto') {
            corPintura = document.getElementById('corPinturaMoto').value;
        }
        veiculo.pintar(corPintura);
        this.atualizarInfo(nomeVeiculo);
    }

    abastecerVeiculo(nomeVeiculo) {
        const veiculo = this.veiculos[nomeVeiculo];
        if (!veiculo) {
            console.log("Veículo não encontrado.");
            return;
        }
        let combustivel;

        if (nomeVeiculo === 'meuCarro') {
            combustivel = parseInt(document.getElementById('combustivel').value);
        } else if (nomeVeiculo === 'carroEsportivo') {
            combustivel = parseInt(document.getElementById('combustivelEsportivo').value);
        } else if (nomeVeiculo === 'caminhao') {
            combustivel = parseInt(document.getElementById('combustivelCaminhao').value);
        } else if (nomeVeiculo === 'moto') {
            combustivel = parseInt(document.getElementById('combustivelMoto').value);
        }
        if (isNaN(combustivel)) {
            console.log("Quantidade de combustível inválida.");
        }
        veiculo.combustivel = combustivel;
        this.atualizarInfo(nomeVeiculo);
    }

    exibirInformacoes(nomeVeiculo) {
        const veiculo = this.veiculos[nomeVeiculo];
        let informacoes = "";

        if (veiculo) {
            informacoes = veiculo.exibirInformacoes();
        } else {
            informacoes = "Veículo não criado ou inexistente.";
        }

        document.getElementById('informacoesVeiculo').textContent = informacoes;
    }

    atualizarInfo(nomeVeiculo) {
        let infoElement;
        let veiculo;

        if (nomeVeiculo === 'carroEsportivo') {
            infoElement = document.getElementById('infoEsportivo');
            veiculo = this.carroEsportivo;
        } else if (nomeVeiculo === 'caminhao') {
            infoElement = document.getElementById('infoCaminhao');
            veiculo = this.caminhao;
        } else if (nomeVeiculo === 'moto') {
            infoElement = document.getElementById('infoMoto');
            veiculo = this.veiculos['moto'];

        } else if (nomeVeiculo === 'meuCarro') {
            const meuCarro = this.veiculos['meuCarro'];

            meuCarro.atualizarDetalhes();
            meuCarro.atualizarStatus();
            meuCarro.atualizarVelocidadeDisplay();
            meuCarro.atualizarPonteiroVelocidade();
            return; // Não precisa atualizar o textContent do elemento info
        }

        if (veiculo && infoElement) {
            infoElement.textContent = veiculo.exibirInformacoes();
        }
    }
}


const garagem = new Garagem();