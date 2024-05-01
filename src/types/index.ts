import {
  CreateChatCompletionResponseChoicesInner,
} from 'openai';
import { Dispatch, SetStateAction } from 'react';
import { ConversationItem } from '../pages/home/Page';

export interface ChatCompletionResponseChoices extends CreateChatCompletionResponseChoicesInner {
  text: string;
}

export interface ChatFormProps {
  classNames: string;
  conversation: ConversationItem[];
  setConversation: Dispatch<SetStateAction<ConversationItem[]>>
}