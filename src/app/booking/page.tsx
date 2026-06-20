"use client";

import { useState, useEffect } from 'react';
import { User, Phone, CheckCircle, Clock, Calendar, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
import toast from 'react-hot-toast';
import Link from 'next/link';

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({ ...prev, slotId: '', time: '' })); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.doctorId, formData.date]);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (!digits) return '';
    let res = '+7';
    if (digits.length > 1) res += ` (${digits.substring(1, 4)}`;
    if (digits.length >= 5) res += `) ${digits.substring(4, 7)}`;
    if (digits.length >= 8) res += `-${digits.substring(7, 9)}`;
    if (digits.length >= 10) res += `-${digits.substring(9, 11)}`;
    return res;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: formatPhone(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 11) {
      toast.error('Телефон нөмірін толық енгізіңіз');
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error('Аты-жөніңізді толық енгізіңіз');
      return;
    }

    const selectedService = services.find(s => s.id === formData.serviceId)?.title || '';

    const success = await bookAppointment({
      patientName: formData.name,
      patientPhone: formData.phone,
      doctorId: formData.doctorId,
      serviceId: formData.serviceId,
      serviceTitle: selectedService,
      slotId: formData.slotId,
      appointmentDate: formData.date,
      appointmentTime: formData.time
    });

    if (success) {
      toast.success('Сіз сәтті жазылдыңыз!');
      setIsSubmitted(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen flex items-center justify-center p-4">
        <div className="text-[#0F4C3A] font-medium text-lg flex items-center gap-3 animate-pulse">
          <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
      <div className="bg-[#FDFBF7] min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Mesh Gradients Background */}
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[60%] rounded-full bg-[#e8f5e9] opacity-60 blur-[140px] -z-10 animate-blob" />
        
        <div className="bg-white/60 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-luxury max-w-xl w-full text-center border border-white/40 animate-slide-in">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <CheckCircle className="text-[#0F4C3A] w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Жазылу сәтті аяқталды!</h2>
          <p className="text-slate-500 mb-8 text-lg font-light leading-relaxed">
            Құрметті <span className="font-semibold text-slate-800">{formData.name}</span>, сіздің жазбаңыз қабылданды. Біздің әкімші растау үшін жақын арада сізбен хабарласады.
          </p>
          <div className="bg-white/80 p-6 rounded-3xl text-left mb-10 space-y-4 border border-slate-100/50 shadow-sm">
            <p className="flex justify-between items-center"><span className="text-slate-400 font-light">Қызмет:</span> <span className="font-semibold text-slate-800 text-right">{selectedService}</span></p>
            <div className="h-px w-full bg-slate-100"></div>
            <p className="flex justify-between items-center"><span className="text-slate-400 font-light">Дәрігер:</span> <span className="font-semibold text-slate-800 text-right">{selectedDoctor}</span></p>
            <div className="h-px w-full bg-slate-100"></div>
            <p className="flex justify-between items-center"><span className="text-slate-400 font-light">Уақыты:</span> <span className="font-bold text-[#0F4C3A] text-right">{formData.date}, {formData.time}</span></p>
          </div>
          <Link 
            href="/"
            className="w-full inline-flex justify-center bg-[#0F4C3A] text-white py-5 rounded-full font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-emerald-900/20"
          >
            Басты бетке қайту
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-36 pb-24 relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute top-[10%] right-[10%] w-[30%] h-[50%] rounded-full bg-[#fce4ec] opacity-40 blur-[140px] -z-10 animate-blob" />
      <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-[#e8f5e9] opacity-50 blur-[140px] -z-10 animate-blob" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/40 backdrop-blur-xl text-[#0F4C3A] font-medium text-sm mb-6 shadow-sm border border-white/50">
            <Sparkles size={16} /> Премиум қызмет
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-slate-900 mb-4 tracking-tight">Қабылдауға жазылу</h1>
          <p className="text-slate-400 text-lg font-light max-w-xl mx-auto">Өзіңізге ыңғайлы уақытты таңдап, жоғары білікті мамандарға онлайн жазылыңыз</p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-luxury border border-white/40 p-8 md:p-14 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Custom Progress Bar */}
          <div className="flex items-center justify-between mb-16 relative px-2 md:px-8">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-slate-100 -z-10 rounded-full" />
            <div 
              className="absolute left-6 top-1/2 -translate-y-1/2 h-1.5 bg-[#0F4C3A] -z-10 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `calc(${((step - 1) / 2) * 100}%)` }}
            />
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-sm ${
                  step >= num 
                    ? 'bg-[#0F4C3A] text-white scale-110 shadow-lg shadow-emerald-900/20' 
                    : 'bg-white text-slate-400 border-2 border-slate-100/50'
                }`}
              >
                {step > num ? <CheckCircle size={20} /> : num}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="relative min-h-[400px]">
            {/* STEP 1 */}
            <div className={`transition-all duration-500 absolute w-full ${step === 1 ? 'opacity-100 translate-x-0 pointer-events-auto relative' : 'opacity-0 -translate-x-12 pointer-events-none'}`}>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 font-serif">Қызмет пен дәрігер</h2>
                <p className="text-slate-400 font-light mt-2">Қажетті медициналық бағытты таңдаңыз</p>
              </div>
              
              <div className="mb-10">
                <label className="block text-slate-800 font-semibold mb-4">Қызмет түрі</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((srv) => (
                    <div 
                      key={srv.id}
                      onClick={() => setFormData({...formData, serviceId: srv.id})}
                      className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                        formData.serviceId === srv.id 
                          ? 'border-[#0F4C3A] bg-emerald-50/50 shadow-md ring-1 ring-[#0F4C3A]' 
                          : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-sm'
                      }`}
                    >
                      <div className={`font-bold mb-2 text-lg transition-colors ${formData.serviceId === srv.id ? 'text-[#0F4C3A]' : 'text-slate-800'}`}>{srv.title}</div>
                      <div className={`text-sm font-medium transition-colors ${formData.serviceId === srv.id ? 'text-emerald-700' : 'text-slate-400'}`}>{srv.price} ₸</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`transition-all duration-500 ${formData.serviceId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none hidden'}`}>
                <label className="block text-slate-800 font-semibold mb-4">Дәрігер</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctors.map((doc) => (
                    <div 
                      key={doc.id}
                      onClick={() => setFormData({...formData, doctorId: doc.id})}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                        formData.doctorId === doc.id 
                          ? 'border-[#0F4C3A] bg-emerald-50/50 shadow-md ring-1 ring-[#0F4C3A]' 
                          : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${formData.doctorId === doc.id ? 'bg-[#0F4C3A] text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <User size={20} />
                      </div>
                      <div>
                        <div className={`font-bold transition-colors ${formData.doctorId === doc.id ? 'text-[#0F4C3A]' : 'text-slate-800'}`}>{doc.full_name}</div>
                        <div className={`text-sm mt-1 transition-colors ${formData.doctorId === doc.id ? 'text-emerald-700' : 'text-slate-400'}`}>{doc.specialty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className={`transition-all duration-500 absolute w-full ${step === 2 ? 'opacity-100 translate-x-0 pointer-events-auto relative' : step < 2 ? 'opacity-0 translate-x-12 pointer-events-none hidden' : 'opacity-0 -translate-x-12 pointer-events-none hidden'}`}>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 font-serif">Күн мен уақыт</h2>
                <p className="text-slate-400 font-light mt-2">Қабылдауға ыңғайлы уақытты белгілеңіз</p>
              </div>
              
              <div className="mb-10 max-w-lg mx-auto">
                <label className="block text-slate-800 font-semibold mb-4">Күні</label>
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-700 pointer-events-none" size={22} />
                  <input 
                    type="date" 
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full pl-14 p-5 rounded-2xl border border-slate-200 bg-white/80 focus:bg-white focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] outline-none text-slate-800 font-medium text-lg transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className={`transition-all duration-500 ${formData.date ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none hidden'}`}>
                <label className="block text-slate-800 font-semibold mb-4 flex items-center justify-between">
                  <span>Бос уақыттар</span>
                  {availableSlots.length === 0 && <span className="text-sm font-medium text-red-500 bg-red-50/80 backdrop-blur-md px-3 py-1 rounded-full">Бұл күнге бос орын жоқ</span>}
                </label>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {availableSlots.map((slot) => {
                    const timeString = slot.slot_time.substring(0, 5);
                    return (
                      <div 
                        key={slot.id}
                        onClick={() => setFormData({...formData, slotId: slot.id, time: timeString})}
                        className={`p-4 text-center rounded-2xl border cursor-pointer transition-all duration-300 font-bold text-lg flex flex-col items-center gap-2 ${
                          formData.slotId === slot.id 
                            ? 'border-[#0F4C3A] bg-[#0F4C3A] text-white shadow-lg shadow-emerald-900/20 transform scale-105 ring-1 ring-[#0F4C3A]' 
                            : 'border-slate-100 bg-white hover:border-emerald-300 text-slate-700 hover:shadow-sm'
                        }`}
                      >
                        <Clock size={18} className={formData.slotId === slot.id ? 'text-emerald-100' : 'text-slate-300'} />
                        {timeString}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div className={`transition-all duration-500 absolute w-full ${step === 3 ? 'opacity-100 translate-x-0 pointer-events-auto relative' : 'opacity-0 translate-x-12 pointer-events-none hidden'}`}>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 font-serif">Байланыс мәліметтері</h2>
                <p className="text-slate-400 font-light mt-2">Растау үшін байланыс нөміріңізді қалдырыңыз</p>
              </div>
              
              <div className="space-y-8 max-w-lg mx-auto">
                <div className="relative group">
                  <User className="absolute left-5 top-[1.4rem] text-slate-400 group-focus-within:text-[#0F4C3A] transition-colors z-10" size={22} />
                  <input 
                    type="text" 
                    id="patientName"
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="peer w-full pt-8 pb-3 pl-14 pr-5 rounded-2xl border border-slate-200 bg-white/80 focus:bg-white focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] outline-none text-slate-800 font-medium text-lg transition-all shadow-sm"
                  />
                  <label 
                    htmlFor="patientName"
                    className="absolute left-14 top-4 text-slate-400 text-sm font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-[1.3rem] peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#0F4C3A]"
                  >
                    Аты-жөніңіз
                  </label>
                </div>

                <div className="relative group">
                  <Phone className="absolute left-5 top-[1.4rem] text-slate-400 group-focus-within:text-[#0F4C3A] transition-colors z-10" size={22} />
                  <input 
                    type="tel" 
                    id="patientPhone"
                    placeholder=" "
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="peer w-full pt-8 pb-3 pl-14 pr-5 rounded-2xl border border-slate-200 bg-white/80 focus:bg-white focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] outline-none text-slate-800 font-medium text-lg tracking-wide transition-all shadow-sm"
                  />
                  <label 
                    htmlFor="patientPhone"
                    className="absolute left-14 top-4 text-slate-400 text-sm font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-[1.3rem] peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#0F4C3A]"
                  >
                    Телефон нөмірі
                  </label>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-14 pt-8 border-t border-slate-100 flex gap-4 max-w-lg mx-auto">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={handlePrev}
                  className="px-6 py-4 rounded-full border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-800 transition-all duration-300 flex items-center justify-center shrink-0 shadow-sm"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              
              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  disabled={(step === 1 && (!formData.serviceId || !formData.doctorId)) || (step === 2 && (!formData.date || !formData.slotId))}
                  className="flex-1 bg-[#0F4C3A] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-900 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 group"
                >
                  Жалғастыру <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={!formData.name || !formData.phone || bookingLoading}
                  className="flex-1 bg-[#0F4C3A] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-900 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-3"
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
