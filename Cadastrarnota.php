<?php
// Cabeçalhos de segurança e CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // ou especifica seu domínio
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Evita que warnings e notices quebrem o JSON
ini_set('display_errors', 0);
error_reporting(0);

// Lê o corpo da requisição
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Verifica se veio algo
if (!$data || !is_array($data)) {
    echo json_encode(["status" => "erro", "mensagem" => "JSON inválido ou não enviado"]);
    exit;
}


// 🔧 Conexão com banco
$host = "localhost";
$user = "u784023996_marilia";
$pass = "Marilia2025@$";
$dbname = "u784023996_lucasdb";

// Extrai dados (validação básica)
$numero = $data['numero'] ?? '';
$data_entrada = $data['data_entrada'] ?? '';
$vencimento = $data['vencimento'] ?? '';
$empresa = $data['empresa'] ?? '';
$produto = $data['produto'] ?? '';
$quantidade = $data['quantidade'] ?? '';
$valor_nota = $data['valor_nota'] ?? '';
$tipo_nota = $data['tipo_nota'] ?? '';

// Validação rápida (pode melhorar depois)
if (empty($numero) || empty($empresa) || empty($tipo_nota)) {
    echo json_encode(["status" => "erro", "mensagem" => "Campos obrigatórios ausentes"]);
    exit;
}

// Conexão com banco (exemplo MySQLi)
$conn = new mysqli("localhost", "u784023996_marilia", "Marilia2025@$", "u784023996_lucasdb");

if ($conn->connect_error) {
    echo json_encode(["status" => "erro", "mensagem" => "Falha na conexão com o banco de dados"]);
    exit;
}

// Prepara e executa query
$stmt = $conn->prepare("INSERT INTO notas_fiscais (numero, data_entrada, vencimento, empresa, produto, quantidade, valor_nota, tipo_nota) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $numero, $data_entrada, $vencimento, $empresa, $produto, $quantidade, $valor_nota, $tipo_nota);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao salvar nota: " . $stmt->error]);
}

$stmt->close();
$conn->close();
