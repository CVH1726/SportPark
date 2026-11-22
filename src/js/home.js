// Lưu trạng thái lựa chọn hiện tại của 5 nhóm nút lọc trên Trang chủ
const activeFilterState = {
    sport: "all",
    park: "all",
    time: "all",
    cost: "all",
    level: "all"
};

let homeMap = null;
let homeMarkersLayer = null;

document.addEventListener("DOMContentLoaded", function () {
    initHomeMap();
    setupFilterBadgeClicks();
    setupHomeSearch();
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

        const marker = L.marker([spot.lat, spot.lng], { icon: markerIcon });
        marker.bindPopup(`
            <div style="min-width:165px; line-height:1.45;">
                <strong>${spot.name}</strong><br>
                <span>${spot.address}</span><br>
                <small>Môn: <b>${spot.sport}</b></small>
            </div>
        `);

        homeMarkersLayer.addLayer(marker);
    });

    const counterElement = document.getElementById("mapCounter");
    if (counterElement) {
        counterElement.innerText = "Hiển thị " + locationItems.length + " địa điểm";
    }
}

// Gắn sự kiện bấm chọn cho các nút lọc dạng badge trong khung Bộ lọc thông minh
function setupFilterBadgeClicks() {
    const filterButtons = document.querySelectorAll(".filter-panel .filter-btn");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category = button.getAttribute("data-category");
            const value = button.getAttribute("data-value");

            // Bỏ class active ở các nút cùng nhóm tiêu chí
            const groupButtons = document.querySelectorAll(`.filter-btn[data-category="${category}"]`);
            groupButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            // Kích hoạt nút vừa bấm và lưu giá trị vào trạng thái lọc
            button.classList.add("active");
            activeFilterState[category] = value;
        });
    });
}

// Lọc danh sách địa điểm theo các tiêu chí đang chọn và cập nhật bản đồ
function applyHomeFilters() {
    const keywordInput = document.getElementById("globalSearchInput");
    const keyword = keywordInput ? keywordInput.value.trim().toLowerCase() : "";

    const matchedLocations = sportLocations.filter(function (spot) {
        const matchSport = (activeFilterState.sport === "all") || (spot.sport === activeFilterState.sport);
        const matchPark = (activeFilterState.park === "all") || spot.park.toLowerCase().includes(activeFilterState.park.toLowerCase());
        const matchTime = (activeFilterState.time === "all") || (spot.time === activeFilterState.time);

        let matchCost = true;
        if (activeFilterState.cost === "miễn phí") {
            matchCost = (spot.cost === "miễn phí");
        } else if (activeFilterState.cost === "có phí" || activeFilterState.cost === "<100k") {
            matchCost = (spot.cost === "có phí");
        }

        const matchLevel =
            (activeFilterState.level === "all") ||
            (spot.level === activeFilterState.level) ||
            (spot.level === "mọi trình độ");

        const matchKeyword =
            (keyword === "") ||
            spot.name.toLowerCase().includes(keyword) ||
            spot.sport.toLowerCase().includes(keyword) ||
            spot.address.toLowerCase().includes(keyword);

        return matchSport && matchPark && matchTime && matchCost && matchLevel && matchKeyword;
    });

    drawHomeMarkers(matchedLocations);
}

// Đặt lại toàn bộ nút lọc và ô tìm kiếm về trạng thái ban đầu
function resetHomeFilters() {
    activeFilterState.sport = "all";
    activeFilterState.park = "all";
    activeFilterState.time = "all";
    activeFilterState.cost = "all";
    activeFilterState.level = "all";

    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) {
        searchInput.value = "";
    }

    const categories = ["sport", "park", "time", "cost", "level"];
    categories.forEach(function (category) {
        const groupButtons = document.querySelectorAll(`.filter-btn[data-category="${category}"]`);
        groupButtons.forEach(function (btn, index) {
            if (index === 0) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    });

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

// Vẽ danh sách thẻ Địa điểm & Công Viên Nổi Bật từ mảng featuredSpots
function renderFeaturedCarousel() {
    const carouselContainer = document.getElementById("carouselContainer");
    if (!carouselContainer) {
        return;
    }

    let htmlContent = "";
    featuredSpots.forEach(function (item) {
        htmlContent += `
            <div class="carousel-card" onclick="focusSpotOnHomeMap('${item.parkKey}', '${item.sportKey}')">
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

// Vẽ danh sách Hoạt Động Sắp Tới ở cột bên phải Trang chủ
function renderUpcomingActivities() {
    const activityListBox = document.getElementById("upcomingActivities");
    if (!activityListBox) {
        return;
    }

    let htmlContent = "";
    activitiesList.slice(0, 2).forEach(function (act) {
        htmlContent += `
            <div class="activity-card" onclick="window.location.href='activity.html'">
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

// Phóng bản đồ tới đúng công viên và môn thể thao khi bấm vào một thẻ nổi bật
function focusSpotOnHomeMap(parkName, sportName) {
    const targetSpot =
        sportLocations.find(function (spot) {
            return spot.park.toLowerCase().includes(parkName.toLowerCase()) && spot.sport.toLowerCase() === sportName.toLowerCase();
        }) ||
        sportLocations.find(function (spot) {
            return spot.park.toLowerCase().includes(parkName.toLowerCase());
        });

    if (targetSpot && homeMap) {
        homeMap.setView([targetSpot.lat, targetSpot.lng], 16, { animate: true });

        homeMarkersLayer.eachLayer(function (layer) {
            const pos = layer.getLatLng();
            // So sánh sai số nhỏ hơn 0.0001 độ để nhận diện đúng marker tại tọa độ đó
            if (Math.abs(pos.lat - targetSpot.lat) < 0.0001 && Math.abs(pos.lng - targetSpot.lng) < 0.0001) {
                layer.openPopup();
            }
        });

        document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// Cuộn ngang hàng thẻ địa điểm nổi bật sang trái (-1) hoặc phải (+1)
function scrollCarousel(direction) {
    const carouselContainer = document.getElementById("carouselContainer");
    if (carouselContainer) {
        carouselContainer.scrollBy({ left: direction * 240, behavior: "smooth" });
    }
}