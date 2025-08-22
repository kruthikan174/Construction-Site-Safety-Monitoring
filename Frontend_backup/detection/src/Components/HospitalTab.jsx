// import React from 'react';
// import { IoIosCall } from "react-icons/io";
// import { GiPathDistance } from "react-icons/gi";
// import { IoNavigate } from "react-icons/io5";

// const HospitalTab = () => {
//   const hospitals = [
//     {
//       id: 1,
//       name: 'Aster RV Hospital',
//       image: 'https://sp.yimg.com/ib/th?id=OIP.4XCCcYxNC2bcqwsx7cA_gQHaHS&pid=Api&w=148&h=148&c=7&dpr=2&rs=1',
//       distance: '3.5 km',
//       address: '123 Main Street, Cityville',
//       phone: '123-456-7890',
//       mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=City+General+Hospital',
//     },
//     {
//       id: 2,
//       name: 'Green Valley Clinic',
//       image: 'hospital2.jpg',
//       distance: '4.2 km',
//       address: '456 Elm Street, Green Valley',
//       phone: '987-654-3210',
//       mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Green+Valley+Clinic',
//     },
//     {
//         id: 2,
//         name: 'Green Valley Clinic',
//         image: 'hospital2.jpg',
//         distance: '4.2 km',
//         address: '456 Elm Street, Green Valley',
//         phone: '987-654-3210',
//         mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Green+Valley+Clinic',
//       },
//       {
//         id: 2,
//         name: 'Green Valley Clinic',
//         image: 'hospital2.jpg',
//         distance: '4.2 km',
//         address: '456 Elm Street, Green Valley',
//         phone: '987-654-3210',
//         mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Green+Valley+Clinic',
//       },
//       {
//         id: 2,
//         name: 'Green Valley Clinic',
//         image: 'hospital2.jpg',
//         distance: '4.2 km',
//         address: '456 Elm Street, Green Valley',
//         phone: '987-654-3210',
//         mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Green+Valley+Clinic',
//       },
//       {
//         id: 2,
//         name: 'Green Valley Clinic',
//         image: 'hospital2.jpg',
//         distance: '4.2 km',
//         address: '456 Elm Street, Green Valley',
//         phone: '987-654-3210',
//         mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Green+Valley+Clinic',
//       },
    
//     // Add more hospital data as needed
//   ];

//   return (
//     <div>
//     <div className="hospital-tab">
//       {hospitals.map((hospital) => (
//         <div key={hospital.id} className="hospital-card">
//           <img src={hospital.image} alt={hospital.name} className="hospital-image" />
//           <h3 className="hospital-name">{hospital.name}</h3>
//           <div className="hospital-details">
//             <span className="hospital-icon-detail">
//               <GiPathDistance className="icon" /> {hospital.distance}
//             </span>
//             <span className="hospital-icon-detail">
//               <IoNavigate
//                 className="icon"
//                 onClick={() => window.open(hospital.mapUrl, '_blank')}
//                 style={{ cursor: 'pointer' }}
//               />
//               Address
//             </span>
//             <span className="hospital-icon-detail">
//               <IoIosCall  className="icon" /> {hospital.phone}
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default HospitalTab;



import React from 'react';
import { IoIosCall } from "react-icons/io";
import { GiPathDistance } from "react-icons/gi";
import { IoNavigate } from "react-icons/io5";
import hospital1 from "../Images/h5.jpeg"

