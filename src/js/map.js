let fullMap = null;
let fullMarkersLayer = null;

document.addEventListener("DOMContentLoaded", function () {
    initFullMap();
    drawFullMapMarkers(sportLocations);
    setupMapSearch();
});

// Khởi tạo bản đồ lớn trên trang map.html
function initFullMap() {
    fullMap = L.map("map").setView([21.0285, 105.8542], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }).addTo(fullMap);

    fullMarkersLayer = L.layerGroup().addTo(fullMap);
}

// Hiển thị các điểm đánh dấu lên bản đồ trang map.html
function drawFullMapMarkers(locationItems) {
    if (!fullMap || !fullMarkersLayer) {
        return;
    }

    fullMarkersLayer.clearLayers();

    locationItems.forEach(function (spot) {
        const markerIcon = L.divIcon({
            className: "custom-div-icon",
            html: `<div class="marker-pin" style="background:${spot.color};"><i class="fa-solid ${spot.icon}"></i></div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        const marker = L.marker([spot.lat, spot.lng], { icon: markerIcon });
        marker.bindPopup(`<b>${spot.name}</b><br>${spot.address}<br><em>Môn: ${spot.sport}</em>`);
        fullMarkersLayer.addLayer(marker);
    });

    const counterElement = document.getElementById("mapCounter");
    if (counterElement) {
        counterElement.innerText = "Hiển thị " + locationItems.length + " địa điểm thể thao";
    }
}

// Áp dụng bộ lọc từ 5 danh sách chọn (select) bên phải bản đồ
function applyMapFilters() {
    const selectedSport = document.getElementById("filterSport").value;
    const selectedPark = document.getElementById("filterPark").value;
    const selectedTime = document.getElementById("filterTime").value;
    const selectedCost = document.getElementById("filterCost").value;
    const selectedLevel = document.getElementById("filterLevel").value;

    const filteredItems = sportLocations.filter(function (spot) {
        const matchSport = (selectedSport === "all") || (spot.sport === selectedSport);
        const matchPark = (selectedPark === "all") || spot.park.includes(selectedPark);
        const matchTime = (selectedTime === "all") || (spot.time === selectedTime);
        const matchCost = (selectedCost === "all") || (spot.cost === selectedCost);
        const matchLevel =
            (selectedLevel === "all") ||
            (spot.level === selectedLevel) ||
            (spot.level === "mọi trình độ");

        return matchSport && matchPark && matchTime && matchCost && matchLevel;
    });

    drawFullMapMarkers(filteredItems);
    showToast("Đã lọc được " + filteredItems.length + " địa điểm phù hợp!");
}

// Đưa tất cả bộ lọc và ô tìm kiếm về mặc định
function resetMapFilters() {
    document.getElementById("filterSport").value = "all";
    document.getElementById("filterPark").value = "all";
    document.getElementById("filterTime").value = "all";
    document.getElementById("filterCost").value = "all";
    document.getElementById("filterLevel").value = "all";

    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) {
        searchInput.value = "";
    }

    drawFullMapMarkers(sportLocations);
    showToast("Đã đặt lại bộ lọc bản đồ!");
}

// Tìm kiếm địa điểm ngay khi gõ từ khóa vào ô tìm kiếm
function setupMapSearch() {
    const searchInput = document.getElementById("globalSearchInput");
    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("keyup", function () {
        const keyword = searchInput.value.trim().toLowerCase();
        if (keyword === "") {
            drawFullMapMarkers(sportLocations);
            return;
        }

        const searchedItems = sportLocations.filter(function (spot) {
            return (
                spot.name.toLowerCase().includes(keyword) ||
                spot.sport.toLowerCase().includes(keyword) ||
                spot.address.toLowerCase().includes(keyword)
            );
        });

        drawFullMapMarkers(searchedItems);
    });
}