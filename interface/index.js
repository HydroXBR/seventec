const alertDiv = document.getElementById("alert");
const logsDiv = document.getElementById("logs");

function checkForNewLogs() {
    fetch("https://seventec.up.railway.app/newlog")
        .then(response => response.json())
        .then(data => {
            if (data.success && data.message === "Pisada%20detectada") {
                alertDiv.textContent = "Pisada forte detectada!";
                alertDiv.className = "alert warning"; 
            } else {
                alertDiv.textContent = "Nenhuma pisada forte detectada.";
                alertDiv.className = "alert normal"; 
            }
        })
        .catch(error => {
            console.error("Erro ao consultar logs:", error);
            alertDiv.textContent = "Erro ao carregar avisos.";
            alertDiv.className = "alert warning"; 
        });
}

function fetchLogs() {
    fetch("https://seventec.up.railway.app/logsdata")
        .then(response => response.json())
        .then(data => {
            if (data.success && data.logs) {
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
            } else {
                logsDiv.innerHTML = "<p>Nenhum log encontrado.</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar logs:", error);
            logsDiv.innerHTML = "<p>Erro ao carregar logs.</p>";
        });
}

setInterval(() => {
    checkForNewLogs();
    fetchLogs();
}, 5000);

checkForNewLogs();
fetchLogs();