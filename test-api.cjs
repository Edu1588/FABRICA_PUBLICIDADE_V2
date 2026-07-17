fetch('https://api.metaveiculos.com.br/api/vehicles?search=RENEGADE').then(res => res.text()).then(text => console.log(text.substring(0, 500)));
