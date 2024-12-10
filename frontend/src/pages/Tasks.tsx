import { Header, TasksItems } from '../components';

export const Tasks = () => {
  return (
    <div className="wrapper">
      <Header />
      <section className="courses">
        <div className="container">
          <TasksItems />
        </div>
      </section>
    </div>
  );
};
