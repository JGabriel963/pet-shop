import AppointmentForm from '@/components/appointment-form/appointment-form';
import { PeriodSection } from '@/components/period-section';
import { groupAppointmentByPeriod } from '@/utils/appointment-utils';
import { APPOINTMENT_DATA } from '@/utils/mock-data';

export default function Home() {
  const periods = groupAppointmentByPeriod(APPOINTMENT_DATA);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div>
            <h1 className="text-title-size text-content-primary mb-2">
              Sua agenda
            </h1>
            <p className="text-paragraph-medium-size text-content-secondary">
              Aqui você pode ver todos os clientes e serviços agendados para
              hoje.
            </p>
          </div>
        </div>
      </div>
      <div className="pb-24 md:pb-0">
        {periods.map((period, index) => (
          <PeriodSection period={period} key={index} />
        ))}
      </div>

      <div>
        <AppointmentForm />
      </div>
    </div>
  );
}
