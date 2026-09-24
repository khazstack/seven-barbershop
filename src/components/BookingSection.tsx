import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";
import { useBooking } from "@/lib/booking";
import { buildTimeSlots, formatPrice, whatsappLink } from "@/lib/site";

const ANY_BARBER = "Любой мастер";
const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
// Неделя начинается с понедельника
const getFirstDayOfMonth = (year: number, month: number) => (new Date(year, month, 1).getDay() + 6) % 7;

const optionClass = (active: boolean) =>
  `font-body text-sm py-3 px-4 border transition-colors duration-200 ${
    active
      ? "bg-accent text-accent-foreground border-accent"
      : "border-primary-foreground/20 text-primary-foreground/70 hover:border-primary-foreground/40"
  }`;

const inputClass =
  "font-body text-sm py-3 px-4 bg-transparent border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none transition-colors";

const BookingSection = () => {
  const { toast } = useToast();
  const { preset } = useBooking();
  const { branches, services, barbers, booking } = siteConfig;
  const isWhatsApp = booking.type === "whatsapp";
  const multiBranch = branches.length > 1;

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(multiBranch ? null : branches[0]?.id ?? null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Кнопки «Записаться» на странице передают выбранную услугу/филиал
  useEffect(() => {
    if (preset.service) setSelectedService(preset.service);
    if (preset.branchId && preset.branchId !== selectedBranchId) {
      setSelectedBranchId(preset.branchId);
      setSelectedBarber(null);
      setSelectedTime(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  const branch = branches.find((b) => b.id === selectedBranchId);
  const branchBarbers = barbers.filter((b) => b.branchId === selectedBranchId);
  const timeSlots = useMemo(
    () => buildTimeSlots(booking.slots.from, booking.slots.to, booking.slots.stepMinutes),
    [booking.slots],
  );

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString("ru-RU", { month: "long" });
  const isCurrentMonth = currentYear === today.getFullYear() && currentMonth === today.getMonth();

  const prevMonth = () => {
    if (isCurrentMonth) return;
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isPastSlot = (slot: string) => {
    if (!isCurrentMonth || selectedDay !== today.getDate()) return false;
    const [h, m] = slot.split(":").map(Number);
    return h * 60 + m <= today.getHours() * 60 + today.getMinutes();
  };

  const selectBranch = (id: string) => {
    setSelectedBranchId(id);
    setSelectedBarber(null);
    setSelectedTime(null);
  };

  const dateLabel = selectedDay
    ? new Date(currentYear, currentMonth, selectedDay).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      })
    : "";

  const allSelected = branch && selectedService && selectedBarber && selectedDay && selectedTime;

  const resetForm = () => {
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setContactName("");
    setContactPhone("");
  };

  const handleConfirm = () => {
    if (!branch) return;

    if (!contactName.trim() || !contactPhone.trim()) {
      toast({ title: "Заполните имя и телефон", variant: "destructive" });
      return;
    }
    if (contactPhone.replace(/\D/g, "").length < 10) {
      toast({ title: "Проверьте номер телефона", variant: "destructive" });
      return;
    }

    if (isWhatsApp) {
      const lines = [
        `Здравствуйте! Хочу записаться в ${siteConfig.brand.name}.`,
        multiBranch ? `Филиал: ${branch.name} (${branch.address})` : null,
        `Услуга: ${selectedService}`,
        `Мастер: ${selectedBarber}`,
        `Дата: ${dateLabel}`,
        `Время: ${selectedTime}`,
        `Имя: ${contactName.trim()}`,
        `Телефон: ${contactPhone.trim()}`,
      ].filter(Boolean);
      const to = booking.whatsapp ?? branch.whatsapp;
      window.open(whatsappLink(to, lines.join("\n")), "_blank", "noopener,noreferrer");
      return;
    }

    toast({
      title: "Вы записаны!",
      description: `${selectedService}, мастер: ${selectedBarber}, ${dateLabel} в ${selectedTime}${
        multiBranch ? `, ${branch.name}` : ""
      }. Мы перезвоним на ${contactPhone.trim()} для подтверждения.`,
    });
    resetForm();
  };

  return (
    <section id="booking" className="py-24 section-padding bg-primary">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-display text-primary-foreground text-5xl md:text-7xl uppercase tracking-tight text-center">
          Онлайн-запись
        </h2>
        <p className="font-body text-primary-foreground/60 mt-4 text-center">
          Выберите {multiBranch ? "филиал, " : ""}услугу, мастера, дату и время.
        </p>

        {/* Branch Selection */}
        {multiBranch && (
          <div className="mt-12">
            <label className="font-body text-primary-foreground/60 text-xs uppercase tracking-widest">Филиал</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3">
              {branches.map((b) => (
                <button key={b.id} onClick={() => selectBranch(b.id)} className={`${optionClass(selectedBranchId === b.id)} text-left`}>
                  <span className="block font-medium">{b.address}</span>
                  <span className="block text-xs opacity-60">{b.district}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Service Selection */}
        <div className={multiBranch ? "mt-10" : "mt-12"}>
          <label className="font-body text-primary-foreground/60 text-xs uppercase tracking-widest">Услуга</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
            {services.map((s) => (
              <button key={s.name} onClick={() => setSelectedService(s.name)} className={optionClass(selectedService === s.name)}>
                <span className="block">{s.name}</span>
                <span className="block text-xs opacity-60">{formatPrice(s.price)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Barber Selection */}
        {branch && (
          <div className="mt-10 animate-fade-in">
            <label className="font-body text-primary-foreground/60 text-xs uppercase tracking-widest">Мастер</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
              {[...branchBarbers.map((b) => ({ name: b.name, role: b.role })), { name: ANY_BARBER, role: "Ближайший свободный" }].map((b) => (
                <button
                  key={b.name}
                  onClick={() => setSelectedBarber(b.name)}
                  className={`${optionClass(selectedBarber === b.name)} py-4 text-center`}
                >
                  <span className="font-display text-lg block">{b.name}</span>
                  <span className="font-body text-xs opacity-60">{b.role}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Calendar */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              disabled={isCurrentMonth}
              aria-label="Предыдущий месяц"
              className="text-primary-foreground/60 hover:text-primary-foreground disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-display text-primary-foreground text-2xl uppercase tracking-wider">
              {monthName} {currentYear}
            </span>
            <button onClick={nextMonth} aria-label="Следующий месяц" className="text-primary-foreground/60 hover:text-primary-foreground">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((d) => (
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
                  onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
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
        {selectedDay && branch && (
          <div className="mt-10 animate-fade-in">
            <label className="font-body text-primary-foreground/60 text-xs uppercase tracking-widest">Время</label>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-3">
              {timeSlots.map((t) => {
                const past = isPastSlot(t);
                return (
                  <button
                    key={t}
                    disabled={past}
                    onClick={() => setSelectedTime(t)}
                    className={`${optionClass(selectedTime === t)} px-0 disabled:opacity-20 disabled:cursor-not-allowed`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {selectedDay && !branch && (
          <p className="mt-10 font-body text-primary-foreground/60 text-sm text-center">
            Выберите филиал, чтобы увидеть свободное время.
          </p>
        )}

        {/* Contact Details & Confirm */}
        {allSelected && (
          <div className="mt-12 animate-fade-in">
            <label className="font-body text-primary-foreground/60 text-xs uppercase tracking-widest">
              Ваши данные
            </label>
            <div className="grid gap-3 mt-3 md:grid-cols-2">
              <input
                type="text"
                placeholder="Имя"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                maxLength={100}
                className={inputClass}
              />
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                maxLength={20}
                className={inputClass}
              />
            </div>

            <button
              onClick={handleConfirm}
              className="w-full mt-6 bg-accent text-accent-foreground font-body font-semibold text-sm uppercase tracking-widest py-4 hover:opacity-90 transition-opacity duration-200"
            >
              {isWhatsApp ? "Отправить в WhatsApp →" : "Подтвердить запись →"}
            </button>
            <p className="font-body text-primary-foreground/40 text-xs text-center mt-3">
              {selectedService} · {selectedBarber} · {dateLabel} в {selectedTime}
              {multiBranch && ` · ${branch.address}`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
