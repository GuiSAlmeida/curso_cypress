const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTA: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nomeConta => `//table//td[contains(., '${nomeConta}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group li',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(., '${desc}')]//following-sibling::small[contains(., '${value}')]`,
        FN_XP_REMOVER_ELEMENTO: nomeConta => `//span[contains(., '${nomeConta}')]/../../..//i[@class="far fa-trash-alt"]`,
        FN_XP_ALTERAR_ELEMENTO: nomeConta => `//span[contains(., '${nomeConta}')]/../../..//i[@class="fas fa-edit"]`,
        FN_XP_LINHA: desc => `//span[contains(.,'${desc}')]/../../../..`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nomeConta => `//td[contains(., '${nomeConta}')]/../td[2]`
    },
    MESSAGE: '.toast-message'
}

export default locators;