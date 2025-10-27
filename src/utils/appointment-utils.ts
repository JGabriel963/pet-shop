import { PeriodSection } from '@/components/period-section';
import { Appointment as AppointmentPrisma } from '@/generated/prisma';
import { Appointment, AppointmentPeriod } from '@/types/appointment';

export function getPeriod(hour: number) {
  if (hour >= 9 && hour < 12) {
    return 'morning';
  }

  if (hour >= 13 && hour < 18) {
    return 'afternoon';
  }

  return 'evening';
}

export function groupAppointmentByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentPeriod[] {
  const transformedAppointments: Appointment[] = appointments.map((apt) => ({
    ...apt,
    time: formatDateTime(apt.scheduleAt),
    service: apt.description,
    period: getPeriod(parseInt(formatDateTime(apt.scheduleAt))),
  }));

  const morningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );

  const afternoonAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );

  const eveningnoonAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },

    {
      title: 'Noite',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningnoonAppointments,
    },
  ];
}

export function formatDateTime(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  });
}
