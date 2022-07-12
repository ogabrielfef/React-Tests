import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém o texto Page requested not found 😭', () => {
    // acessar os elementos da tela
    renderWithRouter(<NotFound />);
    const titulo = screen.getByRole('heading', /page requested not cound/i);
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(titulo).toBeInTheDocument();
  });
});
