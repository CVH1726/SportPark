// Tự động chạy khi toàn bộ cấu trúc HTML của trang đã tải xong
document.addEventListener("DOMContentLoaded", function () {
    renderSharedHeader();
    renderSharedFooter();
    renderSharedModalsAndToast();
    highlightCurrentNavLink();
    setupNotificationDropdown();
});

// Tạo phần Header và thanh điều hướng dùng chung cho mọi trang
function renderSharedHeader() {
    const headerPlaceholder = document.getElementById("shared-header");
    if (!headerPlaceholder) {
        return;
    }

    const unreadCount = (typeof notificationsList !== "undefined")
        ? notificationsList.filter(function (item) { return item.unread; }).length
        : 0;

    headerPlaceholder.innerHTML = `
        <header>
            <div class="container">
                <div class="header-top">
                    <div class="logo-box" onclick="handleLogoClick()">
                        <div class="logo-icon">
                            <i class="fa-solid fa-leaf"></i>
                        </div>
                        <div class="logo-text">
                            <span>Sport<em>Park</em></span>
                            <div class="logo-sub">Khám phá thể thao công viên</div>
                        </div>
                    </div>

                    <div class="search-box">
                        <input type="text" id="globalSearchInput" placeholder="Tìm môn thể thao, công viên, địa chỉ...">
                        <button type="button" id="globalSearchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                    <div class="user-profile">
                        <div class="notification-wrapper" id="notificationWrapper">
                            <button type="button" class="bell-btn" id="bellBtn" onclick="toggleNotificationDropdown(event)" title="Thông báo">
                                <i class="fa-regular fa-bell"></i>
                                ${unreadCount > 0 ? '<span class="bell-dot" id="bellDot"></span>' : ''}
                            </button>

                            <div class="notification-dropdown hidden" id="notificationDropdown">
                                <div class="notification-dropdown-header">
                                    <span><i class="fa-solid fa-bell" style="color: var(--accent-orange);"></i> Thông báo</span>
                                    <button type="button" class="mark-read-btn" onclick="markAllNotificationsRead()">Đánh dấu đã đọc</button>
                                </div>
                                <div class="notification-scroll-list" id="notificationListBody"></div>
                            </div>
                        </div>

                        <a href="account.html" class="profile-link">
                            <img src="https://marketplace.canva.com/tXH-Q/MAG7IGtXH-Q/1/tl/canva-MAG7IGtXH-Q.jpg" alt="Avatar" class="avatar">
                            <span class="profile-name">Hào Chu Văn</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="sub-nav-bar">
                <div class="container sub-nav-inner">
                    <nav class="nav-links" id="mainNavLinks">
                        <a href="index.html" data-page="index.html"><i class="fa-solid fa-house"></i> Trang Chủ</a>
                        <a href="map.html" data-page="map.html"><i class="fa-solid fa-map-location-dot"></i> Bản Đồ</a>
                        <a href="park.html" data-page="park.html"><i class="fa-solid fa-tree"></i> Công Viên</a>
                        <a href="activity.html" data-page="activity.html"><i class="fa-solid fa-person-running"></i> Hoạt Động</a>
                        <a href="group.html" data-page="group.html"><i class="fa-solid fa-users"></i> Nhóm</a>
                        <a href="news.html" data-page="news.html"><i class="fa-regular fa-newspaper"></i> Tin Tức</a>
                        <a href="account.html" data-page="account.html"><i class="fa-solid fa-user"></i> Tài Khoản</a>
                    </nav>
                </div>
            </div>
        </header>
    `;

    renderNotificationsList();
}

// Vẽ danh sách thông báo vào thanh trượt xuống của chuông thông báo
function renderNotificationsList() {
    const listBody = document.getElementById("notificationListBody");
    if (!listBody) {
        return;
    }

    const items = (typeof notificationsList !== "undefined") ? notificationsList : [];
    if (items.length === 0) {
        listBody.innerHTML = `<div class="notification-empty">Bạn chưa có thông báo nào.</div>`;
        return;
    }

    let htmlContent = "";
    items.forEach(function (item) {
        htmlContent += `
            <div class="notification-item ${item.unread ? 'unread' : ''}" onclick="handleNotificationItemClick(${item.id})">
                <div class="notification-item-icon">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <div class="notification-item-content">
                    <div class="notification-item-title">${item.title}</div>
                    <div class="notification-item-msg">${item.message}</div>
                    <div class="notification-item-time">${item.time}</div>
                </div>
            </div>
        `;
    });

    listBody.innerHTML = htmlContent;
}

