import { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useAuth } from '../context/AuthContext';
import { Pill, Download, Plus, Trash2, Search, Send, FileText, User, Calendar } from 'lucide-react';

const Prescriptions = () => {
    const { prescriptions, addPrescription, patients } = useHospital();
    const { user } = useAuth();
    const isDoctor = user?.role === 'Doctor';
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [selectedPatient, setSelectedPatient] = useState('');
    const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '' }]);
    const [notes, setNotes] = useState('');

    const filteredPrescriptions = prescriptions.filter(p => {
        if (isDoctor) return p.doctorName === user.name;
        return p.patientName === user.name;
    });

    const handleAddMedicine = () => {
        setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
    };

    const handleRemoveMedicine = (index) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const handleMedicineChange = (index, field, value) => {
        const updated = [...medicines];
        updated[index][field] = value;
        setMedicines(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedPatient || medicines.some(m => !m.name)) return;

        addPrescription({
            patientName: selectedPatient,
            doctorName: user.name,
            date: new Date().toISOString().split('T')[0],
            medicines,
            notes
        });

        setIsCreating(false);
        setMedicines([{ name: '', dosage: '', duration: '' }]);
        setNotes('');
        setSelectedPatient('');
    };

    return (
        <div className="p-6 space-y-6">
            <div className="card">
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-primary-500 shadow-lg shadow-primary-500/10">
                            <Pill className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent italic">
                                {isDoctor ? 'Prescription Console' : 'My Prescriptions'}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                {isDoctor ? 'Manage and issue digital prescriptions to your patients.' : 'View and download your digital prescriptions.'}
                            </p>
                        </div>
                    </div>
                    {isDoctor && (
                        <button 
                            onClick={() => setIsCreating(!isCreating)}
                            className="btn-primary flex items-center gap-2"
                        >
                            {isCreating ? 'Cancel' : (
                                <><Plus className="w-5 h-5" /> Issue New Prescription</>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {isCreating && isDoctor && (
                <div className="card animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-6 italic uppercase tracking-wider">Create Digital Prescription</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Patient</label>
                                <select 
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-500 italic outline-none"
                                    value={selectedPatient}
                                    onChange={(e) => setSelectedPatient(e.target.value)}
                                    required
                                >
                                    <option value="">Choose Patient...</option>
                                    {patients.filter(p => p.doctor.includes(user.name)).map(p => (
                                        <option key={p.id} value={p.name}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Issue Date</label>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm italic text-gray-500">{new Date().toLocaleDateString()}</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Medications</label>
                                <button type="button" onClick={handleAddMedicine} className="text-[10px] font-black text-primary-500 hover:text-accent transition-colors uppercase italic flex items-center gap-1">
                                    <Plus className="w-3 h-3" /> Add Medicine
                                </button>
                            </div>
                            {medicines.map((med, idx) => (
                                <div key={idx} className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600 group">
                                    <input 
                                        placeholder="Medicine Name (e.g. Paracetamol)"
                                        className="md:col-span-2 bg-transparent border-none focus:ring-0 text-sm italic p-0"
                                        value={med.name}
                                        onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                                        required
                                    />
                                    <input 
                                        placeholder="Dosage (1-0-1)"
                                        className="bg-transparent border-none focus:ring-0 text-sm italic p-0"
                                        value={med.dosage}
                                        onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                                    />
                                    <div className="flex items-center gap-2">
                                        <input 
                                            placeholder="Duration (5 days)"
                                            className="bg-transparent border-none focus:ring-0 text-sm italic p-0 flex-1"
                                            value={med.duration}
                                            onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                                        />
                                        {medicines.length > 1 && (
                                            <button type="button" onClick={() => handleRemoveMedicine(idx)} className="text-red-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Additional Notes</label>
                            <textarea 
                                className="w-full h-32 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary-500 italic outline-none resize-none"
                                placeholder="Dietary restrictions or additional instructions..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <button 
                                type="button" 
                                onClick={() => setIsCreating(false)}
                                className="px-6 py-3 text-gray-500 font-bold text-xs uppercase italic tracking-widest"
                            >
                                Discard
                            </button>
                            <button 
                                type="submit"
                                className="px-8 py-3 bg-primary-500 text-white rounded-xl font-black text-xs uppercase italic tracking-widest shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" /> Issue Prescription
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
                {filteredPrescriptions.length === 0 ? (
                    <div className="col-span-full py-20 text-center card text-gray-400 italic">
                        No prescriptions found in your records.
                    </div>
                ) : (
                    filteredPrescriptions.map((p) => (
                        <div key={p.id} className="card group hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border-l-4 border-l-primary-500">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-800 dark:text-gray-100 italic">{isDoctor ? p.patientName : `Dr. ${p.doctorName}`}</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.date}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => window.alert('Downloading Digital Prescription...')}
                                    className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {p.medicines.map((m, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                        <div>
                                            <p className="font-bold text-gray-800 dark:text-gray-200 text-sm italic">{m.name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{m.duration || 'As needed'}</p>
                                        </div>
                                        <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest">{m.dosage || 'N/A'}</span>
                                    </div>
                                ))}
                            </div>

                            {p.notes && (
                                <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/10 rounded-xl text-xs italic text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800">
                                    <span className="font-black uppercase tracking-tighter mr-2 not-italic text-[10px]">Note:</span>
                                    {p.notes}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Prescriptions;
