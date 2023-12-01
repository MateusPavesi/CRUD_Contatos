Para iniciar a aplicação é necessário primeiramente criar um banco de dados utilizando o PostgreSQL que pode ser baixado no seguinte link: https://www.postgresql.org/download/

após a instalação crie um banco de dados com o nome "contact" e execute a seguinte query:

CREATE TABLE contacts (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	phonenumber TEXT NOT NULL
);

com o banco de dados criado va até o arquivo application.properties localizado no seguinte caminho contatos\src\main\resources\application.properties e altere a url, username e password.

Também é necessário executar o comando npm install em "appcontatos" para obter o node-moules.

Após essas etapas basta executar o arquivo ContatosApplication.java localizado em contatos\src\main\java\com\example\contatos\ContatosApplication.java e depois executar o comando npm start em "appcontatos".
