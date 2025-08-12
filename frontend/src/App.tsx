import React, { useState } from 'react';
import Login from './pages/Login';
import Users from './pages/Users';
import Profiles from './pages/Profiles';

type View = 'users' | 'profiles';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [view, setView] = useState<View>('users');

  if (!token) {
    return <Login onLogin={(t) => { setToken(t); }} />;
  }

  return (
    <div className="p-4">
      <nav className="mb-4 space-x-2">
        <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setView('users')}>Usuários</button>
        <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setView('profiles')}>Perfis</button>
        <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setToken(null)}>Sair</button>
      </nav>
      {view === 'users' ? <Users token={token} /> : <Profiles token={token} />}
    </div>
  );
}
