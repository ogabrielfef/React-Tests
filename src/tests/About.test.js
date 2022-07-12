import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('Verifica se o primeiro link possui o texto "Home"', () => {
      renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });
      expect(home).toBeDefined();
    });
    it('Verifica se o segundo link possui o texto "About"', () => {
      renderWithRouter(<App />);
      const about = screen.getByRole('link', { name: /about/i });
      expect(about).toBeDefined();
    });
    it('Verifica se o terceiro link possui o texto "Favorite Pokémons"', () => {
      renderWithRouter(<App />);
      const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(favorite).toBeDefined();
    });
  });

describe('Verifica se a aplicação é redirecionada para a página ao clicar no link',
  () => {
    it('Verifica se ao clicar no link "Home", a pag inicial é renderizada', () => {
      renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });

      userEvent.click(home);

      const titleElement = screen.getByRole('heading', { name: /encountered pokémons/i });
      expect(titleElement).toBeInTheDocument();
    });
    it('Verifica se ao clicar no link "About", a pag sobre é renderizada', () => {
      renderWithRouter(<App />);
      const about = screen.getByRole('link', { name: /about/i });

      userEvent.click(about);

      const titleElement = screen.getByRole('heading', { name: /about pokédex/i });
      expect(titleElement).toBeInTheDocument();
    });
    it('Verifica se ao clicar no link "Favorite Pokémon", a pag favoritos é renderizada',
      () => {
        renderWithRouter(<App />);
        const favorite = screen.getByRole('link', { name: /favorite pokémon/i });

        userEvent.click(favorite);

        const titleElement = screen.getByRole('heading', { name: /favorite pokémons/i });
        expect(titleElement).toBeInTheDocument();
      });
    it('Verifica se ao digitar uma URL inexistente, a pag "not found" é renderizada',
      () => {
        const { history } = renderWithRouter(<App />);

        history.push('/page-not-found');

        const titleElement = screen.getByRole('heading', { name: /pokédex/i });
        expect(titleElement).toBeInTheDocument();
      });
  });
