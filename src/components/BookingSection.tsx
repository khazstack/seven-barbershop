import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const staff = [
  { id: 1, name: "Marcus J.", role: "Senior Barber" },
  { id: 2, name: "Alex R.", role: "Stylist" },
  { id: 3, name: "David K.", role: "Master Barber" },
];

const serviceOptions = [
  "Classic Haircut",
  "Beard Trim & Shape",
  "The Full Package",
  "Hair Styling",
  "Hot Towel Shave",
  "Facial Treatment",
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM",
];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const BookingSection = () => {
  const { toast } = useToast();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" });

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const allSelected = selectedService && selectedStaff && selectedDay && selectedTime;

  const handleConfirm = () => {
    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim()) {
      toast({ title: "Please fill in all contact fields", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail.trim())) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    toast({
      title: "Appointment Confirmed!",
      description: `${selectedService} with ${staff.find((s) => s.id === selectedStaff)?.name} on ${monthName} ${selectedDay}, ${currentYear} at ${selectedTime}. Confirmation sent to ${contactEmail.trim()}.`,
    });

    // Reset form
    setSelectedService(null);
    setSelectedStaff(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setContactName("");
    setContactEmail("");
    setContactPhone("");
  };

  return (
    <section id="booking" className="py-24 section-padding bg-primary">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-display text-primary-foreground text-5xl md:text-7xl uppercase tracking-tight text-center">
          Book Your Appointment
        </h2>
        <p className="font-body text-primary-foreground/60 mt-4 text-center">
          Select your service, barber, date, and time below.
        </p>

        {/* Service Selection */}
        <div className="mt-12">
          <label className="font-body text-primary-foreground/60 text-xs uppercase tracking-widest">Service</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
            {serviceOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedService(s)}
                className={`font-body text-sm py-3 px-4 border transition-colors duration-200 ${
                  selectedService === s
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-primary-foreground/20 text-primary-foreground/70 hover:border-primary-foreground/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Selection */}
        <div className="mt-10">
          <label className="font-body text-primary-foreground/60 text-xs uppercase tracking-widest">Barber</label>
          <div className="flex gap-3 mt-3">
            {staff.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStaff(s.id)}
                className={`flex-1 py-4 px-4 border text-center transition-colors duration-200 ${
                  selectedStaff === s.id
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-primary-foreground/20 text-primary-foreground/70 hover:border-primary-foreground/40"
                }`}
              >
                <span className="font-display text-lg block">{s.name}</span>
                <span className="font-body text-xs opacity-60">{s.role}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="text-primary-foreground/60 hover:text-primary-foreground">
              <ChevronLeft size={20} />
            </button>
            <span className="font-display text-primary-foreground text-2xl uppercase tracking-wider">
              {monthName} {currentYear}
            </span>
            <button onClick={nextMonth} className="text-primary-foreground/60 hover:text-primary-foreground">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="font-body text-primary-foreground/40 text-xs text-center py-2 uppercase">
                {d}
              </div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const past = isPast(day);
              const selected = selectedDay === day;
              return (
                <button
                  key={day}
                  disabled={past}
                  onClick={() => setSelectedDay(day)}
                  className={`font-body text-sm py-3 text-center transition-colors duration-200 ${
                    past
                      ? "text-primary-foreground/20 cursor-not-allowed"
                      : selected
                      ? "bg-accent text-accent-foreground"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/10"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        {selectedDay && (
          <div className="mt-10 animate-fade-in">
            <label className="font-body text-primary-foreground/60 text-xs uppercase tracking-widest">Time</label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-3">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`font-body text-sm py-3 border transition-colors duration-200 ${
                    selectedTime === t
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-primary-foreground/20 text-primary-foreground/70 hover:border-primary-foreground/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contact Details & Confirm */}
        {allSelected && (
          <div className="mt-12 animate-fade-in">
            <label className="font-body text-primary-foreground/60 text-xs uppercase tracking-widest">Your Details</label>
            <div className="grid md:grid-cols-3 gap-3 mt-3">
              <input
                type="text"
                placeholder="Full Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                maxLength={100}
                className="font-body text-sm py-3 px-4 bg-transparent border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                maxLength={255}
                className="font-body text-sm py-3 px-4 bg-transparent border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                maxLength={20}
                className="font-body text-sm py-3 px-4 bg-transparent border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={handleConfirm}
              className="w-full mt-6 bg-accent text-accent-foreground font-body font-semibold text-sm uppercase tracking-widest py-4 hover:opacity-90 transition-opacity duration-200"
            >
              Confirm Appointment →
            </button>
            <p className="font-body text-primary-foreground/40 text-xs text-center mt-3">
              {selectedService} with {staff.find((s) => s.id === selectedStaff)?.name} on {monthName} {selectedDay}, {currentYear} at {selectedTime}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
