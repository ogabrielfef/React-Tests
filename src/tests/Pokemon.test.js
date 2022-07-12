import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

const pokeRender = pokemons[3];
describe(`Verifica se é renderizado um card,
 com as informações de determinado pokémon`, () => {
  test('Verifica se o nome correto do Pokemon é mostrado na tela', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokeRender }
      showDetailsLink
    />);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent(pokeRender.name);
  });
  test('Verifica se o tipo correto do pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokeRender }
      showDetailsLink
    />);
    const pokemon = screen.getByTestId('pokemon-type');
    expect(pokemon).toHaveTextContent(pokeRender.type);
  });
  test('Verifica se o peso do Pokemon é mostrado na unidade de medida correta', () => {
    const { averageWeight: { value, measurementUnit } } = pokeRender;
    const pesoCorreto = `${value} ${measurementUnit}`;
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokeRender }
      showDetailsLink
    />);
    const pokemon = screen.getByTestId('pokemon-weight');
    expect(pokemon).toHaveTextContent(pesoCorreto);
  });
  test('Verifica se a imagem é exibida com o alt correto', () => {
    const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png';
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokeRender }
      showDetailsLink
    />);
    const pokemon = screen.getByRole('img', { name: /ekans sprite/i });
    expect(pokemon).toHaveAttribute('src', imgUrl);
    expect(pokemon).toHaveAttribute('alt', 'Ekans sprite');
  });
});

describe('Verifica o link "More Details"', () => {
  test(`Verifica se o card do pokémon indicado contém
   um link de navegação "More Details" do Pokemon renderizado`,
  () => {
    const pokeRenderId = pokeRender.id;
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokeRender }
      showDetailsLink
    />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toHaveAttribute('href', `/pokemons/${pokeRenderId}`);
  });
  test(`Verifica se ao clicar no link de navegação do pokémon,
   é feito o redirecionamento da aplicação para a página de detalhes de pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    const idUrl = pokemons[0].id;
    const link = screen.getByRole('link', { name: /more details/i });

    userEvent.click(link);

    const { location: { pathname } } = history;
    const title = screen.getByRole('heading', { name: /pikachu details/i });
    expect(title).toBeDefined();
    expect(pathname).toBe(`/pokemons/${idUrl}`);
  });
  test('Verifica se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokeRender }
      showDetailsLink
    />);
    const favoImage = screen.getByRole('img', { name: / is marked as favorite/i });
    expect(favoImage).toHaveAttribute('src', '/star-icon.svg');
    expect(favoImage).toHaveAttribute('alt', `${pokeRender.name} is marked as favorite`);
  });
});
