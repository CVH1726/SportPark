// Biến lưu tháng/năm đang xem trên lịch chọn ngày mini
let calendarViewDate = new Date();

// Biến lưu chuỗi ngày người dùng đã chọn (định dạng dd/mm/yyyy)
let chosenDateText = "";

// Tự động chạy khi toàn bộ cấu trúc HTML của trang đã tải xong
document.addEventListener("DOMContentLoaded", function () {
    renderSharedHeader();
    renderSharedFooter();
    renderSharedModalAndToast();
    highlightCurrentNavLink();
});

// Tạo phần Header và thanh điều hướng dùng chung cho mọi trang
function renderSharedHeader() {
    const headerPlaceholder = document.getElementById("shared-header");
    if (!headerPlaceholder) {
        return;
    }

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
                        <button type="button" class="bell-btn" onclick="showToast('Bạn không có thông báo mới nào!')">
                            <i class="fa-regular fa-bell"></i>
                            <span class="bell-dot"></span>
                        </button>
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
                        <a href="account.html" data-page="account.html"><i class="fa-solid fa-user"></i> Tài Khoản</a>
                    </nav>
                    <button type="button" onclick="openActivityModal()" class="btn-primary">
                        <i class="fa-solid fa-plus"></i> Tạo Hoạt Động
                    </button>
                </div>
            </div>
        </header>
    `;
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
                    <a href="park.html">Về chúng tôi</a>
                    <a href="account.html">Liên hệ</a>
                    <a href="index.html">Điều khoản sử dụng</a>
                </div>
                <div class="footer-socials">
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
        </footer>
    `;
}

// Tạo cửa sổ Modal tạo hoạt động, lịch chọn ngày mini và khung thông báo Toast
function renderSharedModalAndToast() {
    const modalPlaceholder = document.getElementById("shared-modals");
    if (!modalPlaceholder) {
        return;
    }

    modalPlaceholder.innerHTML = `
        <div id="activityModal" class="modal-overlay hidden">
            <div class="modal-box">
                <div class="modal-header">
                    <h3><i class="fa-solid fa-pen-to-square" style="color:var(--accent-orange);"></i> Tạo hoạt động</h3>
                    <button type="button" onclick="closeActivityModal()"><i class="fa-solid fa-xmark"></i></button>
                </div>

                <div class="form-group">
                    <label>Tên hoạt động / Tên nhóm</label>
                    <input type="text" id="actTitleInput" placeholder="Ví dụ: Giao lưu cầu lông chiều T3" class="form-control">
                </div>

                <div class="form-group">
                    <label>Công viên chọn</label>
                    <select id="actParkSelect" class="form-control">
                        <option>Công viên Thống Nhất</option>
                        <option>Công viên Cầu Giấy</option>
                        <option>Công viên Nghĩa Đô</option>
                        <option>Công viên Bách Thảo</option>
                    </select>
                </div>

                <div class="form-grid-compact">
                    <div class="form-group">
                        <label>Môn thể thao</label>
                        <select id="actSportSelect" class="form-control">
                            <option>Cầu Lông</option>
                            <option>Chạy Bộ</option>
                            <option>Bóng Rổ</option>
                            <option>Gym / Calisthenics</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Chi phí</label>
                        <input type="text" id="actCostInput" placeholder="Miễn phí hoặc số tiền" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label>Ngày diễn ra</label>
                    <div class="date-picker-row">
                        <input type="text" id="regDate" readonly placeholder="Bấm để mở lịch chọn ngày" onclick="toggleMiniCalendar()" class="form-control" style="cursor:pointer;">
                        <button type="button" onclick="toggleMiniCalendar()" class="btn-calendar-toggle">
                            <i class="fa-regular fa-calendar-days"></i> Lịch
                        </button>
                    </div>

                    <div id="miniCalendar" class="mini-cal hidden">
                        <div class="mini-cal-header">
                            <button type="button" onclick="changeCalendarMonth(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                            <span id="calMonthLabel">Tháng 11 / 2026</span>
                            <button type="button" onclick="changeCalendarMonth(1)"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                        <div class="mini-cal-weekdays">
                            <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                        </div>
                        <div id="miniCalDays" class="mini-cal-days"></div>
                    </div>
                </div>

                <div class="form-grid-compact">
                    <div class="form-group">
                        <label>Giới hạn số người tham gia</label>
                        <input type="number" id="regMaxPeople" min="2" max="200" placeholder="Ví dụ: 12" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Trình độ</label>
                        <select id="regLevel" class="form-control">
                            <option value="Mọi trình độ">Mọi trình độ</option>
                            <option value="Mới bắt đầu">Mới bắt đầu</option>
                            <option value="Trung bình">Trung bình</option>
                            <option value="Nâng cao">Nâng cao</option>
                        </select>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" onclick="closeActivityModal()" class="btn-cancel">Hủy</button>
                    <button type="button" onclick="submitNewActivity()" class="btn-save">Đăng Ký</button>
                </div>
            </div>
        </div>

        <div id="toast">
            <i class="fa-solid fa-circle-check" style="font-size: 16px;"></i>
            <span id="toastMsg">Thao tác thành công!</span>
        </div>
    `;
}

