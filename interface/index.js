const alertDiv = document.getElementById("alert");
const logsDiv = document.getElementById("logs");
let lastLogId = null; 

function fetchLogs() {
    fetch("https://seventec.up.railway.app/logsdata")
        .then(response => response.json())
        .then(data => {
            if (data.success && data.logs && data.logs.length > 0) {
                const latestLog = data.logs[0];

                // Verifica se é um novo log
                if (lastLogId !== latestLog._id) {
                    lastLogId = latestLog._id;

                    if (latestLog.message === "Pisada%20detectada") {
                        alertDiv.textContent = "Pisada forte detectada!";
                        alertDiv.className = "alert warning"; 
                    } else {
                        alertDiv.textContent = "Nenhuma pisada forte detectada.";
                        alertDiv.className = "alert normal"; 
                    }

                    logsDiv.innerHTML = ""; 
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
