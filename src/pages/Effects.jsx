import React from 'react';
import { Input } from '../../@/components/ui/input';
import { Button } from '../../@/components/ui/button';

export default function Effects() {
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [age, setAge] = React.useState(0);

  // Ao carregar a página
  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Ao fazer uma mudança no estado "year"
  React.useEffect(() => {
    setAge(new Date().getFullYear() - year);
  }, [year]);

  function handleInputKeyUp(event) {
    setYear(event.target.value);
  }

  return (
    <div className="flex flex-col gap-2">
      <Input type="number" onKeyUp={handleInputKeyUp} defaultValue={year} />
      <hr />
      Uma pessoa que nasceu em {year} tem hoje {age} anos.
      <hr />
      <Button
        onClick={() => {
          setYear(2012);
        }}
      >
        Atualizar ano para 2012
      </Button>
    </div>
  );
}
