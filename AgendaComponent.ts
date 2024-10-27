import * as React from 'react';
import { useState, useEffect } from 'react';
import { sp } from "@pnp/sp/presets/all"; // Importar PnP JS para manejar consultas a SharePoint
import styles from './AgendaComponent.module.scss';

export interface IAgendaEvent {
  Title: string;
  StartDate: string;
  EndDate: string;
}

const AgendaComponent: React.FC = () => {
  const [events, setEvents] = useState<IAgendaEvent[]>([]);

  // Obtener eventos desde una lista de SharePoint
  const fetchEvents = async () => {
    try {
      const items: IAgendaEvent[] = await sp.web.lists.getByTitle("Eventos").items.select("Title", "StartDate", "EndDate").get();
      setEvents(items);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.agenda}>
      <h2>Agenda Compartida</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h3>{event.Title}</h3>
            <p>Inicio: {new Date(event.StartDate).toLocaleDateString()}</p>
            <p>Fin: {new Date(event.EndDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgendaComponent;
