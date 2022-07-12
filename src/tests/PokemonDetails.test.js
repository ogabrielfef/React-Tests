import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe(`Verifica se as informações detalhadas do
 pokémon selecionado são mostradas na tela`, () => {
  test('Verifica se a pagina contem um headin com o texto "Pokemon Detalhes"', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const title = screen.getByRole('heading', { name: /pikachu details/i });
    userEvent.click(link);
    expect(title).toBeDefined();
  });
  test('Verifica se não existe o link de navegação para mais detalhes', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    expect(link).not.toBeInTheDocument();
  });
  test('Verifica se detalhes contem um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const summary = screen.getByRole('heading', { name: /summary/i });
    userEvent.click(link);
    expect(summary).toBeInTheDocument();
  });
  test('Verifica se contém um paragrafo com as informações do Pokemon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const paragrafo = screen.getByText(/electricity /i);
    userEvent.click(link);
    expect(paragrafo).toBeInTheDocument();
  });
});

describe(`Verifique se existe na página uma seção com
 os mapas contendo as localizações do pokémon`, () => {
  test(`Na seção de detalhes deverá existir um heading h2
   com o texto Game Locations of Pokemon`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const title = screen.getByRole('heading', { name: /game locations of pikachu/i });
    userEvent.click(link);
    expect(title).toBeInTheDocument();
  });
  test(`Verifica se as localizações do pokémon devem
   ser mostradas na seção de detalhes`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const images = screen.getAllByRole('img', { name: /location/i });
    userEvent.click(link);
    expect(images).toHaveLength(2);
  });
  test(`Devem ser exibidos o nome da localização
   e uma imagem do mapa em cada localização`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const images = screen.getAllByRole('img', { name: /location/i });
    const map = screen.getByText(/kanto power plant/i);
    userEvent.click(link);
    expect(images).toBeDefined();
    expect(map).toBeInTheDocument();
  });
  test('A imagem da localização deve ter um atributo src com a URL da localização',
    () => {
      const mapUrl = 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif';
      renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: /more details/i });
      const images = screen.getAllByRole('img', { name: /location/i });
      userEvent.click(link);
      expect(images[0]).toHaveAttribute('src', mapUrl);
      expect(images[0]).toHaveAttribute('alt', 'Pikachu location');
    });
});

describe(`Teste se o usuário pode favoritar
 um pokémon através da página de detalhes`, () => {
  test('A página deve exibir um checkbox que permite favoritar o pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const fav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(link);
    expect(fav).toBeDefined();
  });
  test(`Cliques alternados no checkbox devem
   adicionar e remover respectivamente o pokémon da lista de favoritos`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const fav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const favImage = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    const notFav = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
    userEvent.click(link);
    userEvent.click(fav);
    userEvent.click(fav);
    expect(favImage).toBeDefined();
    expect(notFav).toBeNull();
  });
  test('Verifica se o label do checkbox possui o texto "Pokémon favoritado?"', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const favInput = screen.getByLabelText(/pokémon favoritado\?/i);
    userEvent.click(link);
    expect(favInput).toBeInTheDocument();
  });
});
