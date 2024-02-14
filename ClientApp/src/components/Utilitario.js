export const formatarCep = (cep) =>{
    if(!cep) return;
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}
export const formatarCpf = (cpf) =>{
    if(!cpf) return;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
export const formatarTelefone = (telefone) =>{
    if(!telefone) return;
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}