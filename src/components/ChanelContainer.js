import React, { useState } from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';
import ChannelInner from './ChannelInner';
import CreateChannel from './CreateChannel';
import Dropdown from './Dropdown';
import EditChannel from './EditChannel';
import Games from './Games';
import TodosContainer from './TodosContainer';

const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  const [show, setShow] = useState('chat');

  const getAptComponent = () => {
    if (show === 'chat') {
      return <ChannelInner setIsEditing={setIsEditing} />;
    } else if (show === 'todos') {
      return <TodosContainer />;
    } else if (show === 'games') {
      return <Games />;
    }
  };

  if (isCreating) {
    return (
      <div className='channel__container'>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>
        This is the beginning of your chat history.
      </p>
      <p className='channel-empty__second'>
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  return (
    <div className='channel__container'>
      <div className='dropdown__container'>
        <Dropdown
          options={['chat', 'todos', 'games']}
          setSelected={setShow}
          selected={show}
        />
      </div>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        {getAptComponent()}
      </Channel>
    </div>
  );
};

export default ChannelContainer;
