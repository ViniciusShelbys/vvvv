import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [receita, setReceita] = useState(9000);
  const [gastos, setGastos] = useState(() => {
    const data = localStorage.getItem('gastos');
    return data ? JSON.parse(data) : [];
  });
  const [novo, setNovo] = useState({ descricao: '', valor: '', categoria: '' });

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  const adicionarGasto = () => {
    if (!novo.descricao || !novo.valor || !novo.categoria) return;
    setGastos([...gastos, { ...novo, valor: parseFloat(novo.valor) }]);
    setNovo({ descricao: '', valor: '', categoria: '' });
  };

  const totalDespesas = gastos.reduce((acc, item) => acc + item.valor, 0);
  const saldo = receita - totalDespesas;

  return (
    <div style={{ padding: 30, fontFamily: 'Arial, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Planilha do Vinicius</h1>

      <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
        <Card titulo="Receita" valor={receita} cor="#4CAF50" />
        <Card titulo="Despesas" valor={totalDespesas} cor="#F44336" />
        <Card titulo="Saldo" valor={saldo} cor={saldo >= 0 ? '#2196F3' : '#FF9800'} />
      </div>

      <div style={{ marginTop: 40 }}>
        <h2>Adicionar Lançamento</h2>
        <input placeholder="Descrição" value={novo.descricao} onChange={e => setNovo({ ...novo, descricao: e.target.value })} />
        <input type="number" placeholder="Valor" value={novo.valor} onChange={e => setNovo({ ...novo, valor: e.target.value })} />
        <input placeholder="Categoria" value={novo.categoria} onChange={e => setNovo({ ...novo, categoria: e.target.value })} />
        <button onClick={adicionarGasto}>Adicionar</button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h2>Lançamentos</h2>
        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 10 }}>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((gasto, i) => (
              <tr key={i}>
                <td>{gasto.descricao}</td>
                <td>R$ {gasto.valor.toFixed(2)}</td>
                <td>{gasto.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({ titulo, valor, cor }) => (
  <div style={{ flex: 1, backgroundColor: cor, color: 'white', padding: 20, borderRadius: 8 }}>
    <h3>{titulo}</h3>
    <p style={{ fontSize: 24 }}>R$ {valor.toFixed(2)}</p>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);