// Bật / tắt thanh trượt xuống thông báo
function toggleNotificationDropdown(event) {
    if (event) {
        event.stopPropagation();
    }
    const dropdown = document.getElementById("notificationDropdown");
    if (!dropdown) {
        return;
    }
    dropdown.classList.toggle("hidden");
}

// Đóng dropdown thông báo khi bấm ra ngoài
function setupNotificationDropdown() {
    document.addEventListener("click", function (event) {
        const wrapper = document.getElementById("notificationWrapper");
        const dropdown = document.getElementById("notificationDropdown");
        if (wrapper && dropdown && !wrapper.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });
}

// Đánh dấu đã đọc một thông báo
function handleNotificationItemClick(notificationId) {
    if (typeof notificationsList !== "undefined") {
        const target = notificationsList.find(function (item) { return item.id === notificationId; });
        if (target) {
            target.unread = false;
        }
        renderNotificationsList();
        updateBellDotVisibility();
    }
}

// Đánh dấu đã đọc tất cả thông báo
function markAllNotificationsRead() {
    if (typeof notificationsList !== "undefined") {
        notificationsList.forEach(function (item) {
            item.unread = false;
        });
        renderNotificationsList();
        updateBellDotVisibility();
        showToast("Đã đánh dấu tất cả thông báo là đã đọc!");
    }
}

// Ẩn chấm đỏ trên chuông nếu không còn thông báo chưa đọc
function updateBellDotVisibility() {
    const bellDot = document.getElementById("bellDot");
    if (!bellDot || typeof notificationsList === "undefined") {
        return;
    }
    const hasUnread = notificationsList.some(function (item) { return item.unread; });
    if (!hasUnread) {
        bellDot.style.display = "none";
    }
}

// Tạo phần Footer dùng chung cho mọi trang
function renderSharedFooter() {
    const footerPlaceholder = document.getElementById("shared-footer");
    if (!footerPlaceholder) {
        return;
    }

    footerPlaceholder.innerHTML = `
        <footer>
            <div class="container footer-flex">
                <div class="footer-links">
                    <a href="index.html#about">Về chúng tôi</a>
                    <a href="index.html#contact">Liên hệ</a>
                    <a href="index.html#terms">Điều khoản sử dụng</a>
                </div>
                <div class="footer-socials">
                    <a href="#" class="social-btn social-facebook" title="Facebook" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#" class="social-btn social-x" title="X (Twitter)" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="#" class="social-btn social-youtube" title="YouTube" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
        </footer>
    `;
}

// Tạo khung thông báo Toast và Modal chi tiết dùng chung cho mọi trang
function renderSharedModalsAndToast() {
    const placeholder =
        document.getElementById("shared-modals") ||
        document.getElementById("shared-toast");

    if (!placeholder) {
        return;
    }

    placeholder.innerHTML = `
        <!-- Modal hiển thị thông tin chi tiết Công Viên hoặc Hoạt Động -->
        <div class="modal-overlay hidden" id="detailInfoModal" onclick="closeDetailModalOnBackdrop(event)">
            <div class="modal-box detail-modal-box">
                <div class="modal-header">
                    <h3 id="detailModalHeaderTitle">
                        <i class="fa-solid fa-circle-info" style="color: var(--accent-teal);"></i> Chi Tiết
                    </h3>
                    <button type="button" onclick="closeDetailModal()" title="Đóng">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div id="detailModalBody" class="detail-modal-body"></div>
            </div>
        </div>

        <!-- Toast thông báo nổi -->
        <div id="toast">
            <i class="fa-solid fa-circle-check" style="font-size: 16px;"></i>
            <span id="toastMsg">Thao tác thành công!</span>
        </div>
    `;
}

// ----- TIN TỨC (dùng chung cho Trang chủ và trang news.html) -----

// Chuyển chuỗi ngày "dd/mm/yyyy" thành mốc thời gian để so sánh (không đọc được thì trả về 0)
function parseViDate(dateStr) {
    const parts = (dateStr || "").split("/");
    if (parts.length !== 3) {
        return 0;
    }
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10)).getTime();
}

