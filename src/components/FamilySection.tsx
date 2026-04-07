import familyBanner from "../assets/familybanner.jpg";
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";

export function FamilySection() {
  return (
    <section
      className="section family-section"
      style={{
        backgroundImage: `url(${familyBanner})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
        backgroundRepeat: "repeat-y",
        position: "relative",
        minHeight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <div
        className="family-card"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${card1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          padding: "16px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          minHeight: "450px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h4>NHÀ TRAI</h4>
        <p>
          Ông: Nguyễn Văn Thưởng
          <br />
          Bà: Đỗ Thị Vân
        </p>
        <p style={{ marginTop: "60px" }} className="address">
          Vĩnh Lại, Hải Phòng
        </p>
      </div>

      <div
        className="family-card"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${card2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          padding: "16px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          minHeight: "450px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h4>NHÀ GÁI</h4>
        <p>
          Ông: Đặng Đình Mạnh
          <br />
          Bà: Đặng Thị Thủy
        </p>
        <p style={{ marginTop: "60px" }} className="address">
          Dương Nội, Hà Nội
        </p>
      </div>
    </section>
  );
}
