<?php
// Arquivo: conexao.php

$host = 'localhost';
$dbname = 'u784023996_lucasdb';
$user = 'u784023996_marilia';
$pass = 'Marilia2025@$';

// Cria a conexão
$conexao = new mysqli($host, $user, $pass, $dbname);

// Verifica se deu ruim
if ($conexao->connect_error) {
    // Retorna JSON de erro e já finaliza
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'Erro na conexão: ' . $conexao->connect_error
    ]);
    exit;
}

// Define charset como utf8 pra evitar bagunça com acentos
$conexao->set_charset("utf8");
?>
