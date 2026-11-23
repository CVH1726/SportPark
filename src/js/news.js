// Trang Tin tức: hiển thị toàn bộ tin, mới nhất xếp trên cùng
let currentNewsCategory = "all";

document.addEventListener("DOMContentLoaded", function () {
    renderNewsCategoryBar();
    renderNewsPage();
    setupNewsSearch();
});

// Tạo các nút lọc theo chuyên mục từ chính dữ liệu tin tức
function renderNewsCategoryBar() {
    const bar = document.getElementById("newsCategoryBar");
    if (!bar) {
        return;
    }

    const categories = [];
    newsList.forEach(function (item) {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
    });

    let html = `<button type="button" class="news-chip ${currentNewsCategory === 'all' ? 'active' : ''}" onclick="setNewsCategory('all')">Tất cả (${newsList.length})</button>`;
    categories.forEach(function (cat) {
        const count = newsList.filter(function (n) { return n.category === cat; }).length;
        html += `<button type="button" class="news-chip ${currentNewsCategory === cat ? 'active' : ''}" onclick="setNewsCategory('${cat}')">${cat} (${count})</button>`;
    });
    bar.innerHTML = html;
}

function setNewsCategory(category) {
    currentNewsCategory = category;
    renderNewsCategoryBar();
    renderNewsPage();
}

// Vẽ danh sách tin theo chuyên mục + từ khóa ở ô tìm kiếm trên header
function renderNewsPage() {
    const grid = document.getElementById("newsGrid");
    const countText = document.getElementById("newsCountText");
    if (!grid) {
        return;
    }

    const searchInput = document.getElementById("globalSearchInput");
    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";

    // Luôn sắp xếp từ mới nhất đến cũ nhất; tin đầu tiên của TOÀN BỘ danh sách là "Mới nhất"
    const sortedAll = getSortedNews();
    const newestId = sortedAll.length > 0 ? sortedAll[0].id : null;

    const items = sortedAll.filter(function (item) {
        const matchCategory = (currentNewsCategory === "all") || (item.category === currentNewsCategory);
        const matchKeyword =
            keyword === "" ||
            item.title.toLowerCase().includes(keyword) ||
            item.summary.toLowerCase().includes(keyword) ||
            item.category.toLowerCase().includes(keyword);
        return matchCategory && matchKeyword;
    });

    if (countText) {
        countText.textContent = "Hiển thị " + items.length + " tin — sắp xếp từ mới nhất đến cũ nhất";
    }

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-activity-box" style="grid-column: 1 / -1;">
                <i class="fa-regular fa-newspaper" style="font-size: 26px; margin-bottom: 10px; color: #60a5fa;"></i>
                <p>Không có tin tức nào phù hợp.</p>
            </div>
        `;
        return;
    }

    let html = "";
    items.forEach(function (item, index) {
        html += buildNewsCardHtml(item, index === 0, item.id === newestId);
    });
    grid.innerHTML = html;
}

// Tìm kiếm ngay khi gõ vào ô tìm kiếm trên header
function setupNewsSearch() {
    const searchInput = document.getElementById("globalSearchInput");
    if (!searchInput) {
        return;
    }
    searchInput.addEventListener("keyup", renderNewsPage);
}
