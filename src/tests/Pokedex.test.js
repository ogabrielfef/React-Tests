import { screen } from '@testing-library/react';
import React from 'react';
import { Pokedex } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    // acessar os elementos da tela
    renderWithRouter(<Pokedex />);
    const titulo = screen.getByRole('heading', { name: /Encountered pokémons/i });
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(titulo).toBeInTheDocument();
  });
});
