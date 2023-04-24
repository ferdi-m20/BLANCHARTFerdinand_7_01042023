import { useParams } from "react-router-dom";
import apartments from "../data/apartmentsData.json";
import Header from "../components/Header";
import Collpase from "../components/Collapse";
import Footer from "../components/Footer";
import NotFound from "./NotFound";
import "../styles/Apartment.css";
import redStar from "../assets/red_star.svg";
import greyStar from "../assets/grey_star.svg";

export default function ApartmentNotFound() {
  const apartmentId = useParams("id").id;
  const singleApartmentDetail = apartments.filter(
    (apartment) => apartment.id === apartmentId
  );
  //   console.log(singleApartmentDetail);
  if (singleApartmentDetail.length === 0) {
    return <NotFound />;
  } else {
    return (
      <Apartment
        apartmentId={apartmentId}
        singleApartmentDetail={singleApartmentDetail}
      />
    );
  }
}

export function Apartment({ apartmentId, singleApartmentDetail }) {
  console.log(apartmentId);
  console.log(singleApartmentDetail);

  const name = singleApartmentDetail[0].host.name.split(" ");
  const rating = singleApartmentDetail[0].rating;
  const description = singleApartmentDetail[0].description;
  const equipments = singleApartmentDetail[0].equipments;

  return (
    <div>
      <Header />
      <main className="apartment-details-container">
        <div className="apartment-content">
          <div className="apartment-info">
            <h1>{singleApartmentDetail[0].title}</h1>
            <p>{singleApartmentDetail[0].location}</p>
            <div>
              {singleApartmentDetail[0].tags.map((tag, index) => {
                return <button key={index}>{tag}</button>;
              })}
            </div>
          </div>
          <div className="host-content">
            <div>
              <div className="host-info">
                <span>{name[0]}</span>
                <span>{name[1]}</span>
              </div>
              <img
                src={singleApartmentDetail[0].host.picture}
                alt="Hôte de l'appartement"
              />
            </div>
            <div className="host-rating">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <img
                    key={index}
                    src={ratingValue <= rating ? redStar : greyStar}
                    alt="étoile"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="apartment-collapse">
          <div className="apartment-collapse-item">
            <Collpase title="Description" content={description} />
          </div>
          <div className="apartment-collapse-item">
            <Collpase title="Équipements" content={equipments} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
