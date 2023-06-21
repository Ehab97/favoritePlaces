const GOOGLE_API_KEY = "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY";

export const getMapPreview = (lat, lng) => {
  const imagePrevieUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${GOOGLE_API_KEY}`;
  return imagePrevieUrl;
};

// export const getAddressesFromCoords = async (lat, lng) => {
//   const response = await fetch(
//     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
//   );

//   if (!response.ok) {
//     throw new Error("Something went wrong!");
//   }

//   const resData = await response.json();
//   if (!resData.results) {
//     throw new Error("Something went wrong!");
//   }
//   if (resData.error_message) {
//     throw new Error(resData.error_message);
//   }
//   console.log({ resData });
//   const address = resData.results[0].formatted_address ?? {};
//   return address;
// };

export const  getAddressesFromCoords=async(lat, lng)=> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const address = `${data.address.road}, ${data.address.city}, ${data.address.country}`;
  console.log(address);
  return {
    country: data.address.country,
    city: data.address.city,
    road: data.address.road,
    address: data.address,
    display_name: data.display_name,
  };
}