import featureImg1 from '../../../assets/img/landing/feature1.png';
import featureImg2 from '../../../assets/img/landing/feature2.png';
import featureImg3 from '../../../assets/img/landing/feature3.png';
import featureImg4 from '../../../assets/img/landing/feature4.png';
import featureImg5 from '../../../assets/img/landing/feature5.png';
import featureImg6 from '../../../assets/img/landing/feature6.png';
import bgImg from '../../../assets/img/landing/feature-bg.png';
import ImageWithLoading from '../../common/ImageWithLoading';

const Features = () => {
  const dashboardFeatures = [
    {
      title: 'Main Dashboard',
      description:
        'Get a real-time overview of hospital activities, room occupancy, active users, and operational updates — all from one central screen.',
      icon: featureImg1,
    },
    {
      title: 'Users Management',
      description:
        'Easily manage hospital staff accounts, update user profiles, control roles, and maintain secure access for doctors, nurses, and admin staff.',
      icon: featureImg2,
    },
    {
      title: 'Doctors Directory',
      description:
        'Add and organize doctor profiles, assign them to departments, and manage their availability to streamline appointments and scheduling.',
      icon: featureImg3,
    },
    // {
    //   title: 'Rooms Management',
    //   description:
    //     'Track and manage room availability, occupancy status, and maintenance. Simplify room assignment and make sure patients are always placed properly.',
    //   icon: featureImg4,
    // },
    // {
    //   title: 'Operations Management',
    //   description:
    //     'Schedule and manage surgical operations, assign doctors and rooms, and monitor procedure status for smooth hospital workflow.',
    //   icon: featureImg5,
    // },
    {
      title: 'Specializations Management',
      description:
        'Define and manage medical specializations so doctors, departments, and services are categorized properly — making it easier to assign the right specialist to each case.',
      icon: featureImg6,
    },
  ];
  return (
    <section
      className="min-h-screen py-[100px] px-4 sm:px-6 lg:px-20 bg-white bg-cover bg-center "
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="font-bold text-3xl sm:text-4xl text-center text-[#3B8F4F] mb-10">
        Explore Our Dashboard Features
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardFeatures.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 text-center border border-gray-100"
          >
            <ImageWithLoading
              src={feature.icon}
              alt={`${feature.title} icon`}
              className="w-[200px] min-h-[200px] mx-auto mb-4"
             />
            <h3 className="text-[24px] font-bold mb-2">{feature.title}</h3>
            <p className="text-[18px] text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
