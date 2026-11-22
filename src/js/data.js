// Danh sách các địa điểm thể thao trên bản đồ tại Hà Nội
const sportLocations = [
    {
        id: 1,
        name: "Công viên Thống Nhất - Sân Cầu Lông",
        sport: "cầu lông",
        park: "Thống Nhất",
        district: "Quận Hai Bà Trưng",
        date: "2026-11-24",
        startHour: "18:00",
        endHour: "20:00",
        time: "tối",
        cost: "miễn phí",
        costAmount: 0,
        level: "mới bắt đầu",
        maxPeople: 12,
        lat: 21.0135,
        lng: 105.8450,
        address: "Hồ Bảy Mẫu, Hai Bà Trưng, Hà Nội",
        color: "#10b981",
        icon: "fa-table-tennis-paddle-ball"
    },
    {
        id: 2,
        name: "Công viên Thống Nhất - Đường Chạy Bộ",
        sport: "chạy bộ",
        park: "Thống Nhất",
        district: "Quận Hai Bà Trưng",
        date: "2026-11-23",
        startHour: "06:00",
        endHour: "08:00",
        time: "sáng",
        cost: "miễn phí",
        costAmount: 0,
        level: "mọi trình độ",
        maxPeople: 30,
        lat: 21.0150,
        lng: 105.8430,
        address: "Đường chạy quanh hồ Bảy Mẫu, Hai Bà Trưng",
        color: "#2563eb",
        icon: "fa-person-running"
    },
    {
        id: 3,
        name: "Công viên Cầu Giấy - Khu Chạy Bộ",
        sport: "chạy bộ",
        park: "Cầu Giấy",
        district: "Quận Cầu Giấy",
        date: "2026-11-25",
        startHour: "06:30",
        endHour: "08:30",
        time: "sáng",
        cost: "miễn phí",
        costAmount: 0,
        level: "trung bình",
        maxPeople: 25,
        lat: 21.0227,
        lng: 105.7937,
        address: "Khu thể thao Cầu Giấy, Dịch Vọng, Cầu Giấy",
        color: "#2563eb",
        icon: "fa-person-running"
    },
    {
        id: 4,
        name: "Sân Bóng Rổ Công viên Cầu Giấy",
        sport: "bóng rổ",
        park: "Cầu Giấy",
        district: "Quận Cầu Giấy",
        date: "2026-11-26",
        startHour: "16:00",
        endHour: "18:00",
        time: "chiều",
        cost: "có phí",
        costAmount: 50000,
        level: "nâng cao",
        maxPeople: 10,
        lat: 21.0240,
        lng: 105.7950,
        address: "Sân bóng rổ tiêu chuẩn, Công viên Cầu Giấy",
        color: "#d97706",
        icon: "fa-basketball"
    },
    {
        id: 5,
        name: "Công viên Nghĩa Đô - Khu Calisthenics",
        sport: "gym",
        park: "Nghĩa Đô",
        district: "Quận Cầu Giấy",
        date: "2026-11-24",
        startHour: "07:00",
        endHour: "09:00",
        time: "sáng",
        cost: "có phí",
        costAmount: 30000,
        level: "mới bắt đầu",
        maxPeople: 15,
        lat: 21.0422,
        lng: 105.7985,
        address: "Khu Calisthenics Nghĩa Đô, Nguyễn Văn Huyên, Cầu Giấy",
        color: "#8b5cf6",
        icon: "fa-dumbbell"
    },
    {
        id: 6,
        name: "Công viên Hòa Bình - Đường Đạp Xe & Chạy",
        sport: "đạp xe",
        park: "Hòa Bình",
        district: "Quận Bắc Từ Liêm",
        date: "2026-11-28",
        startHour: "06:00",
        endHour: "09:00",
        time: "sáng",
        cost: "miễn phí",
        costAmount: 0,
        level: "mọi trình độ",
        maxPeople: 20,
        lat: 21.0645,
        lng: 105.7872,
        address: "Đường Phạm Văn Đồng, Xuân Đỉnh, Bắc Từ Liêm",
        color: "#0d9488",
        icon: "fa-bicycle"
    },
    {
        id: 7,
        name: "Công viên Yên Sở - Bãi Cỏ Yoga & Bóng Đá",
        sport: "yoga",
        park: "Yên Sở",
        district: "Quận Hoàng Mai",
        date: "2026-11-29",
        startHour: "16:30",
        endHour: "18:30",
        time: "chiều",
        cost: "có phí",
        costAmount: 80000,
        level: "mới bắt đầu",
        maxPeople: 18,
        lat: 20.9628,
        lng: 105.8458,
        address: "Quốc lộ 1A, Gamuda Central, Hoàng Mai",
        color: "#ec4899",
        icon: "fa-spa"
    }
];

