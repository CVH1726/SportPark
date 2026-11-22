// Danh sách các địa điểm thể thao trên bản đồ tại Hà Nội
const sportLocations = [
    {
        id: 1,
        name: "Công viên Thống Nhất",
        sport: "cầu lông",
        park: "Thống Nhất",
        time: "tối",
        cost: "miễn phí",
        level: "mới bắt đầu",
        lat: 21.0135,
        lng: 105.8450,
        address: "Hồ Bảy Mẫu, Hai Bà Trưng",
        color: "#10b981",
        icon: "fa-table-tennis-paddle-ball"
    },
    {
        id: 2,
        name: "Công viên Thống Nhất",
        sport: "chạy bộ",
        park: "Thống Nhất",
        time: "sáng",
        cost: "miễn phí",
        level: "mọi trình độ",
        lat: 21.0150,
        lng: 105.8430,
        address: "Đường chạy quanh hồ",
        color: "#2563eb",
        icon: "fa-person-running"
    },
    {
        id: 3,
        name: "Công viên Cầu Giấy",
        sport: "chạy bộ",
        park: "Cầu Giấy",
        time: "sáng",
        cost: "miễn phí",
        level: "trung bình",
        lat: 21.0227,
        lng: 105.7937,
        address: "Khu thể thao Cầu Giấy",
        color: "#2563eb",
        icon: "fa-person-running"
    },
    {
        id: 4,
        name: "Sân Bóng Rổ Cầu Giấy",
        sport: "bóng rổ",
        park: "Cầu Giấy",
        time: "chiều",
        cost: "có phí",
        level: "nâng cao",
        lat: 21.0240,
        lng: 105.7950,
        address: "Sân bóng rổ tiêu chuẩn",
        color: "#d97706",
        icon: "fa-basketball"
    },
    {
        id: 5,
        name: "Công viên Nghĩa Đô",
        sport: "gym",
        park: "Nghĩa Đô",
        time: "sáng",
        cost: "có phí",
        level: "mới bắt đầu",
        lat: 21.0422,
        lng: 105.7985,
        address: "Khu Calisthenics Nghĩa Đô",
        color: "#8b5cf6",
        icon: "fa-dumbbell"
    }
];

// Danh sách các thẻ địa điểm nổi bật ở thanh trượt Trang chủ
const featuredSpots = [
    {
        parkKey: "Thống Nhất",
        sportKey: "cầu lông",
        title: "Công viên Thống Nhất",
        subtitle: "Sân Cầu Lông ngoài trời",
        image: "https://baomoi-photo-fbcrawler.bmcdn.me/w1200_r3x2/2025_04_18_294_52008334/3cca165f4c11a54ffc00.jpg",
        badgeColor: "#10b981",
        icon: "fa-table-tennis-paddle-ball"
    },
    {
        parkKey: "Thống Nhất",
        sportKey: "chạy bộ",
        title: "Công viên Thống Nhất",
        subtitle: "Đường Chạy hồ Bảy Mẫu",
        image: "https://baomoi-photo-fbcrawler.bmcdn.me/w1200_r3x2/2025_04_18_294_52008334/3cca165f4c11a54ffc00.jpg",
        badgeColor: "#2563eb",
        icon: "fa-person-running"
    },
    {
        parkKey: "Cầu Giấy",
        sportKey: "chạy bộ",
        title: "Công viên Cầu Giấy",
        subtitle: "Khu tập thể thao đa năng",
        image: "https://cdn-images.vtv.vn/thumb_w/730/66349b6076cb4dee98746cf1/2025/11/02/z7143901566081-45254a2e5361b66613c51d0c05c82022-46954429118544025859239-16207647683828488864725.jpg",
        badgeColor: "#2563eb",
        icon: "fa-person-running"
    },
    {
        parkKey: "Cầu Giấy",
        sportKey: "bóng rổ",
        title: "Sân Bóng Rổ Cầu Giấy",
        subtitle: "Sân bóng rổ tự do",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=400",
        badgeColor: "#d97706",
        icon: "fa-basketball"
    }
];

