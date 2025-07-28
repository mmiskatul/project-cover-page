import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';
import CardTemplete from './CardTemplete';

function Template() {
  // ✅ Initialize navigate

const departments = [
  { name: 'swe', id: 1, fullName: 'Software Engineering' },
  { name: 'cse', id: 2, fullName: 'Computer Science and Engineering' },
  { name: 'eee', id: 3, fullName: 'Electrical and Electronic Engineering' },
  { name: 'bba', id: 4, fullName: 'Bachelor of Business Administration' },
  { name: 'nfe', id: 5, fullName: 'Nutrition and Food Engineering' },
  { name: 'eng', id: 6, fullName: 'English' },
  { name: 'civil', id: 7, fullName: 'Civil Engineering' },
  { name: 'architecture', id: 8, fullName: 'Architecture' },
  { name: 'law', id: 9, fullName: 'Law' },
  { name: 'pharmacy', id: 10, fullName: 'Pharmacy' },
  { name: 'agriculture', id: 11, fullName: 'Agriculture' },
  { name: 'textitle', id: 12, fullName: 'Textile Engineering' },
  { name: 'economics', id: 13, fullName: 'Economics' },
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
            <CardTemplete data={department} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Template;
