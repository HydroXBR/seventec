let map, marker;

        function initMap(lat, lng) {
            const pos = { lat, lng };
            map = new google.maps.Map(document.getElementById("map"), {
                center: pos,
                zoom: 16
            });
            marker = new google.maps.Marker({ position: pos, map: map });
        }

        function updateMap(lat, lng) {
            const pos = { lat, lng };
            marker.setPosition(pos);
            map.setCenter(pos);
        }

        function fetchGPSData() {
            fetch("/gps") // Endpoint que retorna os dados do GPS
                .then(response => response.json())
                .then(data => {
                    const lat = parseFloat(data.latitude);
                    const lng = parseFloat(data.longitude);
                    
                    document.getElementById("latitude").textContent = lat;
                    document.getElementById("longitude").textContent = lng;

                    if (!map) {
                        initMap(lat, lng);
                    } else {
                        updateMap(lat, lng);
                    }
                })
                .catch(error => console.error("Erro ao buscar GPS:", error));
        }

        setInterval(fetchGPSData, 5000);
