let input = document.getElementById('user-text-input');

function noInput(){
    if(input.value === ''){
        textoNoInput();
        return 0;
    }else{
        let comprobacionMayusculas = verificarMayusculas(input.value);
        let comprobacionCaracteresEspeciales = verificarEspeciales(input.value);

        if(comprobacionMayusculas || comprobacionCaracteresEspeciales){
            textoNoInput();
            return 0;
        }else{
            return 1;
        }       
    }
}

function verificarMayusculas(texto){
    const mayusculas = /[A-Z]/;
    
    let contieneMayusculas = mayusculas.test(texto);

    return contieneMayusculas ? 1 : 0;
}

function verificarEspeciales(texto){
    const especiales = /[^a-zA-Z0-9\s]/;    
    
    let contieneEspeciales = especiales.test(texto);

    return contieneEspeciales ? 1 : 0;
}

function textoNoInput(){
    document.getElementById('output-heading').style.display = 'block';
    document.getElementById('output-message').textContent = "Ingrese el texto que desees encriptar o desencriptar";
    document.getElementById('output-image').style.display = 'unset';
    document.getElementById('copy-button').style.display = 'none';
    visible.style.display = 'none';
}

function encriptar(){
    let textoEncriptado = '';    
    let inputStatus = noInput();
    if(inputStatus=== 1){    
        let texto = input.value;   
        for (let i = 0; i < texto.length; i++){
            switch(texto[i]){
                case 'a':
                    textoEncriptado += 'ai';
                    break;

                case 'e':
                    textoEncriptado += 'enter';
                    break;

                case 'i':
                    textoEncriptado += 'imes';
                    break;

                case 'o':
                    textoEncriptado += 'ober';
                    break;
                
                case 'u':
                    textoEncriptado += "ufat";
                    break;

                default:
                    textoEncriptado += texto[i];
                    break;
            } 
        } 
        limpiarInput(); 
        mostrarTexto(textoEncriptado);    
    }else{
        // Si no hay texto, asegúrate de ocultar el botón de copiar
        visible.style.display = 'none';
    }
}

function desencriptar(){   
    let inputStatus = noInput();
    if(inputStatus===1){
        let textoDesencriptado = input.value;    
        textoDesencriptado = textoDesencriptado.replace("ufat", 'u');
        textoDesencriptado = textoDesencriptado.replace(/ober/g, 'o');
        textoDesencriptado = textoDesencriptado.replace(/imes/g, 'i');
        textoDesencriptado = textoDesencriptado.replace(/enter/g, 'e');
        textoDesencriptado = textoDesencriptado.replace(/ai/g, 'a');

        limpiarInput(); 
        mostrarTexto(textoDesencriptado);
    }
}

function limpiarInput(){
    input.value = '';
}

function mostrarTexto(textoAmostrar){
    document.getElementById('output-heading').style.display= 'none';
    document.getElementById('output-image').style.display = 'none';
    document.getElementById('output-message').textContent = textoAmostrar;
    mostrarBotonCopiar();    
}


let visible = document.getElementById('copy-button');
function mostrarBotonCopiar(){ 
    visible.classList.remove('disabled');   
    visible.style.display = 'block';    
}

function copyText(){
    navigator.clipboard.writeText(document.getElementById('output-message').textContent).then(() => {
        alert('Texto copiado al portapapeles!');
    })
    .catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}