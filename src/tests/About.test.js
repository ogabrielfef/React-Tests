import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Testa o about', () => {
  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    // acessar os elementos da tela
    renderWithRouter(<About />);
    const aboutText = screen.getByText(/this application simulates a pokédex/i);
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(aboutText).toBeDefined();
  });
  test('Verifica se a pagina tem um h2 com o texto Avout Pokedex', () => {
    // acessar os elementos da tela
    renderWithRouter(<About />);
    const titulo = screen.getByRole('heading', { name: /About Pokédex/i }, { level: 2 });
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(titulo).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    // acessar os elementos da tela
    renderWithRouter(<About />);
    const paragrafos = screen.getAllByText(/pokémons/i);
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(paragrafos).toHaveLength(2);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    // acessar os elementos da tela
    renderWithRouter(<About />);
    // interagir com os elementos (se for necessário)
    // fazer os testes
    const imagemPokedex = screen.getByAltText(/Pokédex/i);
    expect(imagemPokedex.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
