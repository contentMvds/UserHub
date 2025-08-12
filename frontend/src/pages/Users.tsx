import React, { useEffect, useState } from 'react';

interface Props {
  token: string;
}

interface User {
  id: string;
  email: string;
  profileId: string;
}

export default function Users({ token }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileId, setProfileId] = useState('');

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const load = async () => {
    const res = await fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setUsers(await res.json());
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password, profileId })
    });
    setEmail('');
    setPassword('');
    setProfileId('');
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    load();
  };

  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email} (perfil: {u.profileId})
            <button onClick={() => remove(u.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <form onSubmit={create}>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="profileId"
          value={profileId}
          onChange={(e) => setProfileId(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
