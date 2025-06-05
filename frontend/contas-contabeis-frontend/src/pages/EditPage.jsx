import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { contaAPI } from '../services/api';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [saldo, setSaldo] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConta();
  }, [id]);

  const loadConta = async () => {
    try {
      const response = await contaAPI.getById(id);
      const conta = response.data;
      
      setCodigo(conta.codigo);
      setNome(conta.nome);
      setTipo(conta.tipo);
      setSaldo(conta.saldo.toString());
      setAtivo(conta.ativo);
    } catch (error) {
      console.log('Erro ao carregar conta:', error);
      navigate('/list');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = {
        codigo: codigo || null,
        nome: nome || null,
        tipo: tipo || null,
        saldo: saldo ? parseFloat(saldo) : null,
        ativo: ativo
      };

      await contaAPI.update(id, data);
      console.log('Conta atualizada com sucesso!');
      navigate('/list');
    } catch (error) {
      console.log('Erro ao atualizar conta:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className='mt-4 text-center'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className='mt-4'>
      <h1 className='mb-4'>Editar Conta</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='codigo'>
          <Form.Label>Código:</Form.Label>
          <Form.Control
            type='text'
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder='Ex: 1.1.01'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='nome'>
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type='text'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Ex: Caixa Geral'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='tipo'>
          <Form.Label>Tipo:</Form.Label>
          <Form.Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
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

        <div className='d-flex gap-2'>
          <Button variant='primary' type='submit' disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button variant='secondary' onClick={() => navigate('/list')}>
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default EditPage;