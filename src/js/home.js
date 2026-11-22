let homeMap = null;
let homeMarkersLayer = null;

// Trạng thái lịch mini trên Trang chủ
let homeCalYear = 2026;
let homeCalMonth = 10; // Tháng 11 (0-indexed)
let homeSelectedDateISO = "";

document.addEventListener("DOMContentLoaded", function () {
    initHomeMap();
    setupHomeSearch();
    renderHomeMiniCalendar();
    renderFeaturedCarousel();
    renderUpcomingActivities();
    applyHomeFilters();
});

// Khởi tạo bản đồ Leaflet trên Trang chủ
function initHomeMap() {
    homeMap = L.map("map").setView([21.0245, 105.8250], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }).addTo(homeMap);

    homeMarkersLayer = L.layerGroup().addTo(homeMap);
}

// Vẽ các ghim địa điểm lên bản đồ Trang chủ theo danh sách đã lọc
function drawHomeMarkers(locationItems) {
    if (!homeMap || !homeMarkersLayer) {
        return;
    }

    homeMarkersLayer.clearLayers();

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

        homeMarkersLayer.addLayer(marker);
    });

    const counterElement = document.getElementById("mapCounter");
    if (counterElement) {
        counterElement.innerText = "Hiển thị " + locationItems.length + " địa điểm";
    }
}

// Bật/tắt lịch mini khi bấm vào ô Ngày tháng năm
function toggleHomeMiniCalendar() {
    const calBox = document.getElementById("homeMiniCalendar");
    if (calBox) {
        calBox.classList.toggle("hidden");
    }
}

// Chuyển tháng trên lịch mini
function changeHomeCalMonth(offset) {
    homeCalMonth += offset;
    if (homeCalMonth < 0) {
        homeCalMonth = 11;
        homeCalYear -= 1;
    } else if (homeCalMonth > 11) {
        homeCalMonth = 0;
        homeCalYear += 1;
    }
    renderHomeMiniCalendar();
}

