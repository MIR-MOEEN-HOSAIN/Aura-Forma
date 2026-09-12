import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, MapPin, Video, Sparkles } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [roomType, setRoomType] = useState('Living Room');
  const [format, setFormat] = useState<'virtual' | 'showroom'>('virtual');
  const [date, setDate] = useState('2026-09-18');
  const [time, setTime] = useState('14:00');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-[28px] max-w-xl w-full overflow-hidden shadow-2xl z-10 border border-[#EAE7E3] animate-scale-in">
        <button
          onClick={handleResetAndClose}
          aria-label="Close consultation modal"
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-[#F8F7F5] border border-[#EAE7E3] flex items-center justify-center text-[#1A1A1A] hover:bg-[#8B6B4D] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#3D8B5A]/10 text-[#3D8B5A] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8B6B4D] font-medium font-sans">
              Atelier Appointment Confirmed
            </span>
            <h3 className="font-serif-luxury text-3xl font-semibold text-[#1A1A1A] mt-2 mb-3">
              We Look Forward To Designing With You
            </h3>
            <p className="text-sm text-[#6E6E6E] font-light leading-relaxed max-w-md mx-auto mb-8">
              A calendar invitation and preparatory architectural questionnaire have been dispatched to <strong>{email || 'your email'}</strong>. Our senior designer will prepare personalized layout sketches for your {roomType}.
            </p>
            <button
              onClick={handleResetAndClose}
              className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.16em] font-medium rounded-full hover:bg-[#8B6B4D] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F7F5] border border-[#EAE7E3] text-[#8B6B4D] text-[11px] uppercase tracking-[0.18em] font-medium font-sans mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary 45-Min Session</span>
            </div>

            <h3 className="font-serif-luxury text-3xl font-medium text-[#1A1A1A] leading-tight mb-2">
              Book Design Consultation
            </h3>
            <p className="text-xs text-[#6E6E6E] font-light leading-relaxed mb-6">
              Collaborate directly with our Copenhagen interior architects. Receive tailored finish palettes, 3D space layouts, and curated piece recommendations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Room Scope */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-2">
                  Project Space
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Living Room', 'Dining', 'Bedroom', 'Workspace', 'Full Residence'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setRoomType(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        roomType === type
                          ? 'bg-[#8B6B4D] text-white shadow-xs'
                          : 'bg-[#F8F7F5] text-[#1A1A1A] border border-[#EAE7E3] hover:border-[#8B6B4D]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Format */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-2">
                  Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormat('virtual')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-medium cursor-pointer transition-all ${
                      format === 'virtual'
                        ? 'border-[#8B6B4D] bg-[#8B6B4D]/5 text-[#8B6B4D]'
                        : 'border-[#EAE7E3] bg-[#F8F7F5] text-[#1A1A1A]'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Virtual 3D Video Studio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormat('showroom')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-medium cursor-pointer transition-all ${
                      format === 'showroom'
                        ? 'border-[#8B6B4D] bg-[#8B6B4D]/5 text-[#8B6B4D]'
                        : 'border-[#EAE7E3] bg-[#F8F7F5] text-[#1A1A1A]'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Private Flagship Showroom</span>
                  </button>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1.5">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F8F7F5] border border-[#EAE7E3] focus:outline-none focus:border-[#8B6B4D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F8F7F5] border border-[#EAE7E3] focus:outline-none focus:border-[#8B6B4D]"
                  >
                    <option value="10:00">10:00 AM (CET)</option>
                    <option value="12:00">12:00 PM (CET)</option>
                    <option value="14:00">02:00 PM (CET)</option>
                    <option value="16:00">04:00 PM (CET)</option>
                    <option value="18:00">06:00 PM (CET)</option>
                  </select>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Helena Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F8F7F5] border border-[#EAE7E3] focus:outline-none focus:border-[#8B6B4D]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="helena@residence.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F8F7F5] border border-[#EAE7E3] focus:outline-none focus:border-[#8B6B4D]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#8B6B4D] hover:bg-[#6F533B] text-white text-xs uppercase tracking-[0.18em] font-medium rounded-full shadow-md transition-all cursor-pointer"
                >
                  Reserve Consultation Window
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
