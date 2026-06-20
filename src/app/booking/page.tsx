"use client";

import { useState, useEffect } from 'react';
import { User, Phone, CheckCircle, Clock, Calendar, Sparkles } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
import toast from 'react-hot-toast';

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

  useEffect(() => {
    if (formData.doctorId && formData.date) {
      fetchAvailableSlots(formData.doctorId, formData.date);
      setFormData(prev => ({ ...prev, slotId: '', time: '' })); 
    }
  }, [formData.doctorId, formData.date]);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      toast.error('Телефон нөмірін дұрыс енгізіңіз');
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error('Аты-жөніңізді толық енгізіңіз');
      return;
    }

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
      <div className="bg-[#FAF9F6] min-h-[80vh] flex items-center justify-center p-4">
        <div className="text-emerald-800 font-bold text-xl flex items-center gap-3 animate-pulse">
          <svg className="animate-spin h-8 w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Деректер жүктелуде...
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const selectedService = services.find(s => s.id === formData.serviceId)?.title;
    const selectedDoctor = doctors.find(d => d.id === formData.doctorId)?.full_name;

    return (
      <div className="bg-[#FAF9F6] min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[60%] rounded-full bg-[#e8f5e9] opacity-60 blur-[100px] -z-10 animate-blob"></div>
        
        <div className="bg-white/80 backdrop-blur-md p-10 md:p-14 rounded-[3rem] shadow-soft max-w-xl w-full text-center border border-white animate-fade-in-up">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <CheckCircle className="text-emerald-600 w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Жазылу сәтті аяқталды!</h2>
          <p className="text-slate-600 mb-8 text-lg font-light leading-relaxed">
            Құрметті <span className="font-medium text-slate-800">{formData.name}</span>, сіздің жазбаңыз қабылданды. Біздің әкімші растау үшін жақын арада сізбен хабарласады.
          </p>
          <div className="bg-[#FAF9F6] p-6 rounded-3xl text-left mb-10 space-y-4 border border-slate-100 shadow-sm">
            <p className="flex justify-between items-center"><span className="text-slate-500 font-light">Қызмет:</span> <span className="font-semibold text-slate-800 text-right">{selectedService}</span></p>
            <div className="h-px w-full bg-slate-100"></div>
            <p className="flex justify-between items-center"><span className="text-slate-500 font-light">Дәрігер:</span> <span className="font-semibold text-slate-800 text-right">{selectedDoctor}</span></p>
            <div className="h-px w-full bg-slate-100"></div>
            <p className="flex justify-between items-center"><span className="text-slate-500 font-light">Уақыты:</span> <span className="font-semibold text-emerald-700 text-right">{formData.date}, {formData.time}</span></p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            Басты бетке қайту
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-24 relative overflow-hidden">
      <div className="absolute top-[10%] right-[10%] w-[30%] h-[50%] rounded-full bg-[#fce4ec] opacity-40 blur-[120px] -z-10 animate-blob"></div>
      <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-[#e8f5e9] opacity-50 blur-[100px] -z-10 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-emerald-800 font-medium text-sm mb-6 shadow-sm border border-slate-100">
            <Sparkles size={16} /> Премиум қызмет
          </div>
          <h1 className="text-5xl font-bold font-serif text-slate-900 mb-6">Қабылдауға жазылу</h1>
          <p className="text-slate-600 text-lg font-light max-w-xl mx-auto">Өзіңізге ыңғайлы уақытты таңдап, жоғары білікті мамандарға онлайн жазылыңыз</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-[3rem] shadow-soft border border-white p-8 md:p-14 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-16 relative px-4">
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-10 rounded-full"></div>
            <div 
              className="absolute left-4 top-1/2 -translate-y-1/2 h-1 bg-emerald-600 -z-10 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `calc(${((step - 1) / 2) * 100}% - ${step === 1 ? '0px' : step === 3 ? '2rem' : '1rem'})` }}
            ></div>
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-sm ${
                  step >= num 
                    ? 'bg-emerald-700 text-white scale-110 shadow-[0_8px_20px_rgb(4,120,87,0.3)] border-2 border-emerald-700' 
                    : 'bg-white text-slate-400 border-2 border-slate-100'
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-10 animate-fade-in-up">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 font-serif">Қызмет пен дәрігер</h2>
                  <p className="text-slate-500 font-light mt-2">Қажетті медициналық бағытты таңдаңыз</p>
                </div>
                
                <div>
                  <label className="block text-slate-800 font-medium mb-4 text-lg">Қызмет түрі</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((srv) => (
                      <div 
                        key={srv.id}
                        onClick={() => setFormData({...formData, serviceId: srv.id})}
                        className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.serviceId === srv.id 
                            ? 'border-emerald-600 bg-emerald-50 shadow-md transform -translate-y-1' 
                            : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-sm'
                        }`}
                      >
                        <div className={`font-bold mb-2 ${formData.serviceId === srv.id ? 'text-emerald-900' : 'text-slate-800'}`}>{srv.title}</div>
                        <div className={`text-sm font-medium ${formData.serviceId === srv.id ? 'text-emerald-700' : 'text-slate-500'}`}>{srv.price} ₸</div>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.serviceId && (
                  <div className="animate-fade-in-up">
                    <label className="block text-slate-800 font-medium mb-4 text-lg">Дәрігер</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {doctors.map((doc) => (
                        <div 
                          key={doc.id}
                          onClick={() => setFormData({...formData, doctorId: doc.id})}
                          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                            formData.doctorId === doc.id 
                              ? 'border-emerald-600 bg-emerald-50 shadow-md transform -translate-y-1' 
                              : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-sm'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${formData.doctorId === doc.id ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                            <User size={24} />
                          </div>
                          <div>
                            <div className={`font-bold ${formData.doctorId === doc.id ? 'text-emerald-900' : 'text-slate-800'}`}>{doc.full_name}</div>
                            <div className={`text-xs font-medium mt-1 ${formData.doctorId === doc.id ? 'text-emerald-700' : 'text-slate-500'}`}>{doc.specialty}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 animate-fade-in-up">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 font-serif">Күн мен уақыт</h2>
                  <p className="text-slate-500 font-light mt-2">Қабылдауға ыңғайлы уақытты белгілеңіз</p>
                </div>
                
                <div>
                  <label className="block text-slate-800 font-medium mb-4 text-lg">Күні</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                    <input 
                      type="date" 
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full pl-14 p-5 rounded-2xl border-2 border-slate-100 bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-slate-800 font-medium text-lg transition-all shadow-sm"
                    />
                  </div>
                </div>

                {formData.date && (
                  <div className="animate-fade-in-up">
                    <label className="block text-slate-800 font-medium mb-4 text-lg flex items-center justify-between">
                      <span>Бос уақыттар</span>
                      {availableSlots.length === 0 && <span className="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full">Бұл күнге бос орын жоқ</span>}
                    </label>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {availableSlots.map((slot) => {
                        const timeString = slot.slot_time.substring(0, 5);
                        return (
                          <div 
                            key={slot.id}
                            onClick={() => setFormData({...formData, slotId: slot.id, time: timeString})}
                            className={`p-4 text-center rounded-2xl border-2 cursor-pointer transition-all duration-300 font-bold text-lg flex flex-col items-center gap-1 ${
                              formData.slotId === slot.id 
                                ? 'border-emerald-600 bg-emerald-700 text-white shadow-md transform -translate-y-1' 
                                : 'border-slate-100 bg-white hover:border-emerald-300 text-slate-700 hover:shadow-sm'
                            }`}
                          >
                            <Clock size={16} className={formData.slotId === slot.id ? 'text-emerald-200' : 'text-slate-400'} />
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
              <div className="space-y-10 animate-fade-in-up">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 font-serif">Байланыс мәліметтері</h2>
                  <p className="text-slate-500 font-light mt-2">Растау үшін байланыс нөміріңізді қалдырыңыз</p>
                </div>
                
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <label className="block text-slate-800 font-medium mb-3 text-lg">Аты-жөніңіз</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                      <input 
                        type="text" 
                        placeholder="Мысалы, Аружан"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-14 p-5 rounded-2xl border-2 border-slate-100 bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-slate-800 font-medium text-lg transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-800 font-medium mb-3 text-lg">Телефон нөмірі</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                      <input 
                        type="tel" 
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-14 p-5 rounded-2xl border-2 border-slate-100 bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-slate-800 font-medium text-lg transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-14 flex gap-6 max-w-xl mx-auto">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={handlePrev}
                  className="px-8 py-5 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all duration-300"
                >
                  Артқа қайту
                </button>
              )}
              
              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  disabled={(step === 1 && (!formData.serviceId || !formData.doctorId)) || (step === 2 && (!formData.date || !formData.slotId))}
                  className="flex-1 bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-slate-900/10"
                >
                  Жалғастыру
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={!formData.name || !formData.phone || bookingLoading}
                  className="flex-1 bg-emerald-700 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-800 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(4,120,87,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl flex items-center justify-center gap-3"
                >
                  {bookingLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Күте тұрыңыз...
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
