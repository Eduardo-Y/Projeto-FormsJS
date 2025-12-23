document.addEventListener("DOMContentLoaded", () => {
    const setaCupom = document.getElementById("seta");
    const botaoCupom = document.getElementById("botao-cupom");
    const precoTotal = document.getElementById("preco-total");
    const outputForm = document.getElementById("output-form");
    const form = document.getElementById("form-dados");

    let valorInicial = 1200;
    const cupons = {
        desconto10: 0.1,
        black15: 0.15,
    };
    localStorage.setItem("cupons", JSON.stringify(cupons));

    setaCupom.addEventListener("click", (evento) => {
        const formulario = document.querySelector(".form-cupom");
        formulario.classList.toggle("hidden");

        setaCupom.classList.toggle("bx-chevron-down");
        setaCupom.classList.toggle("bx-chevron-up");
    });

    botaoCupom.addEventListener("click", (evento) => {
        evento.preventDefault();
        const input = botaoCupom.parentElement.firstElementChild;
        const valorInserido = input.value;
        const outputCupom = document.getElementById("output-cupom");

        for (let chave of Object.keys(cupons)) {
            if (valorInserido == chave) {
                let valor = valorInicial * (1 - cupons[valorInserido]);
                precoTotal.textContent = "Preço Total: R$" + valor.toFixed(2);

                outputCupom.classList.remove("invalido");
                outputCupom.classList.add("valido");
                outputCupom.textContent = "Cupom Aplicado!";
                break;
            } else {
                precoTotal.textContent =
                    "Preço Total: R$" + valorInicial.toFixed(2);

                outputCupom.classList.remove("valido");
                outputCupom.classList.add("invalido");
                outputCupom.textContent = "Cupom Inválido!";

                console.log(
                    "Cupom Inválido | " +
                        valorInserido +
                        " diferente de " +
                        chave
                );
            }
        }
        outputCupom.classList.remove("hidden");
    });

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const campos = document.querySelectorAll("div.campos input");
        let objetoFormulario = {};
        let valido = true;

        for (let input of campos) {
            let validez = validarFormulario(input, outputForm);
            if (validez) {
                input.style.outline = "none";

                outputForm.classList.remove("invalido");
                outputForm.classList.add("valido");

                outputForm.textContent = "formulário enviado com exito";

                objetoFormulario[`${input.id.slice(5)}`] = input.value;
            } else {
                input.style.outline = "solid 1px red";
                valido = false;
                break;
            }
        }

        outputForm.classList.remove("hidden");

        if (valido) {
            console.log(objetoFormulario);
            localStorage.setItem(
                "formulario",
                JSON.stringify(objetoFormulario)
            );

            for (let input of campos) {
                input.value = "";
            }
        }
    });
});

function validarFormulario(input, output) {
    function verificarDigitos(nomeCampo, digitos, simbolos, min = false) {
        if (input.value.length != digitos && !min) {
            input.style.outline = "solid 1px red";

            output.classList.remove("valido");
            output.classList.add("invalido");

            output.textContent = `O campo ${nomeCampo} precisa conter ${digitos} ${simbolos}`;
            return false;
        } else if (input.value.length < digitos && min) {
            input.style.outline = "solid 1px red";

            output.classList.remove("valido");
            output.classList.add("invalido");

            output.textContent = `O campo ${nomeCampo} precisa conter no mínimo ${digitos} ${simbolos}`;
            return false;
        } else {
            return true;
        }
    }

    switch (input.id) {
        case "inputNome":
            return verificarDigitos("'Nome'", 3, "caracteres", true);
            break;

        case "inputCPF":
            return verificarDigitos("'CPF'", 11, "digitos");
            break;

        case "inputTelefone":
            return verificarDigitos("'Telefone'", 11, "digitos");
            break;

        case "inputCEP":
            return verificarDigitos("'CEP'", 8, "digitos");
            break;

        case "inputRua":
            return verificarDigitos("'Rua'", 7, "caracteres", true);
            break;

        case "inputBairro":
            return verificarDigitos("'Bairro'", 3, "caracteres", true);
            break;

        case "inputCidade":
            return verificarDigitos("'Cidade'", 3, "caracteres", true);
            break;

        case "inputEstado":
            return verificarDigitos("'Estado'", 2, "digitos");
            break;

        default:
            return true;
            break;
    }
}
