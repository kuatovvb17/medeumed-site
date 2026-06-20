"use client";

import { useState, useEffect } from 'react';
import { User, Phone, CheckCircle, Clock, Calendar } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';

export default function BookingPage() {
  const { doctors, services, availableSlots, loading, bookingLoading, fetchAvailableSlots, bookAppointment } = useAppointments();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    doctorId: '',
    slotId: '',
    date: '',
    time: '',
    name: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Когда выбран врач и дата, загружаем слоты
  useEffect(() => {
    if (formData.doctorId && formData.date) {
      fetchAvailableSlots(formData.doctorId, formData.date);
      setFormData(prev => ({ ...prev, slotId: '', time: '' })); // сброс слота при смене даты
    }
  }, [formData.doctorId, formData.date]);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await bookAppointment({
      patientName: formData.name,
      patientPhone: formData.phone,
      doctorId: formData.doctorId,
      serviceId: formData.serviceId,
      slotId: formData.slotId,
      appointmentDate: formData.date,
      appointmentTime: formData.time
    });

    if (success) {
      setIsSubmitted(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-emerald-600 font-bold text-xl flex items-center gap-2">
          <svg className="animate-spin h-6 w-6 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Жүктелуде...
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const selectedService = services.find(s => s.id === formData.serviceId)?.title;
    const selectedDoctor = doctors.find(d => d.id === formData.doctorId)?.full_name;

    return (
      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-emerald-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-emerald-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4 font-serif">Жазылу сәтті аяқталды!</h2>
          <p className="text-slate-600 mb-6 text-lg">
            Құрметті {formData.name}, сіздің жазбаңыз қабылданды. Біздің әкімші растау үшін жақын арада сізбен хабарласады.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl text-left mb-8 space-y-2 text-slate-700">
            <p><strong>Қызмет:</strong> {selectedService}</p>
            <p><strong>Дәрігер:</strong> {selectedDoctor}</p>
            <p><strong>Уақыты:</strong> {formData.date}, {formData.time}</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
          >
            Басты бетке қайту
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif text-slate-800 mb-4">Қабылдауға жазылу</h1>
          <p className="text-slate-600">Өзіңізге ыңғайлы уақытты таңдап, онлайн жазылыңыз</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-10 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step >= num ? 'bg-emerald-600 text-white' : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Қызмет пен дәрігерді таңдаңыз</h2>
                
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Қызмет түрі</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((srv) => (
                      <div 
                        key={srv.id}
                        onClick={() => setFormData({...formData, serviceId: srv.id})}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.serviceId === srv.id 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                            : 'border-slate-200 hover:border-emerald-200 text-slate-600'
                        }`}
                      >
                        <div className="font-semibold mb-1">{srv.title}</div>
                        <div className="text-sm opacity-80">{srv.price} ₸</div>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.serviceId && (
                  <div className="mt-6">
                    <label className="block text-slate-700 font-medium mb-2">Дәрігер</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {doctors.map((doc) => (
                        <div 
                          key={doc.id}
                          onClick={() => setFormData({...formData, doctorId: doc.id})}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.doctorId === doc.id 
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                              : 'border-slate-200 hover:border-emerald-200 text-slate-600'
                          }`}
                        >
                          <div className="font-semibold">{doc.full_name}</div>
                          <div className="text-xs mt-1">{doc.specialty}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Күн мен уақытты таңдаңыз</h2>
                
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Күні</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-emerald-500 outline-none text-slate-700"
                  />
                </div>

                {formData.date && (
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 flex items-center justify-between">
                      <span>Бос уақыттар</span>
                      {availableSlots.length === 0 && <span className="text-sm text-red-500">Бұл күнге бос орын жоқ</span>}
                    </label>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {availableSlots.map((slot) => {
                        const timeString = slot.slot_time.substring(0, 5); // "09:00:00" -> "09:00"
                        return (
                          <div 
                            key={slot.id}
                            onClick={() => setFormData({...formData, slotId: slot.id, time: timeString})}
                            className={`p-3 text-center rounded-xl border-2 cursor-pointer transition-all font-medium ${
                              formData.slotId === slot.id 
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                                : 'border-slate-200 hover:border-emerald-200 text-slate-600'
                            }`}
                          >
                            {timeString}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Байланыс мәліметтері</h2>
                
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Аты-жөніңіз</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Мысалы, Аружан"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 p-4 rounded-xl border-2 border-slate-200 focus:border-emerald-500 outline-none text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">Телефон нөмірі</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="tel" 
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 p-4 rounded-xl border-2 border-slate-200 focus:border-emerald-500 outline-none text-slate-700"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 flex gap-4">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={handlePrev}
                  className="px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Артқа
                </button>
              )}
              
              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  disabled={(step === 1 && (!formData.serviceId || !formData.doctorId)) || (step === 2 && (!formData.date || !formData.slotId))}
                  className="flex-1 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Жалғастыру
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={!formData.name || !formData.phone || bookingLoading}
                  className="flex-1 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                >
                  {bookingLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Жүктелуде...
                    </>
                  ) : (
                    "Жазылуды растау"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
