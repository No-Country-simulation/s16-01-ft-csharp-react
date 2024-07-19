import { render, screen } from '@testing-library/react';
import GreetingsWithTime from '../components/pure/GreetingsWithTime';
import { describe, it, expect, vi } from 'vitest';

// Mock de Date para controlar la hora actual en las pruebas
vi.useFakeTimers();
vi.setSystemTime(new Date('2023-01-01T09:00:00Z').getTime());

describe('GreetingsWithTime Component', async () => {
  const renderComponentAtHour = (hour: number) => {
    vi.setSystemTime(new Date(`2023-01-01T${hour.toString().padStart(2, '0')}:00:00Z`).getTime());
    render(<GreetingsWithTime />);
    vi.advanceTimersByTime(1000);
    const tick = () => {
    };
    const intervalId = setInterval(tick, 1000)
    return () => clearInterval(intervalId);
  };

  it('muestra "Buenos Días" entre las 8 y las 12 horas', () => {
    renderComponentAtHour(9);
    expect(screen.getByDisplayValue('Buenos Días')).toBeTruthy();
  });

  it('muestra "Buenas Tardes" entre las 13 y las 20 horas', () => {
    renderComponentAtHour(14);
    expect(screen.getByDisplayValue('Buenas Tardes')).toBeTruthy();
  });

  it('muestra "Buenas Noches" entre las 21 y las 7 horas', () => {
    renderComponentAtHour(22);
    expect(screen.getByDisplayValue('Buenas Noches')).toBeTruthy();
  });

  it('muestra "Servicio Deshabilitado." fuera de las horas establecidas', () => {
    renderComponentAtHour(7);
    expect(screen.getByDisplayValue('Servicio Deshabilitado.')).toBeTruthy();
  });
});
