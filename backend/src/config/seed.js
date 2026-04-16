const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const HomeContent = require('../models/HomeContent');
const Service = require('../models/Service');
const WorkflowStep = require('../models/WorkflowStep');
const Partner = require('../models/Partner');
const BlogPost = require('../models/BlogPost');
const TeamMember = require('../models/TeamMember');

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
    { key: "hero_subtitle", value: "Kiến tạo không gian • Dựng xây hạnh phúc", category: "Hero" },
    { key: "hero_video", value: "/teaser.mp4", category: "Hero" }
];

const sampleServices = [
    { orderId: "01", title: "Thiết kế Kiến trúc", desc: "Sáng tạo không gian sống hiện đại, tối ưu công năng và thẩm mỹ.", detail: "Giải pháp thiết kế từ kiến trúc mặt tiền đến bố trí công năng. Chúng tôi tư vấn phong thủy và vật liệu mới nhất.", imageUrl: "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", features: "Bản vẽ 3D ngoại thất, Hồ sơ kỹ thuật thi công, Xin phép xây dựng" },
    { orderId: "02", title: "Thi công Trọn gói", desc: "Chìa khóa trao tay với quy trình kiểm soát chất lượng nghiêm ngặt.", detail: "Uy Nam cam kết quản lý nhân công, vật tư minh bạch, thi công đúng tiến độ và không phát sinh chi phí.", imageUrl: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", features: "Quản lý dự án chuyên nghiệp, Cam kết không phát sinh, Bảo hành kết cấu 10 năm" }
];

const sampleWorkflow = [
    { stepId: "01", title: "Khảo sát & Định hướng", desc: "Kiến trúc sư Uy Nam trực tiếp khảo sát địa hình, phân tích hướng nắng, gió và tư vấn phong thủy.", icon: "📍", imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800" },
    { stepId: "02", title: "Thiết kế Phối cảnh 3D", desc: "Chạm tay vào không gian sống mơ ước thông qua bản vẽ VR/3D sống động.", icon: "📐", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" }
];

const samplePartners = [
    { name: "Viglacera", logo: "VIGLACERA" },
    { name: "Hòa Phát", logo: "HOA PHAT" },
    { name: "Jotun Paints", logo: "JOTUN" }
];

const sampleBlogs = [
    { id: 1, category: "Phong Thuỷ", title: "Năm 2026 Xây Nhà Hướng Nào Đẹp Nhất?", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80", date: "16 Tháng 4, 2026", summary: "Tìm hiểu các hướng xây nhà tốt nhất cho năm 2026 để mang lại tài lộc.", content: "Nội dung chi tiết bài viết phong thủy..." },
    { id: 2, category: "Kiến Thức", title: "Phân biệt Xây Thô và Hoàn Thiện", imageUrl: "https://images.unsplash.com/photo-1541888086925-ebbc31bcbdce?auto=format&fit=crop&q=80", date: "12 Tháng 4, 2026", summary: "Hướng dẫn phân biệt rõ ràng hai giai đoạn quan trọng trong xây dựng.", content: "Nội dung chi tiết bài viết kiến thức..." }
];

const sampleTeam = [
    { name: "KTS. Lê Uy Nam", role: "CEO & Founder", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80", order: 1 },
    { name: "KS. Nguyễn Thế Vinh", role: "Giám đốc Kỹ thuật", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80", order: 2 }
];

const seedDatabase = async () => {
    try {
        if (await Project.count() === 0) await Project.bulkCreate(sampleProjects);
        if (await Testimonial.count() === 0) await Testimonial.bulkCreate(sampleTestimonials);
        if (await FAQ.count() === 0) await FAQ.bulkCreate(sampleFAQs);
        if (await HomeContent.count() === 0) await HomeContent.bulkCreate(sampleHomeContent);
        if (await Service.count() === 0) await Service.bulkCreate(sampleServices);
        if (await WorkflowStep.count() === 0) await WorkflowStep.bulkCreate(sampleWorkflow);
        if (await Partner.count() === 0) await Partner.bulkCreate(samplePartners);
        if (await BlogPost.count() === 0) await BlogPost.bulkCreate(sampleBlogs);
        if (await TeamMember.count() === 0) await TeamMember.bulkCreate(sampleTeam);
        
        console.log("✅ Database đã được bơm dữ liệu mẫu hoàn chỉnh!");
    } catch (error) {
        console.error("❌ Lỗi khi Seeding dữ liệu:", error);
    }
}

module.exports = seedDatabase;
