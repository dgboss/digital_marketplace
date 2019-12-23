import { View } from 'front-end/lib/framework';
import { BootstrapColor } from 'front-end/lib/types';
import { CSSProperties, default as React, MouseEventHandler, ReactElement } from 'react';

export type AvailableIcons
  = 'external-link'
  | 'bars'
  | 'times'
  | 'sign-out'
  | 'caret-down'
  //markdown editor
  | 'image'
  | 'bold'
  | 'italics'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'ordered-list'
  | 'unordered-list'
  | 'markdown'
  // TODO cleanup below
  | 'chevron-left'
  | 'calendar'
  | 'clock'
  | 'map-marker'
  | 'check'
  | 'help-circle'
  | 'trash'
  | 'paperclip'
  | 'question-circle'
  | 'rfi'
  | 'matchmaking'
  | 'discovery-day'
  | 'rating-good'
  | 'rating-neutral'
  | 'rating-bad'
  | 'search'
  | 'buyer'
  | 'vendor'
  | 'times-circle'
  | 'exclamation-circle'
  | 'plus'
  | 'info-circle'
  | 'download';

interface Props {
  name: AvailableIcons;
  color?: BootstrapColor;
  width?: number | 'auto';
  height?: number | 'auto';
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

interface SvgProps extends Props {
  children: Array<ReactElement<any>> | ReactElement<any>;
}

const Feather: View<SvgProps> = props => {
  const { color, width = 1, height = 1, className = '', style = {}, children, onClick } = props;
  return (
    <svg xmlns='http://www.w3.org/2000/svg' style={{ ...style, width: `${width}rem`, height: `${height}rem` }} viewBox='0 0 24 24' fill='none' stroke='currentColor' className={`icon ${color ? `text-${color}` : ''} ${className}`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' onClick={onClick}>
      {children}
    </svg>
  );
};

interface FontAwesomeProps extends SvgProps {
  viewBox?: string;
}

const FontAwesome: View<FontAwesomeProps> = props => {
  const { color, width = 1, height = 1, viewBox, className = '', style = {}, children, onClick } = props;
  return (
    <svg xmlns='http://www.w3.org/2000/svg' style={{ ...style, width: `${width}rem`, height: `${height}rem` }} viewBox={viewBox} fill='currentColor' stroke='currentColor' className={`icon ${color ? `text-${color}` : ''} ${className}`} onClick={onClick}>
      {children}
    </svg>
  );
};

const Icon: View<Props> = props => {
  const { name } = props;
  switch (name) {
    case 'external-link':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M497.6,0,334.4.17A14.4,14.4,0,0,0,320,14.57V47.88a14.4,14.4,0,0,0,14.69,14.4l73.63-2.72,2.06,2.06L131.52,340.49a12,12,0,0,0,0,17l23,23a12,12,0,0,0,17,0L450.38,101.62l2.06,2.06-2.72,73.63A14.4,14.4,0,0,0,464.12,192h33.31a14.4,14.4,0,0,0,14.4-14.4L512,14.4A14.4,14.4,0,0,0,497.6,0ZM432,288H416a16,16,0,0,0-16,16V458a6,6,0,0,1-6,6H54a6,6,0,0,1-6-6V118a6,6,0,0,1,6-6H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V304A16,16,0,0,0,432,288Z'></path></FontAwesome>);
    case 'bars':
      return (<FontAwesome viewBox='0 0 448 512' {...props}><path fill='currentColor' d='M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z'/></FontAwesome>);
    case 'times':
      return (<FontAwesome viewBox='0 0 320 512' {...props}><path fill='currentColor' d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'></path></FontAwesome>);
    case 'sign-out':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96zm231.1 19.5l-19.6 19.6c-4.8 4.8-4.7 12.5.2 17.1L420.8 230H172c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h248.8L307.7 391.7c-4.8 4.7-4.9 12.4-.2 17.1l19.6 19.6c4.7 4.7 12.3 4.7 17 0l164.4-164c4.7-4.7 4.7-12.3 0-17l-164.4-164c-4.7-4.6-12.3-4.6-17 .1z'></path></FontAwesome>);
    case 'caret-down':
      return (<FontAwesome viewBox='0 0 320 512' {...props}><path fill='currentColor' d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'></path></FontAwesome>);
    case 'image':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V112c0-8.822 7.178-16 16-16h416c8.822 0 16 7.178 16 16v288zM112 232c30.928 0 56-25.072 56-56s-25.072-56-56-56-56 25.072-56 56 25.072 56 56 56zm0-80c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm207.029 23.029L224 270.059l-31.029-31.029c-9.373-9.373-24.569-9.373-33.941 0l-88 88A23.998 23.998 0 0 0 64 344v28c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-92c0-6.365-2.529-12.47-7.029-16.971l-88-88c-9.373-9.372-24.569-9.372-33.942 0zM416 352H96v-4.686l80-80 48 48 112-112 80 80V352z'></path></FontAwesome>);
    case 'bold':
      return (<FontAwesome viewBox='0 0 384 512' {...props}><path fill='currentColor' d='M314.52 238.78A119.76 119.76 0 0 0 232 32H48a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16v352H48a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h208a128 128 0 0 0 128-128c0-49.49-28.38-91.92-69.48-113.22zM128 80h88a72 72 0 0 1 0 144h-88zm112 352H128V272h112a80 80 0 0 1 0 160z'></path></FontAwesome>);
    case 'italics':
      return (<FontAwesome viewBox='0 0 320 512' {...props}><path fill='currentColor' d='M320 48v16a16 16 0 0 1-16 16h-67l-88 352h59a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h67l88-352h-59a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z'></path></FontAwesome>);
    case 'h1':
      return (<FontAwesome viewBox='0 0 576 512' {...props}><path fill='currentColor' d='M304 96h-98.94A13.06 13.06 0 0 0 192 109.06v21.88A13.06 13.06 0 0 0 205.06 144H232v88H88v-88h26.94A13.06 13.06 0 0 0 128 130.94V112a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v18.94A13.06 13.06 0 0 0 13.06 144H40v224H13.06A13.06 13.06 0 0 0 0 381.06V400a16 16 0 0 0 16 16h98.94A13.06 13.06 0 0 0 128 402.94v-21.88A13.06 13.06 0 0 0 114.94 368H88v-88h144v88h-26.94A13.06 13.06 0 0 0 192 381.06V400a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-18.94A13.06 13.06 0 0 0 306.94 368H280V144h26.94A13.06 13.06 0 0 0 320 130.94V112a16 16 0 0 0-16-16zm256 272h-56V120a24 24 0 0 0-24-24h-24a24 24 0 0 0-21.44 13.26l-24 48A24 24 0 0 0 432 192h24v176h-56a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16z'></path></FontAwesome>);
    case 'h2':
      return (<FontAwesome viewBox='0 0 576 512' {...props}><path fill='currentColor' d='M304 96h-98.94A13.06 13.06 0 0 0 192 109.06v21.88A13.06 13.06 0 0 0 205.06 144H232v88H88v-88h26.94A13.06 13.06 0 0 0 128 130.94V112a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v18.94A13.06 13.06 0 0 0 13.06 144H40v224H13.06A13.06 13.06 0 0 0 0 381.06V400a16 16 0 0 0 16 16h98.94A13.06 13.06 0 0 0 128 402.94v-21.88A13.06 13.06 0 0 0 114.94 368H88v-88h144v88h-26.94A13.06 13.06 0 0 0 192 381.06V400a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-18.94A13.06 13.06 0 0 0 306.94 368H280V144h26.94A13.06 13.06 0 0 0 320 130.94V112a16 16 0 0 0-16-16zm244.14 272.13H410.82c8.52-60.35 146-79.28 146-179.31C556.8 134.17 515 96 455.05 96a114.71 114.71 0 0 0-97.92 55.05 11.81 11.81 0 0 0 3.58 15.95L382 181.23a11.89 11.89 0 0 0 16.27-3c13-18.23 31.58-31.35 53.72-31.35 29.57 0 49.43 18.08 49.43 45 0 67-149.45 84-149.45 195.49a137.14 137.14 0 0 0 1.39 18.42 12.18 12.18 0 0 0 11.8 10.21h183A11.85 11.85 0 0 0 560 404.18V380a11.85 11.85 0 0 0-11.86-11.87z'></path></FontAwesome>);
    case 'h3':
      return (<FontAwesome viewBox='0 0 576 512' {...props}><path fill='currentColor' d='M480.07 219.78l75.39-85.88a11.82 11.82 0 0 0 2.93-7.76v-18.32A11.89 11.89 0 0 0 546.44 96H379.87a11.88 11.88 0 0 0-11.94 11.82V132a11.88 11.88 0 0 0 11.94 11.83s102.44-.11 106-.25c-2.77 2.88-74.12 85.58-74.12 85.58a11.67 11.67 0 0 0-1.86 12.38l6.71 15.3a12.94 12.94 0 0 0 10.93 7.16h17.08c48.61 0 65.85 27.23 65.85 50.56 0 28.57-24.58 50.13-57.17 50.13-24 0-46.88-10.46-65.29-26.89a12 12 0 0 0-17.76 1.81l-16 22a11.73 11.73 0 0 0 1.4 15.41c24.6 23.34 60.62 39 99.38 39 64.2 0 109.86-46.22 109.86-103.17.01-51.1-36.73-84.17-84.81-93.07zM304 96h-98.94A13.06 13.06 0 0 0 192 109.06v21.88A13.06 13.06 0 0 0 205.06 144H232v88H88v-88h26.94A13.06 13.06 0 0 0 128 130.94V112a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v18.94A13.06 13.06 0 0 0 13.06 144H40v224H13.06A13.06 13.06 0 0 0 0 381.06V400a16 16 0 0 0 16 16h98.94A13.06 13.06 0 0 0 128 402.94v-21.88A13.06 13.06 0 0 0 114.94 368H88v-88h144v88h-26.94A13.06 13.06 0 0 0 192 381.06V400a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-18.94A13.06 13.06 0 0 0 306.94 368H280V144h26.94A13.06 13.06 0 0 0 320 130.94V112a16 16 0 0 0-16-16z'></path></FontAwesome>);
    case 'unordered-list':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M48 368a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0-160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0-160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 24H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16z'></path></FontAwesome>);
    case 'ordered-list':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M61.77 401l17.5-20.15a19.92 19.92 0 0 0 5.07-14.19v-3.31C84.34 356 80.5 352 73 352H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h22.84a154.82 154.82 0 0 0-11 12.31l-5.61 7c-4 5.07-5.25 10.13-2.8 14.88l1.05 1.93c3 5.76 6.3 7.88 12.25 7.88h4.73c10.33 0 15.94 2.44 15.94 9.09 0 4.72-4.2 8.22-14.36 8.22a41.54 41.54 0 0 1-15.47-3.12c-6.49-3.88-11.74-3.5-15.6 3.12l-5.59 9.31c-3.73 6.13-3.2 11.72 2.62 15.94 7.71 4.69 20.39 9.44 37 9.44 34.16 0 48.5-22.75 48.5-44.12-.03-14.38-9.12-29.76-28.73-34.88zM496 392H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zM16 160h64a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H64V40a8 8 0 0 0-8-8H32a8 8 0 0 0-7.14 4.42l-8 16A8 8 0 0 0 24 64h8v64H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8zm-3.9 160H80a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H41.33c3.28-10.29 48.33-18.68 48.33-56.44 0-29.06-25-39.56-44.47-39.56-21.36 0-33.8 10-40.45 18.75-4.38 5.59-3 10.84 2.79 15.37l8.58 6.88c5.61 4.56 11 2.47 16.13-2.44a13.4 13.4 0 0 1 9.45-3.84c3.33 0 9.28 1.56 9.28 8.75C51 248.19 0 257.31 0 304.59v4C0 316 5.08 320 12.1 320z'></path></FontAwesome>);
    case 'markdown':
      return (<FontAwesome viewBox='0 0 640 512' {...props}><path fill='currentColor' d='M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z'></path></FontAwesome>);
      //TODO cleanup below
    case 'chevron-left':
      return (<Feather {...props}><polyline points='15 18 9 12 15 6'></polyline></Feather>);
    case 'calendar':
      return (<FontAwesome viewBox='0 0 448 512' {...props}><path fill='currentColor' d='M112 368h96c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16h-96c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V160h352v298z'></path></FontAwesome>);
    case 'clock':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z'></path></FontAwesome>);
    case 'map-marker':
      return (<FontAwesome viewBox='0 0 384 512' {...props}><path fill='currentColor' d='M192 0C85.903 0 0 86.014 0 192c0 71.117 23.991 93.341 151.271 297.424 18.785 30.119 62.694 30.083 81.457 0C360.075 285.234 384 263.103 384 192 384 85.903 297.986 0 192 0zm0 464C64.576 259.686 48 246.788 48 192c0-79.529 64.471-144 144-144s144 64.471 144 144c0 54.553-15.166 65.425-144 272zm-80-272c0-44.183 35.817-80 80-80s80 35.817 80 80-35.817 80-80 80-80-35.817-80-80z'></path></FontAwesome>);
    case 'check':
      return (<Feather {...props}><polyline points='20 6 9 17 4 12'></polyline></Feather>);
    case 'help-circle':
      return (<Feather {...props}><circle cx='12' cy='12' r='10'></circle><path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'></path><line x1='12' y1='17' x2='12' y2='17'></line></Feather>);
    case 'trash':
      return (<Feather {...props}><polyline points='3 6 5 6 21 6'></polyline><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path><line x1='10' y1='11' x2='10' y2='17'></line><line x1='14' y1='11' x2='14' y2='17'></line></Feather>);
    case 'paperclip':
      return (<Feather {...props}><path d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48'></path></Feather>);
    case 'question-circle':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z'></path></FontAwesome>);
    case 'rfi':
      return (<FontAwesome viewBox='0 0 45 60' {...props}><path d='M23.0461121,42.5777435 C25.3605652,40.6828308 29.381218,41.4421463 30.7793427,44.2371368 C31.0184097,44.7199631 31.4683914,44.9988556 31.9698715,44.9988556 L33.75,44.9988556 C34.7859192,44.9988556 35.625,45.8379364 35.625,46.8738556 C35.625,47.9097748 34.7859192,48.7488556 33.75,48.7488556 L31.9687271,48.7488556 C30.0433731,48.7488556 28.3077621,47.6776886 27.4429321,45.9551239 C27.098465,45.2589798 26.4937592,45.1898575 26.2488556,45.1898575 C26.003952,45.1898575 25.3992462,45.2601242 25.0734329,45.915184 L24.1757584,47.7116776 C23.8570404,48.3503723 23.2054138,48.75 22.4988556,48.75 C22.4554825,48.75 22.4121094,48.7477112 22.3675919,48.7441635 C21.6772842,48.6960983 20.9391403,48.1243515 20.7198715,47.4679184 L18.75,41.5523529 L17.505455,45.2894211 C16.8164062,47.3578262 14.8863602,48.75 12.7043152,48.75 L11.25,48.75 C10.2140808,48.75 9.375,47.9109192 9.375,46.875 C9.375,45.8390808 10.2140808,45 11.25,45 L12.7043152,45 C13.2679367,45 13.7695312,44.6414566 13.9453125,44.1047287 L16.0804367,37.700386 C16.4648437,36.5495682 17.5382996,35.7773209 18.75,35.7773209 C19.9617004,35.7773209 21.0351562,36.550827 21.4195633,37.700386 L23.0461121,42.5777435 Z M43.3394623,11.4820862 C44.3941498,12.5367737 45,13.978157 45,15.4652023 L45,54.3761444 C45,57.4804687 42.472229,60 39.3667603,60 L5.62385559,60 C2.51953125,60 -3.55271368e-15,57.4804687 -3.55271368e-15,54.3761444 L-3.55271368e-15,5.63552856 C-3.55271368e-15,2.53120422 2.51953125,0.0116729736 5.62385559,0 L29.5370865,0 C31.0242462,0 32.4539566,0.597610474 33.5086441,1.65229797 L43.3394623,11.4820862 Z M29.9941635,6.09260559 L29.9941635,15.0082397 L38.9109421,15.0082397 L29.9941635,6.09260559 Z M39.375,54.3761444 L39.375,20.6319809 L27.1828079,20.6319809 C25.6242371,20.6319809 24.3703079,19.3793106 24.3703079,17.8207397 L24.3703079,5.63552856 L5.62385559,5.63552856 L5.62385559,54.3761444 L39.375,54.3761444 Z M10.3125,13.125 C9.79454041,13.125 9.375,12.7054596 9.375,12.1875 L9.375,10.3125 C9.375,9.79454041 9.79454041,9.375 10.3125,9.375 L19.6875,9.375 C20.2054596,9.375 20.625,9.79454041 20.625,10.3125 L20.625,12.1875 C20.625,12.7054596 20.2054596,13.125 19.6875,13.125 L10.3125,13.125 Z M10.3125,20.625 C9.79454041,20.625 9.375,20.2054596 9.375,19.6875 L9.375,17.8125 C9.375,17.2945404 9.79454041,16.875 10.3125,16.875 L19.6875,16.875 C20.2054596,16.875 20.625,17.2945404 20.625,17.8125 L20.625,19.6875 C20.625,20.2054596 20.2054596,20.625 19.6875,20.625 L10.3125,20.625 Z'></path></FontAwesome>);
    case 'matchmaking':
      return (<FontAwesome viewBox='0 0 78 60' {...props}><path d='M71.250877,47.4375262 C73.299958,51.5491595 76.2598579,54.7366333 76.3133508,54.7767857 C77.1570746,55.6741333 77.3847794,56.9866071 76.9026888,58.125 C76.407127,59.2633929 75.295546,60 74.063377,60 C66.8848579,60 61.112458,57.2812762 57.2954937,54.8035976 C54.7508508,55.3928048 52.0722794,55.7142857 49.2865913,55.7142857 C37.7419222,55.7142857 27.8713604,50.3035191 23.6660817,42.6160976 C22.3669484,42.4553571 21.094627,42.2411237 19.862458,41.9597953 C16.0454937,44.4509452 10.2597532,47.1561977 3.09457465,47.1561977 C1.86253642,47.1561977 0.737484108,46.4195905 0.255393567,45.2811977 C-0.240168305,44.1428048 0.000876965512,42.830331 0.844600808,41.9329834 C0.898224552,41.8794904 3.84465312,38.6920166 5.89373411,34.5803833 C2.21069839,30.9375 0.000876965512,26.3839286 0.000876965512,21.4285714 C0.000876965512,9.5892334 12.4695746,0 27.8580198,0 C39.4160294,0 49.3267437,5.42410714 53.5454937,13.1383405 C66.8981984,14.7188023 77.1437341,23.5714286 77.1437341,34.2857143 C77.1437341,39.254412 74.9339127,43.8079834 71.250877,47.4375262 Z M18.6437603,35.0759452 L21.2955198,35.6786237 C23.438377,36.1740548 25.6481984,36.4285714 27.8580198,36.4285714 C39.4696531,36.4285714 49.2865913,29.5580619 49.2865913,21.4285714 C49.2865913,13.299081 39.4696531,6.42857143 27.8580198,6.42857143 C16.2463865,6.42857143 6.42944839,13.299081 6.42944839,21.4285714 C6.42944839,25.2723476 8.59911741,28.2053048 10.4071531,30 L13.7285555,33.28125 L11.6526627,37.4463763 C11.3045007,38.1294904 10.9428674,38.7991333 10.5812341,39.4286237 C12.5365389,38.7455096 14.4651627,37.7811977 16.3535032,36.5625 L18.6437603,35.0759452 Z M66.737458,42.8571429 C68.5454937,41.0624477 70.7151627,38.1294904 70.7151627,34.2857143 C70.7151627,27.6964024 64.2464388,22.03125 55.6213865,20.0892857 C55.6615389,20.5312238 55.7151627,20.973162 55.7151627,21.4285714 C55.7151627,32.2634452 45.2687341,41.1830357 31.701796,42.6294381 C35.5990651,46.5938023 42.0544484,49.2857143 49.2865913,49.2857143 C51.4964127,49.2857143 53.7062341,49.0311977 55.8490913,48.5357666 L58.5143221,47.9196167 L60.8044484,49.4063023 C62.6927889,50.625 64.6214127,51.5893119 66.5767175,52.2722953 C66.215215,51.6428048 65.8535817,50.973162 65.5052889,50.2901786 L63.4293961,46.1250523 L66.737458,42.8571429 Z'></path></FontAwesome>);
    case 'discovery-day':
      return (<FontAwesome viewBox='0 0 53 60' {...props}><path d='M17.652439,33.6585366 L13.0792683,33.6585366 C12.3247398,33.6585366 11.7073171,33.0411139 11.7073171,32.2865854 L11.7073171,27.7134146 C11.7073171,26.9588861 12.3247398,26.3414634 13.0792683,26.3414634 L17.652439,26.3414634 C18.4069675,26.3414634 19.0243902,26.9588861 19.0243902,27.7134146 L19.0243902,32.2865854 C19.0243902,33.0411139 18.4069675,33.6585366 17.652439,33.6585366 Z M30.7317073,32.2865854 C30.7317073,33.0411139 30.1142846,33.6585366 29.3597561,33.6585366 L24.7865854,33.6585366 C24.0320569,33.6585366 23.4146341,33.0411139 23.4146341,32.2865854 L23.4146341,27.7134146 C23.4146341,26.9588861 24.0320569,26.3414634 24.7865854,26.3414634 L29.3597561,26.3414634 C30.1142846,26.3414634 30.7317073,26.9588861 30.7317073,27.7134146 L30.7317073,32.2865854 Z M40.9756098,32.2865854 C40.9756098,33.0411139 40.358187,33.6585366 39.6036585,33.6585366 L35.0304878,33.6585366 C34.2759593,33.6585366 33.6585366,33.0411139 33.6585366,32.2865854 L33.6585366,27.7134146 C33.6585366,26.9588861 34.2759593,26.3414634 35.0304878,26.3414634 L39.6036585,26.3414634 C40.358187,26.3414634 40.9756098,26.9588861 40.9756098,27.7134146 L40.9756098,32.2865854 Z M30.7317073,43.9939024 C30.7317073,44.7484309 30.1142846,45.3658537 29.3597561,45.3658537 L24.7865854,45.3658537 C24.0320569,45.3658537 23.4146341,44.7484309 23.4146341,43.9939024 L23.4146341,39.4207317 C23.4146341,38.6662032 24.0320569,38.0487805 24.7865854,38.0487805 L29.3597561,38.0487805 C30.1142846,38.0487805 30.7317073,38.6662032 30.7317073,39.4207317 L30.7317073,43.9939024 Z M19.0243902,43.9939024 C19.0243902,44.7484309 18.4069675,45.3658537 17.652439,45.3658537 L13.0792683,45.3658537 C12.3247398,45.3658537 11.7073171,44.7484309 11.7073171,43.9939024 L11.7073171,39.4207317 C11.7073171,38.6662032 12.3247398,38.0487805 13.0792683,38.0487805 L17.652439,38.0487805 C18.4069675,38.0487805 19.0243902,38.6662032 19.0243902,39.4207317 L19.0243902,43.9939024 Z M40.9756098,43.9939024 C40.9756098,44.7484309 40.358187,45.3658537 39.6036585,45.3658537 L35.0304878,45.3658537 C34.2759593,45.3658537 33.6585366,44.7484309 33.6585366,43.9939024 L33.6585366,39.4207317 C33.6585366,38.6662032 34.2759593,38.0487805 35.0304878,38.0487805 L39.6036585,38.0487805 C40.358187,38.0487805 40.9756098,38.6662032 40.9756098,39.4207317 L40.9756098,43.9939024 Z M52.6829268,13.125 L52.6829268,54.375 C52.6829268,57.4804687 50.1546167,60 47.0383275,60 L5.6445993,60 C2.5283101,60 1.24344979e-13,57.4804687 1.24344979e-13,54.375 L1.24344979e-13,13.125 C1.24344979e-13,10.0195312 2.5283101,7.5 5.6445993,7.5 L11.2891986,7.5 L11.2891986,1.40625 C11.2891986,0.632858276 11.924262,0 12.7003484,0 L17.4041812,0 C18.1802677,0 18.815331,0.632858276 18.815331,1.40625 L18.815331,7.5 L33.8675958,7.5 L33.8675958,1.40625 C33.8675958,0.632858276 34.5026592,0 35.2787456,0 L39.9825784,0 C40.7586649,0 41.3937282,0.632858276 41.3937282,1.40625 L41.3937282,7.5 L47.0383275,7.5 C50.1546167,7.5 52.6829268,10.0195312 52.6829268,13.125 Z M46.8292683,53.4531451 L46.8292683,19.0243902 L5.85365854,19.0243902 L5.85365854,53.4531451 C5.85365854,53.8343805 6.16798282,54.1463415 6.55210643,54.1463415 L46.1308204,54.1463415 C46.514944,54.1463415 46.8292683,53.8343805 46.8292683,53.4531451 Z'></path></FontAwesome>);
    case 'rating-good':
      return (<FontAwesome viewBox='0 0 36 36' {...props}><path stroke='none' strokeWidth='1' d='M18,0 C27.9435484,0 36,8.05645161 36,18 C36,27.9435484 27.9435484,36 18,36 C8.05645161,36 0,27.9435484 0,18 C0,8.05645161 8.05645161,0 18,0 Z M18,33.6774194 C26.6443265,33.6774194 33.6774194,26.6443265 33.6774194,18 C33.6774194,9.35567351 26.6443265,2.32258065 18,2.32258065 C9.35567351,2.32258065 2.32258065,9.35567351 2.32258065,18 C2.32258065,26.6443265 9.35567351,33.6774194 18,33.6774194 Z M24.5467884,23.0661149 C24.9605122,22.5725806 25.6935484,22.5072297 26.1870826,22.9137239 C26.6806168,23.3201471 26.7459677,24.0532542 26.3322439,24.5467884 C24.2636955,27.0290606 21.222609,28.4516129 18,28.4516129 C14.777391,28.4516129 11.7363045,27.0290606 9.67498582,24.5540181 C9.26126197,24.0604839 9.3266129,23.3346774 9.82014711,22.9209536 C10.3064516,22.5072297 11.0394878,22.5725806 11.4532116,23.0661149 C13.0790464,25.011262 15.4669071,26.1290323 18,26.1290323 C20.5330929,26.1290323 22.9209536,25.011262 24.5467884,23.0661149 Z M12.1935484,16.8387097 C10.9088568,16.8387097 9.87096774,15.8008206 9.87096774,14.516129 C9.87096774,13.2314374 10.9088568,12.1935484 12.1935484,12.1935484 C13.47824,12.1935484 14.516129,13.2314374 14.516129,14.516129 C14.516129,15.8008206 13.47824,16.8387097 12.1935484,16.8387097 Z M23.8064516,16.8387097 C22.52176,16.8387097 21.483871,15.8008206 21.483871,14.516129 C21.483871,13.2314374 22.52176,12.1935484 23.8064516,12.1935484 C25.0911432,12.1935484 26.1290323,13.2314374 26.1290323,14.516129 C26.1290323,15.8008206 25.0911432,16.8387097 23.8064516,16.8387097 Z'></path></FontAwesome>);
    case 'rating-neutral':
      return (<FontAwesome viewBox='0 0 36 36' {...props}><path stroke='none' strokeWidth='1' d='M18,0 C27.9435484,0 36,8.05645161 36,18 C36,27.9435484 27.9435484,36 18,36 C8.05645161,36 0,27.9435484 0,18 C0,8.05645161 8.05645161,0 18,0 Z M18,33.6774194 C26.6443265,33.6774194 33.6774194,26.6443265 33.6774194,18 C33.6774194,9.35567351 26.6443265,2.32258065 18,2.32258065 C9.35567351,2.32258065 2.32258065,9.35567351 2.32258065,18 C2.32258065,26.6443265 9.35567351,33.6774194 18,33.6774194 Z M12.1935484,16.8387097 C10.9088568,16.8387097 9.87096774,15.8008206 9.87096774,14.516129 C9.87096774,13.2314374 10.9088568,12.1935484 12.1935484,12.1935484 C13.47824,12.1935484 14.516129,13.2314374 14.516129,14.516129 C14.516129,15.8008206 13.47824,16.8387097 12.1935484,16.8387097 Z M23.8064516,12.1935484 C25.0911432,12.1935484 26.1290323,13.2314374 26.1290323,14.516129 C26.1290323,15.8008206 25.0911432,16.8387097 23.8064516,16.8387097 C22.52176,16.8387097 21.483871,15.8008206 21.483871,14.516129 C21.483871,13.2314374 22.52176,12.1935484 23.8064516,12.1935484 Z M24.9677419,23.8064516 C25.6064374,23.8064516 26.1290323,24.3290464 26.1290323,24.9677419 C26.1290323,25.6064374 25.6064374,26.1290323 24.9677419,26.1290323 L11.0322581,26.1290323 C10.3935626,26.1290323 9.87096774,25.6064374 9.87096774,24.9677419 C9.87096774,24.3290464 10.3935626,23.8064516 11.0322581,23.8064516 L24.9677419,23.8064516 Z'></path></FontAwesome>);
    case 'rating-bad':
      return (<FontAwesome viewBox='0 0 36 36' {...props}><path stroke='none' strokeWidth='1' d='M18,0 C27.9435484,0 36,8.05645161 36,18 C36,27.9435484 27.9435484,36 18,36 C8.05645161,36 0,27.9435484 0,18 C0,8.05645161 8.05645161,0 18,0 Z M18,33.6774194 C26.6443265,33.6774194 33.6774194,26.6443265 33.6774194,18 C33.6774194,9.35567351 26.6443265,2.32258065 18,2.32258065 C9.35567351,2.32258065 2.32258065,9.35567351 2.32258065,18 C2.32258065,26.6443265 9.35567351,33.6774194 18,33.6774194 Z M18,23.8064516 C20.2645303,23.8064516 22.3983587,24.8080503 23.8427419,26.5499858 C24.2564658,27.0362903 24.1911149,27.7693265 23.6975806,28.1830503 C23.1822864,28.6185342 22.4491794,28.5024335 22.0645161,28.037889 C20.0394878,25.613738 15.9532116,25.613738 13.9282542,28.037889 C13.52176,28.5314233 12.7887239,28.5895445 12.2951896,28.1830503 C11.8015846,27.7766271 11.7363045,27.04352 12.1500284,26.5499858 C13.6016413,24.8080503 15.7354697,23.8064516 18,23.8064516 Z M14.516129,16.8387097 C14.516129,18.1234013 13.4709394,19.1612903 12.1863187,19.1612903 C10.9016271,19.1612903 9.86373803,18.1234013 9.86373803,16.8387097 C9.86373803,16.1637239 10.16852,15.5613187 10.6258348,15.1402942 L8.3758348,14.4653084 C7.75889932,14.2838568 7.41045552,13.6379316 7.59920772,13.0209961 C7.78065934,12.4112903 8.43388514,12.0629174 9.04352004,12.244369 L14.8499716,13.9863045 C15.4669071,14.1677561 15.8153509,14.8136813 15.6265987,15.4306168 C15.4742077,15.9314516 15.0169638,16.2580645 14.516129,16.2580645 C14.472609,16.2580645 14.4363187,16.2508348 14.3927278,16.2435342 C14.4507781,16.4322864 14.516129,16.6281975 14.516129,16.8387097 Z M26.95648,12.244369 C27.5661149,12.0629174 28.2193407,12.4040606 28.3935626,13.0209961 C28.5822439,13.630631 28.233871,14.2838568 27.6169355,14.4653084 L25.3669355,15.1402942 C25.83148,15.5685484 26.1290323,16.1637239 26.1290323,16.8387097 C26.1290323,18.1234013 25.0911432,19.1612903 23.8064516,19.1612903 C22.52176,19.1612903 21.483871,18.1234013 21.483871,16.8387097 C21.483871,16.6281975 21.5564516,16.4395161 21.6072722,16.2435342 C21.5636813,16.2435342 21.527391,16.2580645 21.483871,16.2580645 C20.9830362,16.2580645 20.5257923,15.9314516 20.3734013,15.4306168 C20.1846491,14.8209819 20.5330929,14.1677561 21.1500284,13.9863045 L26.95648,12.244369 Z'></path></FontAwesome>);
    case 'search':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z'></path></FontAwesome>);
    case 'buyer':
      return (<FontAwesome viewBox='0 0 576 512' {...props}><path fill='currentColor' d='M48 160h480c8.84 0 16-7.16 16-16v-36.91c0-6.67-4.14-12.64-10.38-14.98L299.24 2.04C295.62.68 291.81 0 288 0s-7.62.68-11.24 2.04L42.38 92.11A16.001 16.001 0 0 0 32 107.09V144c0 8.84 7.16 16 16 16zM288 49.14L451.58 112H124.42L288 49.14zM560 464h-16v-64c0-17.67-16.37-32-36.57-32H480V192h-48v176h-64V192h-48v176h-64V192h-48v176h-64V192H96v176H68.57C48.37 368 32 382.33 32 400v64H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h544c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16zm-64 0H80v-48h416v48z'></path></FontAwesome>);
    case 'vendor':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M168 296h-16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16zm-32-48c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-16zm96 0c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-16zm128 48h-16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16zm48-64h-16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16zm103.4 147.5l-25.5-178.3c-3.4-23.6-23.6-41.2-47.5-41.2H208v-32h96c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96v32H73.6c-23.9 0-44.1 17.6-47.5 41.2L.6 379.5c-.4 3-.6 6-.6 9.1V464c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-75.5c0-3-.2-6-.6-9zM80 80V48h192v32H80zm-6.4 128h364.7l22.9 160H50.8l22.8-160zM464 464H48v-48h416v48zM328 248c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-16zm-64 48h-16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16z'></path></FontAwesome>);
    case 'times-circle':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z'></path></FontAwesome>);
    case 'exclamation-circle':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm42-104c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42zm-81.37-211.401l6.8 136c.319 6.387 5.591 11.401 11.985 11.401h41.17c6.394 0 11.666-5.014 11.985-11.401l6.8-136c.343-6.854-5.122-12.599-11.985-12.599h-54.77c-6.863 0-12.328 5.745-11.985 12.599z'></path></FontAwesome>);
    case 'plus':
      return (<FontAwesome viewBox='0 0 384 512' {...props}><path fill='currentColor' d='M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z'></path></FontAwesome>);
    case 'info-circle':
      return (<FontAwesome viewBox='0 0 512 512' {...props}><path fill='currentColor' d='M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm0-338c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z'></path></FontAwesome>);
    case 'download':
      return (<FontAwesome viewBox='0 0 576 512' {...props}><path fill='currentColor' d='M528 288h-92.1l46.1-46.1c30.1-30.1 8.8-81.9-33.9-81.9h-64V48c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v112h-64c-42.6 0-64.2 51.7-33.9 81.9l46.1 46.1H48c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48zm-400-80h112V48h96v160h112L288 368 128 208zm400 256H48V336h140.1l65.9 65.9c18.8 18.8 49.1 18.7 67.9 0l65.9-65.9H528v128zm-88-64c0-13.3 10.7-24 24-24s24 10.7 24 24-10.7 24-24 24-24-10.7-24-24z'></path></FontAwesome>);
  }
};

export default Icon;
