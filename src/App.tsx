import { Calendar } from './components/ui';

const events = {
  '2024-11-6': [
    {
      title: 'test_1',
      startDate: new Date('2024-11-6'),
      endDate: new Date('2024-11-6'),
      meta: {
        recruitId: 'recruit_id',
      },
    },
    {
      title: 'test_2',
      startDate: new Date('2024-11-6'),
      endDate: new Date('2024-11-6'),
      meta: {
        recruitId: 'recruit_id',
      },
    },
  ],
  '2024-11-8': [
    {
      title: 'test_2',
      startDate: new Date('2024-11-8'),
      endDate: new Date('2024-11-8'),
      meta: {
        recruitId: 'recruit_id',
      },
    },
  ],
};

function App() {
  return <Calendar events={events} />;
}

export default App;
