import React, { useEffect, useState } from 'react';

interface Props {
  token: string;
}

interface Profile {
  id: string;
  name: string;
}

export default function Profiles({ token }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [name, setName] = useState('');

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const load = async () => {
    const res = await fetch('/api/profiles', { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setProfiles(await res.json());
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/profiles', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name })
    });
    setName('');
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/profiles/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    load();
  };

  return (
    <div>
      <h2>Perfis</h2>
      <ul>
        {profiles.map((p) => (
          <li key={p.id}>
            {p.name} <button onClick={() => remove(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <form onSubmit={create}>
        <input
          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
