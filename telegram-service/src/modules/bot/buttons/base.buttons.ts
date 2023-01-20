import { Markup } from 'telegraf';
import { Commands } from '../constants';

export function baseButtons() {
  return Markup.keyboard([[Commands.Balance]]).resize();
}