const HospitalTab = () => {
  const hospitals = [
    {
      id: 1,
      name: 'SS Sparsh Hospital',
      image: 'https://lh5.googleusercontent.com/p/AF1QipOMLaWYojhZE4Gh4z-AlQs6bxcHcuXVNX9sBtnd=w408-h267-k-no',
      distance: '5.1 km',
      address: '8, Ideal Homes HBCS Layout, Javarandoddi, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098',
      phone: '08067666766',
      mapUrl: 'https://google.com/maps/dir//8,+Ideal+Homes+HBCS+Layout,+Javarandoddi,+Rajarajeshwari+Nagar,+Bengaluru,+Karnataka+560098',
    },
    {
      id: 2,
      name: 'Pathway Hospital - Best Multispeciality Hospital',
      image: 'https://cdn.hexahealth.com/Image/6969f7f8-bb47-4a89-ba00-85697960142d.jpg',
      distance: '4.2 km',
      address: '1280, Uttarahalli Main Rd, Channasandra, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098',
      phone: '08025577857',
      mapUrl: 'https://www.google.com/maps/dir//1280,+Uttarahalli+Main+Rd,+Channasandra,+Rajarajeshwari+Nagar,+Bengaluru,+Karnataka+560098/@12.9033143,77.4415846,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae3fdfb1e53af9:0x3f64be387a7f7291!2m2!1d77.5239865!2d12.9033272?entry=ttu&g_ep=EgoyMDI1MDEwNy4wIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 3,
        name: 'Jayadev Memorial Rashtrotthana Hospital and Research Centre',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHD6U1fNDkTyXSMQy_g3jNfAqhUXmDcIEf-FrN5YVw043HJRQvb6G9wK7VTVwew64GvfQ&usqp=CAU',
        distance: '4.2 km',
        address: '5th Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098',
        phone: '08069239999',
        mapUrl: 'https://www.google.com/maps/dir//WG57%2BJFF,+5th+Stage,+Rajarajeshwari+Nagar,+Bengaluru,+Karnataka+560098/@12.9089715,77.431149,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae3fbc0262558b:0xc42f8d9bb8a681dd!2m2!1d77.5135509!2d12.9089844?entry=ttu&g_ep=EgoyMDI1MDEwNy4wIKXMDSoASAFQAw%3D%3D',
      },
      {
        id: 4,
        name: 'Olympus Hospital - Super Speciality Hospital',
        image: 'https://lh5.googleusercontent.com/p/AF1QipNVCaeNcYawLo9V22Zzv5--fGKqadK-gLclha9g=w408-h306-k-no',
        distance: '4.2 km',
        address: '1221, Kempegowda Double Road , 5th Stage, BEML Layout, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098',
        phone: '08867069936',
        mapUrl: 'https://www.google.com/maps/dir//Olympus+Hospital+-+Super+Speciality+Hospital/@12.9089714,77.4800325,13z?entry=ttu&g_ep=EgoyMDI1MDEwNy4wIKXMDSoASAFQAw%3D%3D',
      },
      {
        id: 5,
        name: 'Atreum Speciality Hospital',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEFH5l8EbLjA_F6izMQEqKK2EM8bZZrxBf8nyMVGCxjM52G3RhMF_HOaag2zetAwY4LE&usqp=CAU',
        distance: '4.2 km',
        address: 'Ideal Homes Layout, Kenchenhalli, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098',
        phone: '08069007474',
        mapUrl: 'https://www.google.com/maps/dir//Ideal+Homes+Layout,+Kenchenhalli,+Rajarajeshwari+Nagar,+Bengaluru,+Karnataka+560098/@12.932461,77.4334151,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae3f406dae7723:0x7decf2b8558c0937!2m2!1d77.515817!2d12.9324739?entry=ttu&g_ep=EgoyMDI1MDEwNy4wIKXMDSoASAFQAw%3D%3D',
      },
      {
        id: 6,
        name: 'Gleneagles BGS Hospital',
        image: 'https://s3.ap-south-1.amazonaws.com/media.production.in/hospitals/images/1681561217611.jpg',
        distance: '4.2 km',
        address: '67, Uttarahalli Main Rd, Sunkalpalya, Bengaluru, Karnataka 560060',
        phone: '08527306331',
        mapUrl: 'https://www.google.com/maps/dir//67,+Uttarahalli+Main+Rd,+Sunkalpalya,+Bengaluru,+Karnataka+560060/@12.9029811,77.4150846,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae3f3a216fb62f:0x195205a95bb618cf!2m2!1d77.4974865!2d12.902994?entry=ttu&g_ep=EgoyMDI1MDEwNy4wIKXMDSoASAFQAw%3D%3D',
      },
    
    // Add more hospital data as needed
  ];

  return (
    <div>
  <div className="hospital-tab">
    {hospitals.map((hospital) => (
      <div key={hospital.id} className="hospital-card">
        <img src={hospital.image} alt={hospital.name} className="hospital-image" />
        <h3 className="hospital-name">{hospital.name}</h3>
        <div className="hospital-details">
          {/* Distance */}
          <span className="hospital-icon-detail">
            <GiPathDistance className="icon" /> {hospital.distance}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {/* Phone Number */}
          <span className="hospital-icon-detail">
            <IoIosCall className="icon" />{hospital.phone}
          </span>
          <br/>
          {/* Address and Navigation */}
          <span className="hospital-icon-detail">
            <IoNavigate
              className="icon"
              onClick={() => window.open(hospital.mapUrl, '_blank')}
              style={{ cursor: 'pointer' }}
            />
            {hospital.address}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default HospitalTab;



