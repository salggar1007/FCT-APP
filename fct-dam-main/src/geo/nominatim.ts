import axios from "axios";

const domain = "https://nominatim.openstreetmap.org/";

const getCoordinates = async (
  address: string,
  city: string,
  province = "jaén",
  postalcode: string
) => {
  const response = await axios.get("/search", {
    baseURL: domain,
    params: {
      street: address,
      city: city,
      county: province,
      country: "Spain",
      postalcode,
      format: "json",
      limit: 1,
    },
  });
  const { lat, lon } = response.data[0];
  return { lat: parseFloat(lat), lon: parseFloat(lon) };
};

export default getCoordinates;
