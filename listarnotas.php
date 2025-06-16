<?php

header("Content-Type: application/json");

// CORS - libera localhost e métodos GET, POST, OPTIONS
header("Access-Control-Allow-Origin: http://notas.raulcordeiro.com.br");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 1);
error_reporting(E_ALL);
// resto do código

// Conexão correta (host, user, pass, db)
$conn = new mysqli("localhost", "u784023996_marilia", "Marilia2025@$", "u784023996_lucasdb");

if ($conn->connect_error) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro na conexão: " . $conn->connect_error]);
    exit;
}

// Consultar 3 notas a pagar
$sqlPagar = "SELECT numero, empresa, vencimento, valor_nota FROM notas_fiscais WHERE tipo_nota = 'pagar' ORDER BY vencimento ASC LIMIT 3";
$resultPagar = $conn->query($sqlPagar);

$notasPagar = [];
if ($resultPagar) {
    while ($row = $resultPagar->fetch_assoc()) {
        $notasPagar[] = $row;
    }
}

// Consultar 3 notas a receber
$sqlReceber = "SELECT numero, empresa, vencimento, valor_nota FROM notas_fiscais WHERE tipo_nota = 'receber' ORDER BY vencimento ASC LIMIT 3";
$resultReceber = $conn->query($sqlReceber);

$notasReceber = [];
if ($resultReceber) {
    while ($row = $resultReceber->fetch_assoc()) {
        $notasReceber[] = $row;
    }
}

// Resposta JSON
echo json_encode([
    "status" => "ok",
    "pagar" => $notasPagar,
    "receber" => $notasReceber
]);
