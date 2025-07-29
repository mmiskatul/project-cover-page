import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';
import CardTemplete from './CardTemplete';
import templatelogo from '../../assets/templateSWE.png'
import defaultTemplate from '../../assets/template2.png';

function Template() {

const departments = [
  {name:'default', id: 2, fullName: 'Default Template', tempLogo: defaultTemplate},
  { name: 'swe', id: 1, fullName: 'Software Engineering',tempLogo: templatelogo },
];
  return (
    <div className='pt-32 px-5 items-center justify-center text-gray-800 text-lg'>
      {/* Back Button */}
      <BackButton />

      <h1 className='text-3xl font-bold mb-8 text-center'>Select Your Template</h1>

      {/* Department Cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8'>
        {departments.map((department) => (
          <Link
            key={department.id}
            to={`/template/${department.name}`}
            className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer'
          >
            <CardTemplete data={department}  />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Template;