// Trả về danh sách tin tức sắp xếp từ MỚI nhất đến cũ nhất (cùng ngày thì tin có id lớn hơn xếp trước)
function getSortedNews() {
    if (typeof newsList === "undefined") {
        return [];
    }
    return newsList.slice().sort(function (a, b) {
        const diff = parseViDate(b.date) - parseViDate(a.date);
        return diff !== 0 ? diff : b.id - a.id;
    });
}

// Mở modal đọc chi tiết một tin tức
function openNewsDetailModal(newsId) {
    const item = (typeof newsList !== "undefined") ? newsList.find(function (n) { return n.id === newsId; }) : null;
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

// Vẽ một thẻ tin tức (dùng cho Trang chủ và trang Tin tức). isNewest = true sẽ gắn nhãn "Mới nhất"
function buildNewsCardHtml(item, isMain, isNewest) {
    return `
        <article class="news-card ${isMain ? 'news-card-main' : ''}" onclick="openNewsDetailModal(${item.id})">
            <div class="news-img-box">
                <img src="${item.image}" alt="${item.title}">
                ${isNewest ? '<span class="news-new-badge"><i class="fa-solid fa-bolt"></i> Mới nhất</span>' : ''}
            </div>
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
}

// Mở modal xem chi tiết Công Viên
function openParkDetailModal(parkSlug) {
    if (typeof parksList === "undefined") {
        return;
    }
    const park = parksList.find(function (p) { return p.slug === parkSlug; });
    if (!park) {
        return;
    }

    const headerTitle = document.getElementById("detailModalHeaderTitle");
    const modalBody = document.getElementById("detailModalBody");
    const modal = document.getElementById("detailInfoModal");
    if (!headerTitle || !modalBody || !modal) {
        return;
    }

    headerTitle.innerHTML = `<i class="fa-solid fa-tree" style="color: var(--accent-teal);"></i> Chi Tiết Công Viên`;

    let sportsTagsHtml = "";
    park.sports.forEach(function (sp) {
        sportsTagsHtml += `
            <span class="detail-sport-tag">
                <i class="fa-solid ${sp.icon}" style="color: ${sp.color};"></i> ${sp.name}
            </span>
        `;
    });

    let facilitiesHtml = "";
    if (park.facilities && park.facilities.length > 0) {
        park.facilities.forEach(function (fac) {
            facilitiesHtml += `<li><i class="fa-solid fa-check" style="color: var(--accent-teal);"></i> ${fac}</li>`;
        });
    }

    modalBody.innerHTML = `
        <div class="detail-hero-img">
            <img src="${park.image}" alt="${park.name}">
            <span class="detail-hero-badge">${park.district} • ${park.ward || ''}</span>
        </div>
        <h2 class="detail-title">${park.name}</h2>
        <p class="detail-desc">${park.description}</p>

        <div class="detail-info-grid">
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-location-dot" style="color: var(--accent-orange);"></i> Địa chỉ</span>
                <span class="detail-info-val">${park.address}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-regular fa-clock" style="color: var(--accent-teal);"></i> Giờ mở cửa</span>
                <span class="detail-info-val">${park.openHours}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-users" style="color: #60a5fa;"></i> Mức độ đông đúc</span>
                <span class="detail-info-val">${park.crowdLabel} (${park.distanceKm} km)</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-ruler-combined" style="color: #a78bfa;"></i> Diện tích &amp; Đánh giá</span>
                <span class="detail-info-val">${park.areaSize} • ⭐ ${park.rating}/5</span>
            </div>
        </div>

        <div class="detail-section">
            <h4>Môn thể thao</h4>
            <div class="detail-sports-wrap">${sportsTagsHtml}</div>
        </div>

        <div class="detail-section">
            <h4>Cơ sở vật chất &amp; Tiện ích nổi bật</h4>
            <ul class="detail-facility-list">${facilitiesHtml}</ul>
        </div>

        <div class="detail-modal-footer">
            <button type="button" class="btn-cancel" onclick="closeDetailModal()">Đóng</button>
            <button type="button" class="btn-save" onclick="window.location.href='map.html'">
                <i class="fa-solid fa-map-location-dot"></i> Xem Trên Bản Đồ
            </button>
        </div>
    `;

    modal.classList.remove("hidden");
}

// Tính số người đang tham gia một hoạt động.
// currentParticipants là số liệu gốc (đã gồm những hoạt động người dùng đăng ký sẵn từ đầu);
// nếu người dùng vừa đăng ký thêm / hủy thì cộng / trừ 1 để số liệu luôn khớp.
function getActivityParticipantCount(act) {
    const base = act.currentParticipants || 1;
    if (typeof myJoinedActivityIds === "undefined") {
        return base;
    }
    const initial = (typeof initialJoinedActivityIds !== "undefined") ? initialJoinedActivityIds : [];
    const joinedNow = myJoinedActivityIds.includes(act.id);
    const joinedAtStart = initial.includes(act.id);
    if (joinedNow && !joinedAtStart) {
        return base + 1;
    }
    if (!joinedNow && joinedAtStart) {
        return Math.max(base - 1, 0);
    }
    return base;
}

// Vẽ khối "đã tham gia X/Y người" kèm thanh tiến độ (dùng cho thẻ hoạt động)
function buildParticipantsHtml(act) {
    const count = getActivityParticipantCount(act);
    const max = act.maxParticipants || 0;
    if (!max) {
        return `<div class="participants-box"><div class="participants-text"><i class="fa-solid fa-user-group"></i> <strong>${count}</strong> người đã tham gia</div></div>`;
    }
    const percent = Math.min(100, Math.round((count / max) * 100));
    const isFull = count >= max;
    return `
        <div class="participants-box">
            <div class="participants-text">
                <span><i class="fa-solid fa-user-group"></i> <strong>${count}/${max}</strong> người đã tham gia</span>
                ${isFull ? '<span class="participants-full">Đã đủ người</span>' : '<span>Còn ' + (max - count) + ' chỗ</span>'}
            </div>
            <div class="participants-bar"><div class="participants-bar-fill ${isFull ? 'full' : ''}" style="width:${percent}%;"></div></div>
        </div>
    `;
}

// Mở modal xem chi tiết Hoạt Động
function openActivityDetailModal(activityId, customList) {
    const sourceList = customList || ((typeof activitiesList !== "undefined") ? activitiesList : []);
    const act = sourceList.find(function (item) { return item.id === activityId; });
    if (!act) {
        return;
    }

    const headerTitle = document.getElementById("detailModalHeaderTitle");
    const modalBody = document.getElementById("detailModalBody");
    const modal = document.getElementById("detailInfoModal");
    if (!headerTitle || !modalBody || !modal) {
        return;
    }

    headerTitle.innerHTML = `<i class="fa-solid fa-person-running" style="color: var(--accent-orange);"></i> Chi Tiết Hoạt Động`;

    const participantsText = act.maxParticipants
        ? `${getActivityParticipantCount(act)}/${act.maxParticipants} người đã tham gia`
        : "Mở đăng ký tự do";

    modalBody.innerHTML = `
        <div class="detail-hero-img">
            <img src="${act.image}" alt="${act.title}">
            <span class="detail-hero-badge">${act.costLabel} • ${act.level}</span>
        </div>
        <h2 class="detail-title">${act.title}</h2>
        <p class="detail-desc">${act.description || "Buổi giao lưu thể thao cộng đồng ngoài trời tại công viên Hà Nội."}</p>

        <div class="detail-info-grid">
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-tree" style="color: var(--accent-teal);"></i> Địa điểm công viên</span>
                <span class="detail-info-val">${act.park}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-map-pin" style="color: var(--accent-orange);"></i> Điểm tập trung</span>
                <span class="detail-info-val">${act.meetingPoint || act.park}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-regular fa-calendar-days" style="color: #60a5fa;"></i> Thời gian tổ chức</span>
                <span class="detail-info-val">${act.date ? act.date + ' • ' : ''}${act.schedule}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-user-group" style="color: #a78bfa;"></i> Số lượng &amp; Trình độ</span>
                <span class="detail-info-val">${participantsText} (${act.level})</span>
            </div>
        </div>

        <div class="detail-section">
            <h4>Người tổ chức &amp; Lưu ý chuẩn bị</h4>
            <ul class="detail-facility-list">
                <li><i class="fa-solid fa-user-tie" style="color: var(--accent-teal);"></i> Phụ trách: <strong>${act.organizer || "Ban điều hành SportPark"}</strong></li>
                <li><i class="fa-solid fa-circle-exclamation" style="color: var(--accent-orange);"></i> ${act.equipmentNote || "Mang theo trang phục thể thao thoải mái và nước uống cá nhân."}</li>
            </ul>
        </div>

        <div class="detail-modal-footer">
            <button type="button" class="btn-cancel" onclick="closeDetailModal()">Đóng</button>
            <button type="button" class="btn-save" onclick="handleJoinFromDetailModal(${act.id}, '${act.title.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-check"></i> Tham Gia Hoạt Động
            </button>
        </div>
    `;

    modal.classList.remove("hidden");
}

// Mở modal xem chi tiết Nhóm / Câu lạc bộ (bố cục riêng cho nhóm: trưởng nhóm, nội quy, thành viên, hoạt động của nhóm)
function openGroupDetailModal(groupId, customList) {
    const sourceList = customList || ((typeof groupsList !== "undefined") ? groupsList : []);
    const grp = sourceList.find(function (item) { return item.id === groupId; });
    if (!grp) {
        return;
    }

    const headerTitle = document.getElementById("detailModalHeaderTitle");
    const modalBody = document.getElementById("detailModalBody");
    const modal = document.getElementById("detailInfoModal");
    if (!headerTitle || !modalBody || !modal) {
        return;
    }

    headerTitle.innerHTML = `<i class="fa-solid fa-users" style="color: var(--accent-orange);"></i> Chi Tiết Nhóm`;

    const leader = grp.leader || "Hào Chu Văn";
    const highlights = (grp.highlights && grp.highlights.length > 0) ? grp.highlights : [
        "Sinh hoạt định kỳ theo lịch của nhóm",
        "Kết nối những người cùng sở thích tại công viên"
    ];
    const rules = (grp.rules && grp.rules.length > 0) ? grp.rules : [
        "Tôn trọng các thành viên và tuân thủ hướng dẫn của trưởng nhóm",
        "Báo trước khi vắng mặt và giữ gìn vệ sinh chung"
    ];

    let highlightsHtml = "";
    highlights.forEach(function (text) {
        highlightsHtml += `<li><i class="fa-solid fa-star" style="color: var(--accent-orange);"></i> ${text}</li>`;
    });

    let rulesHtml = "";
    rules.forEach(function (text) {
        rulesHtml += `<li><i class="fa-solid fa-circle-check" style="color: var(--accent-teal);"></i> ${text}</li>`;
    });

    // Avatar thành viên tiêu biểu (lấy chữ cái cuối của tên)
    const previewNames = (grp.memberPreview && grp.memberPreview.length > 0) ? grp.memberPreview : [leader];
    let avatarsHtml = "";
    previewNames.forEach(function (name) {
        const initial = name.trim().split(" ").pop().charAt(0).toUpperCase();
        avatarsHtml += `<span class="member-avatar" title="${name}">${initial}</span>`;
    });
    const extraMembers = Math.max(grp.members - previewNames.length, 0);
    if (extraMembers > 0) {
        avatarsHtml += `<span class="member-avatar member-avatar-more">+${extraMembers}</span>`;
    }

    // Hoạt động sắp tới của nhóm: cùng môn và cùng công viên
    let groupActivities = [];
    if (typeof activitiesList !== "undefined") {
        groupActivities = activitiesList.filter(function (act) {
            return act.sport === grp.sport && act.park === grp.park;
        });
    }
    let activitiesHtml = "";
    if (groupActivities.length === 0) {
        activitiesHtml = `<li><i class="fa-regular fa-calendar" style="color: var(--text-muted);"></i> Nhóm chưa đăng lịch hoạt động cụ thể. Lịch sinh hoạt định kỳ: ${grp.schedule}</li>`;
    } else {
        groupActivities.forEach(function (act) {
            activitiesHtml += `<li><i class="fa-regular fa-calendar-check" style="color: #60a5fa;"></i> <span><strong>${act.title}</strong> • ${act.date ? act.date + ' • ' : ''}${act.schedule}</span></li>`;
        });
    }

    const joined = (typeof myJoinedGroupIds !== "undefined") && myJoinedGroupIds.includes(grp.id);
    const safeName = grp.name.replace(/'/g, "\\'");
    const joinButton = joined
        ? `<button type="button" class="btn-save" disabled style="opacity:0.7; cursor:default;"><i class="fa-solid fa-check"></i> Đã Gửi Yêu Cầu / Tham Gia</button>`
        : `<button type="button" class="btn-save" onclick="handleJoinFromGroupModal(${grp.id}, '${safeName}')"><i class="fa-solid fa-user-plus"></i> Xin Tham Gia Nhóm</button>`;

    modalBody.innerHTML = `
        <div class="detail-hero-img">
            <img src="${grp.image}" alt="${grp.name}">
            <span class="detail-hero-badge">${grp.statusLabel} • ${grp.members} thành viên</span>
        </div>
        <h2 class="detail-title">${grp.name}</h2>
        <p class="detail-desc">${grp.description}</p>

        <div class="detail-info-grid">
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-user-tie" style="color: var(--accent-teal);"></i> Trưởng nhóm</span>
                <span class="detail-info-val">${leader}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-user-group" style="color: #a78bfa;"></i> Quy mô nhóm</span>
                <span class="detail-info-val">${grp.members} thành viên${grp.founded ? ' • Thành lập ' + grp.founded : ''}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-regular fa-calendar-days" style="color: #60a5fa;"></i> Lịch sinh hoạt</span>
                <span class="detail-info-val">${grp.schedule}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-location-dot" style="color: var(--accent-orange);"></i> Nơi sinh hoạt</span>
                <span class="detail-info-val">${grp.park}${grp.meetingPoint ? ' - ' + grp.meetingPoint : ''}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-chart-line" style="color: #34d399;"></i> Trình độ phù hợp</span>
                <span class="detail-info-val">${grp.level || "Mọi trình độ"}</span>
            </div>
            <div class="detail-info-item">
                <span class="detail-info-label"><i class="fa-solid fa-tags" style="color: #fbbf24;"></i> Chi phí tham gia</span>
                <span class="detail-info-val">${grp.fee || "Miễn phí"}</span>
            </div>
        </div>

        <div class="detail-section">
            <h4>Thành viên tiêu biểu</h4>
            <div class="member-avatars">${avatarsHtml}</div>
        </div>

        <div class="detail-section">
            <h4>Nhóm có gì nổi bật</h4>
            <ul class="detail-facility-list">${highlightsHtml}</ul>
        </div>

        <div class="detail-section">
            <h4>Hoạt động sắp tới của nhóm</h4>
            <ul class="detail-facility-list">${activitiesHtml}</ul>
        </div>

        <div class="detail-section">
            <h4>Nội quy nhóm</h4>
            <ul class="detail-facility-list">${rulesHtml}</ul>
        </div>

        <div class="detail-modal-footer">
            <button type="button" class="btn-cancel" onclick="closeDetailModal()">Đóng</button>
            ${joinButton}
        </div>
    `;

    modal.classList.remove("hidden");
}

function handleJoinFromGroupModal(groupId, groupName) {
    closeDetailModal();
    if (typeof requestJoinGroupById === "function") {
        requestJoinGroupById(groupId, groupName);
    } else {
        showToast('Đã gửi yêu cầu tham gia "' + groupName + '"!');
    }
}

function handleJoinFromDetailModal(activityId, activityTitle) {
    closeDetailModal();
    if (typeof joinActivityById === "function") {
        joinActivityById(activityId, activityTitle);
    } else {
        showToast('Đã đăng ký tham gia "' + activityTitle + '"!');
    }
}

function closeDetailModal() {
    const modal = document.getElementById("detailInfoModal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

function closeDetailModalOnBackdrop(event) {
    if (event.target && event.target.id === "detailInfoModal") {
        closeDetailModal();
    }
}

// Tự động tô sáng mục menu tương ứng với tên file HTML hiện tại
function highlightCurrentNavLink() {
    const pathParts = window.location.pathname.split("/");
    let currentFile = pathParts[pathParts.length - 1];
    if (currentFile === "" || currentFile === "html") {
        currentFile = "index.html";
    }

    const navLinks = document.querySelectorAll("#mainNavLinks a");
    navLinks.forEach(function (link) {
        const targetPage = link.getAttribute("data-page");
        if (targetPage === currentFile) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Khi bấm logo: nếu đang ở trang chủ thì đặt lại bộ lọc, nếu ở trang khác thì về index.html
function handleLogoClick() {
    if (typeof resetHomeFilters === "function") {
        resetHomeFilters();
    } else {
        window.location.href = "index.html";
    }
}

// Hiển thị thông báo ngắn ở góc dưới bên phải trong 3 giây
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toastMsg");
    if (!toast || !toastMsg) {
        return;
    }

    toastMsg.innerText = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}
