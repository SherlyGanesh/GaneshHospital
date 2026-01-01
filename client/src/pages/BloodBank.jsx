import { useHospital } from '../context/HospitalContext';
import { Droplet, AlertTriangle, CheckCircle } from 'lucide-react';

const BloodBank = () => {
  const { bloodBank } = useHospital();
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Low':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Critical':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available':
        return <CheckCircle className="w-5 h-5" />;
      case 'Low':
      case 'Critical':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center">
            <Droplet className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-2">
              Blood Bank
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor blood inventory and availability
            </p>
          </div>
        </div>
      </div>

      {/* Blood Groups Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bloodBank.map((blood, index) => (
          <div
            key={index}
            className="card hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-red-500/30">
                <span className="text-3xl font-bold text-white">
                  {blood.bloodGroup}
                </span>
              </div>
              
              <div className="mb-3">
                <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                  {blood.units}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Units Available</p>
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(blood.status)}`}>
                {getStatusIcon(blood.status)}
                <span className="font-semibold text-sm">{blood.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Section */}
      <div className="card bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">
              Critical Blood Groups Alert
            </h3>
            <p className="text-red-700 dark:text-red-400 mb-3">
              The following blood groups are running critically low. Immediate action required.
            </p>
            <div className="flex flex-wrap gap-2">
              {bloodBank
                .filter(blood => blood.status === 'Critical')
                .map((blood, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold"
                  >
                    {blood.bloodGroup} - {blood.units} units
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodBank;
