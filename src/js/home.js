// Trang chủ: Hoạt động nổi bật, Công viên nổi bật, Tin tức, Giới thiệu, Liên hệ, Điều khoản
document.addEventListener("DOMContentLoaded", function () {
    renderHeroStats();
    renderFeaturedActivities();
    renderFeaturedParks();
    renderNews();
    renderContactInfo();
    setupHomeSearch();
});

// Ô tìm kiếm trên header: bấm Enter hoặc nút kính lúp sẽ chuyển sang trang Bản đồ kèm từ khóa
function setupHomeSearch() {
    const searchInput = document.getElementById("globalSearchInput");
    const searchBtn = document.getElementById("globalSearchBtn");
    if (!searchInput) {
        return;
    }

    function goSearch() {
        const keyword = searchInput.value.trim();
        window.location.href = keyword ? ("map.html?q=" + encodeURIComponent(keyword)) : "map.html";
    }

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            goSearch();
        }
    });
    if (searchBtn) {
        searchBtn.addEventListener("click", goSearch);
    }
}

// Các con số thống kê nhanh ở banner
function renderHeroStats() {
    const box = document.getElementById("homeHeroStats");
    if (!box) {
        return;
    }
    const stats = [
        { icon: "fa-tree", value: parksList.length, label: "Công viên" },
        { icon: "fa-person-running", value: activitiesList.length, label: "Hoạt động" },
        { icon: "fa-users", value: groupsList.length, label: "Nhóm / CLB" },
        { icon: "fa-location-dot", value: sportLocations.length, label: "Điểm tập trên bản đồ" }
    ];
    let html = "";
    stats.forEach(function (st) {
        html += `
            <div class="hero-stat">
                <i class="fa-solid ${st.icon}"></i>
                <div class="hero-stat-value">${st.value}</div>
                <div class="hero-stat-label">${st.label}</div>
            </div>
        `;
    });
    box.innerHTML = html;
}

// Hoạt động nổi bật: ưu tiên hoạt động có đông người tham gia nhất (bấm vào mở chi tiết)
function renderFeaturedActivities() {
    const grid = document.getElementById("featuredActivitiesGrid");
    if (!grid) {
        return;
    }

    const sorted = activitiesList.slice().sort(function (a, b) {
        return getActivityParticipantCount(b) - getActivityParticipantCount(a);
    }).slice(0, 3);

    let html = "";
    sorted.forEach(function (act) {
        html += `
            <div class="grid-card" style="cursor:pointer;" onclick="openActivityDetailModal(${act.id})">
                <div>
                    <div class="carousel-img-box">
                        <img src="${act.image}" alt="${act.title}">
                        <span class="carousel-badge" style="background:${act.badgeColor};"><i class="fa-solid ${act.icon}"></i></span>
                    </div>
                    <div class="card-body">
                        <div class="card-top-meta">
                            <span class="badge-free ${act.badgeStyle}">${act.costLabel}</span>
                            <span class="member-count">${act.level}</span>
                        </div>
                        <h3 class="card-title-white">${act.title}</h3>
                        <p class="card-location"><i class="fa-solid fa-location-dot"></i> ${act.park}</p>
                        <div class="card-time"><i class="fa-regular fa-clock"></i> ${act.schedule}</div>
                        ${buildParticipantsHtml(act)}
                    </div>
                </div>
                <div class="card-footer-action">
                    <button type="button" class="btn-card-action" onclick="event.stopPropagation(); openActivityDetailModal(${act.id})">Xem chi tiết</button>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

// Công viên nổi bật: các công viên có điểm đánh giá cao nhất (bấm vào mở chi tiết)
function renderFeaturedParks() {
    const grid = document.getElementById("featuredParksGrid");
    if (!grid) {
        return;
    }

    const sorted = parksList.slice().sort(function (a, b) {
        return b.rating - a.rating;
    }).slice(0, 3);

    let html = "";
    sorted.forEach(function (park) {
        let sportsHtml = "";
        park.sports.forEach(function (sp) {
            sportsHtml += `<span class="park-sport-chip"><i class="fa-solid ${sp.icon}" style="color:${sp.color};"></i> ${sp.name}</span>`;
        });

        html += `
            <div class="grid-card" style="cursor:pointer;" onclick="openParkDetailModal('${park.slug}')">
                <div>
                    <div class="carousel-img-box">
                        <img src="${park.image}" alt="${park.name}">
                        <span class="carousel-badge" style="background:#f59e0b;"><i class="fa-solid fa-star"></i> ${park.rating}</span>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title-white">${park.name}</h3>
                        <p class="card-location"><i class="fa-solid fa-location-dot"></i> ${park.district}</p>
                        <p class="card-desc">${park.description}</p>
                        <div class="park-sport-chips">${sportsHtml}</div>
                    </div>
                </div>
                <div class="card-footer-action">
                    <button type="button" class="btn-card-action" onclick="event.stopPropagation(); openParkDetailModal('${park.slug}')">Xem chi tiết</button>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

// Tin tức: bài đầu là bài nổi bật (to), các bài còn lại xếp bên cạnh
function renderNews() {
    const grid = document.getElementById("newsGrid");
    if (!grid) {
        return;
    }

    let html = "";
    newsList.forEach(function (item, index) {
        html += `
            <article class="news-card ${index === 0 ? 'news-card-main' : ''}" onclick="openNewsDetailModal(${item.id})">
                <div class="news-img-box"><img src="${item.image}" alt="${item.title}"></div>
                <div class="news-body">
                    <div class="news-meta">
                        <span class="news-category">${item.category}</span>
                        <span class="news-date"><i class="fa-regular fa-calendar"></i> ${item.date}</span>
                    </div>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <span class="news-readmore">Đọc tiếp <i class="fa-solid fa-arrow-right"></i></span>
                </div>
            </article>
        `;
    });
    grid.innerHTML = html;
}

// Mở modal đọc chi tiết một tin tức
function openNewsDetailModal(newsId) {
    const item = newsList.find(function (n) { return n.id === newsId; });
    const headerTitle = document.getElementById("detailModalHeaderTitle");
    const modalBody = document.getElementById("detailModalBody");
    const modal = document.getElementById("detailInfoModal");
    if (!item || !headerTitle || !modalBody || !modal) {
        return;
    }

    headerTitle.innerHTML = `<i class="fa-regular fa-newspaper" style="color:#60a5fa;"></i> Tin Tức`;

    let paragraphs = "";
    item.content.forEach(function (text) {
        paragraphs += `<p class="detail-desc">${text}</p>`;
    });

    modalBody.innerHTML = `
        <div class="detail-hero-img">
            <img src="${item.image}" alt="${item.title}">
            <span class="detail-hero-badge">${item.category} • ${item.date}</span>
        </div>
        <h2 class="detail-title">${item.title}</h2>
        ${paragraphs}
        <div class="detail-modal-footer">
            <button type="button" class="btn-cancel" onclick="closeDetailModal()">Đóng</button>
        </div>
    `;
    modal.classList.remove("hidden");
}

// Hiển thị thông tin liên hệ từ siteInfo (data.js)
function renderContactInfo() {
    const map = {
        contactEmail: siteInfo.email,
        contactPhone: siteInfo.phone,
        contactAddress: siteInfo.address,
        contactHours: siteInfo.workingHours
    };
    Object.keys(map).forEach(function (id) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = map[id];
        }
    });
}

// Gửi form liên hệ (hiện tại chỉ mô phỏng phía giao diện)
function handleContactSubmit(event) {
    event.preventDefault();
    document.getElementById("contactForm").reset();
    showToast("Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi sớm.");
}
