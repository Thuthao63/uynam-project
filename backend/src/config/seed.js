const Project = require('../models/Project');

const sampleProjects = [
    {
        title: "Biệt Thự Vườn Tỉnh Mộng",
        description: "Phác họa nên một không gian sống thanh bình giữa lòng thành phố ồn ào. Biệt thự lấy cảm hứng kiến trúc nhiệt đới (Tropical) kết hợp cùng những mảng xanh và hồ cá Koi thư giãn.\n\nVật liệu chủ đạo: Gỗ óc chó cao cấp, đá hoa cương tự nhiên, kính cường lực lấy sáng.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
        category: "Biệt thự"
    },
    {
        title: "Nhà Phố 3 Tầng Minimalism",
        description: "Giải pháp kiến trúc tối ưu cho những mảnh đất nhà lô phố hẹp. Thiết kế theo trường phái Minimalism (Tối giản), tập trung vào đường nét hình khối và khai thác ánh sáng tự nhiên qua giếng trời.\n\nMang lại không gian thoáng đãng dù diện tích khiêm tốn.",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
        category: "Nhà phố"
    },
    {
        title: "Thiết Kế Nội Thất Penthouse",
        description: "Không gian sống sang trọng, mang phong cách vương giả, nơi mà những món đồ nội thất đều như một tác phẩm điêu khắc nghệ thuật.\n\nSử dụng công nghệ smarthome tinh xảo tích hợp âm tường tạo nên sự liền mạch độc đáo.",
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
        category: "Nội thất"
    },
    {
        title: "Chung Cư Cao Cấp Wabi Sabi",
        description: "Chung cư với nguồn cảm hứng từ Nhật Bản - tôn vinh vẻ đẹp của sự bất toàn.\n\nCông năng được tính toán cực kì chi tiết với màu sắc chủ đạo là tông Be nhạt và màu mộc của gỗ sồi.",
        imageUrl: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80",
        category: "Nội thất"
    }
];

const seedDatabase = async () => {
    try {
        const count = await Project.count();
        if (count === 0) {
            console.log("🌱 Database trống. Đang tiến hành tạo dữ liệu mẫu (Seeding)...");
            await Project.bulkCreate(sampleProjects);
            console.log("✅ Tạo dữ liệu mẫu thành công! Web sẽ không còn trống nữa.");
        } else {
            console.log("⚡ Database đã có dữ liệu, tự động bỏ qua bước Seeding.");
        }
    } catch (error) {
        console.error("❌ Lỗi khi Seeding dữ liệu:", error);
    }
}

module.exports = seedDatabase;