// Danh sách các thẻ địa điểm nổi bật ở thanh trượt Trang chủ
const featuredSpots = [
    {
        parkSlug: "thong-nhat",
        parkKey: "Thống Nhất",
        sportKey: "cầu lông",
        title: "Công viên Thống Nhất",
        subtitle: "Sân Cầu Lông ngoài trời",
        image: "https://baomoi-photo-fbcrawler.bmcdn.me/w1200_r3x2/2025_04_18_294_52008334/3cca165f4c11a54ffc00.jpg",
        badgeColor: "#10b981",
        icon: "fa-table-tennis-paddle-ball"
    },
    {
        parkSlug: "thong-nhat",
        parkKey: "Thống Nhất",
        sportKey: "chạy bộ",
        title: "Công viên Thống Nhất",
        subtitle: "Đường Chạy hồ Bảy Mẫu",
        image: "https://baomoi-photo-fbcrawler.bmcdn.me/w1200_r3x2/2025_04_18_294_52008334/3cca165f4c11a54ffc00.jpg",
        badgeColor: "#2563eb",
        icon: "fa-person-running"
    },
    {
        parkSlug: "cau-giay",
        parkKey: "Cầu Giấy",
        sportKey: "chạy bộ",
        title: "Công viên Cầu Giấy",
        subtitle: "Khu tập thể thao đa năng",
        image: "https://cdn-images.vtv.vn/thumb_w/730/66349b6076cb4dee98746cf1/2025/11/02/z7143901566081-45254a2e5361b66613c51d0c05c82022-46954429118544025859239-16207647683828488864725.jpg",
        badgeColor: "#2563eb",
        icon: "fa-person-running"
    },
    {
        parkSlug: "cau-giay",
        parkKey: "Cầu Giấy",
        sportKey: "bóng rổ",
        title: "Sân Bóng Rổ Cầu Giấy",
        subtitle: "Sân bóng rổ tiêu chuẩn",
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
        meetingPoint: "Cổng Trần Nhân Tông - Khu sân cầu lông ven hồ Bảy Mẫu",
        date: "24/11/2026",
        schedule: "Thứ 3 & 5, 18:00 - 20:00",
        costLabel: "Miễn phí",
        costAmount: 0,
        badgeStyle: "",
        level: "Người mới",
        currentParticipants: 8,
        maxParticipants: 12,
        organizer: "Minh Tuấn (CLB Cầu Lông Thống Nhất)",
        equipmentNote: "Tự chuẩn bị vợt cầu lông và giày đế mềm; nhóm hỗ trợ cầu tập.",
        description: "Buổi giao lưu đánh đôi và rèn luyện kỹ thuật cơ bản dành cho người mới bắt đầu. Không khí vui vẻ, cởi mở, có người hướng dẫn luật và cách di chuyển sân.",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600",
        badgeColor: "#10b981",
        icon: "fa-table-tennis-paddle-ball"
    },
    {
        id: 2,
        title: "CLB Chạy Bộ Hoàng Thành",
        sport: "chạy bộ",
        park: "Công viên Nghĩa Đô",
        meetingPoint: "Cổng chính đường Nguyễn Văn Huyên - Đài phun nước",
        date: "23/11/2026",
        schedule: "Thứ 7 & CN, 06:00 - 08:00",
        costLabel: "Miễn phí",
        costAmount: 0,
        badgeStyle: "badge-blue",
        level: "Mọi trình độ",
        currentParticipants: 19,
        maxParticipants: 30,
        organizer: "Lan Anh (Runner Hà Nội)",
        equipmentNote: "Trang phục chạy bộ thoáng khí, bình nước cá nhân.",
        description: "Chạy bền cự ly 5km - 10km theo các nhóm tốc độ (pace 5:30, 6:30 và nhóm đi bộ nhanh). Có phần khởi động chung và giãn cơ cuối buổi.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600",
        badgeColor: "#2563eb",
        icon: "fa-person-running"
    },
    {
        id: 3,
        title: "Giao Lưu Bóng Rổ Cuối Tuần",
        sport: "bóng rổ",
        park: "Công viên Cầu Giấy",
        meetingPoint: "Sân bóng rổ số 2 - Gần khu vui chơi trẻ em",
        date: "26/11/2026",
        schedule: "Chủ Nhật, 16:00 - 18:00",
        costLabel: "Có phí (50k)",
        costAmount: 50000,
        badgeStyle: "badge-paid",
        level: "Trung bình",
        currentParticipants: 7,
        maxParticipants: 10,
        organizer: "Hoàng Nam (Cầu Giấy Basketball)",
        equipmentNote: "Chi phí 50.000đ/người bao gồm tiền nước uống, bóng thi đấu và áo bib chia đội.",
        description: "Chia đội thi đấu giao hữu 3x3 và 5x5 nửa sân. Yêu cầu nắm vững luật cơ bản và tinh thần fair-play, không va chạm nguy hiểm.",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=600",
        badgeColor: "#d97706",
        icon: "fa-basketball"
    }
];