// Danh sách các hoạt động thể thao
const activitiesList = [
    {
        id: 1,
        title: "Cầu lông & Cộng Đồng",
        sport: "cầu lông",
        park: "Công viên Thống Nhất",
        schedule: "Thứ 3 & 5, 18:00 - 20:00",
        costLabel: "Miễn phí",
        badgeStyle: "",
        level: "Người mới",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=400",
        badgeColor: "#10b981",
        icon: "fa-table-tennis-paddle-ball"
    },
    {
        id: 2,
        title: "CLB Chạy Bộ Hoàng Thành",
        sport: "chạy bộ",
        park: "Công viên Nghĩa Đô",
        schedule: "Thứ 7 & CN, 06:00 - 08:00",
        costLabel: "Miễn phí",
        badgeStyle: "badge-blue",
        level: "Mọi trình độ",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=400",
        badgeColor: "#2563eb",
        icon: "fa-person-running"
    },
    {
        id: 3,
        title: "Giao Lưu Bóng Rổ Cuối Tuần",
        sport: "bóng rổ",
        park: "Sân Bóng Rổ Cầu Giấy",
        schedule: "Chủ Nhật, 16:00 - 18:00",
        costLabel: "Có phí (50k)",
        badgeStyle: "badge-paid",
        level: "Trung bình",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=400",
        badgeColor: "#d97706",
        icon: "fa-basketball"
    }
];

// Danh sách các công viên tại Hà Nội
const parksList = [
    {
        slug: "thong-nhat",
        district: "Quận Hai Bà Trưng",
        name: "Công viên Thống Nhất",
        description: "Khuôn viên rộng lớn với hồ Bảy Mẫu, sở hữu sân cầu lông ngoài trời, đường chạy bộ và khu tập thể thao.",
        image: "https://baomoi-photo-fbcrawler.bmcdn.me/w1200_r3x2/2025_04_18_294_52008334/3cca165f4c11a54ffc00.jpg",
        sports: [
            { name: "Cầu lông", icon: "fa-table-tennis-paddle-ball", color: "#f97316" },
            { name: "Chạy bộ", icon: "fa-person-running", color: "#2563eb" },
            { name: "Gym", icon: "fa-dumbbell", color: "#8b5cf6" }
        ]
    },
    {
        slug: "cau-giay",
        district: "Quận Cầu Giấy",
        name: "Công viên Cầu Giấy",
        description: "Công viên hiện đại, không gian xanh thoáng mát, nổi tiếng với các sân bóng rổ tiêu chuẩn và khu vận động ngoài trời.",
        image: "https://cdn-images.vtv.vn/thumb_w/730/66349b6076cb4dee98746cf1/2025/11/02/z7143901566081-45254a2e5361b66613c51d0c05c82022-46954429118544025859239-16207647683828488864725.jpg",
        sports: [
            { name: "Bóng rổ", icon: "fa-basketball", color: "#d97706" },
            { name: "Chạy bộ", icon: "fa-person-running", color: "#2563eb" }
        ]
    },
    {
        slug: "nghia-do",
        district: "Quận Cầu Giấy",
        name: "Công viên Nghĩa Đô",
        description: "Nơi lý tưởng để tập luyện Calisthenics, đi dạo và tham gia các CLB chạy bộ cộng đồng vào mỗi buổi sáng.",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=400",
        sports: [
            { name: "Gym / Calisthenics", icon: "fa-dumbbell", color: "#8b5cf6" },
            { name: "Chạy bộ", icon: "fa-person-running", color: "#2563eb" }
        ]
    }
];

// Danh sách các nhóm và câu lạc bộ thể thao
const groupsList = [
    {
        id: 1,
        name: "CLB Cầu Lông Thống Nhất",
        sport: "cầu lông",
        statusLabel: "Hoạt động công khai",
        badgeStyle: "",
        members: 35,
        park: "Công viên Thống Nhất",
        description: "Nhóm quy tụ những người yêu thích môn cầu lông, giao lưu định kỳ vào các buổi chiều tối trong tuần.",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=400",
        badgeColor: "#10b981",
        icon: "fa-table-tennis-paddle-ball"
    },
    {
        id: 2,
        name: "CLB Chạy Bộ Hoàng Thành",
        sport: "chạy bộ",
        statusLabel: "Hoạt động công khai",
        badgeStyle: "badge-blue",
        members: 120,
        park: "Công viên Nghĩa Đô",
        description: "Chuyên tổ chức các buổi chạy dài vào cuối tuần, rèn luyện sức khỏe và chinh phục các giải chạy phong trào.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=400",
        badgeColor: "#2563eb",
        icon: "fa-person-running"
    },
    {
        id: 3,
        name: "Cầu Giấy Basketball Group",
        sport: "bóng rổ",
        statusLabel: "Cần phê duyệt",
        badgeStyle: "badge-paid",
        members: 48,
        park: "Công viên Cầu Giấy",
        description: "Giao lưu bóng rổ 3x3 và 5x5 vào các buổi chiều tối, rèn luyện kỹ thuật và thi đấu cọ xát.",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=400",
        badgeColor: "#d97706",
        icon: "fa-basketball"
    }
];