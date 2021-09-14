# Whatsapp-message-distributor
Esse projeto é um distribuidor de mensagens em massa pelo whatsapp.

Para iniciar o projeto primeiro abra o terminal e digite "npm install", em seguida "node src/server.js", o sistema irá gerar um qr code no terminal, então você abre o whatsapp pelo celular, escolhe a opção de ler o qr code para acessar o whatsapp web, e conecta pelo celular com o qr gerado no console. Para a aplicação funcionar, é necessário que seja feito um post (recomendo que utilize o software insomnia) e encaminhe no post o seguinte comando:

{
	
	"message":"Mensagem que deseja enviar ",
	"phone":["21993939393", "21992929292"]
}

o "phone" são os número que deseja enviar a mensagem, pode colocar quantos desejar

Agora aproveite o meu trabalho feito com dedicação :D

