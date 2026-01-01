import { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useAuth } from '../context/AuthContext';
import { FileText, Upload, Download, Search, User, Filter, AlertCircle } from 'lucide-react';

const MedicalReports = () => {
    const { medicalReports, uploadMedicalReport, patients } = useHospital();
    const { user } = useAuth();
    const isDoctor = user?.role === 'Doctor';

    const [isUploading, setIsUploading] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [reportTitle, setReportTitle] = useState('');
    const [reportType, setReportType] = useState('Laboratory');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReports = medicalReports.filter(r => {
        const matchesUser = isDoctor ? r.doctorName === user.name : r.patientName === user.name;
        const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             r.patientName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesUser && matchesSearch;
    });

    const handleUpload = (e) => {
        e.preventDefault();
        if (!selectedPatient || !reportTitle) return;

        uploadMedicalReport({
            title: reportTitle,
            type: reportType,
            patientName: selectedPatient,
            doctorName: user.name,
            date: new Date().toISOString().split('T')[0],
            status: 'Finalized'
        });

        setIsUploading(false);
        setReportTitle('');
        setSelectedPatient('');
    };

    return (
        <div className="p-6 space-y-6">
            <div className="card">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 shadow-lg shadow-purple-500/10">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent italic">
                                {isDoctor ? 'Clinical Reports' : 'My Medical Reports'}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                {isDoctor ? 'Access and upload diagnostic reports for your patients.' : 'Securely view and download your clinical test results.'}
                            </p>
                        </div>
                    </div>
                    {isDoctor && (
                        <button 
                            onClick={() => setIsUploading(!isUploading)}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-xl transition-all"
                        >
                            <Upload className="w-4 h-4" /> {isUploading ? 'Cancel Upload' : 'Upload Report'}
                        </button>
                    )}
                </div>
            </div>

            {isUploading && (
                <div className="card animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-6 italic uppercase tracking-wider">Upload Diagnostic Report</h2>
                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Patient Name</label>
                                <select 
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500 italic outline-none"
                                    value={selectedPatient}
                                    onChange={(e) => setSelectedPatient(e.target.value)}
                                    required
                                >
                                    <option value="">Select Patient...</option>
                                    {patients.filter(p => p.doctor.includes(user.name)).map(p => (
                                        <option key={p.id} value={p.name}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Report Title</label>
                                <input 
                                    placeholder="e.g. CBC Blood Work, MRI Lumbar Spine"
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500 italic outline-none"
                                    value={reportTitle}
                                    onChange={(e) => setReportTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Report Category</label>
                                <select 
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500 italic outline-none"
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                >
                                    <option>Laboratory</option>
                                    <option>Radiology</option>
                                    <option>Cardiology</option>
                                    <option>Neurology</option>
                                    <option>General Clinical</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">File Attachment</label>
                                <div className="w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-3 text-center text-xs text-gray-400 italic">
                                    Browse or drag & drop clinical PDF
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button type="submit" className="px-8 py-3 bg-purple-600 text-white rounded-xl font-black text-xs uppercase italic tracking-widest shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition-all">
                                Finalize & Publish
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-sm italic focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Search clinical archives..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredReports.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-gray-400 italic">
                            No matching clinical reports found.
                        </div>
                    ) : (
                        filteredReports.map((report) => (
                            <div key={report.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg italic">
                                        {report.status}
                                    </span>
                                </div>
                                <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 italic mb-1 uppercase tracking-tighter truncate">{report.title}</h3>
                                <p className="text-xs text-gray-500 font-bold mb-4 italic tracking-wider">{report.type} • {report.date}</p>
                                
                                <div className="flex items-center gap-2 mb-6 p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Record Holder</p>
                                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300 italic">{isDoctor ? report.patientName : `Dr. ${report.doctorName}`}</p>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => window.alert('Accessing clinical archive for download...')}
                                    className="w-full py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic hover:gap-3 transition-all flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Download Report
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MedicalReports;
