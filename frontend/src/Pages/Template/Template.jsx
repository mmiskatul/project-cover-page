import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';
import templatelogo from '../../assets/templateSWE.png'
import defaultTemplate from '../../assets/template1.png';
import defaultTemplate2 from '../../assets/template2.png'
import nfetemplate from '../../assets/templateNFE.png'
import agritemplete from '../../assets/templateAGI.png'
import engtemplate from '../../assets/templateENG.png'
import txttemplate from '../../assets/templateTxt.png'
import civiltemplate from '../../assets/templateCivil.png'
import thmtemplate from '../../assets/templateTHM.png'

function Template() {
  const departments = [
    { name: 'swe', id: 1, fullName: 'Software Engineering', tempLogo: templatelogo },
    { name: 'default', id: 2, fullName: 'Default Template', tempLogo: defaultTemplate },
    { name: 'bba', id: 3, fullName: 'Default Template', tempLogo: defaultTemplate2 },
    { name: 'nfe', id: 4, fullName: 'Nutrition and Food Engineering', tempLogo: nfetemplate },
    { name :'agri',id:5,fullName:'Agricultural Science' ,tempLogo:agritemplete},
    { name :'eng',id:6,fullName:'Department of English' ,tempLogo:engtemplate},
    {name:'txt', id:7 ,fullName:'Department of Textile Engineering',tempLogo:txttemplate},
    {name:'civil', id:8 ,fullName:'Department of Civil Engineering',tempLogo:civiltemplate },
    {name:'thm', id:9 ,fullName:'Tourism and Hospitality Management',tempLogo:thmtemplate },
    


  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50 mb-20  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Choose Your Template
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Select a professionally designed template that matches your needs
          </p>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((department) => (
            <Link
              key={department.id}
              to={`/template/${department.name}`}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div className="p-1 bg-gradient-to-r from-indigo-50 to-blue-50">
                <div className="h-48 overflow-hidden flex items-center justify-center bg-white p-4">
                  <img 
                    src={department.tempLogo} 
                    alt={department.fullName} 
                    className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {department.fullName}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Template #{department.id}
                  </span>
                  <span className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                    Select →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
      </div>
    </div>
  );
}

export default Template;