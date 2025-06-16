<?php
declare(strict_types=1);

// CORS
header("Access-Control-Allow-Origin: http://notas.raulcordeiro.com.br");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Conexão
$host = 'localhost';
$dbname = 'u784023996_lucasdb';
$user = 'u784023996_marilia';
$pass = 'Marilia2025@$';

$conn = new mysqli("localhost", "u784023996_marilia", "Marilia2025@$", "u784023996_lucasdb");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Erro na conexão: " . $conn->connect_error]);
    exit;
}

// Aqui você deve ajustar o filtro para "pagar" e "receber", se for com uma coluna tipo
// Vou supor que exista uma coluna 'tipo' que indica 'pagar' ou 'receber'

$query = "
    SELECT 
        SUM(CAST(valor_nota AS DECIMAL(10,2))) AS total_pagar
    FROM notas_fiscais
    WHERE tipo_nota = 'pagar';
";

$result = $conn->query($query);
$totalPagar = 0;
if ($result && $row = $result->fetch_assoc()) {
    $totalPagar = $row['total_pagar'] ?? 0;
}

$query2 = "
    SELECT 
        SUM(CAST(valor_nota AS DECIMAL(10,2))) AS total_receber
    FROM notas_fiscais
    WHERE tipo_nota = 'receber';
";

$result2 = $conn->query($query2);
$totalReceber = 0;
if ($result2 && $row2 = $result2->fetch_assoc()) {
    $totalReceber = $row2['total_receber'] ?? 0;
}

echo json_encode([
    "status" => "ok",
    "pagar" => floatval($totalPagar),
    "receber" => floatval($totalReceber)
]);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn->close();
