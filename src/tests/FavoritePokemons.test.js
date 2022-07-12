import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../pages';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('testar mensagem "No favorite pokemon found"', () => {
    // acessar os elementos da tela
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const paragrafo = screen.getByText(/no favorite pokemon found/i);
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(paragrafo).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    // acessar os elementos da tela
    const favoritos = [pokemons[0], pokemons[1], pokemons[2]];
    renderWithRouter(<FavoritePokemons pokemons={ favoritos } />);
    const pokeFavorito = screen.getByText(/pikachu/i);
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(pokeFavorito).toBeInTheDocument();
  });
});