// Tự động tô sáng mục menu tương ứng với tên file HTML hiện tại
function highlightCurrentNavLink() {
    const pathParts = window.location.pathname.split("/");
    let currentFile = pathParts[pathParts.length - 1];
    if (currentFile === "") {
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

// Mở hộp thoại tạo hoạt động
function openActivityModal() {
    const modal = document.getElementById("activityModal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

// Đóng hộp thoại tạo hoạt động và ẩn luôn lịch mini nếu đang mở
function closeActivityModal() {
    const modal = document.getElementById("activityModal");
    const calendar = document.getElementById("miniCalendar");
    if (modal) {
        modal.classList.add("hidden");
    }
    if (calendar) {
        calendar.classList.add("hidden");
    }
}

// Xử lý khi bấm nút Đăng Ký trong Modal tạo hoạt động
function submitNewActivity() {
    closeActivityModal();
    showToast("Đăng ký hoạt động thành công!");
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

// Bật hoặc tắt lịch chọn ngày mini
function toggleMiniCalendar() {
    const calendar = document.getElementById("miniCalendar");
    if (!calendar) {
        return;
    }

    calendar.classList.toggle("hidden");
    if (!calendar.classList.contains("hidden")) {
        renderMiniCalendar();
    }
}

// Chuyển sang tháng trước (step = -1) hoặc tháng sau (step = 1)
function changeCalendarMonth(step) {
    calendarViewDate.setMonth(calendarViewDate.getMonth() + step);
    renderMiniCalendar();
}

// Vẽ các ô ngày của tháng hiện tại vào lịch mini
function renderMiniCalendar() {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth(); // Tháng tính từ 0 (Tháng 1) đến 11 (Tháng 12)

    const monthLabel = document.getElementById("calMonthLabel");
    const daysContainer = document.getElementById("miniCalDays");
    if (!monthLabel || !daysContainer) {
        return;
    }

    monthLabel.innerText = "Tháng " + (month + 1) + " / " + year;
    daysContainer.innerHTML = "";

    /*
       getDay() của JS trả về 0 cho Chủ Nhật, 1 cho Thứ 2... 6 cho Thứ 7.
       Công thức (firstDay + 6) % 7 giúp đổi Thứ 2 thành vị trí 0, Chủ Nhật thành vị trí 6
       để hàng thứ trong lịch luôn bắt đầu từ Thứ 2 (T2 -> CN).
    */
    const firstDayInWeek = new Date(year, month, 1).getDay();
    const emptyCellsCount = (firstDayInWeek + 6) % 7;
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const now = new Date();
    const todayString =
        String(now.getDate()).padStart(2, "0") + "/" +
        String(now.getMonth() + 1).padStart(2, "0") + "/" +
        now.getFullYear();

    // Tạo các ô trống trước ngày mùng 1
    for (let i = 0; i < emptyCellsCount; i++) {
        const emptySpan = document.createElement("span");
        emptySpan.className = "cal-day empty";
        daysContainer.appendChild(emptySpan);
    }

    // Tạo nút chọn cho từng ngày trong tháng
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const formattedDate =
            String(day).padStart(2, "0") + "/" +
            String(month + 1).padStart(2, "0") + "/" +
            year;

        const dayBtn = document.createElement("button");
        dayBtn.type = "button";
        dayBtn.className = "cal-day";
        dayBtn.innerText = day;

        if (formattedDate === todayString) {
            dayBtn.classList.add("today");
        }
        if (formattedDate === chosenDateText) {
            dayBtn.classList.add("selected");
        }

        dayBtn.onclick = function () {
            chosenDateText = formattedDate;
            document.getElementById("regDate").value = formattedDate;
            document.getElementById("miniCalendar").classList.add("hidden");
        };

        daysContainer.appendChild(dayBtn);
    }
}