const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const HomeContent = require('../models/HomeContent');

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

const sampleTestimonials = [
    { name: "Nguyễn Văn Hùng", role: "Chủ biệt thự tại Hòa Xuân", content: "Tôi rất hài lòng với quy trình làm việc chuyên nghiệp của Uy Nam. Từ khâu thiết kế đến thi công trọn gói đều đúng tiến độ và cam kết vật liệu.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
    { name: "Trần Thị Thu Thảo", role: "Kinh doanh tự do", content: "Đội ngũ kiến trúc sư tại Uy Nam rất lắng nghe khách hàng. Căn nhà phố của tôi được tối ưu ánh sáng tự nhiên tuyệt vời.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" }
];

const sampleFAQs = [
    { question: "Đơn giá xây dựng trọn gói của Uy Nam là bao nhiêu?", answer: "Đơn giá xây dựng trọn gói tại Uy Nam hiện dao động từ 5.500.000 - 8.000.000 VNĐ/m2 tùy vào phong cách thiết kế và yêu cầu vật tư hoàn thiện." },
    { question: "Công ty có miễn phí chi phí thiết kế không?", answer: "Có, Uy Nam sẽ miễn phí 100% chi phí thiết kế kiến trúc khi quý khách hàng ký hợp đồng thi công trọn gói với chúng tôi." }
];

const sampleHomeContent = [
    { key: "stat_projects", value: "1000+", category: "Stats" },
    { key: "stat_experience", value: "10+", category: "Stats" },
    { key: "stat_engineers", value: "50+", category: "Stats" },
    { key: "stat_satisfaction", value: "100%", category: "Stats" },
    { key: "hero_title", value: "UY NAM CONSTRUCTION", category: "Hero" },
    { key: "hero_subtitle", value: "Kiến tạo không gian • Dựng xây hạnh phúc", category: "Hero" }
];

const seedDatabase = async () => {
    try {
        // Seed Projects
        if (await Project.count() === 0) {
            await Project.bulkCreate(sampleProjects);
            console.log("✅ Seeded Projects");
        }
        
        // Seed Testimonials
        if (await Testimonial.count() === 0) {
            await Testimonial.bulkCreate(sampleTestimonials);
            console.log("✅ Seeded Testimonials");
        }
        
        // Seed FAQs
        if (await FAQ.count() === 0) {
            await FAQ.bulkCreate(sampleFAQs);
            console.log("✅ Seeded FAQs");
        }
        
        // Seed Home Content
        if (await HomeContent.count() === 0) {
            await HomeContent.bulkCreate(sampleHomeContent);
            console.log("✅ Seeded Home Content");
        }

    } catch (error) {
        console.error("❌ Lỗi khi Seeding dữ liệu:", error);
    }
}

module.exports = seedDatabase;