// Vẽ lưới ngày trong tháng của lịch mini
function renderHomeMiniCalendar() {
    const label = document.getElementById("homeCalMonthLabel");
    const grid = document.getElementById("homeCalDaysGrid");
    if (!label || !grid) {
        return;
    }

    label.innerText = "Tháng " + (homeCalMonth + 1) + " / " + homeCalYear;

    const firstDay = new Date(homeCalYear, homeCalMonth, 1).getDay();
    const startOffset = (firstDay === 0) ? 6 : (firstDay - 1); // Bắt đầu từ Thứ 2
    const daysInMonth = new Date(homeCalYear, homeCalMonth + 1, 0).getDate();

    let html = "";
    for (let i = 0; i < startOffset; i++) {
        html += `<span class="cal-day empty"></span>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const mm = String(homeCalMonth + 1).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        const isoDate = `${homeCalYear}-${mm}-${dd}`;
        const isSelected = (homeSelectedDateISO === isoDate);
        const isToday = (homeCalYear === 2026 && homeCalMonth === 10 && d === 22);

        html += `
            <button type="button"
                class="cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}"
                onclick="selectHomeCalendarDate('${isoDate}', '${dd}/${mm}/${homeCalYear}')">
                ${d}
            </button>
        `;
    }

    grid.innerHTML = html;
}

// Chọn ngày trên lịch mini và đóng khung lịch
function selectHomeCalendarDate(isoDate, displayDate) {
    homeSelectedDateISO = isoDate;
    const dateInput = document.getElementById("homeDateInput");
    if (dateInput) {
        dateInput.value = displayDate;
    }
    renderHomeMiniCalendar();
    const calBox = document.getElementById("homeMiniCalendar");
    if (calBox) {
        calBox.classList.add("hidden");
    }
}

// Chuyển chuỗi giờ "HH:MM" thành số phút để so sánh min/max
function timeToMinutes(timeStr) {
    if (!timeStr || !timeStr.includes(":")) {
        return null;
    }
    const parts = timeStr.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

// Lọc danh sách địa điểm theo đầy đủ tiêu chí mới trên Trang chủ
function applyHomeFilters() {
    const keywordInput = document.getElementById("globalSearchInput");
    const keyword = keywordInput ? keywordInput.value.trim().toLowerCase() : "";

    const selectedSport = document.getElementById("homeSportSelect").value;
    const selectedLocation = document.getElementById("homeLocationSelect").value;
    const minCostRaw = document.getElementById("homeCostMin").value.trim();
    const maxCostRaw = document.getElementById("homeCostMax").value.trim();
    const timeMinVal = document.getElementById("homeTimeMin").value;
    const timeMaxVal = document.getElementById("homeTimeMax").value;
    const selectedLevel = document.getElementById("homeLevelSelect").value;
    const peopleRaw = document.getElementById("homePeopleInput").value.trim();

    const minCost = minCostRaw !== "" ? parseFloat(minCostRaw) : null;
    const maxCost = maxCostRaw !== "" ? parseFloat(maxCostRaw) : null;
    const minMinutes = timeToMinutes(timeMinVal);
    const maxMinutes = timeToMinutes(timeMaxVal);
    const minPeople = peopleRaw !== "" ? parseInt(peopleRaw, 10) : null;

    const matchedLocations = sportLocations.filter(function (spot) {
        const matchSport = (selectedSport === "all") || (spot.sport === selectedSport);
        const matchLocation = (selectedLocation === "all") || spot.park.toLowerCase().includes(selectedLocation.toLowerCase());

        // Lọc theo chi phí min / max
        const spotCost = typeof spot.costAmount === "number" ? spot.costAmount : 0;
        const matchMinCost = (minCost === null || isNaN(minCost)) || (spotCost >= minCost);
        const matchMaxCost = (maxCost === null || isNaN(maxCost)) || (spotCost <= maxCost);

        // Lọc theo ngày đã chọn trên lịch (nếu có)
        const matchDate = (homeSelectedDateISO === "") || (spot.date === homeSelectedDateISO);

        // Lọc theo khung giờ min / max
        const spotStartMin = timeToMinutes(spot.startHour);
        const spotEndMin = timeToMinutes(spot.endHour);
        const matchTimeMin = (minMinutes === null || spotStartMin === null) || (spotStartMin >= minMinutes);
        const matchTimeMax = (maxMinutes === null || spotEndMin === null) || (spotEndMin <= maxMinutes);

        // Lọc theo trình độ
        const matchLevel =
            (selectedLevel === "all") ||
            (spot.level === selectedLevel) ||
            (spot.level === "mọi trình độ");

        // Lọc theo số lượng người
        const spotPeople = spot.maxPeople || 10;
        const matchPeople = (minPeople === null || isNaN(minPeople)) || (spotPeople >= minPeople);

        // Lọc theo từ khóa tìm kiếm trên header
        const matchKeyword =
            (keyword === "") ||
            spot.name.toLowerCase().includes(keyword) ||
            spot.sport.toLowerCase().includes(keyword) ||
            spot.address.toLowerCase().includes(keyword);

        return (
            matchSport &&
            matchLocation &&
            matchMinCost &&
            matchMaxCost &&
            matchDate &&
            matchTimeMin &&
            matchTimeMax &&
            matchLevel &&
            matchPeople &&
            matchKeyword
        );
    });

    drawHomeMarkers(matchedLocations);
}

// Đặt lại toàn bộ bộ lọc và ô tìm kiếm về trạng thái ban đầu
function resetHomeFilters() {
    document.getElementById("homeSportSelect").value = "all";
    document.getElementById("homeLocationSelect").value = "all";
    document.getElementById("homeCostMin").value = "";
    document.getElementById("homeCostMax").value = "";
    document.getElementById("homeDateInput").value = "";
    document.getElementById("homeTimeMin").value = "";
    document.getElementById("homeTimeMax").value = "";
    document.getElementById("homeLevelSelect").value = "all";
    document.getElementById("homePeopleInput").value = "";

    homeSelectedDateISO = "";
    renderHomeMiniCalendar();

    const calBox = document.getElementById("homeMiniCalendar");
    if (calBox) {
        calBox.classList.add("hidden");
    }

    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) {
        searchInput.value = "";
    }

    applyHomeFilters();
    showToast("Đã đặt lại bộ lọc!");
}

// Tìm kiếm trực tiếp khi người dùng gõ từ khóa vào ô tìm kiếm trên header
function setupHomeSearch() {
    const searchInput = document.getElementById("globalSearchInput");
    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("keyup", function () {
        applyHomeFilters();
    });
}

// Vẽ danh sách thẻ Địa điểm & Công Viên Nổi Bật từ mảng featuredSpots (bấm vào mở chi tiết công viên)
function renderFeaturedCarousel() {
    const carouselContainer = document.getElementById("carouselContainer");
    if (!carouselContainer) {
        return;
    }

    let htmlContent = "";
    featuredSpots.forEach(function (item) {
        htmlContent += `
            <div class="carousel-card" onclick="openParkDetailModal('${item.parkSlug}')">
                <div class="carousel-img-box">
                    <img src="${item.image}" alt="${item.title}">
                    <span class="carousel-badge" style="background:${item.badgeColor};"><i class="fa-solid ${item.icon}"></i></span>
                </div>
                <div class="carousel-content">
                    <h3>${item.title}</h3>
                    <p>${item.subtitle}</p>
                </div>
            </div>
        `;
    });

    carouselContainer.innerHTML = htmlContent;
}

// Vẽ danh sách Hoạt Động Sắp Tới ở cột bên phải Trang chủ (bấm vào mở chi tiết hoạt động)
function renderUpcomingActivities() {
    const activityListBox = document.getElementById("upcomingActivities");
    if (!activityListBox) {
        return;
    }

    let htmlContent = "";
    activitiesList.slice(0, 2).forEach(function (act) {
        htmlContent += `
            <div class="activity-card" onclick="openActivityDetailModal(${act.id})">
                <img src="${act.image}" alt="${act.title}" class="activity-img">
                <div class="activity-info">
                    <div>
                        <h4>${act.title}</h4>
                        <p><i class="fa-solid fa-location-dot" style="color:var(--accent-orange);"></i> ${act.park}</p>
                        <div class="activity-meta"><i class="fa-regular fa-clock"></i> ${act.schedule}</div>
                    </div>
                    <div class="activity-bottom">
                        <span class="badge-free ${act.badgeStyle}">${act.costLabel}</span>
                        <span class="activity-level">| ${act.level}</span>
                    </div>
                </div>
            </div>
        `;
    });

    activityListBox.innerHTML = htmlContent;
}

// Cuộn ngang hàng thẻ địa điểm nổi bật sang trái (-1) hoặc phải (+1)
function scrollCarousel(direction) {
    const carouselContainer = document.getElementById("carouselContainer");
    if (carouselContainer) {
        carouselContainer.scrollBy({ left: direction * 240, behavior: "smooth" });
    }
}