// Danh sách các công viên tại Hà Nội
const parksList = [
    {
        slug: "thong-nhat",
        district: "Quận Hai Bà Trưng",
        ward: "Phường Lê Đại Hành",
        name: "Công viên Thống Nhất",
        address: "Số 354A Lê Duẩn, Phường Phương Liên / Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội",
        openHours: "05:00 - 22:00 hàng ngày",
        areaSize: "50,8 ha (bao gồm Hồ Bảy Mẫu)",
        crowdLevel: "trung bình",
        crowdLabel: "Trung bình",
        distanceKm: 2.4,
        rating: 4.8,
        description: "Khuôn viên rộng lớn với hồ Bảy Mẫu, sở hữu sân cầu lông ngoài trời, đường chạy bộ quanh hồ dài 2,2km và khu tập thể thao nhiều cây xanh.",
        facilities: [
            "Đường chạy bộ ven hồ dài 2,2 km mặt nhựa phẳng",
            "6 sân cầu lông ngoài trời có chắn gió tự nhiên",
            "Khu xà đơn, xà kép và máy tập thể dục công cộng",
            "Bãi gửi xe máy/ô tô tại cổng Trần Nhân Tông và Đại Cồ Việt",
            "Nhà vệ sinh công cộng và quầy nước giải khát"
        ],
        image: "https://baomoi-photo-fbcrawler.bmcdn.me/w1200_r3x2/2025_04_18_294_52008334/3cca165f4c11a54ffc00.jpg",
        sports: [
            { key: "cầu lông", name: "Cầu lông", icon: "fa-table-tennis-paddle-ball", color: "#10b981" },
            { key: "chạy bộ", name: "Chạy bộ", icon: "fa-person-running", color: "#2563eb" },
            { key: "gym", name: "Gym / Calisthenics", icon: "fa-dumbbell", color: "#8b5cf6" }
        ]
    },
    {
        slug: "cau-giay",
        district: "Quận Cầu Giấy",
        ward: "Phường Dịch Vọng",
        name: "Công viên Cầu Giấy",
        address: "Phố Thành Thái, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội",
        openHours: "05:00 - 22:30 hàng ngày",
        areaSize: "6,5 ha",
        crowdLevel: "đông đúc",
        crowdLabel: "Đông đúc",
        distanceKm: 5.1,
        rating: 4.7,
        description: "Công viên hiện đại, không gian xanh thoáng mát, nổi tiếng với các sân bóng rổ tiêu chuẩn, sân cỏ nhân tạo và khu vận động ngoài trời.",
        facilities: [
            "2 sân bóng rổ ngoài trời tiêu chuẩn có đèn chiếu sáng buổi tối",
            "Đường chạy bộ vòng quanh hồ điều hòa dài 1,1 km",
            "Khu bãi cỏ rộng phù hợp tập Yoga, Aerobic và giãn cơ",
            "Bãi đỗ xe rộng ngay cổng chính phố Thành Thái"
        ],
        image: "https://cdn-images.vtv.vn/thumb_w/730/66349b6076cb4dee98746cf1/2025/11/02/z7143901566081-45254a2e5361b66613c51d0c05c82022-46954429118544025859239-16207647683828488864725.jpg",
        sports: [
            { key: "bóng rổ", name: "Bóng rổ", icon: "fa-basketball", color: "#d97706" },
            { key: "chạy bộ", name: "Chạy bộ", icon: "fa-person-running", color: "#2563eb" },
            { key: "yoga", name: "Yoga ngoài trời", icon: "fa-spa", color: "#ec4899" }
        ]
    },
    {
        slug: "nghia-do",
        district: "Quận Cầu Giấy",
        ward: "Phường Nghĩa Đô",
        name: "Công viên Nghĩa Đô",
        address: "Đường Nguyễn Văn Huyên, Phường Nghĩa Đô, Quận Cầu Giấy, Hà Nội",
        openHours: "05:00 - 22:00 hàng ngày",
        areaSize: "4,7 ha",
        crowdLevel: "thoáng đãng",
        crowdLabel: "Thoáng đãng",
        distanceKm: 6.3,
        rating: 4.6,
        description: "Nơi lý tưởng để tập luyện Calisthenics, đi dạo, đánh cầu lông và tham gia các CLB chạy bộ cộng đồng vào mỗi buổi sáng.",
        facilities: [
            "Tổ hợp xà đơn, xà kép chuyên dụng cho cộng đồng Calisthenics",
            "Đường dạo bộ rợp bóng cây cổ thụ quanh hồ nước",
            "Sân trống lát gạch rộng cho cầu lông và đá cầu",
            "Khu vực gửi xe thuận tiện phía đường Nguyễn Văn Huyên"
        ],
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=600",
        sports: [
            { key: "gym", name: "Gym / Calisthenics", icon: "fa-dumbbell", color: "#8b5cf6" },
            { key: "chạy bộ", name: "Chạy bộ", icon: "fa-person-running", color: "#2563eb" },
            { key: "cầu lông", name: "Cầu lông", icon: "fa-table-tennis-paddle-ball", color: "#10b981" }
        ]
    },
    {
        slug: "hoa-binh",
        district: "Quận Bắc Từ Liêm",
        ward: "Phường Xuân Đỉnh",
        name: "Công viên Hòa Bình",
        address: "Đường Phạm Văn Đồng, Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội",
        openHours: "05:30 - 21:30 hàng ngày",
        areaSize: "20,0 ha",
        crowdLevel: "thoáng đãng",
        crowdLabel: "Thoáng đãng",
        distanceKm: 8.9,
        rating: 4.5,
        description: "Không gian rộng lớn phía Tây Bắc Hà Nội với đường nội bộ dài phù hợp đạp xe, chạy bộ đường dài và tập thể dục dưỡng sinh.",
        facilities: [
            "Tuyến đường nội bộ rộng rãi dành cho đạp xe và chạy bộ đường dài",
            "Quảng trường trung tâm thoáng gió cho nhóm tập đông người",
            "Khu máy tập thể lực ngoài trời miễn phí",
            "Bãi đỗ xe rộng tại cổng Phạm Văn Đồng và Đỗ Nhuận"
        ],
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600",
        sports: [
            { key: "đạp xe", name: "Đạp xe", icon: "fa-bicycle", color: "#0d9488" },
            { key: "chạy bộ", name: "Chạy bộ", icon: "fa-person-running", color: "#2563eb" }
        ]
    },
    {
        slug: "yen-so",
        district: "Quận Hoàng Mai",
        ward: "Phường Yên Sở",
        name: "Công viên Yên Sở",
        address: "Nút giao Pháp Vân - Cầu Giẽ, Phường Yên Sở, Quận Hoàng Mai, Hà Nội",
        openHours: "05:00 - 21:00 hàng ngày",
        areaSize: "323 ha (Tổng khuôn viên)",
        crowdLevel: "trung bình",
        crowdLabel: "Trung bình",
        distanceKm: 7.5,
        rating: 4.9,
        description: "Lá phổi xanh lớn nhất phía Nam thủ đô với thảm cỏ trải dài, hồ nước lớn, rất thích hợp cho chạy trail nhẹ, đạp xe và yoga nhóm.",
        facilities: [
            "Thảm cỏ tự nhiên rộng hàng hecta cho Yoga và hoạt động nhóm",
            "Cung đường chạy bộ và đạp xe ven hồ không khói bụi",
            "Dịch vụ cho thuê xe đạp thể thao tại cổng chính",
            "Khu vệ sinh, điểm nghỉ chân và bãi đỗ xe quy mô lớn"
        ],
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600",
        sports: [
            { key: "yoga", name: "Yoga ngoài trời", icon: "fa-spa", color: "#ec4899" },
            { key: "đạp xe", name: "Đạp xe", icon: "fa-bicycle", color: "#0d9488" },
            { key: "chạy bộ", name: "Chạy bộ", icon: "fa-person-running", color: "#2563eb" }
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
        schedule: "Thứ 3, 5, 7 (17:30 - 19:30)",
        description: "Nhóm quy tụ những người yêu thích môn cầu lông, giao lưu định kỳ vào các buổi chiều tối trong tuần.",
        leader: "Minh Tuấn",
        founded: "03/2024",
        level: "Người mới – Trung bình",
        fee: "Miễn phí (đóng quỹ cầu tự nguyện)",
        meetingPoint: "Cổng Trần Nhân Tông - Khu sân cầu lông ven hồ Bảy Mẫu",
        highlights: [
            "Chia cặp đánh đôi theo trình độ, ai cũng có sân để chơi",
            "Có người hướng dẫn luật và kỹ thuật di chuyển cho người mới",
            "Giao lưu giao hữu với các CLB lân cận mỗi tháng một lần"
        ],
        rules: [
            "Đến đúng giờ, báo trước trong nhóm nếu vắng mặt",
            "Tôn trọng thành viên mới, không chê bai trình độ",
            "Tự giác dọn dẹp sân và giữ vệ sinh chung"
        ],
        memberPreview: ["Minh Tuấn", "Thu Hà", "Quang Huy", "Bảo Ngọc", "Đức Anh"],
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
        schedule: "Thứ 7 & CN (06:00 - 08:00)",
        description: "Chuyên tổ chức các buổi chạy dài vào cuối tuần, rèn luyện sức khỏe và chinh phục các giải chạy phong trào.",
        leader: "Lan Anh",
        founded: "09/2023",
        level: "Mọi trình độ",
        fee: "Miễn phí",
        meetingPoint: "Cổng chính đường Nguyễn Văn Huyên - Đài phun nước",
        highlights: [
            "Chia nhóm theo pace (5:30, 6:30) và nhóm đi bộ nhanh",
            "Khởi động chung đầu buổi và giãn cơ cuối buổi",
            "Cùng đăng ký các giải chạy phong trào trong năm"
        ],
        rules: [
            "Mang đủ nước uống và trang phục chạy bộ phù hợp",
            "Chạy sát nhóm pace đã chọn, không bỏ lại thành viên",
            "Báo ngay cho trưởng nhóm nếu thấy không khỏe khi chạy"
        ],
        memberPreview: ["Lan Anh", "Hoàng Long", "Mai Phương", "Tuấn Kiệt", "Thanh Vân"],
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
        schedule: "Chiều Thứ 4 & CN (16:00 - 18:30)",
        description: "Giao lưu bóng rổ 3x3 và 5x5 vào các buổi chiều tối, rèn luyện kỹ thuật và thi đấu cọ xát.",
        leader: "Hoàng Nam",
        founded: "06/2024",
        level: "Trung bình – Nâng cao",
        fee: "50.000đ/buổi (nước uống, bóng, áo bib)",
        meetingPoint: "Sân bóng rổ số 2 - Gần khu vui chơi trẻ em",
        highlights: [
            "Chia đội cân bằng trình độ cho các trận 3x3 và 5x5 nửa sân",
            "Có buổi tập kỹ thuật cơ bản trước giờ thi đấu",
            "Tổ chức mini-tournament cuối mỗi tháng"
        ],
        rules: [
            "Nắm vững luật cơ bản, chơi fair-play, không va chạm nguy hiểm",
            "Nhóm cần phê duyệt: trưởng nhóm sẽ xem hồ sơ trước khi nhận",
            "Đóng phí đúng hạn để duy trì sân và dụng cụ"
        ],
        memberPreview: ["Hoàng Nam", "Gia Bảo", "Minh Khoa", "Việt Hùng", "Phúc An"],
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=400",
        badgeColor: "#d97706",
        icon: "fa-basketball"
    }
];

// Danh sách thông báo mẫu cho chuông thông báo trên Header
const notificationsList = [
    {
        id: 1,
        title: "Lịch tập cầu lông sắp diễn ra",
        message: "Hoạt động 'Cầu lông & Cộng Đồng' tại Công viên Thống Nhất bắt đầu lúc 18:00 hôm nay.",
        time: "10 phút trước",
        icon: "fa-table-tennis-paddle-ball",
        unread: true
    },
    {
        id: 2,
        title: "Xác nhận tham gia hoạt động",
        message: "Bạn đã đăng ký thành công 'CLB Chạy Bộ Hoàng Thành' tại Công viên Nghĩa Đô.",
        time: "1 giờ trước",
        icon: "fa-circle-check",
        unread: true
    },
    {
        id: 3,
        title: "Thành viên mới trong CLB",
        message: "CLB Cầu Lông Thống Nhất vừa có thêm 2 thành viên mới tham gia giao lưu tuần này.",
        time: "3 giờ trước",
        icon: "fa-users",
        unread: false
    },
    {
        id: 4,
        title: "Cập nhật sân bãi Công viên Cầu Giấy",
        message: "Khu sân bóng rổ số 2 đã hoàn tất bảo trì hệ thống đèn chiếu sáng buổi tối.",
        time: "Hôm qua",
        icon: "fa-tree",
        unread: false
    },
    {
        id: 5,
        title: "Nhắc nhở mục tiêu tuần",
        message: "Bạn đã hoàn thành 2/3 buổi tập luyện thể thao ngoài trời trong tuần này!",
        time: "2 ngày trước",
        icon: "fa-medal",
        unread: false
    }
];


// Thông tin liên hệ & giới thiệu trang web (hiển thị ở Trang chủ + Footer). Sửa tại đây khi có thông tin thật.
const siteInfo = {
    email: "lienhe@sportpark.vn",
    phone: "0900 000 000",
    address: "Hà Nội, Việt Nam",
    workingHours: "08:00 - 17:30, Thứ 2 đến Thứ 6"
};

// Danh sách tin tức hiển thị ở Trang chủ (dữ liệu mẫu, thay bằng tin thật khi triển khai)
const newsList = [
    {
        id: 1,
        category: "Công viên",
        date: "20/11/2026",
        title: "Công viên Cầu Giấy hoàn tất bảo trì hệ thống đèn sân bóng rổ",
        summary: "Khu sân bóng rổ số 2 đã sáng đèn trở lại, thuận tiện cho các buổi tập sau giờ làm.",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=600",
        content: [
            "Hệ thống đèn chiếu sáng tại khu sân bóng rổ số 2 của Công viên Cầu Giấy đã được bảo trì xong và đưa vào sử dụng trở lại.",
            "Nhờ đó, các nhóm tập luyện có thể sử dụng sân đến khoảng 22:00 mỗi ngày. Người chơi nên đến sớm vào giờ cao điểm cuối tuần để có sân.",
            "Bạn có thể xem các hoạt động bóng rổ đang mở đăng ký ở mục Hoạt Động."
        ]
    },
    {
        id: 2,
        category: "Sự kiện",
        date: "18/11/2026",
        title: "Chạy bộ cộng đồng cuối tuần tại công viên Nghĩa Đô",
        summary: "CLB Chạy Bộ Hoàng Thành mở thêm nhóm pace mới và nhóm đi bộ nhanh cho người mới.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600",
        content: [
            "Buổi chạy cộng đồng vào sáng Thứ 7 và Chủ nhật tại công viên Nghĩa Đô tiếp tục chào đón thành viên mới.",
            "Các nhóm được chia theo tốc độ, có phần khởi động chung và giãn cơ cuối buổi. Người mới nên chọn nhóm đi bộ nhanh hoặc pace chậm để làm quen.",
            "Hãy mang theo bình nước cá nhân và trang phục thoáng khí."
        ]
    },
    {
        id: 3,
        category: "Sức khỏe",
        date: "15/11/2026",
        title: "5 lưu ý khởi động trước khi tập thể thao buổi sáng",
        summary: "Khởi động đúng cách giúp giảm nguy cơ chấn thương khi chạy bộ, đánh cầu lông hay tập calisthenics.",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600",
        content: [
            "Buổi sáng cơ thể còn cứng, vì vậy hãy dành 8–10 phút khởi động nhẹ trước khi vào tập chính.",
            "Bắt đầu bằng đi bộ nhanh hoặc chạy chậm, sau đó xoay các khớp cổ, vai, hông, gối và cổ chân. Tăng dần cường độ thay vì vào tập nặng ngay.",
            "Uống đủ nước và dừng tập nếu thấy đau bất thường. Với người có bệnh nền, nên hỏi ý kiến bác sĩ trước khi tập."
        ]
    },
    {
        id: 4,
        category: "Hướng dẫn",
        date: "12/11/2026",
        title: "Cách tạo nhóm và hoạt động trên SportPark",
        summary: "Chỉ với vài bước, bạn có thể lập câu lạc bộ riêng và đăng lịch tập để mọi người cùng tham gia.",
        image: "https://baomoi-photo-fbcrawler.bmcdn.me/w1200_r3x2/2025_04_18_294_52008334/3cca165f4c11a54ffc00.jpg",
        content: [
            "Vào mục Nhóm hoặc Hoạt Động, chọn tab Quản lý rồi bấm nút tạo mới.",
            "Điền tên, môn thể thao, công viên, lịch sinh hoạt và mô tả. Bạn có thể chọn chế độ công khai hoặc cần phê duyệt đối với nhóm.",
            "Sau khi tạo, nhóm/hoạt động sẽ xuất hiện trong danh sách để mọi người tìm thấy và đăng ký."
        ]
    }
];
