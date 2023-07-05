window.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.contact-form');
    var emailInput = document.getElementById('email');
    var telefoneInput = document.getElementById('telefone');
    var dataHoraInput = document.getElementById('datahora');
    
    telefoneInput.addEventListener('input', function() {
        var telefone = telefoneInput.value;
      
        // Remover todos os caracteres não numéricos
        telefone = telefone.replace(/\D/g, '');
      
        // Formatar o telefone no padrão (00) 0 0000-0000
        if (telefone.length >= 2) {
          telefone = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2);
        }
        if (telefone.length >= 7) {
          telefone = telefone.substring(0, 6) + ' ' + telefone.substring(6);
        }
        if (telefone.length >= 12) {
          telefone = telefone.substring(0, 11) + '-' + telefone.substring(11);
        }
      
        telefoneInput.value = telefone;
      });      
      
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      var isValid = true;
      var errorMessages = [];
      
      // Validar e-mail
      var emailRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;
      if (!emailRegex.test(emailInput.value)) {
        isValid = false;
        errorMessages.push('E-mail inválido');
      }
      
      // Validar telefone
      var telefoneRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/;;
      if (!telefoneRegex.test(telefoneInput.value)) {
        isValid = false;
        errorMessages.push('Telefone inválido');
      }
      
       // Validar data e hora (não permite datas e horas passadas)
       if (dataHoraInput.value === '') {
        isValid = false;
        errorMessages.push('Preencha a data e hora');
      } else {
        var now = new Date();
        var selectedDate = new Date(dataHoraInput.value);
  
        // Restrição da data (terça a domingo)
        if (selectedDate.getDay() < 2 || selectedDate.getDay() > 6) {
          isValid = false;
          errorMessages.push('Os atendimentos são de terça a domingo.');
        }
  
        // Restrição da hora (9:00 às 19:00)
        var selectedHour = selectedDate.getHours();
        if (selectedHour < 9 || selectedHour > 19) {
          isValid = false;
          errorMessages.push('Os atendimentos são das 9:00 às 19:00.');
        }
  
        if (selectedDate < now) {
          isValid = false;
          errorMessages.push('A data e hora selecionadas estão no passado');
        }
      }
      
      // Exibir mensagens de erro
      if (!isValid) {
        var errorMessage = 'Corrija os seguintes erros:\n\n' + errorMessages.join('\n');
        alert(errorMessage);
        return;
      }
      
      // Enviar o formulário e exibir mensagem de confirmação
      alert('Formulário enviado com sucesso!');
      form.reset();
    });
  });
  