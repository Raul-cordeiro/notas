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

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo "Erro na conexão: " . $e->getMessage();
    exit();
}

// Segurança: inicializa os dados
$nome = $_POST['nome'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$preco = $_POST['preco'] ?? 0;
$quantidade = $_POST['quantidade'] ?? 0;

$imagem_nome = null;

// Verifica imagem
if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
    $ext = pathinfo($_FILES['imagem']['name'], PATHINFO_EXTENSION);
    $imagem_nome = uniqid('img_') . '.' . $ext;
    $destino = __DIR__ . '/uploads/' . $imagem_nome;

    if (!move_uploaded_file($_FILES['imagem']['tmp_name'], $destino)) {
        http_response_code(500);
        echo "Erro ao salvar a imagem";
        exit();
    }
}

// Debug opcional
// file_put_contents('debug.txt', print_r($_POST, true));

try {
    $stmt = $pdo->prepare("INSERT INTO produtos (nome, descricao, preco, quantidade, imagem)
                           VALUES (:nome, :descricao, :preco, :quantidade, :imagem)");

    $stmt->execute([
        ':nome' => $nome,
        ':descricao' => $descricao,
        ':preco' => $preco,
        ':quantidade' => $quantidade,
        ':imagem' => $imagem_nome
    ]);

    echo "Produto cadastrado com sucesso!";
} catch (PDOException $e) {
    http_response_code(500);
    echo "Erro ao cadastrar: " . $e->getMessage();
}
