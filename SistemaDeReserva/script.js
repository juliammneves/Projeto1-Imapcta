const clientesCadastrados = [
    {nome: 'Sérgio', cpf: 11111111111, email: 'sergio@gmail.com', telefone: 11999999999, senha: 12345},
    {nome: 'Rodrigo', cpf: 22222222222, email: 'rodrigo@gmail.com', telefone: 11999998888, senha: 12345},
    {nome: 'Luisa', cpf: 33333333333, email: 'luisa@gmail.com', telefone: 11999998877, senha: 12345},
]

const disponibilidade = [
    {data: '19/04', 
    horario: [
        {hora: 18, mesasDisponiveis: 5},
        {hora: 19, mesasDisponiveis: 4},
        {hora: 20, mesasDisponiveis: 1},
        {hora: 21, mesasDisponiveis: 3},
        {hora: 22, mesasDisponiveis: 2},
    ]},
    {data: '20/04', 
    horario: [
        {hora: 18, mesasDisponiveis: 5},
        {hora: 19, mesasDisponiveis: 2},
        {hora: 20, mesasDisponiveis: 1},
        {hora: 21, mesasDisponiveis: 0},
        {hora: 22, mesasDisponiveis: 3},
    ]},
]

const reservas = [
    {nome: 'Sérgio', data: '19/04', hora: 19},
    {nome: 'Rodrigo', data: '20/04', hora: 21},
    {nome: 'Luisa', data: '20/04', hora: 21},
]

class Cliente{
    constructor(nome){
        this.nome = nome;
    }

    cadastrarCliente(cpf, email, telefone, senha){
        clientesCadastrados.push({nome: this.nome, cpf: cpf, email: email, telefone: telefone, senha: senha});
        console.log(`${this.nome} cadastrado(a) com sucesso.\n`);
    }
   
    reservarMesa(data, hora){
        const reservaDoDia = disponibilidade.find(reserva => reserva.data === data);
        if (reservaDoDia){
            const horarioSelecionado = reservaDoDia.horario.find(horario => horario.hora === hora);
            if (horarioSelecionado){
                if (horarioSelecionado.mesasDisponiveis > 0){
                    horarioSelecionado.mesasDisponiveis -= 1;
                    reservas.push({nome: this.nome, data: data, hora: hora});
                    console.log(`Mesa reservada com sucesso!\n- Reserva para ${this.nome} no dia ${data} às ${hora}h.\n`);
                } else {
                    console.log(`Mesa indisponivel para às ${hora}h.\n`)
                }
            } else {
                console.log('Fora do horário de funcionamento (18h-23h).\n')
            }
        } else {
            console.log('Indisponivel nesse dia.\n');
        }
    }
   
    cancelarReserva(data, hora){
        const reservaParaCancelar = reservas.find(reserva =>
            reserva.nome === this.nome && reserva.data === data && reserva.hora === hora
        );
        if (reservaParaCancelar) {
            const index = reservas.indexOf(reservaParaCancelar);
            reservas.splice(index, 1);
            console.log(`Reserva para ${this.nome} no dia ${data} às ${hora}h cancelada com sucesso.\n`);
        } else {
            console.log('Não foi encontrada nenhuma reserva correspondente para cancelar.\n');
        }
    }
}

const cliente = new Cliente('Júlia');
// Cadastrar cliente
cliente.cadastrarCliente(11111111111, 'julia@gmail.com', 11999999999, 12345)

// Reservar mesa
cliente.reservarMesa('19/04', 18) // Mesa reservada com sucesso
cliente.reservarMesa('18/04', 18) // Indisponivel para esse dia
cliente.reservarMesa('20/04', 21) // Horario indisponivel
cliente.reservarMesa('20/04', 23) // Fora do horario de funcionamento

// Exibe a array atualizada
console.log("Disponibilidade Atualizada:")
disponibilidade.forEach(data => {
    console.log(`Data: ${data.data}`)
    data.horario.forEach(hora => {
        console.log(`Hora: ${hora.hora}, Mesas Disponíveis: ${hora.mesasDisponiveis}`)
    })
    console.log("\n")
})

// Cancelar reserva
console.log(reservas, '\n')
cliente.cancelarReserva('19/04', 19) // Reserva não encontrada
cliente.cancelarReserva('19/04', 18) // Reserva cancelada com sucesso
console.log(reservas, '\n')

// ---- Saida de dados json ----
const fs = require('fs');

// clientesCadastrados.json
const dadosJSON =  JSON.stringify(clientesCadastrados);
const clCadastrados = 'clientesCadastrados.json';

fs.writeFile(clCadastrados, dadosJSON, (err) => {
    if(err) {
        console.error('Ocorreu um erro na gravação', err);
        return
    }
    console.log('Arquivo json criado.');
});

// disponibilidaDeMesas.json
const dadosJSON1 =  JSON.stringify(disponibilidade);
const disponibilidadeMesas = 'disponibilidaDeMesas.json';

fs.writeFile(disponibilidadeMesas, dadosJSON1, (err) => {
    if(err) {
        console.error('Ocorreu um erro na gravação', err);
        return
    }
    console.log('Arquivo json criado.');
});

// reservasDeMesas.json 
const dadosJSON2 =  JSON.stringify(reservas);
const reservasMesas = 'reservasDeMesas.json';

fs.writeFile(reservasMesas, dadosJSON2, (err) => {
    if(err) {
        console.error('Ocorreu um erro na gravação', err);
        return
    }
    console.log('Arquivo json criado.');
});