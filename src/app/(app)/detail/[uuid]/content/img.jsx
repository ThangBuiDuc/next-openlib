"use client";

const Img = ({ bitstreams, organization }) => {
  const handleError = (e) => {
    switch (organization.trim()) {
      case "Trường Đại học Quản Lý và Công Nghệ Hải Phòng": {
        e.target.src = "/imgWhenError/hpu.png";
        break;
      }
      case "Trung tâm Thông tin Khoa học và Công nghệ thành phố Hải Phòng": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/hpstin.png";
        break;
      }
      case "Viện Nghiên Cứu Hải Sản": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/vienhaisan.png";
        break;
      }
      case "Trường Đại học Hàng Hải Việt Nam": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/vimaru.png";
        break;
      }
      case "Trường Đại học Hải Phòng": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/dhhp.png";
        break;
      }
      case "Trường Đại học Y Dược Hải Phòng": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/yDuocHP.png";
        break;
      }
      case "Viện Y Học Biển": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/vinimam.png";
        break;
      }
      default:
        console.log("error");
    }
  };

  const fallBackThumbnail = () => {
    var src;
    switch (organization.trim()) {
      case "Trường Đại học Quản Lý và Công Nghệ Hải Phòng": {
        src = "/imgWhenError/hpu.png";
        break;
      }
      case "Trung tâm Thông tin Khoa học và Công nghệ thành phố Hải Phòng": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/hpstin.png";
        break;
      }
      case "Viện Nghiên Cứu Hải Sản": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/vienhaisan.png";
        break;
      }
      case "Trường Đại học Hàng Hải Việt Nam": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/vimaru.png";
        break;
      }
      case "Trường Đại học Hải Phòng": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/dhhp.png";
        break;
      }
      case "Trường Đại học Y Dược Hải Phòng": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/yDuocHP.png";
        break;
      }
      case "Viện Y Học Biển": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/vinimam.png";
        break;
      }
      default:
        console.log("error");
    }
    return src;
  };

  return (
    <img
      alt="thumbnail book"
      src={bitstreams ? bitstreams : fallBackThumbnail()}
      onError={(e) => handleError(e)}
      width="124"
      height="165"
      className="shadow-[0_2px_5px_0_#e3e5ec] object-cover md:self-start self-center"
    />
  );
};

export default Img;
