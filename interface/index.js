const alertDiv = document.getElementById("alert");
const logsDiv = document.getElementById("logs");
let lastLogId = null; // Armazena o ID do último log exibido

function fetchLogs() {
    fetch("https://seventec.up.railway.app/logsdata")
        .then(response => response.json())
        .then(data => {
            if (data.success && data.logs && data.logs.length > 0) {
                const latestLog = data.logs[0]; // Pega o log mais recente

                // Verifica se é um novo log
                if (lastLogId !== latestLog._id) {
                    lastLogId = latestLog._id; // Atualiza o ID do último log

                    // Verifica se o log é uma pisada forte
                    if (latestLog.message === "Pisada%20detectada") {
                        alertDiv.textContent = "Pisada forte detectada!";
                        alertDiv.className = "alert warning"; // Classe para alerta
                    } else {
                        alertDiv.textContent = "Nenhuma pisada forte detectada.";
                        alertDiv.className = "alert normal"; // Classe para normal
                    }

                    // Atualiza a lista de logs
                    logsDiv.innerHTML = ""; // Limpa o conteúdo anterior
                    data.logs.forEach(log => {
                        const logElement = document.createElement("div");
                        logElement.className = "log-item";
                        logElement.innerHTML = `
                            <p><strong>Data:</strong> ${new Date(log.date).toLocaleString()}</p>
                            <p><strong>Mensagem:</strong> ${log.message}</p>
                            <hr>
                        `;
                        logsDiv.appendChild(logElement);
                    });
                }
            } else {
                logsDiv.innerHTML = "<p>Nenhum log encontrado.</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar logs:", error);
            logsDiv.innerHTML = "<p>Erro ao carregar logs.</p>";
        });
}

// Consulta os logs a cada 5 segundos
setInterval(fetchLogs, 5000);

// Executa a função imediatamente ao carregar a página
fetchLogs();