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
    const titulo = screen.getByRole('heading', 'level: 2');
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(titulo).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    // acessar os elementos da tela
    renderWithRouter(<About />);
    const paragrafos = screen.getByText(/pokémons/i);
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(paragrafos).toHaveLength(2);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    // acessar os elementos da tela
    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageEl = screen.getByRole('img', { name: /pokédex/i });
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(imageEl).toHaveProperty('src', imageUrl);
    expect(imageEl).toHaveProperty('alt', 'Pokédex');
  });
});
