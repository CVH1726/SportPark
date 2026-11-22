let fullMap = null;
let fullMarkersLayer = null;

// Trạng thái lịch mini trên trang Bản đồ
let mapCalYear = 2026;
let mapCalMonth = 10; // Tháng 11 (0-indexed)
let mapSelectedDateISO = "";

document.addEventListener("DOMContentLoaded", function () {
    fitMapToViewport();
    initFullMap();
    renderMapMiniCalendar();
    setupMapSearch();
    setupMapFilterEvents();
    loadKeywordFromUrl();
    applyMapFilters(false);

    // Trên màn hình nhỏ, mặc định thu gọn thanh bên để thấy bản đồ
    if (window.innerWidth < 768) {
        setMapSidebarOpen(false);
    }
});

window.addEventListener("resize", function () {
    fitMapToViewport();
    if (fullMap) {
        fullMap.invalidateSize();
    }
});

// Đo chiều cao header thật để bản đồ phủ đúng phần còn lại của màn hình
function fitMapToViewport() {
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;
    document.documentElement.style.setProperty("--header-h", headerHeight + "px");
}

// Khởi tạo bản đồ lớn trên trang map.html (nút zoom đặt bên phải để không bị thanh bên che)
function initFullMap() {
    fullMap = L.map("map", { zoomControl: false }).setView([21.0285, 105.8542], 12);
    L.control.zoom({ position: "topright" }).addTo(fullMap);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }).addTo(fullMap);

    fullMarkersLayer = L.layerGroup().addTo(fullMap);
}

// Đóng / mở thanh bên chứa bộ lọc
function toggleMapSidebar() {
    const sidebar = document.getElementById("mapSidebar");
    setMapSidebarOpen(sidebar.classList.contains("collapsed"));
}

function setMapSidebarOpen(isOpen) {
    const sidebar = document.getElementById("mapSidebar");
    const toggle = document.getElementById("mapSidebarToggle");
    const icon = document.getElementById("mapSidebarToggleIcon");
    if (!sidebar || !toggle || !icon) {
        return;
    }
    sidebar.classList.toggle("collapsed", !isOpen);
    toggle.classList.toggle("collapsed", !isOpen);
    icon.className = isOpen ? "fa-solid fa-chevron-left" : "fa-solid fa-sliders";
}

// Nếu đi từ ô tìm kiếm ở Trang chủ sang (map.html?q=...), điền sẵn từ khóa vào ô tìm kiếm header
function loadKeywordFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("q");
    const searchInput = document.getElementById("globalSearchInput");
    if (keyword && searchInput) {
        searchInput.value = keyword;
    }
}

// Hiển thị các điểm đánh dấu lên bản đồ
function drawFullMapMarkers(locationItems, shouldFit) {
    if (!fullMap || !fullMarkersLayer) {
        return;
    }

    fullMarkersLayer.clearLayers();
    const bounds = [];

    locationItems.forEach(function (spot) {
        const markerIcon = L.divIcon({
            className: "custom-div-icon",
            html: `<div class="marker-pin" style="background:${spot.color};"><i class="fa-solid ${spot.icon}"></i></div>`,
            iconSize: [32, 42],
            iconAnchor: [16, 42]
        });

        const costText = spot.costAmount === 0 ? "Miễn phí" : spot.costAmount.toLocaleString("vi-VN") + "đ";
        const marker = L.marker([spot.lat, spot.lng], { icon: markerIcon });
        marker.bindPopup(`
            <div style="min-width:185px; line-height:1.5;">
                <strong>${spot.name}</strong><br>
                <span>${spot.address}</span><br>
                <small>Môn: <b>${spot.sport}</b> • ${costText}</small><br>
                <small>Giờ: ${spot.startHour} - ${spot.endHour} • Tối đa ${spot.maxPeople} người</small>
            </div>
        `);

        fullMarkersLayer.addLayer(marker);
        bounds.push([spot.lat, spot.lng]);
    });

    // Tự thu phóng để thấy hết các điểm vừa lọc được
    if (shouldFit && bounds.length > 0) {
        fullMap.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
    }

    const counterElement = document.getElementById("mapCounter");
    if (counterElement) {
        counterElement.innerText = "Hiển thị " + locationItems.length + " địa điểm thể thao";
    }
}

