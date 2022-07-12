import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import pokemons from '../data';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from './renderWithRouter';

const Obj = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
describe('Testes do component Pokedex', () => {
  test('Verifique se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ Obj }
      />);
      const title = screen.getByRole('heading',
        { name: /encountered pokémons/i, level: 2 });
      expect(title).toBeInTheDocument();
    });
  test(`Verifica se é exibido o próximo pokémon da lista,
   quando o botão 'Próximo pokémon' é clicado`,
  () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ Obj }
    />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeDefined();
    userEvent.click(button);
    const heading = screen.getByText(/charmander/i);
    expect(heading).toBeDefined();
  });
  test(`Verifica se os próximos pokémons da lista são mostrados,
   um a um, ao clicar sucessivamente no botão`, () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ Obj }
    />);
    const image = screen.getAllByRole('img', { name: /sprite/i });
    expect(image).toHaveLength(1);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    const newImage = screen.getAllByRole('img', { name: /sprite/i });
    expect(newImage).toHaveLength(1);
  });
  test(`Verifica se ao clicar no botão no ultimo pokemon da lista,
   ela retorna para o primeiro`, () => {
    const newPokemonsArr = [pokemons[0], pokemons[8]];
    renderWithRouter(<Pokedex
      pokemons={ newPokemonsArr }
      isPokemonFavoriteById={ Obj }
    />);
    const title = screen.getByText(/pikachu/i);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(title).toBeInTheDocument();
    userEvent.click(button);
    const title2 = screen.getByText(/dragonair/i);
    expect(title2).toBeInTheDocument();
    userEvent.click(button);
    expect(title).toBeInTheDocument();
  });
  test('Verifica se a Pokedex possui os botões de filtro, sem repetição', () => {
    const btnsLength = 7;
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ Obj }
    />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const eletricButton = screen.getAllByRole('button', { name: /electric/i });
    expect(buttons).toHaveLength(btnsLength);
    expect(eletricButton).toHaveLength(1);
  });
  test('Verifica se um filtro for selecionado, a lista mostra apenas aquele tipo', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ Obj }
    />);
    const fireFilter = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireFilter);
    const charmanderImage = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmanderImage).toBeDefined();
    const nextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPoke);
    const rapidashImage = screen.getByRole('img', { name: /rapidash sprite/i });
    expect(rapidashImage).toBeDefined();
  });
  test('Verifica se o texto do botão é o mesmo do tipo, ex "Bug"', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ Obj }
    />);
    const textType = screen.getByText(/Bug/i);
    const btn = screen.getByRole('button', { name: /bug/i });
    expect(btn).toEqual(textType);
  });
  test('Verifica se o botão "All" está sempre visível', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ Obj }
    />);
    const allFilter = screen.getByRole('button', { name: /all/i });
    const electricFilter = screen.getByRole('button', { name: /all/i });
    userEvent.click(electricFilter);
    expect(allFilter).toBeDefined();
  });
  test(`Verifica se a Pokedex mostra todos Pokemons
   normalmente quando filtro "All" é selecionado`, () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ Obj }
    />);
    const nextPokeButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const firstPoke = screen.getByText(/pikachu/i);
    pokemons.forEach(() => userEvent.click(nextPokeButton));
    expect(firstPoke).toBeDefined();
  });
  test('Verifique se ao autualizar a pagina, o filtro "All" é selecionado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ Obj }
    />);
    const filterPsych = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(filterPsych);
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ Obj }
    />);
    const title = screen.getByText(/pikachu/i);
    expect(title).toBeInTheDocument();
  });
});
