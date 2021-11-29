import React from 'react';
import './Games.css';

const gameList = [
  {
    title: 'Skribbl',
    link: 'https://skribbl.io/',
    description: 'Free multiplayer drawing and guessing game.',
  },
  {
    title: 'Codenames',
    link: 'https://codenames.game/',
    description: 'Play codenames with your friends.',
  },
  {
    title: 'Jigsaw Explorer',
    link: 'https://www.jigsawexplorer.com/',
    description: 'Online jigsaw puzzles',
  },
];

export default function Games() {
  return (
    <div className='games-container'>
      <h2>Games</h2>
      {gameList.map((game) => (
        <div className='game'>
          <div className='flex-title'>
            <p className='game-title'>{game.title}</p>
            <a
              className='game-link'
              href={game.link}
              target='_blank'
              rel='noreferrer'
            >
              Play
            </a>
          </div>
          <p className='game-description'>{game.description}</p>
        </div>
      ))}
    </div>
  );
}