// ---------- Lịch mini ----------
function toggleMapMiniCalendar() {
    const calBox = document.getElementById("mapMiniCalendar");
    if (calBox) {
        calBox.classList.toggle("hidden");
    }
}

function changeMapCalMonth(offset) {
    mapCalMonth += offset;
    if (mapCalMonth < 0) {
        mapCalMonth = 11;
        mapCalYear -= 1;
    } else if (mapCalMonth > 11) {
        mapCalMonth = 0;
        mapCalYear += 1;
    }
    renderMapMiniCalendar();
}

function renderMapMiniCalendar() {
    const label = document.getElementById("mapCalMonthLabel");
    const grid = document.getElementById("mapCalDaysGrid");
    if (!label || !grid) {
        return;
    }

    label.innerText = "Tháng " + (mapCalMonth + 1) + " / " + mapCalYear;

    const firstDay = new Date(mapCalYear, mapCalMonth, 1).getDay();
    const startOffset = (firstDay === 0) ? 6 : (firstDay - 1); // Bắt đầu từ Thứ 2
    const daysInMonth = new Date(mapCalYear, mapCalMonth + 1, 0).getDate();

    let html = "";
    for (let i = 0; i < startOffset; i++) {
        html += `<span class="cal-day empty"></span>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const mm = String(mapCalMonth + 1).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        const isoDate = `${mapCalYear}-${mm}-${dd}`;
        const isSelected = (mapSelectedDateISO === isoDate);
        const isToday = (mapCalYear === 2026 && mapCalMonth === 10 && d === 22);

        html += `
            <button type="button"
                class="cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}"
                onclick="selectMapCalendarDate('${isoDate}', '${dd}/${mm}/${mapCalYear}')">
                ${d}
            </button>
        `;
    }

    grid.innerHTML = html;
}

function selectMapCalendarDate(isoDate, displayDate) {
    mapSelectedDateISO = isoDate;
    const dateInput = document.getElementById("mapDateInput");
    if (dateInput) {
        dateInput.value = displayDate;
    }
    renderMapMiniCalendar();
    const calBox = document.getElementById("mapMiniCalendar");
    if (calBox) {
        calBox.classList.add("hidden");
    }
    applyMapFilters(false);
}

// Chuyển chuỗi giờ "HH:MM" thành số phút để so sánh min/max
function timeToMinutes(timeStr) {
    if (!timeStr || !timeStr.includes(":")) {
        return null;
    }
    const parts = timeStr.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

// ---------- Bộ lọc ----------
// Lọc ngay khi người dùng đổi một tiêu chí (không cần bấm nút Áp Dụng)
function setupMapFilterEvents() {
    const ids = ["mapSportSelect", "mapLocationSelect", "mapTimeMin", "mapTimeMax", "mapLevelSelect"];
    ids.forEach(function (id) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", function () { applyMapFilters(false); });
        }
    });

    ["mapCostMin", "mapCostMax", "mapPeopleInput"].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", function () { applyMapFilters(false); });
        }
    });
}

// Lọc danh sách địa điểm theo đầy đủ 6 tiêu chí + từ khóa ở header
// showToastMsg = true khi người dùng chủ động bấm nút "Áp Dụng Bộ Lọc"
function applyMapFilters(showToastMsg) {
    const keywordInput = document.getElementById("globalSearchInput");
    const keyword = keywordInput ? keywordInput.value.trim().toLowerCase() : "";

    const selectedSport = document.getElementById("mapSportSelect").value;
    const selectedLocation = document.getElementById("mapLocationSelect").value;
    const minCostRaw = document.getElementById("mapCostMin").value.trim();
    const maxCostRaw = document.getElementById("mapCostMax").value.trim();
    const timeMinVal = document.getElementById("mapTimeMin").value;
    const timeMaxVal = document.getElementById("mapTimeMax").value;
    const selectedLevel = document.getElementById("mapLevelSelect").value;
    const peopleRaw = document.getElementById("mapPeopleInput").value.trim();

    const minCost = minCostRaw !== "" ? parseFloat(minCostRaw) : null;
    const maxCost = maxCostRaw !== "" ? parseFloat(maxCostRaw) : null;
    const minMinutes = timeToMinutes(timeMinVal);
    const maxMinutes = timeToMinutes(timeMaxVal);
    const minPeople = peopleRaw !== "" ? parseInt(peopleRaw, 10) : null;

    const matchedLocations = sportLocations.filter(function (spot) {
        const matchSport = (selectedSport === "all") || (spot.sport === selectedSport);
        const matchLocation = (selectedLocation === "all") || spot.park.toLowerCase().includes(selectedLocation.toLowerCase());

        const spotCost = typeof spot.costAmount === "number" ? spot.costAmount : 0;
        const matchMinCost = (minCost === null || isNaN(minCost)) || (spotCost >= minCost);
        const matchMaxCost = (maxCost === null || isNaN(maxCost)) || (spotCost <= maxCost);

        const matchDate = (mapSelectedDateISO === "") || (spot.date === mapSelectedDateISO);

        const spotStartMin = timeToMinutes(spot.startHour);
        const spotEndMin = timeToMinutes(spot.endHour);
        const matchTimeMin = (minMinutes === null || spotStartMin === null) || (spotStartMin >= minMinutes);
        const matchTimeMax = (maxMinutes === null || spotEndMin === null) || (spotEndMin <= maxMinutes);

        const matchLevel =
            (selectedLevel === "all") ||
            (spot.level === selectedLevel) ||
            (spot.level === "mọi trình độ");

        const spotPeople = spot.maxPeople || 10;
        const matchPeople = (minPeople === null || isNaN(minPeople)) || (spotPeople >= minPeople);

        const matchKeyword =
            (keyword === "") ||
            spot.name.toLowerCase().includes(keyword) ||
            spot.sport.toLowerCase().includes(keyword) ||
            spot.address.toLowerCase().includes(keyword);

        return (
            matchSport && matchLocation && matchMinCost && matchMaxCost &&
            matchDate && matchTimeMin && matchTimeMax && matchLevel &&
            matchPeople && matchKeyword
        );
    });

    drawFullMapMarkers(matchedLocations, showToastMsg === true);

    if (showToastMsg === true) {
        showToast("Đã lọc được " + matchedLocations.length + " địa điểm phù hợp!");
    }
}

// Đưa tất cả bộ lọc và ô tìm kiếm về mặc định
function resetMapFilters() {
    document.getElementById("mapSportSelect").value = "all";
    document.getElementById("mapLocationSelect").value = "all";
    document.getElementById("mapCostMin").value = "";
    document.getElementById("mapCostMax").value = "";
    document.getElementById("mapDateInput").value = "";
    document.getElementById("mapTimeMin").value = "";
    document.getElementById("mapTimeMax").value = "";
    document.getElementById("mapLevelSelect").value = "all";
    document.getElementById("mapPeopleInput").value = "";

    mapSelectedDateISO = "";
    renderMapMiniCalendar();

    const calBox = document.getElementById("mapMiniCalendar");
    if (calBox) {
        calBox.classList.add("hidden");
    }

    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) {
        searchInput.value = "";
    }

    applyMapFilters(false);
    fullMap.setView([21.0285, 105.8542], 12);
    showToast("Đã đặt lại bộ lọc bản đồ!");
}

// Tìm kiếm địa điểm ngay khi gõ từ khóa vào ô tìm kiếm trên header
function setupMapSearch() {
    const searchInput = document.getElementById("globalSearchInput");
    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("keyup", function () {
        applyMapFilters(false);
    });
}
