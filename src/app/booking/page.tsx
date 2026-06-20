"use client";

import { useState, useEffect } from 'react';
import { User, Phone, CheckCircle, Clock, Calendar, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingPage() {
  const { doctors, services, availableSlots, loading, bookingLoading, fetchAvailableSlots, bookAppointment } = useAppointments();
  
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
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

  const handleNext = () => {
    setDirection(1);
    setStep(prev => prev + 1);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

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
      toast.error('Телефон нөмірін толық енгізіңіз (11 сан)');
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
      <div className="bg-[#050505] min-h-screen flex items-center justify-center p-4">
        <div className="text-cyan-400 font-medium text-lg flex items-center gap-3 animate-pulse">
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
      <div className="bg-[#050505] min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="bg-[#0a0a0a] p-10 md:p-14 rounded-xl max-w-xl w-full text-center border border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.1)] animate-slide-in">
          <div className="w-24 h-24 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(0,68,255,0.3)]">
            <CheckCircle className="text-cyan-400 w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 font-serif">Жазылу сәтті аяқталды!</h2>
          <p className="text-slate-400 mb-8 text-lg font-light leading-relaxed">
            Құрметті <span className="font-semibold text-white">{formData.name}</span>, сіздің жазбаңыз қабылданды. Біздің әкімші растау үшін жақын арада сізбен хабарласады.
          </p>
          <div className="bg-white/5 p-6 rounded-3xl text-left mb-10 space-y-4 border border-white/10 shadow-sm backdrop-blur-xl">
            <p className="flex justify-between items-center"><span className="text-slate-400 font-light">Қызмет:</span> <span className="font-semibold text-white text-right">{selectedService}</span></p>
            <div className="h-px w-full bg-white/10"></div>
            <p className="flex justify-between items-center"><span className="text-slate-400 font-light">Дәрігер:</span> <span className="font-semibold text-white text-right">{selectedDoctor}</span></p>
            <div className="h-px w-full bg-white/10"></div>
            <p className="flex justify-between items-center"><span className="text-slate-400 font-light">Уақыты:</span> <span className="font-bold text-cyan-400 text-right">{formData.date}, {formData.time}</span></p>
          </div>
          <Link 
            href="/"
            className="w-full inline-flex justify-center bg-blue-600 text-white py-5 rounded-full font-bold hover:bg-blue-500 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(0,68,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]"
          >
            Басты бетке қайту
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen pt-36 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-blue-900/30 text-cyan-400 font-medium text-sm mb-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Sparkles size={16} /> Премиум қызмет
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-white mb-4 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Қабылдауға жазылу</h1>
          <p className="text-slate-400 text-lg font-light max-w-xl mx-auto">Өзіңізге ыңғайлы уақытты таңдап, жоғары білікті мамандарға онлайн жазылыңыз</p>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.05)] p-8 md:p-14 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Custom Progress Bar */}
          <div className="flex items-center justify-between mb-16 relative px-2 md:px-8">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-slate-800 -z-10 rounded-full" />
            <div 
              className="absolute left-6 top-1/2 -translate-y-1/2 h-1.5 bg-cyan-500 -z-10 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(0,240,255,0.5)]"
              style={{ width: `calc(${((step - 1) / 2) * 100}%)` }}
            />
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-sm ${
                  step >= num 
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                    : 'bg-[#111] text-slate-500 border border-slate-700'
                }`}
              >
                {step > num ? <CheckCircle size={20} /> : num}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="relative min-h-[450px] overflow-visible">
            <AnimatePresence mode="wait" custom={direction}>
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Қызмет пен дәрігер</h2>
                    <p className="text-slate-400 font-light mt-2 text-lg">Қажетті медициналық бағытты таңдаңыз</p>
                  </div>
                  
                  <div className="mb-10">
                    <label className="block text-slate-300 font-bold mb-4 text-lg">Қызмет түрі</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services.map((srv) => (
                        <div 
                          key={srv.id}
                          onClick={() => setFormData({...formData, serviceId: srv.id})}
                          className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${
                            formData.serviceId === srv.id 
                              ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                              : 'border-slate-800 bg-[#111] hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                          }`}
                        >
                          <div className={`font-bold mb-2 text-xl transition-colors ${formData.serviceId === srv.id ? 'text-cyan-400' : 'text-white'}`}>{srv.title}</div>
                          <div className={`text-base font-semibold transition-colors ${formData.serviceId === srv.id ? 'text-cyan-200' : 'text-slate-500'}`}>{srv.price} ₸</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.serviceId && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-4"
                      >
                        <label className="block text-slate-300 font-bold mb-4 text-lg">Дәрігер</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {doctors.map((doc) => (
                            <div 
                              key={doc.id}
                              onClick={() => setFormData({...formData, doctorId: doc.id})}
                              className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                                formData.doctorId === doc.id 
                                  ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                                  : 'border-slate-800 bg-[#111] hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${formData.doctorId === doc.id ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]' : 'bg-slate-800 text-slate-400'}`}>
                                {doc.full_name.charAt(0)}
                              </div>
                              <div>
                                <div className={`font-bold text-lg transition-colors ${formData.doctorId === doc.id ? 'text-cyan-400' : 'text-white'}`}>{doc.full_name}</div>
                                <div className={`text-sm mt-1 transition-colors ${formData.doctorId === doc.id ? 'text-cyan-200' : 'text-slate-500'}`}>{doc.specialty}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Күн мен уақыт</h2>
                    <p className="text-slate-400 font-light mt-2 text-lg">Қабылдауға ыңғайлы уақытты белгілеңіз</p>
                  </div>
                  
                  <div className="mb-10 max-w-lg mx-auto">
                    <label className="block text-slate-300 font-bold mb-4 text-lg">Күні</label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" size={24} />
                      <input 
                        type="date" 
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full pl-14 p-5 rounded-2xl border border-slate-800 bg-[#111] focus:bg-[#111] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-white font-semibold text-lg transition-all shadow-sm hover:border-slate-600 cursor-pointer color-scheme-dark"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.date && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <label className="block text-slate-300 font-bold mb-4 flex items-center justify-between text-lg">
                          <span>Бос уақыттар</span>
                          {availableSlots.length === 0 && <span className="text-sm font-semibold text-red-400 bg-red-900/20 px-4 py-1.5 rounded-full border border-red-500/30">Бұл күнге бос орын жоқ</span>}
                        </label>
                        
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                          {availableSlots.map((slot) => {
                            const timeString = slot.slot_time.substring(0, 5);
                            return (
                              <motion.div 
                                key={slot.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFormData({...formData, slotId: slot.id, time: timeString})}
                                className={`p-4 text-center rounded-2xl border cursor-pointer transition-colors duration-200 font-bold text-lg flex flex-col items-center gap-2 ${
                                  formData.slotId === slot.id 
                                    ? 'border-cyan-500 bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                                    : 'border-slate-800 bg-[#111] hover:border-cyan-500/50 text-slate-300'
                                }`}
                              >
                                <Clock size={20} className={formData.slotId === slot.id ? 'text-black' : 'text-slate-500'} />
                                {timeString}
                              </motion.div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Байланыс мәліметтері</h2>
                    <p className="text-slate-400 font-light mt-2 text-lg">Растау үшін байланыс нөміріңізді қалдырыңыз</p>
                  </div>
                  
                  <div className="space-y-8 max-w-lg mx-auto">
                    <div className="relative group">
                      <User className="absolute left-5 top-[1.4rem] text-slate-500 group-focus-within:text-cyan-400 transition-colors z-10" size={24} />
                      <input 
                        type="text" 
                        id="patientName"
                        placeholder=" "
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="peer w-full pt-8 pb-3 pl-14 pr-5 rounded-2xl border border-slate-800 bg-[#111] focus:bg-[#111] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-white font-bold text-lg transition-all shadow-sm hover:border-slate-600"
                      />
                      <label 
                        htmlFor="patientName"
                        className="absolute left-14 top-4 text-slate-500 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-[1.3rem] peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
                      >
                        Аты-жөніңіз
                      </label>
                    </div>

                    <div className="relative group">
                      <Phone className="absolute left-5 top-[1.4rem] text-slate-500 group-focus-within:text-cyan-400 transition-colors z-10" size={24} />
                      <input 
                        type="tel" 
                        id="patientPhone"
                        placeholder=" "
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="peer w-full pt-8 pb-3 pl-14 pr-5 rounded-2xl border border-slate-800 bg-[#111] focus:bg-[#111] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-white font-bold text-lg tracking-wide transition-all shadow-sm hover:border-slate-600"
                      />
                      <label 
                        htmlFor="patientPhone"
                        className="absolute left-14 top-4 text-slate-500 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-[1.3rem] peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
                      >
                        Телефон нөмірі
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-14 pt-8 border-t border-white/10 flex gap-4 max-w-lg mx-auto">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={handlePrev}
                  className="px-6 py-4 rounded-full border border-slate-700 text-slate-400 font-bold hover:bg-[#111] hover:text-white hover:border-slate-500 transition-all duration-300 flex items-center justify-center shrink-0 shadow-sm"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              
              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  disabled={(step === 1 && (!formData.serviceId || !formData.doctorId)) || (step === 2 && (!formData.date || !formData.slotId))}
                  className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,68,255,0.4)] flex items-center justify-center gap-2 group"
                >
                  Жалғастыру <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={!formData.name || formData.phone.replace(/\D/g, '').length !== 11 || bookingLoading}
                  className="flex-1 bg-cyan-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-400 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-3"
                >
                  {bookingLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
