import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { contaAPI } from '../services/api';

function CreatePage() {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [saldo, setSaldo] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = {
        codigo: codigo,
        nome: nome,
        tipo: tipo,
        saldo: parseFloat(saldo) || 0,
        ativo: ativo
      };

      await contaAPI.create(data);
      setMessage('Conta criada com sucesso!');
      
      // Limpar formulário
      setCodigo('');
      setNome('');
      setTipo('');
      setSaldo('');
      setAtivo(true);

    } catch (error) {
      setMessage('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className='mt-4'>
      <h1 className='mb-4'>
        Cadastro de Contas
      </h1>

      {message && (
        <Alert variant={message.includes('sucesso') ? 'success' : 'danger'}>
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='codigo'>
          <Form.Label>Código:</Form.Label>
          <Form.Control
            type='text'
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder='Ex: 1.1.01'
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='nome'>
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type='text'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Ex: Caixa Geral'
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='tipo'>
          <Form.Label>Tipo:</Form.Label>
          <Form.Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value=''>Selecione</option>
            <option value='ATIVO'>ATIVO</option>
            <option value='PASSIVO'>PASSIVO</option>
            <option value='RECEITA'>RECEITA</option>
            <option value='DESPESA'>DESPESA</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='saldo'>
          <Form.Label>Saldo:</Form.Label>
          <Form.Control
            type='number'
            step='0.01'
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            placeholder='0.00'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='ativo'>
          <Form.Check
            type='checkbox'
            label='Conta Ativa'
            checked={ativo}
            onChange={(e) => setAtivo(e.target.checked)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </Form>
    </Container>
  );
}

export default CreatePage;